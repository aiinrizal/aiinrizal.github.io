const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
let User = require('../models/user.model');


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

    console.log(user_id,
                fullname,
                email,
                password,
                role 
              )

    const regexStudent =/^[a-zA-Z0-9]+[-_\.]?[a-zA-Z0-9]+@(raudah\.usim\.edu\.my)$/;
    const regexStaf =/^[a-zA-Z0-9]+[-_\.]?[a-zA-Z0-9]+@(usim\.edu\.my)$/;
    const foundStudent = email.match(regexStudent);
    const foundStaf = email.match(regexStaf);

    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumbers = /\d/.test(password);
    // const hasNonalphas = /\W/.test(password);

    if (password.length < 8){
       // alert("bad password");
        
        // if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
        //     return res.status(200).json({
        //         status: "Password_error",
        //         message: "Please use atlease 1 numeric, 1 symbol, 1 Alphabet"
        //     })
        // }

    }

    var hasUpperCase = /[A-Z]/;
     var hasLowerCase = /[a-z]/;
        var hasNumbers = /\d/;
        var hasNonalphas = /\W/;

        const A = password.match(hasUpperCase);
        const B = password.match(hasLowerCase);
        const C = password.match(hasNumbers);
        const D = password.match(hasNonalphas);


        console.log("ini",A,B,C,D)
    
    //const ComplexPassword = password + hasLowerCase + hasNonalphas + hasNumbers + hasUpperCase;
    // console.log(hasNonalphas,
    //             hasNumbers,
    //             hasUpperCase,
    //             hasLowerCase)

    // if (!hasUpperCase && !hasLowerCase && !hasNumbers && !hasNonalphas){
    //     return res.status(200).json({
    //         status: "Password_error",
    //         message: "Please use atlease 1 numeric, 1 symbol, 1 Alphabet"
    //     })
    // }

    //const foundStudent = regexStudent.test(email);
    console.log("email: ", email);
    console.log("student: ",foundStudent);
    console.log("staff: ", foundStaf);

    if (!foundStudent && !foundStaf) {
       return res.status(200).json({
           status: "email_error",
           message: "Use official email."
       })
    
    }

    if (foundStudent && role !== "Student") {
        return res.status(200).json({
            status: "Student_warning",
            message: "Please assign as student."
        })    }

    if (foundStaf && role !== "Admin") {
        return res.status(200).json({
            status: "Admin_warning",
            message: "Please check your email address correctly."
        })    }
    
    
        
    // if (ComplexPassword.length < 8){
    //     {
    //         return res.status(200).json({
    //             status: "Password_warning",
    //             message: "Password need to be 8 characters minimum, atleast 1 alphabet, 1 numberic, symbols."
    //         })    }
    // }
    
        
    else {
        const NewUser = new User({
            user_id,
            fullname,
            email,
            password,
            role
        });

        console.log(NewUser);
    
        NewUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(err => res.status(400).json('gdok: '+ err));
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

