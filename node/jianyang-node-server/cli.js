#!/bin/bash
const program = require('commander');
const api = require('./index.js')

program
    .option('-x,--xxx', 'static server')


program
    .command('cache [source]')
    .description('Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to 3600). To disable caching, use -c-1.')
    .action((source) => {
        api.listen(source, 8080)
    });

program
    .command('port [source]')
    .description('Port to use (defaults to 8080)')
    .action((source) => {
        api.listen(3600, source)
    });




program.parse(process.argv);
