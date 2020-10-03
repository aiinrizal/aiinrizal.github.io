const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thesisSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    
    thesis_title: {
        type: String,
        required: true
    },

    thesis_description: {
        type: String,
        required: true

    },

    thesis_author: {
        type: String,
        required: true

    },

    
    thesis_SV: {
        type: String,
        required: true

    },

    thesis_program: {
        type: String,
        required: true

    },

    thesis_faculty: {
        type: String,
        required: true

    },

    thesis_keyword: {
        type: String,
        required: true

    },

    

}, {
    timestamps: true,
});

const Thesis = mongoose.model('Thesis', thesisSchema);
module.exports = Thesis;