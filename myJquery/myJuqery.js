



windows.$ = function (selector) {
    elements = document.querySelectorAll(selector)
    elements.on = function(eventType,fn){
        for(let i = 0;i < elements.length;i++)
        {
            var element = elements[i]
            if(element.addEventListener)
            {
                element.addEventListener(eventType,fn)
            }
            else if(element.attachEventListener)
            {
                element.attachEventListener('on' + eventType,fn)
            }
            else {
                element.on(eventType,fn)
            }
        }
        return elements
    }

    return elements
}


