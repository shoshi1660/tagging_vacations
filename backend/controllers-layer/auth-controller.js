const express = require("express");

const authLogic = require("../business-logic-layer/auth-logic");
const Credentials = require("../model/credentials");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        // const response=await ...
        response.send("Auth");
    }
    catch (error) {
        response.status(500).send(error);
    }
});

// Login: 
router.post("/login", async (request, response) => {
    try {
        // Data: 
        const credentials = new Credentials(request.body);

        // Validation: 
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);

        // Logic: 
        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect userName or password.");

        // Success: 
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;