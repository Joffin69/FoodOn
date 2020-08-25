const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({empId: req.body.empId},{_id:0})
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Invalid credentials... PLease enter valid credentials !'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.pwd, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(404).json({
          message: 'Invalid credentials... PLease enter valid credentials !'
        });
      }
      const token = jwt.sign({empId: fetchedUser.empId, id: fetchedUser._id},
        'this-key-should-be-very-long',
        {expiresIn: '1h'});
      res.status(200).json({
        message: "User login is successfull !",
        token: token,
        expiresIn: 3600,
        user: fetchedUser
      });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: 'Something went wrong. Please logout and try again!'
      });
    })
}

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      // const url = req.protocol + '://' + req.get('host');
      const user = new User({
        name: 'xyz',  
        empId: req.body.empId,
        password: hash,
        phone: 0000000000,
        emailId: 'xyz@mail.com'
      });
      user.save()
      .then(result => {
        res.status(201).json({
          message: 'User has been successfully signed up',
          result: result
        })
      })
      .catch(error => {
        console.log(error);
        res.status(404).json({
          message: 'The Employee ID already exists or you have provided invalid data. Please provide valid data and try again !'
        })
      })
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: 'Something went wrong. Please logout and try again!'
      });
    })
}

exports.saveUserData = (req, res, next) => {
    const empId = req.body.empId;  
    const user = new User({   
        name: req.body.name,
        phone: req.body.phone,
        emailId: req.body.emailId,
    });
    var upsertData = user.toObject();
    delete upsertData._id;
    User.findOneAndUpdate({empId: empId},upsertData,{new: true})
    .then(result => {
        if(result.empId === empId && (result.name !== 'xyz' || result.name !== undefined)) {
            delete result._id;
            res.status(201).json({
                message: 'User data has been successfully saved.',
                result: result
            });
            return;
        }
        res.status(404).json({
            message: 'Data save has failed. PLease logout and try again !'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
          message: 'Something went wrong. Please logout and try again!'
        });
    });
}

exports.getUserInfo = (req, res, next) => {
  const empId = req.body.empId; 
  User.find({empId: empId},{_id:0})
  .then(result => {
      if(result) {
          res.status(201).json({
              message: 'User data has been successfully retrieved.',
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