const WebSocket = require('ws');
class chat_room {
     roomName;
     availableUsers=[];
     wss;
    constructor(roomName) {
      console.log("constructor for new room ",roomName)
      this.roomName = roomName;
      this.wss = new WebSocket.Server({ noServer: true }); 
      this.wss.on('connection',ws=>{
        ws.on('open', this.open);
        ws.on('error', this.error);
        ws.on('close',this.close);
        ws.on('message', this.message);
        this.addUserToTheExsistingList(ws)
      })
    }
     addUserToTheExsistingList = (user) =>{
        this.availableUsers.push(user);
    }
    getMasterConnection = () => this.wss;
    getChatRoomName = ()=>this.roomName;
    getAllUsers = () => this.availableUsers;
    deleteUserFromList = (userData) => {
       // pending 
    }
    open = (data) => {
      console.log("opened a new connection",data);
  }
  print = data => {
      console.log(data);
  }
  error = errData =>{
    console.log("error in ws",errData)
  }
  message = (data) =>{
      this.availableUsers.map(client => {
          let jsonMsg={};
          jsonMsg.message=data;
          jsonMsg.origin = client.origin;
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(jsonMsg));
             }
      })
    
  }
  close = (closingCode,reason) =>{
    //https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
    console.log("closed in ws:"+closingCode+","+reason);
    //delete user from the list
  }
}
  module.exports = chat_room;