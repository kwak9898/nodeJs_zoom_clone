import http from "http";
import SocketIO from "socket.io";
import express from "express";
import {msg} from "@babel/core/lib/config/validation/option-assertions";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const HttpServer = http.createServer(app);
const io = SocketIO(HttpServer);


/**
 * Use Socket.IO
 */
io.on("connection", socket => {
    socket.onAny(event => console.log(`Socket Event: ${event}`));
    socket.on("enter_room", roomName => socket.join(roomName));
})

/**
 * Use WebSocket
 */
// const wss = new WebSocket.Server({ server });
// const sockets = [];
//
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser ✅");
//     socket.on("close", () => {
//         console.log("Disconnected from the Browser ❌");
//     });
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//     });
// });

HttpServer.listen(3000, handleListen);
