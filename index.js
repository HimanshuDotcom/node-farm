const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');


const tempCard = fs.readFileSync('./templates/template-card.html','utf-8');
const tempOverview = fs.readFileSync('./templates/template-overview.html','utf-8');
const tempProd = fs.readFileSync('./templates/template-product.html','utf-8');


const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    console.log(query, pathname);
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const products = dataObj.map(item => replaceTemplate(tempCard, item)).join();
        const output = tempOverview.replace('{%PRODUCTS_CARDS%', products);
        res.end(output);
    }

    else if (pathname === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProd,product);
        res.end(output);
    }

    else if (pathname === '/api') {
        res.writeHead(200, {
            "Content-type": 'application/json'
        });
        res.end(data);
    }

    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end(`<h1>Page Not Found !!!</h1>`)
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server Started');
})


