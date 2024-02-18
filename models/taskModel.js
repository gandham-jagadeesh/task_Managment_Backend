const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const taskSchema = new schema(
    {
        taskTitle : {
            type:String,
            unique:true,
            require:true
        },

        taskDescription:{
            type:String,
            require:true
        },
        startDate:{
            type:Date,
            require:true
        },
        endingDate:{
            type:Date,
            require:true
        }
    }
)

const taskModel = mongoose.model('tasks',taskSchema,'task');
module.exports  = {taskModel,taskSchema};