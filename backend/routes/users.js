const router = require('express').Router();
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
var jwt = require ('jsonwebtoken');
let User = require('../models/user.model');
var TOKEN_KEY;

// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/register').post((req, res) => {    
    const user_id = req.body.user_id;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    //const password = hashedPass;
    const role = req.body.role;

    console.log(user_id, fullname, email, password, role);

    const regexStudent =/^[a-zA-Z0-9]+[-_\.]?[a-zA-Z0-9]+@(raudah\.usim\.edu\.my)$/;
    const regexStaf =/^[a-zA-Z0-9]+[-_\.]?[a-zA-Z0-9]+@(usim\.edu\.my)$/;
    const foundStudent = email.match(regexStudent);
    const foundStaf = email.match(regexStaf);
 
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    const hasSymbol = /[?=.*!<>@#$%^&*]/.test(password);

    if (password.length < 8){
        return res.status(200).json({
            status: "Password_error",
            message: "Please use atlease 8 characters"
        });
    }
                    
                    
    if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas + hasSymbol < 3) {
        return res.status(200).json({
            status: "Password_error",
            message: "Please use atlease 1 numeric, 1 symbol, 1 Alphabet"
        });
    }

    console.log(hasSymbol);
    console.log("email: ", email);
    console.log("student: ",foundStudent);
    console.log("staff: ", foundStaf);

    if (!foundStudent && !foundStaf) {
        return res.status(200).json({
            status: "email_error",
            message: "Use official email."
        });
    }

    if (foundStudent && role !== "Student") {
        return res.status(200).json({
            status: "Student_warning",
            message: "Please assign as student."
        });   
    }

    if (foundStaf && role !== "Admin") {
        return res.status(200).json({
            status: "Admin_warning",
            message: "Please check your email address correctly."
        });   
    }

    console.log("start");
                    
    bcrypt.hash(password, 10, function(err, hashedPass){
        if(err) {
            return res.status(200).json({
                status: "hash password error",
                message: err
            });
        }
        const password = hashedPass;
        const NewUser = new User({
            user_id,
            fullname,
            email,
            password,
            role
        });

        console.log(NewUser);

        NewUser.save()
        .then(() => {
            res.status(200).json("User added!");
        })
        .catch(err => res.status(400).json('Error in new user save backend: ' + err));
    });
});
    
    
router.route('/login').post((req, res, next) => {
    var user_id = req.body.user_id;
    var password = req.body.password;

    console.log("user id" + user_id);
    console.log("password" + password);

    if(!user_id || !password) {
        res.status(200).json({
            status: "empty",
            message: "Please fill in your email and password"
        });
    }

    User.findOne({ user_id }).then(user => {
        bcrypt.compare(password,user.password, (err, result) => {
            if(err){
                //return res.send('Invalid password.')
                return res.status(401).json({
                    message: "Authentication failed"
                    // token: token
                });
            }

            console.log("stopped...");

            if(result) {
                const token = jwt.sign(
                    {
                        user_id: user.user_id,
                        fullname: user.email
                    },
                    "secret",
                    {
                        expiresIn: "1d"
                    }
                );

                console.log("token: ", token);
                TOKEN_KEY = token;
                return res.status(200).json({
                    status: "success",
                    message: "welcome, " + user.fullname,
                    token: token
                });
            }else {
                return res.status(200).json({
                    status: "password_error_login"
                });
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(200).json({
            status: "email_error_login",
            message: "Email is incorrect"
        });
    });
});

// router.route('/check').post((req, res) => {
//     return res.status(200).json({
//         status: "check",
//         data: TOKEN_KEY
//     });
// });

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

