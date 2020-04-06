function instanceOf(object,constructor){
    const basePrototype = constructor.prototype
    let findPrototype = object.__proto__
    
    while(findPrototype !== null){
        if(findPrototype === basePrototype){
            return true
        }else {
            findPrototype = findPrototype.__proto__
        }
    }
    return false
}

module.exports = instanceOf