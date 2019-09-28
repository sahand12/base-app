"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var axios_1 = require("axios");
var niksms_config_1 = require("./niksms-config");
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.resolve('../../../../../.env') });
var _a = process.env, NIKSMS_USERNAME = _a.NIKSMS_USERNAME, NIKSMS_PASSWORD = _a.NIKSMS_PASSWORD, NIKSMS_SENDER_NUMBER = _a.NIKSMS_SENDER_NUMBER;
function send(request) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, responseMeaning, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, _sendOne(request)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    responseMeaning = data.Status && niksms_config_1.niksmsSendSmsResult[data.Status];
                    if (data.Status === 1) {
                        return [2 /*return*/, {
                                status: 'success',
                                providerGeneratedId: Array.isArray(data && data.NikIds) ? data.NikIds[0] : undefined,
                                raw: __assign(__assign({}, data), { meaning: responseMeaning })
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                status: 'error',
                                raw: __assign(__assign({}, data), { meaning: responseMeaning })
                            }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            status: 'error',
                            error: error_1
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.send = send;
send.provider = 'SMS_NIKSMS';
function _sendOne(request) {
    return __awaiter(this, void 0, void 0, function () {
        var to, text, textId, sendOn;
        return __generator(this, function (_a) {
            to = request.to, text = request.text, textId = request.textId, sendOn = request.sendOn;
            return [2 /*return*/, axios_1["default"]({
                    timeout: 10000,
                    url: niksms_config_1.niksmsEndpoints.SEND_ONE,
                    method: 'post',
                    responseType: 'json',
                    data: __assign(__assign({ username: NIKSMS_USERNAME, password: NIKSMS_PASSWORD, senderNumber: NIKSMS_SENDER_NUMBER, sendType: 1, message: text, numbers: to }, (textId !== undefined ? { yourMessageId: textId } : null)), (sendOn !== undefined ? { sendOn: sendOn } : null))
                })];
        });
    });
}
function checkDelivery(providerGeneratedId) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]({
                        timeout: 10e4,
                        url: niksms_config_1.niksmsEndpoints.DELIVERY_STATUS,
                        method: 'post',
                        data: {
                            username: NIKSMS_USERNAME,
                            password: NIKSMS_PASSWORD,
                            nikids: providerGeneratedId
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
