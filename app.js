const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

io.on('connection', (socket) => {
	console.log("Someone's connected!");

	socket.on('disconnect', () => {
		console.log("Somemone left.");
	});

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

server.listen(3000, () => {
	console.log("Now listening on port 3000");
});