import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Promise2 from "../src/index"
chai.use(sinonChai);
const assert = chai.assert;



describe('Promise', () => {
    it('Promise是一个类', () => {
        assert.isFunction(Promise2)
        assert.isObject(Promise2.prototype);
    })
    it('new Promise()接收的如果不是一个函数就报错', () => {
        assert.throw(() => {
            new Promise2(null)
        })
    })
    it('new Promise(fn)会生成一个对象,对象会带有then方法', () => {
        const promise = new Promise2(() => { })
        assert.isFunction(promise.then)
    })
    it("new Promise(fn) 中的 fn 立即执行", () => {
        let fn = sinon.fake();
        new Promise(fn);
        assert(fn.called);
    });
    it("new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数", () => {
        new Promise((resolve, reject) => {
            assert.isFunction(resolve);
            assert.isFunction(reject);
        });
    });
    it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", done => {
        let success = sinon.fake()
        assert.isFalse(success.called)
        const promise = new Promise2((resolve, reject) => {
            resolve()
            // 回调回来之后再进行比较，时间上就绝对没有问题了
            setTimeout(() => {
                assert.isTrue(success.called)
                done()
            })
        })
        promise.then(success)
    })
    it("promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行", done => {
        const fail = sinon.fake();
        const promise = new Promise2((resolve, reject) => {
            assert.isFalse(fail.called);
            reject();
            setTimeout(() => {
                assert.isTrue(fail.called);
                done();
            });
        });
        // @ts-ignore
        promise.then(null, fail);
    });
    it("2.2.1 onFulfilled和onRejected都是可选的参数：", () => {
        const promise = new Promise2(resolve => {
            resolve();
        });
        // @ts-ignore
        promise.then(false, null);
        assert(1 === 1);
    });
    it("2.2.2 如果onFulfilled是函数", done => {
        const succeed = sinon.fake();
        const promise = new Promise2(resolve => {
            assert.isFalse(succeed.called);
            resolve(233);
            resolve(2333);
            setTimeout(() => {
                assert(promise.state === "fulfilled");
                assert.isTrue(succeed.calledOnce);
                assert(succeed.calledWith(233));
                done();
            }, 0);
        });
        promise.then(succeed);
    });
    it("2.2.3 如果onRejected是函数", done => {
        const fail = sinon.fake();
        const promise = new Promise2((resolve, reject) => {
            assert.isFalse(fail.called);
            reject(233);
            reject(2333);
            setTimeout(() => {
                assert(promise.state === "rejected");
                assert.isTrue(fail.calledOnce);
                assert(fail.calledWith(233));
                done();
            }, 0);
        });
        promise.then(null, fail);
    });
    it("2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数", done => {
        const succeed = sinon.fake();
        const promise = new Promise2(resolve => {
            resolve();
        });
        promise.then(succeed);
        assert.isFalse(succeed.called);
        setTimeout(() => {
            assert.isTrue(succeed.called);
            done();
        }, 0);
    });
    it("2.2.5 onFulfilled和onRejected必须被当做函数调用", done => {
        const promise = new Promise2(resolve => {
            resolve();
        });
        /* var array = []
        array.push(function(){console.log(this.toString())})
        array.push(function(){console.log(1234)})
        array[0]() === array[0].call(array) */
        promise.then(function xxx(){
            assert(this === undefined);
            done();
        },null);
    });
    it("2.2.6 then可以在同一个promise里被多次调用", done => {
        const promise = new Promise2(resolve => {
            resolve();
        });
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
        promise.then(callbacks[0]);
        promise.then(callbacks[1]);
        promise.then(callbacks[2]);
        setTimeout(() => {
            assert(callbacks[0].called);
            assert(callbacks[1].called);
            assert(callbacks[2].called);
            assert(callbacks[1].calledAfter(callbacks[0]));
            assert(callbacks[2].calledAfter(callbacks[1]));
            done();
        });
    });
    it("2.2.6.2 then可以在同一个promise里被多次调用", done => {
        const promise = new Promise2((resolve, reject) => {
            reject();
        });
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
        promise.then(null, callbacks[0]);
        promise.then(null, callbacks[1]);
        promise.then(null, callbacks[2]);
        setTimeout(() => {
            assert(callbacks[0].called);
            assert(callbacks[1].called);
            assert(callbacks[2].called);
            assert(callbacks[1].calledAfter(callbacks[0]));
            assert(callbacks[2].calledAfter(callbacks[1]));
            done();
        });
    });
    it("2.2.7 then必须返回一个Promise", () => {
        const promise = new Promise2((resolve, reject) => {
            resolve()
        });
        
        const promise2 = promise.then(() => {});
        assert.isTrue(promise2 instanceof Promise2)

    });
});
