const mongoose  = require('mongoose');
const Schema    = require('mongoose').Schema;

const loginSchema = new Schema({
 email : {
        type:String,
        unique : true,
        require: true,
    },
    password:{
        type:String,
        unique:true,
        require:true,
        max:8
    }
});

const loginModel = mongoose.model('registerModel',loginSchema)

module.exports = loginModel;