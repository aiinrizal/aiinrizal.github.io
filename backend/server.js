const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const path = require ('path');


require('dotenv').config({ path: '.env'});

const app = express();
const PORT = process.env.PORT || 8080;
//var app = express();
//app.set("port", PORT);

//mongodb+srv://ainhazwani98:Ain981217@@thesisq.sw0rc.azure.mongodb.net/ThesisQ?retryWrites=true&w=majority;

app.use(cors());
app.use(express.json());
app.options('*', cors());
//app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
});

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const userRouter = require('./routes/users');
const thesisRouter = require('./routes/thesis'); 
const AuthRoute = require('./routes/auth');


app.use('/thesis', thesisRouter);
app.use('/users', userRouter); 
//app.use('/', AuthRoute);

if(process.env.ATLAS_URI === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'));
    })
}


app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})