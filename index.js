const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const port = process.env.PORT || 8080
const app = express()
var server = require('http').createServer(app);

server.listen(port);
const wss = new WebSocket.Server({ server });
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
 })

 wss.on('connection', function (ws) {

    ws.on('open', function open() {
        
      });
      ws.on('message', function incoming(data) {
       // console.log(data);
        let jsonMsg={};
        jsonMsg.message=data;
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(jsonMsg));
            }
          });
      });
});
