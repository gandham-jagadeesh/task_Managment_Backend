const express = require('express');
const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const registerModel = require('./models/registerModel');
const url = "mongodb+srv://MarkNicholas:Mark2002112@cluster0.ohkkzev.mongodb.net/Developer";



async function dbConnection(){
    try{
        await mongoose.connect(url)
    }
    
    catch(e){
    console.log('errors catching');
    }
}

dbConnection();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/login',async(req,res)=>{
 const {email,password} = req.body;
 const users = await registerModel.find({email});
 const length    = users.length
 if (length) {
 const user = users[0];
 const userGmail =  user.email;
 const hash = user.password;
 const result = await bcrypt.compare(password,hash);

 if(result){
    const token = jwt.sign({ userId: userGmail }, 'your-secret-key', {
        expiresIn: '1h',
        });
        res.status(200).json({ token });       
 }
 else{
    res.status(203).send({res:'password not correct'});
 }}
 else{
    res.status(400).send({'res':"gmail not found"});
 }
 
});

app.post("/register",async (req,res)=>{
 try{
    const email = req.body.email;
    const password = req.body.password;
    const hashed = await bcrypt.hash(password,10);
    const data  = new registerModel({
        email:email,
        password:hashed
    })
    console.log(email,password);
    await data.save();
    res.status(200).send({response:'registered sucessfully'})
}
 
catch(e){
    res.status(400).send({data:e});
    console.log('error',e);
}

});


app.listen(5000,()=>{
    console.log('listening at 5000 port');
});