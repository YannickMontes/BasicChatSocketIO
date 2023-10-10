import express, { Request, Response } from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.get("/", (req:Request, res:Response) => {
	res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", (socket) => {
	console.log("Someone's connected!");

	socket.on("disconnect", () => {
		console.log("Someone left.");
	});

	socket.on("chat message", (msg: string) => {
		console.log("message: " + msg);
		io.emit("chat message", msg);
	});
});

server.listen(3000, () => {
	console.log("Now listening on port 3000");
});
