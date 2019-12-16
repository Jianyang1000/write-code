"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var program = require('commander');
program
    .version('0.1.0')
    .arguments('<word>')
    .action(function (word) {
    main_1.translate(word);
});
program.parse(process.argv);
