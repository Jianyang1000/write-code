function bind(argThis,...args){
    var fn = this
    if (typeof fn !== "function") {
        throw new Error("bind 必须调用在函数身上");
    }
    function result(...args2){
        // 业务场景不一样吧!也可以做区分,当真的想基于result而不是result.prototype的时候可以用下面一种
        // isProtorypeOf是只在this上查找， instanceof 是在this的原型上查找
        return fn.call(result.prototype.isPrototypeOf(this) ? this : argThis,...args,...args2)
    }
    result.prototype = fn.prototype
    return result
}


// 兼容以前浏览器的代码
var slice = Array.prototype.slice;

function _bind(argThis)
{
    var fn = this
    if (typeof fn !== "function") {
        throw new Error("bind 必须调用在函数身上");
    }
    var args = slice.call(arguments,1)

    function result(){
        var args2 = slice.call(arguments,0)
        return fn.apply(argThis,args.concat(args2))
    }
    result.prototype = fn.prototype
    return result
}


(!Function.prototype.bind)
{
    Function.prototype.bind = bind
}


module.exports = bind