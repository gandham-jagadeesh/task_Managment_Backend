const mongoose  = require('mongoose');
const Schema    = require('mongoose').Schema;

const registerSchema = new Schema({
    email : {
        type:String,
        unique : true,
        require: true,
    },
    password:{
        type:String,
        unique:true,
        require:true

    }
});

const registerModel = mongoose.model('registerModel',registerSchema);

module.exports = registerModel;