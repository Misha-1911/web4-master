const ws = require('ws');
const SOCKET_PORT = 5000;
const wss = new ws.Server({
 port: SOCKET_PORT
}, () => {
 console.log(`Socket server started on ${SOCKET_PORT}`);
});

wss.on('connection', (ws) => {
 ws.on('message', (message) => {

 });
});