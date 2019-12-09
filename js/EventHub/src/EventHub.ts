class EventHub {
    private cache = {};
    on(eventName: string, fn: (data:unknown) => void) {
        this.cache[eventName] = this.cache[eventName] || []
        this.cache[eventName].push(fn)
    }
    emmit(eventName: string, data?: unknown) {
        (this.cache[eventName] || []).forEach(fn => {
            fn.call(undefined, data)
        })
    }
    off(eventName: string, fn: (data:unknown) => void) {
        if (this.cache[eventName] === undefined) return
        this.cache[eventName] = this.cache[eventName].filter(func => func !== fn)
        /*
            
            let index = indexOf(this.cache[eventName],fn)
            if(index == -1) return
            this.cache[eventName].splice(index,1)
        */
    }
}

export default EventHub


/**
 * 帮助函数indexOf
 * @param array 
 * @param item 
 */

function indexOf(array, item) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
        array[i] === item
        index = i
    }
    return index
}