const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const deepClone = require('../src/index')
const assert = chai.assert;

describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone)
    })
    it('能够复制基本类型', () => {
        const n = 1
        const n2 = deepClone(n)
        assert(n === n2)
        const s = "123456"
        const s2 = deepClone(s)
        assert(s === s2)
        const b = true
        const b2 = deepClone(b)
        assert(b === b2)
        const u = undefined
        const u2 = deepClone(u)
        assert(u === u2)
        const empty = null
        const empty2 = deepClone(empty)
        assert(empty === empty2)
        const sym = Symbol()
        const sym2 = deepClone(sym)
        assert(sym === sym2)
    })
    describe('对象', () => {
        it('能够复制普通对象', () => {
            const obj = { name: 'jianyang', age: '22',other:{name:'jianyang'}}
            const obj2 = deepClone(obj)
            assert(obj !== obj2)
            assert(obj.name === obj2.name)
        })
        it('能够复制数组',() => {
            const array = [1,2,3,{name:'jianyang'}]
            array.xxx = {name: 'jianyang',age: 22}
            const array2 = deepClone(array)
            assert(array2 instanceof Array)
            assert(array !== array2)
            assert(array[3] !== array2[3])
            assert(array[0] = array2[0])
        })
        it('能够复制函数',() => {
            const fn = function(){
                
            }
            fn.xxx = {name:'jianyang',age:18}
            const fn2 = deepClone(fn)
            assert(fn !== fn2)
            assert(fn.xxx !== fn2.xxx)
            assert(fn.xxx.name === fn2.xxx.name)
        })
        it('能复制环',() => {
            const obj = {name:'jianyang',age:22}
            obj.self = obj
            const obj2 = deepClone(obj)
            assert(obj !== obj2)
            assert(obj.name === obj2.name)
        })
        it('爆栈',() => {
            const a = {child:null}
            let b = a
            for(let i = 0;i < 5000;i++){
                b.child = {
                    child: null
                }
                b = b.child
            }
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.child !== a2.child)
        })
        it('能复制时间',() => {
            const obj = {name:'jianyang',time:new Date()}
            const obj2 = deepClone(obj)
            assert(obj !== obj2)
            assert(obj.time !== obj2.time)
            // getTime 获取时间戳
            assert(obj.time.getTime() === obj2.time.getTime())
        })
        it('能复制正则',() => {
            const a = new RegExp("hi\\d+", "gi");
            const b = deepClone(a)
            assert(a !== b)
            assert(a.source === b.source)
            assert(a.flags === b.flags)
        })
        it('自动跳过原型属性',() => {
            const a = Object.create({name:'jianyang'})
            const b = deepClone(a)
            assert(a !== b)
            assert.isFalse("name" in b)
        })
    })
})