const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },

    fullname :{
        type : String,
        required : true,
        min : 8,
        max : 50
    },

    email: {
        type : String,
        required : true
        
    },

    password : {
        type : String,
        required : true,
        min : 8,
        max : 20
    },

    role : {
        type: String,
        required: true

    },

}, {
    timestamps: true,


});

const User = mongoose.model('User', userSchema);

module.exports = User;