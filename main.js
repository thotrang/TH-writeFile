const http = require('http');
const fs = require('fs');
const qs = require('qs');

http.createServer((req, res) => {

    if (req.method === 'GET') {
        fs.readFile('view.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'Conten-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        // req.on('end', () => {
        //     let name = qs.parse(data).name;
        //     fs.writeFile('text.txt', name, (err) => {
        //         if (err) {
        //             console.log('err');
        //             return;
        //         }
        //         return res.end('Create success');
        //     })
        // });
        req.on('data', () => {
            let name = qs.parse(data).name;
            fs.appendFile('text.txt', name, err => {
                if (err) {
                    console.error(err)
                    return
                }
                return res.end();
            })
            fs.readFile('view.html', 'utf8', (err, data) => {
                res.writeHead(200, { 'Conten-Type': 'text/html' });
                res.write(data);
                res.end();
            })
        })
        req.on('error', () => {
            console.log('error');
        })

    }
}).listen(8080, () => {
    console.log('localhost8080');
})