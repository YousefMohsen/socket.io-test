const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
var count = 0;
var messagelist =['hej','med','dig']
io.on("connection", socket => {

  console.log("New client connected"), 
 
 /* setInterval(
    () => getApiAndEmit(socket),
    10000
  );*/
  /*
  setInterval(
    () => counter(socket),
    1000
  );
*/
setInterval(
  () =>emitMessageList(socket)
  ,
  1000
);

  socket.on("disconnect", () => console.log("Client disconnected"));


  socket.on('sendNewMessage', function (data) {
    messagelist.push(data)
    console.log(data);
  });
});

const counter = async socket => {

  count++;
  socket.emit('counter', count)

}
const emitMessageList = async socket => {

  socket.emit('messageList', messagelist)

}


const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://icanhazdadjoke.com/slack"
    );
    console.log('res',res.data.attachments[0].text)
    socket.emit("newJoke", res.data.attachments[0].text);
  } catch (error) {
    console.log('error',error)
    console.error(`Error: ${error}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
