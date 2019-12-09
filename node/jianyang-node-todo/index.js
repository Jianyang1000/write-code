
const fs = require('fs')
const path = require('path')
const os = require('os')
const dbPath = path.join(os.homedir(), '.todo')
const db = require('./db.js')
const inquirer = require('inquirer');




module.exports.add = async (title) => {
    // 读文件
    let list = await db.read()

    // 读入数组
    list.push({ title: title, done: false })
    // 写文件
    db.write(list)
}


module.exports.clear = () => {
    const string = JSON.stringify([])
    fs.writeFile(dbPath, string, () => {

    })
}


function markAsDone(list, index) {
    list[index].done = true
    db.write(list)
}

function markAsUndone(list, index) {
    list[index].done = false
    db.write(list)
}

function updateTitle(list, index) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: '新的标题',
                default: list[index].title
            }
        ])
        .then(answer => {
            list[index].title = answer.title
            db.write(list)
        })
}

function removeTask(list, index) {
    list.splice(index, 1)
    db.write(list)
}


function askForUpdateTask(list, index) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'value',
                message: '请选择你想进行的操作',
                choices: [
                    { name: '已完成', value: 'markAsDone' },
                    { name: '未完成', value: 'markAsUndone' },
                    { name: '修改', value: 'updateTitle' },
                    { name: '删除', value: 'removeTask' },
                    { name: '退出' },
                ]
            }
        ])
        .then(answer => {
            const action = { markAsDone, markAsUndone, updateTitle, removeTask }
            const value = answer.value
            action[value](list, index)

        })
}

function askForCreateTask(list) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: '输入标题',

            }
        ])
        .then(answer => {
            list.push({ title: answer.title, done: false })
            db.write(list)
        })
}


module.exports.showAll = async () => {
    let list = await db.read()

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [...list.map((task, index) => {
                    return { name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
                }), { name: '+ 创建任务', value: '-2' }, { name: '退出', value: '-1' }]
            }
        ])
        .then(answers => {
            let index = parseInt(answers.index)

            if (index >= 0) {
                askForUpdateTask(list, index)
            }
            else if (index === -2) {
                askForCreateTask(list)
            }
        });
}