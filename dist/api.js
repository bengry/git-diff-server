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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express_1 = __importDefault(require("express"));
var simple_git_1 = __importDefault(require("simple-git"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var app = (0, express_1.default)();
exports.api = app;
app.post('/diff', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, oldContent, newContent, tempDir, oldPath, newPath, diff;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = (_b = req.body) !== null && _b !== void 0 ? _b : {}, oldContent = _a.old, newContent = _a.new;
                if (!oldContent || !newContent) {
                    return [2 /*return*/, res.status(400).json({ error: 'invalid parameters' }).end()];
                }
                return [4 /*yield*/, fs_1.promises.mkdtemp((0, uuid_1.v4)())];
            case 1:
                tempDir = _c.sent();
                oldPath = path_1.default.join(tempDir, 'old.txt');
                newPath = path_1.default.join(tempDir, 'new.txt');
                return [4 /*yield*/, Promise.all([
                        fs_1.promises.writeFile(oldPath, oldContent),
                        fs_1.promises.writeFile(newPath, newContent)
                    ])];
            case 2:
                _c.sent();
                return [4 /*yield*/, (0, simple_git_1.default)().diff(['-U1', oldPath, newPath])];
            case 3:
                diff = _c.sent();
                res.json({ data: diff }).end();
                return [4 /*yield*/, fs_1.promises.rmdir(tempDir)];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=api.js.map