require('dotenv').config();
const WSS = require('ws').Server;
const HTTP = require('http').createServer();
const APP = require('./app');

let wss = new WSS({
    server: HTTP
});

HTTP.on('request', APP);

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(`received: ${message}`);
    });
});

HTTP.listen(process.env.PORT, () => {
    console.log(`Node HTTP and WS server on ${process.env.HOST}, port ${process.env.PORT} ...`);
});