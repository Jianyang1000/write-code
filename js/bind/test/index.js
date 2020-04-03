const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const bind2 = require('../src/index')
Function.prototype.bind2 = bind2
const assert = chai.assert;

/**
 *     bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 */



describe('bind',() => {
    it('能返回this',() => {
        const fn = function(){
            return this
        }
        var fn2 = fn.bind2({name:'jianyang'})
        assert(fn2().name === 'jianyang')
    })
    it('能通过bind传参数并返回值',() => {
        //  这里不能用箭头函数，因为箭头函数不能设置this值，箭头函数的this是在定义的时候就确定了的
        const fn = function(a,b){
            return [this,a,b]
        }
        var fn2 = fn.bind2({name:'jianyang'},11,12)
        assert(fn2()[0].name === 'jianyang')
        assert(fn2()[1] === 11)
        assert(fn2()[2] === 12)
    })
    it('能通过bind返回的函数传值',() => {
        const fn = function(a,b){
            return [this,a,b]
        }
        const fn2 = fn.bind2({name:'jianyang'},11)
        assert(fn2(12)[0].name === 'jianyang')
        assert(fn2(12)[1] === 11)
        assert(fn2(12)[2] === 12)
    })
    it('能通过new来绑定值',() => {
        const fn= function(p1,p2){
            this.p1 = p1
            this.p2 = p2
        }
        const fn2 = fn.bind2(undefined,123,456)
        const obj = new fn2()
        assert(obj.p1 === 123)
        assert(obj.p2 === 456)
    })
    it('new的时候绑定值，并且原型链上的属性也能绑定',() => {
        const fn = function(p1,p2){
            this.p1 = p1
            this.p2 = p2
        }
        fn.prototype.sayhi = () => {return "hi jianyang!"}
        const fn2 = fn.bind2(undefined,123,456)
        obj = new fn2()
        assert(obj.p1 === 123)
        assert(obj.p2 === 456)
        assert(obj.sayhi() === "hi jianyang!")
    })
})