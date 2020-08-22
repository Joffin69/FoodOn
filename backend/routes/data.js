const express = require("express");

const DataController = require("../controllers/data");
// const checkFile = require('../middleware/file');

const router = express.Router();

router.get("/getNewDishes", DataController.getNewDishes);

router.get("/getRecDishes", DataController.getRecDishes);

router.get("/getAllVendors", DataController.getAllVendors);

router.post("/getVendor", DataController.getVendor);

router.post("/getCategoriesForVendor", DataController.getCategoriesForVendor);

router.post("/getVendorDishes", DataController.getVendorDishes);

module.exports = router;
