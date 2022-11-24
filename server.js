const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'))
});


io.on('connection', (socket)=>{
  // console.log('connecting to socket')

  socket.on('newUser' , (data)=>{
    socket.broadcast.emit('newUser' , {name:data, msg:' has joined our Community'})
  })

  socket.on('send' , (data)=>{
    socket.broadcast.emit('newUser' , data)
  })
   
  socket.on('userTyping' , (data)=>{
    socket.broadcast.emit('typing' , data)
  })

  socket.on('typedSuccess' , (data)=>{
    socket.broadcast.emit('typedSuccess' , data)
  })

 
})


http.listen(PORT, () => {
  console.log('listening on *:3000');
});