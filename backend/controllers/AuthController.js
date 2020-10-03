const User = require ('../models/user.model')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
    })
    let user = new User ({
        user_id: req.body.user_id,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPass,
        role: req.body.role
    })
    user.save()
    .then(user => {
        res.json({
            message: 'User successfully added!'
        })
    })
        
    .catch(error => {
        res.json({
            message: 'Error occur'
        })

    })

}
module.exports = {
    register
}