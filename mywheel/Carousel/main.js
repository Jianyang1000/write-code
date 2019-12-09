let tools = document.querySelectorAll('.tool > li')
let banner = document.querySelector('.banner>ol')
let container = document.querySelector('.container')

for (let i = 0; i < tools.length; i++) {
    tools[i].addEventListener('click', function (e) {
        go(i)
    })
}

container.addEventListener('mouseenter', function () {
    window.clearInterval(timer)
})

container.addEventListener('mouseleave', function () {
    autoPlay()
})

let currentIndex = 0

function fn() {
    var lis = banner.querySelectorAll('li')
    if(lis.length === 4)
    {
        lis[tools.length].remove()
        //动画结束之后是先执行这个函数里的代码，然后再重新执行autoplay，所以需要执行判断动画结束后的代码，判断动画结束后currentIndex为1，所以这时currentIndex需要赋值为-1，再经过autoPlay+1刚好currentIndex为0
        currentIndex = -1
        banner.style.transition = 'none'
        banner.style.transform = 'translateX(0px)'
    }
}

function autoPlay() {
    timer = window.setInterval(function () {
        currentIndex += 1
        //新添加一个li，并给banner添加动画结束事件
        if (currentIndex === tools.length) {
            let li = banner.querySelectorAll('li')[0].cloneNode(true)
            banner.appendChild(li)
            banner.addEventListener('transitionend',fn)
        }

        //这个是判断动画结束后，重新到第一张图片的时候立即加上动画，并停止监听banner的动画结束事件
        if(currentIndex === 0) {
            banner.style.transition = 'transform 0.5s'
            currentIndex++   
            banner.removeEventListener('transitionend',fn)
        }
        go(currentIndex)

    }, 2000)
}

function go(index) {
    let width = parseInt(window.getComputedStyle(banner).width)
    banner.style.transform = 'translateX(' + -index * width + 'px)'
}

autoPlay()