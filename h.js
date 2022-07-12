const http = require('http')
const fs = require('fs')
const qs = require('qs')

let server = http.createServer(function (req, res) {

    let methodRequest = req.method;

    if (methodRequest === 'GET') {
        fs.readFile('view.html','utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end()
        })
    } else {
        // xu ly submit
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let name = qs.parse(data).name;
            // ghi dữ liệu vào file data.txt
            fs.writeFile('text.txt', name, err => {
                if (err) {
                    console.log('err')
                    return;
                }
                return res.end('Create success')
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen('8080', function (){
    console.log('Serve running port 8080')
})