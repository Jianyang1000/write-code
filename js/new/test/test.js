const chai = require("chai");
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai);

const assert = chai.assert;
const myNew = require('../src/index')


describe('new',() => {
    it('能创建一个对象',() => {
        const Person = function(name,age){
            this.name= name
            this.age = age
        }
        let result = myNew(Person)
        assert(typeof result === 'object')
    })
    it('执行构造函数',() => {
        let obj = {name: 'haha'}
        const Person = function(name,age){
            this.name= name
            this.age = age
            return obj
        }
        let result = myNew(Person)
        assert(result === obj)
    })
    it('对象的原型是构造函数的原型',() => {
        const Person = function(name,age){
            this.name= name
            this.age = age
        }
        let result = myNew(Person,'jianyang',23)
        assert(result instanceof Person)
        assert(result.__proto__ === Person.prototype)
    })
    it('返回this',() => {
        const Person = function(name,age){
            this.name= name
            this.age = age
        }
        let result = myNew(Person,'jianyang',23)
        assert(result.name === 'jianyang')
        assert(result.age === 23)
    })
})