"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
var querystring = __importStar(require("querystring"));
var private_1 = require("./private");
var uuidv1 = require('uuid/v1');
var sha256 = require('sha256');
var utf8 = require('utf8');
var errorMap = {
    101: "缺少必填的参数",
    102: "不支持的语言类型",
    103: "翻译文本过长",
    104: "不支持的API类型",
    105: "不支持的签名类型",
    106: "不支持的响应类型",
    107: "不支持的传输加密类型",
    108: "应用ID无效，注册账号，登录后台创建应用和实例并完成绑定，可获得应用ID和应用密钥等信息",
    109: "batchLog格式不正确",
    110: "无相关服务的有效实例",
    111: "开发者账号无效",
    113: "q不能为空",
    114: "不支持的图片传输方式",
    201: "解密失败，可能为DES,BASE64,URLDecode的错误",
    202: "签名检验失败",
    203: "访问IP地址不在可访问IP列表",
    205: "请求的接口与应用的平台类型不一致",
    206: "因为时间戳无效导致签名校验失败",
    207: "重放请求",
};
exports.translate = function (word) {
    var input;
    var from, to;
    var salt = uuidv1();
    var curtime = Math.round(new Date().getTime() / 1000);
    if (/[a-zA-Z]/.test(word[0])) {
        // 英译为中
        from = 'EN';
        to = 'zh-CHS';
    }
    else {
        // 中译为英
        from = 'zh-CHS';
        to = 'EN';
        word = utf8.encode(word);
    }
    if (word.length <= 20) {
        input = word;
    }
    else {
        input = word.substring(0, 10) + word.length + word.substring(word.length - 10);
    }
    var sign = sha256(private_1.appKey + input + salt + curtime + private_1.secretKey);
    var query = querystring.stringify({
        from: from, to: to, appKey: private_1.appKey, salt: salt, sign: sign, signType: 'v3', curtime: curtime, q: word
    });
    var options = {
        hostname: 'openapi.youdao.com',
        port: 443,
        method: 'GET',
        path: '/api?' + query,
    };
    var reqest = https.request(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });
        response.on('end', function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            if (+object.errorCode) {
                console.error(errorMap[object.errorCode] || object.error_msg);
                process.exit(2);
            }
            else {
                console.log("translation:", object.translation[0]);
                console.log("explains:", object.basic.explains);
                process.exit(0);
            }
        });
    });
    reqest.on('error', function (e) {
        console.log("error");
    });
    reqest.end();
};
