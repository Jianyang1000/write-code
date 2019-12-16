import { translate } from './main'

const program = require('commander');


program
    .version('0.1.0')
    .arguments('<word>')
    .action((word: string) => {
        translate(word)
    });

program.parse(process.argv);

