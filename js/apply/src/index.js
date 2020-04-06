function apply2(argThis){
    var argThis = argThis || global || window
    argThis.fn = this
    
    const args = arguments[1] === undefined ? [] : arguments[1]
    var result = argThis.fn(...args)

    delete argThis.fn
    return result
}

module.exports = apply2