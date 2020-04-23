var express = require('express');
var ws = require('ws');
var app = express();
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 8081})
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
 })
 app.listen(8080, function () {
    console.log('Example app listening on port 3000!')
 })
 var users=[];
 wss.on('connection', function (ws) {
    users.push(ws);
    ws.on('open', function open() {
        
      });
      ws.on('message', function incoming(data) {
        console.log(data);
        let jsonMsg={};
        jsonMsg.message=data;
        users.map(user=>{
            user.send(JSON.stringify(jsonMsg));
        })
      });
});
