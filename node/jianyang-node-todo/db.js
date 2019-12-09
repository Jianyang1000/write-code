const fs = require('fs')
const path = require('path')
const os = require('os')
const homedir = os.homedir()
const dbPath = path.join(homedir, '.todo')

const db = {
    read: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
                if (error) return reject(error)
                // 检查是否文件有内容
                let list
                try {
                    list = JSON.parse(data.toString())
                }
                catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write: (list) => {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string, (error => {
                if (error) return reject(error)
                resolve()
            }))
        })
    }
}

module.exports = db