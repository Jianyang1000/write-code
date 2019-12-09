import EventHub from '../src/EventHub'

const test1 = (message:string) => {
    const eventHub = new EventHub()
    console.log(message)
    console.assert(EventHub instanceof Object === true, 'eventHub是一个对象')
}
    

const test2 = (message:string) => {
    const eventHub = new EventHub()
    let called = false
    eventHub.on('xxx', (y) => {
        called = true
        console.assert(y === '每天多笑笑哈哈哈哈哈', '测试订阅和发布奥')
    })

    eventHub.emmit('xxx', '每天多笑笑哈哈哈哈哈')
    console.log(message)
    setTimeout(() => {
        console.assert(called === true)
    },1000)
    
}

const test3 = (message:string) => {
    const eventHub = new EventHub()
    const fn = () => {
        called = true
    }
    let called = false
    eventHub.on('yyy', fn)
    eventHub.off('yyy', fn)

    eventHub.emmit('yyy')
    console.log(message)
    setTimeout(() => {
        console.assert(called === false)
    },1000)
}

test1("测试eventHub可以创建对象对象")
test2("测试发布订阅模式")
test3("测试off")