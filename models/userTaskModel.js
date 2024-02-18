const mongoose = require('mongoose');
const schema   = mongoose.Schema;
const {taskModel,taskSchema}       = require("./taskModel");

const userTaskSchema = new schema({
    email : {
        type:String,
        unique:true
    },
    tasks:[taskSchema]
})

const userTasksModel = mongoose.model('userTasks',userTaskSchema,'userTask');

module.exports = userTasksModel;