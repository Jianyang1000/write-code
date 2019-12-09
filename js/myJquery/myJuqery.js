



windows.$ = function (selector) {
    elements = document.querySelectorAll(selector)

    elements.on = function (eventType, fn) {
        for (let i = 0; i < elements.length; i++) {
            var element = elements[i]
            if (element.addEventListener) {
                element.addEventListener(eventType, fn)
            }
            else if (element.attachEventListener) {
                element.attachEventListener('on' + eventType, fn)
            }
            else {
                element.on(eventType, fn)
            }
        }
        return elements
    }
    elements.addClass = function(className){
        for(let i = 0;i < elements.length;i++)
        {
            var element = elements[i]
            if(element.classList)
            {
                element.classList.add(className)    
            }
            else{
                element[i].className = element[i].className + ' ' + className
            }
        }
        return elements
    }
    elements.removeClass = function(className){
        for(let i = 0;i < elements.length;i++) {
            var element = elements[i]
            if(element.classList)
            {
                element.classList.remove(className)
            } else {
                /* 不会写 需要用到正则表达式*/
            }
        }
        return elements
    }
    elements.text = function(text){
        if(arguments.length === 0) {
            var result = []
            for(let i = 0;i < elements.length;i++) {
                var element = elements[i]
                result.push(element.innerText)
            }
            return result
        } else {
            for(let i = 0;i < elements.length;i++) {
                var element = elements[i]
                if(element.innerText !== undefined) { element.innerText = text}
                else if(element.textContent !== undefined) { element.textContent = text}
            }
            return elements
        }
    }

    return elements
}


