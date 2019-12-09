//轮播图
let carouse = document.querySelector('.carouselImage')
let leftArrow = document.querySelector('.leftArrow')
let rightArrow = document.querySelector('.rightArrow')
let lists = document.querySelectorAll('.carouselTool li button')
let currentIndex = 0
let carousel = document.querySelector('.carouselImage')
let carouselWrap = document.querySelector('.carousel')
let carouselLi = document.querySelector('.carouselImage>li')

leftArrow.addEventListener('click', function (e) {

    let tempIndex = currentIndex
    tempIndex--
    if (tempIndex === -1) {
        tempIndex = 2
    }
    go(tempIndex)
    currentIndex = tempIndex
})


rightArrow.addEventListener('click', function (e) {
    let tempIndex = currentIndex
    //防止快速点击
    
    //如果是刚结束动画
    if (tempIndex === -1) {
        carousel.style.transition = 'transform 0.5s'
        carousel.removeEventListener('transitionend', fn)
        tempIndex = 1
        currentIndex = 0
    }
    //正常
    else {
        tempIndex++
    }
    if (tempIndex === lists.length) {
        let li = carouselLi.cloneNode(true)
        carousel.appendChild(li)
        carousel.addEventListener('transitionend', fn)
    }

    go(tempIndex)
    currentIndex = tempIndex

    console.log(1)
})

carouselWrap.addEventListener('mouseenter', function () {
    clearInterval(timer)
})

carouselWrap.addEventListener('mouseleave', function () {
    autoPlay()
})

for (let i = 0; i < lists.length; i++) {
    lists[i].addEventListener('click', function (e) {

        go(i)
    })
}


function go(index) {

    let width = parseInt(window.getComputedStyle(carouselLi).width)
    carousel.style.transform = 'translateX(' + -index * width + 'px)'
    if (index === lists.length) {
        index = 0
    }
    lists[index].classList.add('active')
    lists[currentIndex].classList.remove('active')
    currentIndex = index
}


function autoPlay() {
    timer = window.setInterval(function () {
        let tempIndex = currentIndex
        tempIndex += 1
        if (tempIndex === lists.length) {
            tempIndex = 0
        }

        go(tempIndex)
        currentIndex = tempIndex
    }, 10000)
}

function fn() {
    var lis = document.querySelectorAll('.carouselImage>li')
    if (lis.length === lists.length + 1) {
        lis[lists.length].remove()
        //动画结束之后是先执行这个函数里的代码，然后再重新执行autoplay，所以需要执行判断动画结束后的代码，判断动画结束后currentIndex为1，所以这时currentIndex需要赋值为-1，再经过autoPlay+1刚好currentIndex为0
        currentIndex = -1
        carousel.style.transition = 'none'
        carousel.style.transform = 'translateX(0px)'
    }
}

autoPlay()



// tabs组件

let tabsIndex = 0

let tabs = document.querySelectorAll('.newsSeletct li')
let tabsContent = document.querySelectorAll('.newsIntro>ul>li')
console.log(tabsContent)
console.log(tabs)
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
        tabs[tabsIndex].classList.remove('active')
        tabs[i].classList.add('active')
        tabsContent[tabsIndex].classList.remove('active')
        tabsContent[i].classList.add('active')
        tabsIndex = i
    })
}