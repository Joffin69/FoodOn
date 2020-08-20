const Dish = require("../models/dish");

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

// exports.saveUserData = (req, res, next) => {
//     const empId = req.body.empId;  
//     const user = new User({   
//         name: req.body.name,
//         phone: req.body.phone,
//         emailId: req.body.emailId,
//     });
//     var upsertData = user.toObject();
//     delete upsertData._id;
//     User.findOneAndUpdate({empId: empId},upsertData,{new: true})
//     .then(result => {
//         if(result.empId === empId && (result.name !== 'xyz' || result.name !== undefined)) {
//             console.log(result);
//             res.status(201).json({
//                 message: 'User data has been successfully saved.',
//                 result: result
//             });
//             return;
//         }
//         console.log(result);
//         res.status(404).json({
//             message: 'Data save has failed. PLease logout and try again !'
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(404).json({
//             message: 'Invalid credentials !'
//         })
//     });
// }