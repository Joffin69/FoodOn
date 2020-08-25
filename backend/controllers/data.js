const Dish = require("../models/dish");
const Vendor = require("../models/vendor");
const Category = require("../models/categories");
const Order = require("../models/order");

exports.getNewDishes = (req, res, next) => {
    Dish.find({tsFlag: true},{_id:0})
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
        res.status(404).json({
            message: 'Something went wrong. Please logout and try again!'
        });
    })
}

exports.getRecDishes = (req, res, next) => {
    Dish.find({rating:{$gte: 4.3}},{_id:0})
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
        res.status(404).json({
            message: 'Something went wrong. Please logout and try again!'
        });
    })
}

exports.getAllVendors = (req, res, next) => {
    Vendor.find({},{_id:0})
    .then(result => {
        if(result) {
            res.status(201).json({
                message: 'Vendors list has been successfully retrieved.',
                result: result
            });
            return;
        }
        res.status(404).json({
            message: 'Vendors list could not be retrieved successfully !'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            message: 'Something went wrong. Please logout and try again!'
        });
    });
}

exports.getVendor = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Vendor.find({vendorId: vendorId},{_id:0})
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
        message: 'Something went wrong. Please logout and try again!'
    });
  });
}

exports.getCategoriesForVendor = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Category.find({vendorId: vendorId},{_id:0})
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
        message: 'Something went wrong. Please logout and try again!'
    });
  });
}

exports.getVendorDishes = (req, res, next) => {
  const vendorId = req.body.vendorId;
  Dish.find({vendorId: vendorId},{_id:0})
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
        message: 'Something went wrong. Please logout and try again!'
      });
  });
}

exports.getAllOrders = (req, res, next) => {
    Order.find({},{_id:0})
    .then(result => {
        if(result.length > 0) {
            res.status(201).json({
                message: 'Orders list has been successfully retrieved.',
                result: result
            });
            return;
        }
        res.status(404).json({
            message: 'Orders list could not be retrieved successfully !'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            message: 'Something went wrong. Please logout and try again!'
        });
    });
}

exports.placeOrder = (req, res, next) => {

    const order = new Order({
        orderId: req.body.orderId,
        vendorId: req.body.vendorId,
        price: req.body.price,
        quantity: req.body.quantity,
        discount: req.body.discount,
        estimatedTime: req.body.estimatedTime
      });  
    order.save()
    .then(result => {
        if(result) {
            res.status(201).json({
                message: 'Order has been placed successfully',
                result: result
            });
            return;
        }
        res.status(404).json({
            message: 'Order could not be places sucessfully !'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            message: 'Something went wrong. Please logout and try again!'
        });
    });
}


