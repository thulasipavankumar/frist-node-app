const WebSocket = require('ws');
class chat_room {
  roomName;
  availableUsers = [];
  wss;
  constructor(roomName) {
    console.log("constructor for new room ", roomName)
    //https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    this.roomName = roomName;
    this.wss = new WebSocket.Server({ noServer: true });
    this.wss.on('connection', ws => {
      ws.on('open', this.open);
      ws.on('error', this.error);
      ws.on('close', this.close);
      ws.on('message', this.message);
      this.addUserToTheExsistingList(ws)
    })
  }
  addUserToTheExsistingList = (user) => {
    this.availableUsers.push(user);
  }
  getMasterConnection = () => this.wss;
  getChatRoomName = () => this.roomName;
  getAllUsers = () => this.availableUsers;
  deleteUserFromList = (userData) => {
    // pending 
  }
  open = () => {
    console.log("opened a new connection");
  }
  print = data => {
    console.log(data);
  }
  error = errData => {
    console.log("error in ws", errData)
  }
  message = (data) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    let jsonMsg = JSON.parse(data);
    if (jsonMsg.message !== undefined)
      this.sendMsgToAllUsers(jsonMsg.message);
    else
      this.sendMsgToAllUsers(jsonMsg);
  }
  sendMsgToAllUsers = (data) => {
    this.removeStaleUsersFromTheList();
    this.availableUsers.map(client => {
      let jsonMsg = {};
      jsonMsg.message = data;
      jsonMsg.origin = client.origin;
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonMsg));
      }
    })
  }
  removeStaleUsersFromTheList = () => {
    this.availableUsers = this.availableUsers.filter(user => (user.readyState === 0 || user.readyState === 1));
  }

  close = (closingCode, reason) => {

    //https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
    console.log("closed in ws:" + closingCode + "," + reason);
    //delete user from the list
    this.sendMsgToAllUsers("A user disconnected ")
  }
}
module.exports = chat_room;