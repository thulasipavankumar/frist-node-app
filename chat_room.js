class chat_room {
     roomName;
     availableUsers=[];
    constructor(roomName) {
      this.roomName = roomName;
      
    }
     addUserToTheExsistingList = (user) =>{
        this.availableUsers.push(user);
    }
    getChatRoomName = ()=>this.roomName;
    getAllUsers = () => this.availableUsers;
  }
  module.exports = chat_room;