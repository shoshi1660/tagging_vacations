const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const UserModel=require("../model/user-model")
const publicLogic = require("../business-logic-layer/public-logic");

const router = express.Router();
router.use(fileUpload());




router.post("/", async (request, response) => {
    try {
        const userToAdd = new UserModel(request.body);
        const error = userToAdd.validate();
        if (error)
            response.status(400).send({ message: error });
        else {
            const newUser = await publicLogic.addUserAsync(userToAdd);
            userToAdd.id = newUser.insertId;
            response.status(201).send(userToAdd);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send(error.sqlMessage);
    }
});

router.get("/", async (request, response) => {
    try {
        const users = await publicLogic.getAllUserAsync();
        response.send(users);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.post("/post", async (request, response) => {
    try {
        const name = request.body.name;
        const image = request.files.image;
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath);   // mv = move
        console.log(absolutePath);
        response.send("OK");
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get("/images/:imageName", (request, response) => {
    try {
        // Data: 
        const imageName = request.params.imageName;

        // Logic: 
        let imageFile = path.join(__dirname, "../image", imageName);
        if (!fs.existsSync(imageFile)) imageFile = locations.notFoundImageFile;

        // Success: 
        response.sendFile(imageFile);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/followes/toSocket/", async (request, response) => {
    try {
        const followes = await publicLogic.getAllTheFollows();
        response.send(followes);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});



module.exports = router;