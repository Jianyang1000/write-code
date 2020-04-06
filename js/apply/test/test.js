const chai = require("chai");
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai);

const assert = chai.assert;

const apply2 = require('../src/index')

Function.prototype.apply2 = apply2

describe('apply' ,() => {
    it('能调用函数',() => {
        const fn = function(){
            return 1
        }
        console.log('-----------',fn.apply2())
        assert(fn.apply2() === 1)
    })
    it('能传入this',() => {
        const fn = function(){
            return this
        }
        let obj = {name: 'jianyang'}
        assert(fn.apply2(obj) === obj)
    })
    it('能传入参数',() => {
        const fn = function(){
            return [this,arguments[0],arguments[1]]
        }
        let obj = {name: 'jianyang'}
        console.log(fn.apply2(obj,[1,2])[0])
        assert(fn.apply2(obj,[1,2])[0] === obj)
        assert(fn.apply2(obj,[1,2])[1] === 1)
        assert(fn.apply2(obj,[1,2])[2] === 2)
    })
})