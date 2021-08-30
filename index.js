
const fs = require('fs');
const http = require('http');

const replaceTemplate = (card, product) => {
    let output = card.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic)
        output = output.replace('{%NOT_ORGANIC%}', 'not-organic');
    return output;
}

const tempCard = fs.readFileSync('./templates/template-card.html','utf-8');
const tempOverview = fs.readFileSync('./templates/template-overview.html','utf-8');
const tempProd = fs.readFileSync('./templates/template-product.html','utf-8');


const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const products = dataObj.map(item => replaceTemplate(tempCard, item));
        const output = tempOverview.replace('{%PRODUCTS_CARDS%', products);
        res.end(output);
    }

    else if (pathName === '/product')
        res.end('This is product');

    else if (pathName === '/api') {
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


