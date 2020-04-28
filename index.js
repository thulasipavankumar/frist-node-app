const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const chat_room=require('./chat_room');

const port = process.env.PORT || 8080
const app = express()
var server = require('http').createServer(app);
app.use(express.static(__dirname + '/public'));
server.listen(port);
const wss = new WebSocket.Server({ server });
let avialbleChatrooms = {};
app.get('/',  (req, res) =>{
    console.log(req.originalUrl);
    res.sendFile(__dirname + '/public/html/index.html');
 })
 app.get(/room/, function (req, res) {
    console.log(req.originalUrl);
    res.sendFile(__dirname + '/public/html/index.html');
  })

 wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('open', function open() {
        
      });
      console.log(' Recieved a new connection from origin ' + ws.origin + '.');
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
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);
    let newChatRoom = addRoomToGivenName(r);
    avialbleChatrooms[newChatRoom] = new chat_room(newChatRoom);  
}
const doesChatRoomExsists = roomName =>  avialbleChatrooms.hasOwnProperty(roomName);
addRoomToGivenName = name => "room"+name;
const addUserToTheExsistingChatRoom = (user,chatRoom) =>{
    //chatRoom.addUserToTheExsistingList(user);
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
const heartbeat = () => {
    this.isAlive = true;
  }