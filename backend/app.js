const express = require("express");
const cors = require("cors");

const adminController = require("./controllers-layer/admin-controller");
const authController = require("./controllers-layer/auth-controller");
const mediumController = require("./controllers-layer/medium-controller");
const publicController = require("./controllers-layer/public-controller");
const socketLogic=require("./business-logic-layer/socket-logic")

const server = express();
server.use(cors());
server.use(express.json());

server.use("/admin", adminController);
server.use("/auth", authController);
server.use("/medium", mediumController);
server.use("/public", publicController);

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

const listener = server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else
        console.log("Error: Unknown error");
});

socketLogic.init(listener);