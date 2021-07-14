// // console.log("chatata eingirng");
// //  front hand handler
// class ChatEngine {
//   constructor(chatBoxId, userEmail) {
//     this.chatBoxId = chatBoxId;
//     this.userEmail = userEmail;

//     //  connection aur yeah server p jake connection call chalya

//     this.socket = io.connect("http://localhost:5000", {
//       transports: ["websocket", "polling", "flashsocket"],
//     });

//     if (this.userEmail) {
//       this.connectionHandler();
//     }
//   }

//   connectionHandler() {
//     let self = this;
//     this.socket.on("connect", () => {
//       console.log("Connection established using Sockets...");
//     });

//     self.socket.emit("join_room", {
//       user_email: self.userEmail,
//       chatroom: "Interview",
//     });

//     self.socket.on("user_joined", function (data) {
//       console.log(" A user joined the room   " + data.user_email);
//     });
//     let sendbtn = document.querySelector("#send-mesasage");

//     sendbtn.addEventListener("click", function () {
//       let msg = document.querySelector("#chat-message-input").value;

//       if (msg != " ") {
//         self.socket.emit("send-message", {
//           message: msg,
//           user_email: self.user_email,
//           chatroom: "Interview",
//         });
//       }
//       document.querySelector("#chat-message-input").value = "";
//     });

//     self.socket.on("received-message", function (data) {
//       console.log("message-recevied", data.message);

//       var newmessage = document.createElement("li");
//       let spanmessage = document.createElement("span");
//       console.log("sdf");
//       spanmessage.innerHTML = data.message;
//       newmessage.append(spanmessage);
//       // newmessage.addClass("other-message");

//       newmessage.classList.add("other-message");
//       let ul = document.querySelector("#chat-message-list");
//       ul.appendChild(newmessage);
//     });
//   }
// }

const socket = this.socket;
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});
socket.on("user-connected", (userId) => {
  console.log("User Connected " + userId);
});
