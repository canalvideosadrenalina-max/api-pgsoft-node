"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var logger_1 = require("../logger");
require("dotenv/config");
var apifunctions_1 = require("../functions/apifunctions");
var uuid_1 = require("uuid");
function publicApiBaseUrl() {
    var raw = (process.env.DOMINIO_API || "").trim().replace(/\/$/, "");
    var host = raw.replace(/^https?:\/\//i, "");
    return host ? "https://".concat(host) : "https://api-pgsoft-node-production.up.railway.app";
}
function buildLaunchUrl(codegame, token) {
    var base = publicApiBaseUrl();
    var q = new URLSearchParams({
        operator_token: "Zm9saWFiZXQ=",
        btt: "1",
        t: token,
        or: base,
        api: base,
    });
    return "".concat(base, "/").concat(codegame, "/index.html?").concat(q.toString());
}
exports.default = {
    launchgame: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agentToken, secretKey, user_code, game_type, provider_code, game_code, user_balance, agent, user, user_1, tokenuser, atkuser, createnewuser, pragmaticRequestData, pragmaticResponse, error_1, codegame, tokenuser, atkuser, createnewuser, getnewuser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agentToken = req.body.agentToken;
                        secretKey = req.body.secretKey;
                        user_code = req.body.user_code;
                        game_type = req.body.game_type;
                        provider_code = req.body.provider_code;
                        game_code = req.body.game_code;
                        user_balance = req.body.user_balance;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 23, , 24]);
                        if (!user_code) {
                            res.send({
                                status: "error",
                                message: "Voce precisa passar o user_code.",
                            });
                            return [2 /*return*/, false];
                        }
                        if (isNaN(user_balance) === true) {
                            res.send({
                                status: "error",
                                message: "User Balance deve ser um numero.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 2:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Agent Token não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbysecretkey(secretKey)];
                    case 3:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Secret Key não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 4:
                        agent = _a.sent();
                        return [4 /*yield*/, apifunctions_1.default.getuserbyagent(user_code, agent[0].id)
                            // Adicionando a lógica para enviar um request se o provider_code for 'PRAGMATIC'
                        ]; //PUXA O USUARIO ATRAVES DO USER E AGENTID
                    case 5:
                        user = _a.sent() //PUXA O USUARIO ATRAVES DO USER E AGENTID
                        ;
                        if (!(provider_code === "PRAGMATIC")) return [3 /*break*/, 15];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 13, , 14]);
                        return [4 /*yield*/, apifunctions_1.default.getuserbyagent(user_code, agent[0].id)
                            // Criação do usuário se não existir
                        ];
                    case 7:
                        user_1 = _a.sent();
                        if (!(user_1.length === 0)) return [3 /*break*/, 11];
                        tokenuser = (0, uuid_1.v4)();
                        atkuser = (0, uuid_1.v4)();
                        return [4 /*yield*/, apifunctions_1.default.createuser(user_code, tokenuser, atkuser, user_balance, agent[0].id)];
                    case 8:
                        createnewuser = _a.sent();
                        if (!(createnewuser.affectedRows >= 1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, apifunctions_1.default.getuserbyagent(user_code, agent[0].id)];
                    case 9:
                        // Obtendo o novo usuário após criação
                        user_1 = _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        res.send({
                            status: 0,
                            msg: "ERRO",
                            message: "Erro ao criar o usuário.",
                        });
                        return [2 /*return*/];
                    case 11:
                        pragmaticRequestData = {
                            method: "game_launch",
                            agent_code: "admin",
                            agent_token: "admin",
                            user_code: user_code,
                            game_code: game_code,
                            lang: "pt",
                            provider_code: provider_code,
                            user_balance: user_balance,
                        };
                        return [4 /*yield*/, axios_1.default.post("https://api.br777-pg.com/", pragmaticRequestData)
                            // Responder com sucesso, incluindo o launch_url da resposta
                        ]; // Substitua pela URL real
                    case 12:
                        pragmaticResponse = _a.sent() // Substitua pela URL real
                        ;
                        // Responder com sucesso, incluindo o launch_url da resposta
                        res.send({
                            status: 1,
                            msg: "SUCCESS",
                            launch_url: pragmaticResponse.data.launch_url || "",
                            user_code: user_1[0].username,
                            user_balance: user_1[0].saldo,
                            user_created: user_1.length === 0,
                            currency: "BRL",
                        });
                        return [3 /*break*/, 14];
                    case 13:
                        error_1 = _a.sent();
                        logger_1.default.error("Error sending request to Pragmatic:", error_1);
                        res.send({
                            status: 0,
                            msg: "ERRO",
                            message: "Erro ao se conectar com o provedor PRAGMATIC."
                        });
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                    case 15:
                        codegame = 0;
                        if (game_code === "fortune-tiger") {
                            codegame = 126;
                        }
                        else if (game_code === "fortune-ox") {
                            codegame = 98;
                        }
                        else if (game_code === "fortune-dragon") {
                            codegame = 1695365;
                        }
                        else if (game_code === "fortune-rabbit") {
                            codegame = 1543462;
                        }
                        else if (game_code === "fortune-mouse") {
                            codegame = 68;
                        }
                        else if (game_code === "bikini-paradise") {
                            codegame = 69;
                        }
                        else if (game_code === "jungle-delight") {
                            codegame = 40;
                        }
                        else if (game_code === "ganesha-gold") {
                            codegame = 42;
                        }
                        else if (game_code === "double-fortune") {
                            codegame = 48;
                        }
                        else if (game_code === "dragon-tiger-luck") {
                            codegame = 63;
                        }
                        else if (game_code === "ninja-raccoon") {
                            codegame = 1529867;
                        }
                        else if (game_code === "lucky-clover") {
                            codegame = 1601012;
                        }
                        else if (game_code === "ultimate-striker") {
                            codegame = 1489936;
                        }
                        else if (game_code === "prosper-ftree") {
                            codegame = 1312883;
                        }
                        else if (game_code === "chicky-run") {
                            codegame = 1738001;
                        }
                        else if (game_code === "butterfly-blossom") {
                            codegame = 125;
                        }
                        else if (game_code === "cash-mania") {
                            codegame = 1682240;
                        }
                        else {
                            res.send({
                                status: "error",
                                message: "Esse game não existe.",
                            });
                            return [2 /*return*/, false];
                        }
                        if (!(user.length === 0)) return [3 /*break*/, 20];
                        tokenuser = (0, uuid_1.v4)();
                        atkuser = (0, uuid_1.v4)();
                        return [4 /*yield*/, apifunctions_1.default.createuser(user_code, tokenuser, atkuser, user_balance, agent[0].id)];
                    case 16:
                        createnewuser = _a.sent();
                        if (!(createnewuser.affectedRows >= 1)) return [3 /*break*/, 18];
                        return [4 /*yield*/, apifunctions_1.default.getuserbyagent(user_code, agent[0].id)];
                    case 17:
                        getnewuser = _a.sent();
                        res.send({
                            status: 1,
                            msg: "SUCCESS",
                            launch_url: buildLaunchUrl(codegame, getnewuser[0].token),
                            user_code: getnewuser[0].username,
                            user_balance: getnewuser[0].saldo,
                            user_created: true,
                            currency: "BRL",
                        });
                        return [3 /*break*/, 19];
                    case 18:
                        res.send({
                            status: "error",
                            message: "Erro ao cadastrar o usuario.",
                        });
                        return [2 /*return*/, false];
                    case 19: return [3 /*break*/, 22];
                    case 20: return [4 /*yield*/, apifunctions_1.default.setbalanceuserbyid(user[0].id, user_balance)];
                    case 21:
                        _a.sent();
                        res.send({
                            status: 1,
                            msg: "SUCCESS",
                            launch_url: buildLaunchUrl(codegame, user[0].token),
                            user_code: user[0].username,
                            user_balance: user[0].saldo,
                            user_created: false,
                            currency: "BRL",
                        });
                        _a.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        error_2 = _a.sent();
                        logger_1.default.error(error_2);
                        return [3 /*break*/, 24];
                    case 24: return [2 /*return*/];
                }
            });
        });
    },
    callbackgame: function (json) {
        return __awaiter(this, void 0, void 0, function () {
            var agent, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apifunctions_1.default.getagentbysecretkey(json.agent_secret)];
                    case 1:
                        agent = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, axios_1.default)({
                                maxBodyLength: Infinity,
                                method: "POST",
                                url: "".concat(agent[0].callbackurl, "gold_api/game_callback"),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                data: json,
                            })
                                .then(function (data) {
                                //console.log("NEW BALANCE" + data.data.user_balance)
                            })
                                .catch(function (error) {
                                console.log(error);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    getagent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agentToken, secretKey, agent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agentToken = req.body.agentToken;
                        secretKey = req.body.secretKey;
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 1:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Agent Token não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbysecretkey(secretKey)];
                    case 2:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Secret Key não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 3:
                        agent = _a.sent();
                        agent[0].saldo = undefined;
                        agent[0].agentToken = undefined;
                        agent[0].saldo = undefined;
                        res.send(agent[0]);
                        return [2 /*return*/];
                }
            });
        });
    },
    attagent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agentToken, secretKey, probganho, probbonus, probganhortp, probganhoinfluencer, probbonusinfluencer, probganhoaposta, probganhosaldo, agent, att;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agentToken = req.body.agentToken;
                        secretKey = req.body.secretKey;
                        probganho = req.body.probganho;
                        probbonus = req.body.probbonus;
                        probganhortp = req.body.probganhortp;
                        probganhoinfluencer = req.body.probganhoinfluencer;
                        probbonusinfluencer = req.body.probbonusinfluencer;
                        probganhoaposta = req.body.probganhoaposta;
                        probganhosaldo = req.body.probganhosaldo;
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 1:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Agent Token não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbysecretkey(secretKey)];
                    case 2:
                        if ((_a.sent()).length === 0) {
                            res.send({
                                status: "error",
                                message: "Secret Key não cadastrado.",
                            });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, apifunctions_1.default.getagentbyagentToken(agentToken)];
                    case 3:
                        agent = _a.sent();
                        return [4 /*yield*/, apifunctions_1.default.attagent(agent[0].id, probganho, probbonus, probganhortp, probganhoinfluencer, probbonusinfluencer, probganhoaposta, probganhosaldo)];
                    case 4:
                        att = _a.sent();
                        if (att.affectedRows > 0) {
                            res.send({
                                status: "success",
                                message: "Probabiliades alteradas com sucesso.",
                            });
                        }
                        else {
                            res.send({
                                status: "error",
                                message: "Erro desconhecido por favor contate o adm.",
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
