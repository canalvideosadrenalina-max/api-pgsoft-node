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
var logger_1 = require("../../logger");
var crypto = require("crypto");
var uuid_1 = require("uuid");
var moment_1 = require("moment");
var fortunetigerfunctions_1 = require("../../functions/fortune-tiger/fortunetigerfunctions");
var allfunctions_1 = require("../../functions/allfunctions");
var apicontroller_1 = require("../apicontroller");
var serverEvents_1 = require("../../serverEvents");
var linhaganhotiger_1 = require("../../jsons/fortune-tiger/linhaganhotiger");
var linhaperdatiger_1 = require("../../jsons/fortune-tiger/linhaperdatiger");
var linhabonustiger_1 = require("../../jsons/fortune-tiger/linhabonustiger");
var notcashtiger_1 = require("../../jsons/fortune-tiger/notcashtiger");
require("dotenv/config");
exports.default = {
    getiger: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, gamename, user, jsonprimay, jsoninicial, json, jsonformatado, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        token = req.body.atk;
                        gamename = "fortune-tiger";
                        return [4 /*yield*/, allfunctions_1.default.getuserbyatk(token)];
                    case 1:
                        user = _a.sent();
                        logger_1.default.info('[+] Usuario logado: ' + user[0].username);
                        return [4 /*yield*/, allfunctions_1.default.getSpinByPlayerId(user[0].id)];
                    case 2:
                        jsonprimay = _a.sent();
                        return [4 /*yield*/, allfunctions_1.default.getjsonprimary(gamename)];
                    case 3:
                        jsoninicial = _a.sent();
                        if (!(jsonprimay.length === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, allfunctions_1.default.createOrUpdateSpin(user[0].id, gamename, jsoninicial[0].json)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(jsonprimay[0].game_code === gamename)) return [3 /*break*/, 6];
                        logger_1.default.info('[+] Json Recuperado Do Ultimo Spin.');
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, allfunctions_1.default.createOrUpdateSpin(user[0].id, gamename, jsoninicial[0].json)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, allfunctions_1.default.getSpinByPlayerId(user[0].id)];
                    case 9:
                        json = _a.sent();
                        jsonformatado = JSON.parse(json[0].json);
                        res.send({
                            dt: {
                                fb: null,
                                wt: { mw: 5.0, bw: 20.0, mgw: 35.0, smgw: 50.0 },
                                maxwm: null,
                                cs: [0.08, 0.8, 3.0, 10.0],
                                ml: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                mxl: 5,
                                bl: user[0].saldo,
                                inwe: false,
                                iuwe: false,
                                ls: jsonformatado.dt,
                                cc: "BRL",
                            },
                            err: null,
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        logger_1.default.error(error_1);
                        res.status(500).send({
                            dt: null,
                            err: { cd: "500", msg: "Internal error", tid: "FTIGER" },
                        });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    },
    spin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            function lwchange(json1, json2, cs, ml) {
                return __awaiter(this, void 0, void 0, function () {
                    var chave, valor, ganho, chave2;
                    return __generator(this, function (_a) {
                        for (chave in json1) {
                            if (json1.hasOwnProperty(chave)) {
                                valor = json1[chave];
                                ganho = cs * ml * parseFloat(valor);
                                // Verifica se a chave existe no segundo JSON
                                for (chave2 in json2) {
                                    if (json2.hasOwnProperty(chave2)) {
                                        // Altera o valor correspondente no segundo JSON
                                        json2[chave] = ganho;
                                    }
                                }
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            }
            function countrwsp(json) {
                return __awaiter(this, void 0, void 0, function () {
                    var multplicador, i, chave;
                    return __generator(this, function (_a) {
                        multplicador = 0;
                        for (i = 1; i <= 9; i++) {
                            chave = i.toString();
                            if (json.hasOwnProperty(chave)) {
                                multplicador = multplicador + parseFloat(json[chave]);
                            }
                        }
                        return [2 /*return*/, multplicador];
                    });
                });
            }
            function gerarNumeroUnico() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, crypto.randomBytes(8).toString("hex")];
                    });
                });
            }
            var cs, ml, token, user, bet, saldoatual, gamename, agent, checkuserbalance, _a, _b, _c, _d, retornado, valorapostado, rtp, semsaldo, resultadospin, newbalance, perdajson, json, txnid, dataFormatada, _e, _f, ganhojson, multplicador, valorganho, newbalance, json, txnid, dataFormatada, _g, _h, cartajson, call, steps, calltwo, multplicador, valorganho, newbalance, json_1, txnid, dataFormatada, _j, _k, json, error_2;
            var _l, _m, _o, _p, _q, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        cs = req.body.cs;
                        ml = req.body.ml;
                        token = req.body.atk;
                        _s.label = 1;
                    case 1:
                        _s.trys.push([1, 49, , 50]);
                        return [4 /*yield*/, fortunetigerfunctions_1.default.getuserbyatk(token)];
                    case 2:
                        user = _s.sent();
                        bet = cs * ml * 5;
                        console.log(bet);
                        saldoatual = user[0].saldo;
                        gamename = "fortune-tiger";
                        (0, serverEvents_1.emitirEventoInterno)("att", {
                            token: token,
                            username: user[0].username,
                            bet: bet,
                            saldo: saldoatual,
                            rtp: user[0].rtp,
                            agentid: user[0].agentid,
                            gamecode: gamename,
                        });
                        return [4 /*yield*/, allfunctions_1.default.getagentbyid(user[0].agentid)];
                    case 3:
                        agent = _s.sent();
                        return [4 /*yield*/, (0, axios_1.default)({
                                maxBodyLength: Infinity,
                                method: "POST",
                                url: "".concat(agent[0].callbackurl, "gold_api/user_balance"),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                data: {
                                    user_code: user[0].username,
                                },
                            })];
                    case 4:
                        checkuserbalance = _s.sent();
                        if (!(checkuserbalance.data.msg === "INVALID_USER")) return [3 /*break*/, 6];
                        _b = (_a = res).send;
                        return [4 /*yield*/, notcashtiger_1.default.notcash(saldoatual, cs, ml)];
                    case 5:
                        _b.apply(_a, [_s.sent()]);
                        return [2 /*return*/, false];
                    case 6:
                        if (!(checkuserbalance.data.msg === "INSUFFICIENT_USER_FUNDS")) return [3 /*break*/, 8];
                        _d = (_c = res).send;
                        return [4 /*yield*/, notcashtiger_1.default.notcash(saldoatual, cs, ml)];
                    case 7:
                        _d.apply(_c, [_s.sent()]);
                        return [2 /*return*/, false];
                    case 8:
                        retornado = user[0].valorganho;
                        valorapostado = user[0].valorapostado;
                        rtp = (retornado / valorapostado) * 100;
                        console.log("RTP ATUAL " + rtp);
                        console.log("BET ATUAL " + bet);
                        if (!(saldoatual < bet)) return [3 /*break*/, 10];
                        return [4 /*yield*/, notcashtiger_1.default.notcash(saldoatual, cs, ml)];
                    case 9:
                        semsaldo = _s.sent();
                        res.send(semsaldo);
                        return [2 /*return*/, false];
                    case 10: return [4 /*yield*/, allfunctions_1.default.calcularganho(bet, saldoatual, token, gamename)];
                    case 11:
                        resultadospin = _s.sent();
                        if (!(resultadospin.result === "perda")) return [3 /*break*/, 19];
                        newbalance = saldoatual - bet;
                        return [4 /*yield*/, fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance)];
                    case 12:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizardebitado(token, bet)];
                    case 13:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizarapostado(token, bet)];
                    case 14:
                        _s.sent();
                        return [4 /*yield*/, linhaperdatiger_1.default.linhaperda()];
                    case 15:
                        perdajson = _s.sent();
                        json = {
                            dt: {
                                si: {
                                    wc: 31,
                                    ist: perdajson.ist,
                                    itw: true,
                                    fws: 0,
                                    wp: null,
                                    orl: perdajson.orl,
                                    lw: null,
                                    irs: false,
                                    gwt: -1,
                                    fb: null,
                                    ctw: 0.0,
                                    pmt: null,
                                    cwc: 0,
                                    fstc: null,
                                    pcwc: 0,
                                    rwsp: null,
                                    hashr: "0:2;5;4#3;3;6#7;3;6#MV#3.0#MT#1#MG#0#",
                                    ml: ml,
                                    cs: cs,
                                    rl: perdajson.orl,
                                    sid: "1758600495495052800",
                                    psid: "1758600495495052800",
                                    st: 1,
                                    nst: 1,
                                    pf: 1,
                                    aw: 0.0,
                                    wid: 0,
                                    wt: "C",
                                    wk: "0_C",
                                    wbn: null,
                                    wfg: null,
                                    blb: saldoatual,
                                    blab: newbalance,
                                    bl: newbalance,
                                    tb: bet,
                                    tbb: bet,
                                    tw: 0.0,
                                    np: -bet,
                                    ocr: null,
                                    mr: null,
                                    ge: [1, 11],
                                },
                            },
                            err: null,
                        };
                        return [4 /*yield*/, allfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json), gamename)];
                    case 16:
                        _s.sent();
                        txnid = (0, uuid_1.v4)();
                        dataFormatada = (0, moment_1.default)().toISOString();
                        _f = (_e = apicontroller_1.default).callbackgame;
                        _l = {
                            agent_code: agent[0].agentcode,
                            agent_secret: agent[0].secretKey,
                            user_code: user[0].username,
                            user_balance: user[0].saldo,
                            user_total_credit: user[0].valorganho,
                            user_total_debit: user[0].valorapostado,
                            game_type: "slot"
                        };
                        _m = {
                            provider_code: "PGSOFT",
                            game_code: gamename
                        };
                        return [4 /*yield*/, gerarNumeroUnico()];
                    case 17: return [4 /*yield*/, _f.apply(_e, [(_l.slot = (_m.round_id = _s.sent(),
                                _m.type = "BASE",
                                _m.bet = bet,
                                _m.win = 0,
                                _m.txn_id = "".concat(txnid),
                                _m.txn_type = "debit_credit",
                                _m.is_buy = false,
                                _m.is_call = false,
                                _m.user_before_balance = user[0].saldo,
                                _m.user_after_balance = newbalance,
                                _m.agent_before_balance = 100,
                                _m.agent_after_balance = 100,
                                _m.created_at = dataFormatada,
                                _m),
                                _l)])];
                    case 18:
                        _s.sent();
                        res.send(json);
                        _s.label = 19;
                    case 19:
                        if (!(resultadospin.result === "ganho")) return [3 /*break*/, 30];
                        return [4 /*yield*/, linhaganhotiger_1.default.linhaganho(bet)];
                    case 20:
                        ganhojson = _s.sent();
                        return [4 /*yield*/, countrwsp(ganhojson.rwsp)];
                    case 21:
                        multplicador = _s.sent();
                        return [4 /*yield*/, lwchange(ganhojson.rwsp, ganhojson.lw, cs, ml)];
                    case 22:
                        _s.sent();
                        valorganho = cs * ml * multplicador;
                        newbalance = saldoatual + valorganho - bet;
                        return [4 /*yield*/, fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance)];
                    case 23:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizardebitado(token, bet)];
                    case 24:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizarapostado(token, bet)];
                    case 25:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizarganho(token, valorganho)];
                    case 26:
                        _s.sent();
                        json = {
                            dt: {
                                si: {
                                    wc: 17,
                                    ist: ganhojson.ist,
                                    itw: false,
                                    fws: 0,
                                    wp: ganhojson.wp,
                                    orl: ganhojson.orl,
                                    lw: ganhojson.lw,
                                    irs: false,
                                    gwt: bet,
                                    fb: null,
                                    ctw: valorganho,
                                    pmt: null,
                                    cwc: bet,
                                    fstc: null,
                                    pcwc: bet,
                                    rwsp: ganhojson.rwsp,
                                    hashr: "0:6;4;6#6;4;6#6;4;4#MV#3.0#MT#1#MG#0#",
                                    ml: ml,
                                    cs: cs,
                                    rl: ganhojson.orl,
                                    sid: "1757973319175306752",
                                    psid: "1757973319175306752",
                                    st: 1,
                                    nst: 1,
                                    pf: 1,
                                    aw: valorganho,
                                    wid: 0,
                                    wt: "C",
                                    wk: "0_C",
                                    wbn: null,
                                    wfg: null,
                                    blb: saldoatual,
                                    blab: newbalance,
                                    bl: newbalance,
                                    tb: bet,
                                    tbb: bet,
                                    tw: valorganho,
                                    np: bet,
                                    ocr: null,
                                    mr: null,
                                    ge: [1, 11],
                                },
                            },
                            err: null,
                        };
                        return [4 /*yield*/, allfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json), gamename)];
                    case 27:
                        _s.sent();
                        txnid = (0, uuid_1.v4)();
                        dataFormatada = (0, moment_1.default)().toISOString();
                        _h = (_g = apicontroller_1.default).callbackgame;
                        _o = {
                            agent_code: agent[0].agentcode,
                            agent_secret: agent[0].secretKey,
                            user_code: user[0].username,
                            user_balance: user[0].saldo,
                            user_total_credit: user[0].valorganho,
                            user_total_debit: user[0].valorapostado,
                            game_type: "slot"
                        };
                        _p = {
                            provider_code: "PGSOFT",
                            game_code: gamename
                        };
                        return [4 /*yield*/, gerarNumeroUnico()];
                    case 28: return [4 /*yield*/, _h.apply(_g, [(_o.slot = (_p.round_id = _s.sent(),
                                _p.type = "BASE",
                                _p.bet = bet,
                                _p.win = Number(valorganho),
                                _p.txn_id = "".concat(txnid),
                                _p.txn_type = "debit_credit",
                                _p.is_buy = false,
                                _p.is_call = false,
                                _p.user_before_balance = user[0].saldo,
                                _p.user_after_balance = newbalance,
                                _p.agent_before_balance = 100,
                                _p.agent_after_balance = 100,
                                _p.created_at = dataFormatada,
                                _p),
                                _o)])];
                    case 29:
                        _s.sent();
                        res.send(json);
                        _s.label = 30;
                    case 30:
                        if (!(resultadospin.result === "bonus" && resultadospin.gamecode === "fortune-tiger")) return [3 /*break*/, 48];
                        return [4 /*yield*/, linhabonustiger_1.default.linhacarta(resultadospin.json)];
                    case 31:
                        cartajson = _s.sent();
                        return [4 /*yield*/, allfunctions_1.default.getcallbyid(resultadospin.idcall)];
                    case 32:
                        call = _s.sent();
                        if (!(call[0].steps === null && call[0].status === "pending")) return [3 /*break*/, 34];
                        steps = Object.keys(cartajson).length - 1;
                        return [4 /*yield*/, allfunctions_1.default.updatestepscall(resultadospin.idcall, steps)];
                    case 33:
                        _s.sent();
                        _s.label = 34;
                    case 34: return [4 /*yield*/, allfunctions_1.default.getcallbyid(resultadospin.idcall)];
                    case 35:
                        calltwo = _s.sent();
                        if (!(calltwo[0].steps === 0)) return [3 /*break*/, 46];
                        return [4 /*yield*/, countrwsp(cartajson[calltwo[0].steps].rwsp)];
                    case 36:
                        multplicador = _s.sent();
                        return [4 /*yield*/, lwchange(cartajson[calltwo[0].steps].rwsp, cartajson[calltwo[0].steps].lw, cs, ml)];
                    case 37:
                        _s.sent();
                        valorganho = cs * ml * multplicador;
                        if (cartajson[calltwo[0].steps].completed === true) {
                            valorganho = cs * ml * multplicador * 10;
                        }
                        newbalance = saldoatual + valorganho - bet;
                        return [4 /*yield*/, fortunetigerfunctions_1.default.attsaldobyatk(token, newbalance)];
                    case 38:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizardebitado(token, bet)];
                    case 39:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizarapostado(token, bet)];
                    case 40:
                        _s.sent();
                        return [4 /*yield*/, fortunetigerfunctions_1.default.atualizarganho(token, valorganho)];
                    case 41:
                        _s.sent();
                        json_1 = {
                            dt: {
                                si: {
                                    wc: 0,
                                    ist: cartajson[calltwo[0].steps].ist,
                                    itw: cartajson[calltwo[0].steps].itw,
                                    fws: cartajson[calltwo[0].steps].fws,
                                    wp: cartajson[calltwo[0].steps].wp,
                                    orl: cartajson[calltwo[0].steps].orl,
                                    lw: cartajson[calltwo[0].steps].lw,
                                    irs: cartajson[calltwo[0].steps].irs,
                                    gwt: 3,
                                    fb: null,
                                    ctw: valorganho,
                                    pmt: null,
                                    cwc: 1,
                                    fstc: { "4": 2 },
                                    pcwc: 0,
                                    rwsp: cartajson[calltwo[0].steps].rwsp,
                                    hashr: "2:7;7;7#7;7;7#7;7;7#R#7#011121#MV#0#MT#1#R#7#001020#MV#0#MT#1#R#7#021222#MV#0#MT#1#R#7#001122#MV#0#MT#1#R#7#021120#MV#0#MT#1#MG#90.0#",
                                    ml: cs,
                                    cs: ml,
                                    rl: cartajson[calltwo[0].steps].rl,
                                    sid: "1761174298456686080",
                                    psid: "1761174260091387392",
                                    st: 4,
                                    nst: 1,
                                    pf: 1,
                                    aw: valorganho,
                                    wid: 0,
                                    wt: "C",
                                    wk: "0_C",
                                    wbn: null,
                                    wfg: null,
                                    blb: saldoatual,
                                    blab: newbalance,
                                    bl: newbalance,
                                    tb: 0.0,
                                    tbb: bet,
                                    tw: valorganho,
                                    np: valorganho,
                                    ocr: null,
                                    mr: null,
                                    ge: [1, 11],
                                },
                            },
                            err: null,
                        };
                        return [4 /*yield*/, allfunctions_1.default.savejsonspin(user[0].id, JSON.stringify(json_1), gamename)];
                    case 42:
                        _s.sent();
                        return [4 /*yield*/, allfunctions_1.default.completecall(calltwo[0].id)];
                    case 43:
                        _s.sent();
                        txnid = (0, uuid_1.v4)();
                        dataFormatada = (0, moment_1.default)().toISOString();
                        _k = (_j = apicontroller_1.default).callbackgame;
                        _q = {
                            agent_code: agent[0].agentcode,
                            agent_secret: agent[0].secretKey,
                            user_code: user[0].username,
                            user_balance: user[0].saldo,
                            user_total_credit: user[0].valorganho,
                            user_total_debit: user[0].valorapostado,
                            game_type: "slot"
                        };
                        _r = {
                            provider_code: "PGSOFT",
                            game_code: gamename
                        };
                        return [4 /*yield*/, gerarNumeroUnico()];
                    case 44: return [4 /*yield*/, _k.apply(_j, [(_q.slot = (_r.round_id = _s.sent(),
                                _r.type = "BASE",
                                _r.bet = bet,
                                _r.win = valorganho,
                                _r.txn_id = "".concat(txnid),
                                _r.txn_type = "debit_credit",
                                _r.is_buy = false,
                                _r.is_call = true,
                                _r.user_before_balance = user[0].saldo,
                                _r.user_after_balance = newbalance,
                                _r.agent_before_balance = 100,
                                _r.agent_after_balance = 100,
                                _r.created_at = dataFormatada,
                                _r),
                                _q)])];
                    case 45:
                        _s.sent();
                        res.send(json_1);
                        return [2 /*return*/, false];
                    case 46: return [4 /*yield*/, allfunctions_1.default.subtrairstepscall(resultadospin.idcall)];
                    case 47:
                        _s.sent();
                        json = {
                            dt: {
                                si: {
                                    wc: 103,
                                    ist: cartajson[calltwo[0].steps].ist,
                                    itw: cartajson[calltwo[0].steps].itw,
                                    fws: cartajson[calltwo[0].steps].fws,
                                    wp: cartajson[calltwo[0].steps].wp,
                                    orl: cartajson[calltwo[0].steps].orl,
                                    lw: cartajson[calltwo[0].steps].lw,
                                    irs: cartajson[calltwo[0].steps].irs,
                                    gwt: -1,
                                    fb: null,
                                    ctw: 0.0,
                                    pmt: null,
                                    cwc: 0,
                                    fstc: null,
                                    pcwc: 0,
                                    rwsp: cartajson[calltwo[0].steps].rwsp,
                                    hashr: "0:6;3;7#4;7;7#7;4;7#R#7#021120#MV#3.0#MT#1#MG#0#",
                                    ml: cs,
                                    cs: ml,
                                    rl: cartajson[calltwo[0].steps].rl,
                                    sid: "1761174260091387392",
                                    psid: "1761174260091387392",
                                    st: 1,
                                    nst: 4,
                                    pf: 1,
                                    aw: 0.0,
                                    wid: 0,
                                    wt: "C",
                                    wk: "0_C",
                                    wbn: null,
                                    wfg: null,
                                    blb: saldoatual,
                                    blab: saldoatual,
                                    bl: saldoatual,
                                    tb: bet,
                                    tbb: bet,
                                    tw: 0.0,
                                    np: -bet,
                                    ocr: null,
                                    mr: null,
                                    ge: [4, 11],
                                },
                            },
                            err: null,
                        };
                        res.send(json);
                        _s.label = 48;
                    case 48: return [3 /*break*/, 50];
                    case 49:
                        error_2 = _s.sent();
                        logger_1.default.error(error_2);
                        return [3 /*break*/, 50];
                    case 50: return [2 /*return*/];
                }
            });
        });
    },
};
