const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
let User = require('../models/user.model');

//ayang gedik
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/register').post((req, res) =>{
 
    
        bcrypt.hash(req.body.password, 10, function(err, hashedPass){
            if(err) {
                res.json({
                    error: err
                })
            }

    const user_id = req.body.user_id;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = hashedPass;
    const role = req.body.role;

    const regexStudent = /^[a-zA-Z]+[-_\.]?[a-zA-Z0-9]+@(raudah\.usim\.edu\.my)$/;
    const regexStaf =  /^[a-zA-Z]+[-_\.]?[a-zA-Z0-9]+@(usim\.edu\.my)$/;
    const foundStudent = email.match(regexStudent);
    const foundStaf = email.match(regexStaf);
    
    if (!foundStudent && !foundStaf ) {
        return res.send("Please use USIM registered email")
    }

    if (foundStudent && role !== "Student") {
        return res.send("Admin is only for the USIM staff and lecturers")
    }

    if (foundStaf && role !== "Admin") {
        return res.send("Please check your email address correctly.")
    }
    
    if (password.length < 8)
    alert("short password");
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasNonalphas = /\W/.test(password);
    const ComplexPassword = password + hasLowerCase + hasNonalphas + hasNumbers + hasUpperCase;
    if (ComplexPassword.length < 8){
        alert("bad password");
    }
    

    // if(password.length < 8){
    //     return res.send({
    //         error:"Password need to be minimum of 8 characters"
    //     })
    //  }
        
    else {
        const NewUser = new User({
            user_id,
            fullname,
            email,
            password,
            role,    
        });
    
        NewUser.save()
        .then(() => res.json('User added!'))
        //.catch(err => res.status(400).json('Error: ' + err));
        .catch(err => res.json("" + err));
    }
    
   
});

 })
 

router.route('/login').post((req, res, next) => {
    
    const user_id = req.body.user_id;
    const password = req.body.password;

    if (!user_id|| !password) {
        res.status(200).json({
            message: "Please fill in your email and password"
          });
    }

  User.findOne({ user_id
      
  })
  
  .then(user => {

    bcrypt.compare(req.body.password,user.password, (err, result) => {
        if(err){
            //return res.send('Invalid password.')
            
            res.status(401).json({
                message: "Authentication failed",
                token: token
            });
            

        }

        if (result) {
            const token = jwt.sign(
                {
                    user_id: user.user_id,
                    fullname: user.email
                },
                "secret",
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "welcome, " +user.fullname,
                token: token
            });

        }
    });
})
.catch(err => {
    console.log(err);
    res.status(200).json({
      message: "Invalid username or password"
    });
  });


},
)
    
router.route('/:user_id').get((req,res) => {
    User.findOne(req.user_id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
    
    
});

router.route('/:user_id').delete((req,res) => {
    User.findOneAndDelete(req.user_id)
    .then(() => res.json('User removed'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:user_id').post((req, res) => {
    User.findOne(req.user_id)
    .then(user => {
        user.user_id = req.body.user_id;
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;

        user.save()
        .then(() => res.json('Profile Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports= router;