// let socket = io("/");

// const videoGrid = document.getElementById("video-grid");

// const myVideo = document.createElement("video");
// myVideo.muted = true;
// const peers = {};
// const myPeer = new Peer(undefined, {
//   host: "/",
//   port: "3001",
// });

// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then((stream) => {
//     addVideoStream(myVideo, stream);

//     myPeer.on("call", (call) => {
//       call.answer(stream);
//       const video = document.createElement("video");
//       call.on("stream", (userVideoStream) => {
//         addVideoStream(video, userVideoStream);
//       });
//     });

//     // myPeer.on("open", (id) => {
//     //   console.log(" emeiting joinn room" + id);

//     //   socket.emit("join-room", ROOM_ID, id);

//     //   console.log(" connect to the peerjsd");
//     // });

//     socket.on("user-connected", (userId) => {
//       console.log("User Connected " + userId);
//       // setTimeout(connectToNewUser, 1000, userId, stream);
//       consolse.log();
//       setTimeout(connectToNewUser, 1000, userId, stream);
//       connectToNewUser(userId, stream);
//     });
//   });

// socket.on("user-disconnected", (userId) => {
//   if (peers[userId]) peers[userId].close();
// });

// // myPeer.on("open", (id) => {
// //   socket.emit("join-room", ROOM_ID, id);

// //   console.log(" connect to the peerjsd");
// // });

// myPeer.on("open", (id) => {
//   socket.emit("join-room", ROOM_ID, id);

//   console.log(" connect to the peerjsd");
// });

// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream);
//   const video = document.createElement("video");
//   console.log("video stream is created or ot");
//   call.on("stream", (userVideoStream) => {
//     addVideoStream(video, userVideoStream);
//   });
//   call.on("close", () => {
//     video.remove();
//   });

//   peers[userId] = call;
// }

// function addVideoStream(video, stream) {
//   console.log("addVideoStream");
//   video.srcObject = stream;
//   video.addEventListener("loadedmetadata", () => {
//     video.play();
//   });
//   video.classList.add("video");
//   videoGrid.append(video);
// }

// // myPeer.on("open", (id) => {
// //   socket.emit("join-room", ROOM_ID, id);

// //   console.log(" connect to the peerjsd");
// // });
// // socket.on("user-connected", (userId) => {
// //   console.log("User Connected " + userId);
// // });

// //  ******************88888888888888888888888888888888

// // const socket = io("/");
// // const videoGrid = document.getElementById("video-grid");
// // const myPeer = new Peer(undefined, {
// //   host: "/",
// //   port: "3001",
// // });
// // const myVideo = document.createElement("video");
// // myVideo.muted = true;
// // const peers = {};
// // navigator.mediaDevices
// //   .getUserMedia({
// //     video: true,
// //     audio: true,
// //   })
// //   .then((stream) => {
// //     addVideoStream(myVideo, stream);

// //     myPeer.on("call", (call) => {
// //       call.answer(stream);
// //       const video = document.createElement("video");
// //       call.on("stream", (userVideoStream) => {
// //         addVideoStream(video, userVideoStream);
// //       });
// //     });

// //     socket.on("user-connected", (userId) => {
// //       console.log("User Connected " + userId);
// //       connectToNewUser(userId, stream);
// //     });
// //   });

// // socket.on("user-disconnected", (userId) => {
// //   if (peers[userId]) peers[userId].close();
// // });

// // myPeer.on("open", (id) => {
// //   socket.emit("join-room", ROOM_ID, id);
// // });

// // function connectToNewUser(userId, stream) {
// //   const call = myPeer.call(userId, stream);
// //   const video = document.createElement("video");
// //   call.on("stream", (userVideoStream) => {
// //     addVideoStream(video, userVideoStream);
// //   });
// //   call.on("close", () => {
// //     video.remove();
// //   });

// //   peers[userId] = call;
// // }

// // function addVideoStream(video, stream) {
// //   video.srcObject = stream;
// //   video.addEventListener("loadedmetadata", () => {
// //     video.play();
// //   });
// //   videoGrid.append(video);
// // }

const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      setTimeout(connectToNewUser, 1000, userId, stream);
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;

  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.classList.add("video");
  videoGrid.append(video);
}

let chatinput = document.getElementById(".ChatIput");
let chatwindow = document.querySelector(".chatting-section");
let chatSubmit = document.querySelector(".Chatsubmit");

chatSubmit.addEventListener("click", function (e) {
  chatinput = document.querySelector(".ChatIput");
  if (chatinput.value != "") {
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chats");
    chatDiv.classList.add("rightside");
    chatDiv.textContent = chatinput.value;
    chatwindow.append(chatDiv);
    socket.emit("chat", { chat: chatinput.value });
    chatinput.value = "";
  }
});

socket.on("chatLeft", function (chatObj) {
  let chatDiv = document.createElement("div");
  chatDiv.classList.add("chats");
  chatDiv.classList.add("leftside");
  chatDiv.textContent = chatObj.chat;
  chatwindow.append(chatDiv);
});
