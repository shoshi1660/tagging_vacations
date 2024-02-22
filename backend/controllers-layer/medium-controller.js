const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const mediumLogic = require("../business-logic-layer/medium-logic");
const FollowModel = require("../model/follow-model");
const VacationModel = require("../model/vacation-model");
const router = express.Router();

// router.get("/", verifyLoggedIn, async (request, response) => {
//     try {
//         console.log("Medium");
//         response.send("OK - Medium");
//     }
//     catch (error) {
//         response.status(500).send(error);
//     }
// });

// router.get("/:id", verifyLoggedIn, async (request, response) => {
//     const id = request.params.id
//     try {
//         response.send("OK - Medium by " + id);
//     }
//     catch (error) {
//         response.status(500).send(error);
//     }
// });

router.get("/vacations/:id", async (request, response) => {
    const id = request.params.id;
    if (isNaN(id)) {
        response.status(400).send({ message: `Bad` });
    }
    else {
        try {
            const vacations = await mediumLogic.getAllVacationsAsync(id);
            response.send(vacations);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }
});

router.post("/vacations/follow/", async (request, response) => {
    try {
        const newFollow = new FollowModel(request.body);
        const error = newFollow.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await mediumLogic.addFollowToFollowing(newFollow);
            newFollow.followingId = result.insertId;
            response.status(201).send(newFollow);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message); //{ message: "server error" }
    }
});

router.delete("/vacations/follow/:followingId", async (request, response) => {
    const followingId = request.params.followingId;
    if (isNaN(followingId)) {
        response.status(400).send({ message: `Bad following numeber '${followingId}` });
    }
    else {
        try {
            const result = await mediumLogic.deleteFollowToFollowing(followingId);
            if (result)
                response.send({ message: `deleted ${followingId}` });
            else
                response.status(404).send({ message: `following not found '${followingId}'` });
        }
        catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }
});

router.put("/vacations/follow/:vacationId", async (req, res) => {
    const idVacation = req.params.vacationId;
    try {
        const vacation = await mediumLogic.addFollowVacation(idVacation);
        res.status(201).send(vacation);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "server error" }); //
    }
});

router.put("/vacations/follow/subtract/:vacationId", async (req, res) => {
    const idVacation = req.params.vacationId;
    try {
        const vacation = await mediumLogic.subtractFollowVacation(idVacation);
        res.status(201).send(vacation);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "server error" }); //
    }
});

module.exports = router;