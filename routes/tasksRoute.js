const router = require('express').Router();
const userTasksModel = require('../models/userTaskModel'); 
const {taskSchema,taskModel} = require('../models/taskModel');

router.get('/',async(req,res)=>{
    try{
        const email = req.body.email;
        const allTasksData = await userTasksModel.find({email:email});
        res.send({data:allTasksData[0].tasks});
    }
    catch(e){
     res.status(500).send({'msg':'internal error '})
    }

});


//add a task
router.post('/add',async(req,res)=>{
    try{

        const email = req.body.email;
        const task  = req.body.tasks;
        const allTasksData = await userTasksModel.find({email:email});
        const newTask  = new taskModel(task);
        if(allTasksData.length == 0){
            const newDoc   = new userTasksModel({email:email,tasks:[newTask]});
            await newDoc.save();
            res.status(200).send({msg:'added sucessfully'});
        }else{
            const data = allTasksData[0]
            const array = data.tasks;
            array.push(newTask);
            const response = await userTasksModel.findOneAndUpdate({email:email},{tasks:array});
            res.status(200).send({task:response});
        }
    }
    catch(e){
        res.status(400).send({'msg':'not inserted the task'});
    }
});



//update specific task
router.post('/:id',async(req,res)=>{

});


//delete a specific task
router.post('/del/:id',async(req,res)=>{

});

module.exports = router;
