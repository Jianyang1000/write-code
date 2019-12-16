import * as https from 'https';
import * as querystring from 'querystring';
import { appKey, secretKey } from './private'
const uuidv1 = require('uuid/v1');
const sha256 = require('sha256')
const utf8 = require('utf8');
//  q
//  from
//  to
//  appKey
//  salt
//  sign
//  signType
//  curtime
//  ext
//  voice

type ErrorMap = {
    [key: string]: string
}
const errorMap: ErrorMap = {
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
}



export const translate = (word: string) => {
    let input: string
    let from, to
    const salt = uuidv1();
    const curtime = Math.round(new Date().getTime() / 1000)



    if (/[a-zA-Z]/.test(word[0])) {
        // 英译为中
        from = 'EN';
        to = 'zh-CHS';
    } else {
        // 中译为英
        from = 'auto';
        to = 'EN';
    }
    if (word.length <= 20) {
        input = word
    }
    else {
        input = word.substring(0, 10) + word.length + word.substring(word.length - 10)
    }
    // 发请求的时候会自动把查询字符串变成utf8编码，但是input在发请求之前 通过sha256给转化了，所以如果不utf8编码一下的话就会签名认证失败
    input = utf8.encode(input)
    const sign = sha256(appKey + input + salt + curtime + secretKey)
    const query = querystring.stringify({
        from, to, appKey, salt, sign, signType: 'v3', curtime, q: word
    })
    
    const options = {
        hostname: 'openapi.youdao.com',
        port: 443,
        method: 'GET',
        path: '/api?' + query,
    };

    const reqest = https.request(options, (response) => {
        
        let chunks: Buffer[] = [];
        response.on('data', (chunk) => {
            chunks.push(chunk);
        });
        response.on('end', () => {
            const string = Buffer.concat(chunks).toString();
            const object = JSON.parse(string);
            if (+object.errorCode) {
                console.error(errorMap[object.errorCode] || object.error_msg);
                process.exit(2);
            }
            else {
                console.log("translation:", object.translation[0])
                console.log("explains:", object.basic.explains)

                process.exit(0);
            }
        })
    });

    reqest.on('error', (e) => {
        console.log("error")
    });
    reqest.end();
}
