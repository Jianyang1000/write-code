const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs,_fs)


let mocks = {}

fs.setMock = (path,error,data) => {
    mocks[path] = [error,data]
}




fs.readFile = (path,options,callback) => {
    if(callback === undefined) callback = options
    if(path in mocks)
    {
        callback(mocks[path][0],mocks[path][1])
    }else {
        _fs.readFile(path,options,callback)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path,fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path,data,options,callback) => {
    if(callback === undefined) callback = options
    if(path in writeMocks)
    {
        writeMocks[path](path,data,options,callback)
    }else {
        _fs.writeFile(path,data,options,callback)
    }
}


module.exports = fs;