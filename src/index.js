require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://chiripal_prithvi:chiripal@cluster0.f7wm8.mongodb.net/SIGNUP?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser:true,
    useCreateIndex:true , 
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo instance');
})
mongoose.connection.on('error', (err)=>{
    console.error('Error connecting mongo', err);
})

app.get('/', requireAuth, (req,res) => {
    res.send(`Your Email is ${req.user.email}`);
});

app.listen(3000, () =>{
    console.log("listening on port 3000");
})