let 返回队列 = []
let 请求队列 = []
function 叫号(){
    if(返回队列.length !== 0)
    {
        var 新返回的 = 返回队列[返回队列.length - 1][0]
        var 返回的值 = 返回队列[返回队列.length - 1][1]
    }
    else{
        return
    }
    
    if(新返回的 === 请求队列[0][0])
    {
        请求队列[0][1].call(null,返回的值)
        请求队列.shift()
        返回队列.pop()
        叫号()
    }
}

ajax1 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("字符串A")
        },3000)
    })
    
}

ajax2 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("字符串B")
        },
        5000)
    })
}


button1.addEventListener('click',() => {
    let n = Math.random() * 10
    ajax1().then((s) => {
        返回队列.push([n,s])
        叫号()
    })
    请求队列.push([n,(s) => {
        input1.value = s
        console.log(s)
    }])
})


button2.addEventListener('click',() => {
    let n = Math.random() * 10
    ajax2().then((s) => {
        返回队列.push([n,s])
        叫号()
    })
    请求队列.push([n,(s) => {
        input1.value = s
        console.log(s)
    }])
})