const Dish = require("../models/dish");
const Vendor = require("../models/vendor");
const Category = require("../models/categories");

exports.getNewDishes = (req, res, next) => {
    Dish.find({tsFlag: true})
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: 'Dishes retrievel has failed. !'
        });
      }
      res.status(200).json({
        message: "New dishes retrieved successfully !",
        result: data
      });
    })
    .catch(error => {
        console.log(error);
    })
}

exports.getRecDishes = (req, res, next) => {
    Dish.find({rating:{$gt: 4}})
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: 'Dishes retrievel has failed. !'
        });
      }
      res.status(200).json({
        message: "Recommended dishes retrieved successfully !",
        result: data
      });
    })
    .catch(error => {
      console.log(error);
    })
}

exports.getAllVendors = (req, res, next) => {
    Vendor.find()
    .then(result => {
        if(result) {
            res.status(201).json({
                message: 'Vendors list has been successfully retrieved.',
                result: result
            });
            return;
        }
        console.log(result);
        res.status(404).json({
            message: 'Vendors list could not be retrieved successfully !'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            message: 'Something went wrong :(. PLease try again !'
        })
    });
}

exports.getVendor = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Vendor.find({vendorId: vendorId})
  .then(result => {
      if(result.length > 0) {
          res.status(201).json({
              message: 'Vendor data has been successfully retrieved.',
              result: result
          });
          return;
      }
      res.status(404).json({
          message: 'Vendor data could not be retrieved successfully !'
      });
  })
  .catch(error => {
      console.log(error);
      res.status(404).json({
          message: 'Something went wrong :(. PLease try again !'
      })
  });
}

exports.getCategoriesForVendor = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Category.find({vendorId: vendorId})
  .then(result => {
      if(result.length > 0) {
          res.status(201).json({
              message: 'Category data has been successfully retrieved.',
              result: result
          });
          return;
      }
      res.status(404).json({
          message: 'Category list could not be retrieved successfully !'
      });
  })
  .catch(error => {
      console.log(error);
      res.status(404).json({
          message: 'Something went wrong :(. PLease try again !'
      })
  });
}

exports.getVendorDishes = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Dish.find({vendorId: vendorId})
  .then(result => {
      if(result.length > 0) {
          res.status(201).json({
              message: 'Dishes list has been successfully retrieved.',
              result: result
          });
          return;
      }
      res.status(404).json({
          message: 'Dishes list could not be retrieved successfully !'
      });
  })
  .catch(error => {
      console.log(error);
      res.status(404).json({
          message: 'Something went wrong :(. PLease try again !'
      })
  });
}



