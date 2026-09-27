const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../docs');
const port = 4173;
const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
};

const server = http.createServer((request, response) => {
    let requestPath = decodeURIComponent(request.url.split('?')[0]);
    if (requestPath === '/') requestPath = '/index.html';

    const filePath = path.resolve(root, `.${requestPath}`);
    if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end('Not found');
        return;
    }

    const extension = path.extname(filePath);
    response.setHeader('Content-Type', contentTypes[extension] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Serving docs at http://127.0.0.1:${port}`);
});
