const express = require("express");

const UserController = require("../controllers/user");
// const checkFile = require('../middleware/file');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.post("/saveUser", UserController.saveUserData);

router.post("/getUserInfo", UserController.getUserInfo);

// router.get("/getUsers", UserController.getUsers);

// router.post("/deleteUser", UserController.deleteUser);

module.exports = router;
