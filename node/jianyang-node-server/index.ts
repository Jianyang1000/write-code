import * as http from 'http';
import { IncomingMessage } from 'http';
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'





module.exports = (cacheAge = 3600 * 24, port = 8080) => {
    const homeDir = p.resolve(__dirname, 'public')

    const server = http.createServer()

    //@ts-ignore
    server.on('request', (request: IncomingMessage, response) => {

        let { method, url: path } = request
        let { pathname } = url.parse(path)


        if (method !== 'GET') {
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            response.statusCode = 405
            response.end('请求格式不正确')
        }

        let filename = pathname.substring(1)
        if (filename === '') {
            filename = 'index.html'
        }
        //response.setHeader('Content-Type', 'text/html;charset=utf-8')
        fs.readFile(p.resolve(homeDir, filename), (error, data) => {
            if (error) {
                if (error.errno === -4058) {
                    response.stateCode = 404
                    fs.readFile(p.resolve(homeDir, '404.html'), (error2, data) => {
                        if (error2) throw error2
                        response.setHeader('Content-Type', 'text/html;charset=utf-8')
                        response.end(data)
                    })
                }
            }
            else {
                response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
                response.end(data)
            }
        })
    })

    server.listen(port)
}