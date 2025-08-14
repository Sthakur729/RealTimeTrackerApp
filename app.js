const express = require ("express")
const app = express()
const path = require("path")

const socketio = require("socket.io")
const http = require("http")
const server = http.createServer(app)
const io = socketio(server)



app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "public")))

io.on("connection" , function (socket){
  socket.on("send-location", (location) => {
    io.emit("recieve-location", {id:socket.id, ...location})
  })
  socket.on("disconnect", () => {
    io.emit("user-disconnected", { id: socket.id });
    console.log("A user disconnected");
  });
  console.log("A user connected");
});


app.get("/", (req, res) => {
  res.render("index");
})
server.listen(3000, () => {
  console.log("Server is running on port 3000")
})