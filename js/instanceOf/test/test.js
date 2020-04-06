const chai = require("chai");
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai);

const assert = chai.assert;
const instanceOf = require('../src/index')


describe('instanceof',() => {
    it('检测',() => {
        const Person = function(name,age){
            this.name = name
            this.age = age
        }
        const Animal = function(name,age){
            
        }
        let obj = new Person()
        
        
        assert.isTrue(instanceOf(obj,Person))
        assert.isFalse(instanceOf(obj,Animal))
    })
})