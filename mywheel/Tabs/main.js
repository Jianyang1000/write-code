
let tabs = document.querySelectorAll('.tabs>li')
let tabs_content = document.querySelectorAll('.tabs-content > li')
tabs[0].addEventListener('click',function(e){
    let li = e.currentTarget
    li.classList.add('active')
    let sibling = li.nextSibling

    while(sibling.nodeType === 3)
    {
        sibling = sibling.nextSibling
    }
    sibling.classList.remove('active')
    tabs_content[0].classList.add('active')
    tabs_content[1].classList.remove('active')
})

tabs[1].addEventListener('click',function(e){
    let li = e.currentTarget
    li.classList.add('active')
    let sibling = li.previousSibling
    while(sibling.nodeType === 3)
    {
        sibling = sibling.previousSibling
    }
    sibling.classList.remove('active')
    tabs_content[1].classList.add('active')
    tabs_content[0].classList.remove('active')
})

