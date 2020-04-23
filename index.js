const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const port = process.env.PORT || 8080
const app = express()
var server = require('http').createServer(app);
app.use(express.static(__dirname + '/public'));
server.listen(port);
const wss = new WebSocket.Server({ server });
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
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
const createAPrivateChatRoom = ()=>{
    //ceate and return a new chat room;
}
const addUserToTheExsistingChatRoom = (user,chatRoom) =>{
    //chatRoom.add(user);
}
const removeUserFromChatRoom=(user,chatRoom) =>{
    //chatRoom.remove(user);
}
const sendMessageToAllUsers= (users,msg)=>{
    users.map(user=>{
        //user.send(msg)
    })
}
const sendMessageToWholeChatRoom = (chatRoom,msg) =>{
    getUsersFromChatRoom(chatRoom).map(user=>{
        //user.send(msg);
    })
}
const getUsersFromChatRoom = (chatRoom) => chatRoom.getUsers();
