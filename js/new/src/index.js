

function myNew(Fn,...args){
    const obj = {}
    obj.__proto__ = Fn.prototype
    const result = Fn.call(obj,...args)
    return typeof result === 'object' ? result : obj  
}


module.exports = myNew