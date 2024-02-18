const mongoose = require('mongoose');

const url = "mongodb+srv://MarkNicholas:Mark2002112@cluster0.ohkkzev.mongodb.net/Developer";



async function dbConnection(){
    try{
        await mongoose.connect(url)
        console.log('sucessfully connected database');
    }
    
    catch(error){
      console.log(error);
    }
}

dbConnection();
