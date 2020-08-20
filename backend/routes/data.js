const express = require("express");

const DataController = require("../controllers/data");
// const checkFile = require('../middleware/file');

const router = express.Router();

router.get("/getNewDishes", DataController.getNewDishes);

router.get("/getRecDishes", DataController.getRecDishes);

// router.post("/saveUser", DataController.saveUserData);

// router.get("/getUsers", UserController.getUsers);

// router.post("/deleteUser", UserController.deleteUser);

module.exports = router;
