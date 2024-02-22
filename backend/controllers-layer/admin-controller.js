const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const adminLogic = require("../business-logic-layer/admin-logic");
const VacationModel = require("../model/vacation-model");
const { log } = require("console");
const router = express.Router();
router.use(fileUpload());

// router.get("/", [verifyLoggedIn, verifyAdmin], async (request, response) => {
//     try {
//         // const response=await ...
//         console.log("admin");
//         response.send("Welcome Admin only services!!");
//     }
//     catch (error) {
//         response.status(500).send(error);
//     }
// });

router.get("/vacations/:vacationId", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    const vacationId = request.params.vacationId;
    if (isNaN(vacationId)) {
        response.status(400).send({ message: `Bad vacation numeber '${vacationId}'` });
    }
    else {
        try {
            const vacation = await adminLogic.getVacationByIdAsync(vacationId);
            response.send(vacation);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }
});

router.get("/vacations/", async (request, response) => {
    try {
        const vacations = await adminLogic.getAllVacationsAsync();
        response.send(vacations);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.get("/vacations/amount/Followers/", async (request, response) => {
    try {
        const vacations = await adminLogic.getVacationWhereFollow();
        response.send(vacations);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.get("/vacations/images/:Image", (request, response) => {
    try {
        // Data: 
        const vacationImage = request.params.Image;

        // Logic: 
        let imageFile = path.join(__dirname, "..", "images", vacationImage);

        // Success: 
        response.sendFile(imageFile);
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send({ message: "server error" });
    }
});
router.post("/vacations/images", async (request, response) => {
    try {
        // const vacationImage = request.params.Image;

        const name = request.body.name;
        const vacationImage = request.files.image;
        const absolutePath = path.join(__dirname, "..", "images", vacationImage.name);
        await vacationImage.mv(absolutePath);   // mv = move
        console.log(absolutePath);
        response.send("OK");
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send({ message: "server error" });
    }
});

router.post("/vacations/", async (request, response) => {
    try {
        const newVacation = new VacationModel(request.body);
        const error = newVacation.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await adminLogic.addVacation(newVacation);
            newVacation.vacationId = result.insertId;
            response.status(201).send(newVacation);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message); //{ message: "server error" }
    }
});

router.put("/vacations/:id", async (req, res) => {
    const idV = req.params.id;
    try {
        const newVacation = new VacationModel(req.body)
        const error = newVacation.validate();
        if (error) {
            res.status(400).send(error);
        }
        else {
            const vacation = await adminLogic.changeVacation(newVacation, idV);
            newVacation.vacationId = vacation.vacationId;
            res.status(201).send(newVacation);
            console.log("succes")
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "server error" }); //
    }
});



router.delete("/vacation/:id", async (request, response) => {
    const itemVacation = request.params.id;
    if (isNaN(itemVacation)) {
        response.status(400).send({ message: `Bad vacation numeber '${itemVacation}` });
    }
    else {
        try {
            const result = await adminLogic.deleteVacation(itemVacation);
            if (result)
                response.send({ message: `deleted ${itemVacation}` });
            else
                response.status(404).send({ message: `item not found '${itemVacation}'` });
        }
        catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }
});

module.exports = router;