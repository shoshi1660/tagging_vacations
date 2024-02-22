const io=require("socket.io");

let socketsManager;

function init(listener) {
    socketsManager=io(listener, {cors: {origin: "http://localhost:3000"}});

    socketsManager.sockets.on("connection", socket => {
        console.log("A client is connected ");

        socket.on("disconnect", (reason) => {
            console.log("A client is disconnected ");
        });

        socket.on("vacation-from-client", vacation => {
            console.log("vacation", vacation);
            socketsManager.sockets.emit("vacation-from-server", vacation);
        });
    });
}

module.exports = {
    init
}