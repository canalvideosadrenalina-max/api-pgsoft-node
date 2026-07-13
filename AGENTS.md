# AGENTS.md

## Cursor Cloud specific instructions

### What this service is
Single service: a Node.js + TypeScript **Express + Socket.IO** API (a PG Soft–style slots RGS). Entry point `src/indexprod.ts`. It needs a **MySQL/MariaDB** database. Redis and Puppeteer are listed as deps but are not used by the running code; the external `DOMINIO_API` host is only needed to serve real game HTML/assets (not required for the API to boot or for spin logic).

### Run / build / lint / test (see `package.json` scripts)
- Dev: `yarn dev` (`ts-node-dev` on `src/indexprod.ts`). Listens on `PORT` (`.env`, e.g. `3006`). Health check: `GET /status` -> `{"status":"operational"}`.
- `yarn build` is a no-op (`echo`), a prebuilt `dist/` is committed; `yarn start` runs `dist/`.
- No automated test suite exists (no test script, no test files).
- Lint: the committed `.eslintrc.json` is currently invalid — rule `@typescript-eslint/no-explicit-any` has severity `""`, which crashes ESLint ("Severity should be one of 0/1/2"). Lint cannot run until that value is fixed (e.g. to `"off"`). This is a pre-existing repo bug, unrelated to environment setup.

### Database is required and NOT auto-provisioned
There are no migrations or schema dump in the repo. The app opens a `mysql2` pool on startup and every game/launch/spin query hits MySQL. `.env` (gitignored) must contain `DB_HOST/DB_PORT/DB_USERNAME/DB_PASSWORD/DB_NAME` and `PORT` (copy from `.env.example`).

MariaDB is installed at the system level. systemd is not available in this VM, so start it manually and (if empty) create the DB + minimal schema + a seed agent:

```bash
sudo mkdir -p /var/run/mysqld && sudo chown mysql:mysql /var/run/mysqld
sudo mysqld_safe >/tmp/mariadb.log 2>&1 &   # wait ~8s

sudo mariadb <<'SQL'
CREATE DATABASE IF NOT EXISTS pgsoft CHARACTER SET utf8mb4;
CREATE USER IF NOT EXISTS 'pgsoft'@'127.0.0.1' IDENTIFIED BY 'pgsoft';
GRANT ALL PRIVILEGES ON pgsoft.* TO 'pgsoft'@'127.0.0.1';
FLUSH PRIVILEGES;
USE pgsoft;
CREATE TABLE IF NOT EXISTS agents (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), agentToken VARCHAR(255),
  secretKey VARCHAR(255), callbackurl VARCHAR(512), saldo DECIMAL(18,2) DEFAULT 0,
  probganho VARCHAR(64) DEFAULT '0', probbonus VARCHAR(64) DEFAULT '0',
  probganhortp VARCHAR(64) DEFAULT '0', probganhoinfluencer VARCHAR(64) DEFAULT '0',
  probbonusinfluencer VARCHAR(64) DEFAULT '0', probganhoaposta VARCHAR(64) DEFAULT '0',
  probganhosaldo VARCHAR(64) DEFAULT '0');
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255),
  password VARCHAR(255), number_phone VARCHAR(64), cpf VARCHAR(64), ref_id VARCHAR(64),
  ip VARCHAR(64), data_registro VARCHAR(64), indicadode VARCHAR(64), token VARCHAR(255),
  atk VARCHAR(255), saldo DECIMAL(18,2) DEFAULT 0, valorapostado DECIMAL(18,2) DEFAULT 0,
  valordebitado DECIMAL(18,2) DEFAULT 0, valorganho DECIMAL(18,2) DEFAULT 0,
  rtp INT DEFAULT 0, linha_ganho VARCHAR(255), agentid INT);
INSERT INTO agents (name, agentToken, secretKey, callbackurl, saldo)
  SELECT 'demo-agent','demo-agent-token','demo-secret-key','https://example.com/',100000
  WHERE NOT EXISTS (SELECT 1 FROM agents WHERE agentToken='demo-agent-token');
SQL
```

Spin/game-info endpoints reference additional per-game tables (e.g. `calls`, `spins`, `jogo`, `fortunetigerplayerjson`, `<game>json`) that are not created above; add them as needed for deeper testing.

### Quick smoke test (core flow: launch a game = create/refresh a player)
```bash
curl -s http://127.0.0.1:3006/status
curl -s -X POST http://127.0.0.1:3006/api/v1/game_launch -H 'Content-Type: application/json' \
  -d '{"agentToken":"demo-agent-token","secretKey":"demo-secret-key","user_code":"player_hello","game_type":"slot","provider_code":"PGSOFT","game_code":"fortune-tiger","user_balance":500}'
```
A successful launch returns `{"status":1,"msg":"SUCCESS","launch_url":...}` and inserts/updates the user in `users`.
