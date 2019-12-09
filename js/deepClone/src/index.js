cache = []
function deepClone(source) {

    let cachedDist = findCache(source);
    if (cachedDist) {
        // 知道为什么要返回cachedDist，但是不知道返回source为什么还会形成环
        return cachedDist;
    }
    if (source instanceof Object) {
        let dist
        if (source instanceof Array) {
            dist = new Array()
            for (let i = 0; i < source.length; i++) {
                dist[i] = deepClone(source[i])
            }
        }
        else if (source instanceof Function) {
            dist = function () {
                //是执行了一下source函数，不是复制source函数
                return source.apply(this, ...arguments)
            }
        }
        else if (source instanceof Date) {
            dist = new Date(source)
        }
        else if (source instanceof RegExp) {
            dist = new RegExp(source.source, source.flags);
        }
        else {
            dist = new Object()
        }
        cache.push([source,dist])
        for (key in source) {
            if(source.hasOwnProperty(key))
            {
                dist[key] = deepClone(source[key])
            }
        }
        return dist
    }
    return source
}

function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1];
        }
    }
    return undefined;
}

module.exports = deepClone