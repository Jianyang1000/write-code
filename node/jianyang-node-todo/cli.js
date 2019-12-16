#!/bin/bash
const program = require('commander');
const api = require('./index.js')

const db = require('./db.js')
program
    .option('-x, -xxx', 'todolist')


program
    .command('add [source]')
    .description('add item to list')
    .action((source) => {
        api.add(source)
    });

program
    .command('clear')
    .description('clear list as []')
    .action(() => {
        api.clear()

    });

api.showAll()
program.parse(process.argv);





