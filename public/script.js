//connect to the server
var socket = io();

const names = prompt("Enter your name :)");
socket.emit("newUser", names);

socket.on("newUser", function (user) {
  messageReceiver(user);
});

//send the data to the server (message)
var messages = document.getElementById("msgs");
function send() {
  var div = document.createElement("div");
  div.classList.add("sender");
  div.innerHTML = `<p> <span>${names} :</span> ${messages.value}</p><div class="icon"><img src="./images/outer.png" alt=""></div>`;
  document.getElementById("main").appendChild(div);
  socket.emit("send", { name:names, msg:messages.value});
}


//receive the data from the server
function messageReceiver(msg) {
 

  var div = document.createElement("div");
  div.classList.add("receiver");
  div.innerHTML = `<p><span>${msg.name} :</span>  ${msg.msg}</p><div class="icon"><img src="./images/receiver.png" alt=""></div>`;
  document.getElementById("main").appendChild(div);
}
