const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({empId: req.body.empId})
    .then(user => {
      console.log(user);
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
}

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      // const url = req.protocol + '://' + req.get('host');
      const user = new User({
        empId: req.body.empId,
        password: hash,
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
          message: 'Invalid credentials !'
        })
      })
    })
    .catch(error => {
      console.log(error);
    })
}