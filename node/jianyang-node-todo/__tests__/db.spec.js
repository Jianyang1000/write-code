const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',() => {
    it('can read',async () => {
        const data = [{title:'jianyang',done:false}]
        fs.setMock('/xxx',null,JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('can write',async () => {
        let fakeFile
        fs.setWriteFileMock('/yyy',(path,data,options,callback) => {
            fakeFile = data
            callback(null)
        })
        let list = JSON.stringify([{title:'jianyang',age:22}])
        await db.write(list,'/yyy')
        expect(fakeFile).toBe(JSON.stringify(list))
    })
})