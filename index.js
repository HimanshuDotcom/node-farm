const fs = require('fs');
const http = require('http');

const fileData = fs.readFileSync('./dev-data/data.json', 'utf-8');

const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === "/" || pathName === "/overview")
        res.end('This is overview');
    else if(pathName === '/product')
        res.end('This is product');
    else if(pathName === '/api') {
        const data = JSON.parse(fileData);
        console.log(data)
        res.end("hy");
    }
})

server.listen(8000, '127.0.0.1',() => {
    console.log('Server Started');
})


