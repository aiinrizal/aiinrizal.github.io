const router = require('express').Router();
let Thesis = require('../models/thesis.model');

router.route('/').get((req, res)=> {
    Thesis.find()
    .then(theses => res.json(theses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const thesis_title = req.body.thesis_title;
    const thesis_description = req.body.thesis_description;
    const thesis_author = req.body.thesis_author;
    const thesis_SV = req.body.thesis_SV;
    const thesis_program = req.body.thesis_program;
    const thesis_faculty = req.body.thesis_faculty;
    const thesis_keyword = req.body.thesis_keyword;
    

    const newThesis = new Thesis({
        user_id,
        thesis_title,
        thesis_description,
        thesis_author,
        thesis_SV,
        thesis_program,
        thesis_faculty,
        thesis_keyword,
    });

    newThesis.save()
    .then(()=> res.json('Thesis added'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:user_id').get((req, res) => {
    Thesis.findById(req.params.user_id)
    .then(thesis => res.json(thesis))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:user_id').delete((req, res) => {
    Thesis.findByIdAndDelete(req.params.user_id)
    .then(() => res.json('Thesis deleted.'+ JSON.stringify(req.params.user_id)))
    .catch(err => res.status(400).json('Error: ' + err + req)); 
    console.log(req.params.user_id);
    // Thesis.findOneAndRemove(req.user_id)
    // .then(() => res.json('helo gedik '+req.user_id))
});


   

router.route('/update/:user_id').post((req, res) => {
    console.log("try edit" +req.params.user_id)
    Thesis.findById(req.params.user_id)
    .then(thesis => {
        thesis.user_id = req.body.user_id;
        thesis.thesis_title = req.body.thesis_title;
        thesis.thesis_description = req.body.thesis_description;
        thesis.thesis_author = req.body.thesis_author;
        thesis.thesis_SV = req.body.thesis_SV;
        thesis.thesis_program = req.body.thesis_program;
        thesis.thesis_faculty = req.body.thesis_faculty;
        thesis.thesis_keyword = req.body.thesis_keyword;

        thesis.save()
        .then(() => res.json('Thesis Updated'))
        .catch(err => res.status(400).json('Error: ' + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;