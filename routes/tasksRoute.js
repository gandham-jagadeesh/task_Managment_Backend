const router = require('express').Router();
const userTasksModel = require('../models/userTaskModel'); 
const {taskModel} = require('../models/taskModel');


//get all the tasks
router.get('/',async(req,res)=>{
    try{
        const email = req.body.email;
        const allTasksData = await userTasksModel.findOne({email:email});
        res.send({data:allTasksData.tasks});
    }
    catch(e){
     res.status(500).send({'msg':'internal error '})
    }

});


//adding a task
router.post('/add',async(req,res)=>{
    try{

        const email = req.body.email;
        const task  = req.body.tasks;
        const allTasksData = await userTasksModel.findOne({email:email});
        const newTask  = new taskModel(task);
        console.log(allTasksData);
        if(allTasksData.length == 0){
            const newDoc   = new userTasksModel({email:email,tasks:[newTask]});
            await newDoc.save();
            res.status(200).send({msg:'added sucessfully'});
        }else{
            const array = allTasksData.tasks;
            array.push(newTask);
            console.log(array);
            const response = await userTasksModel.findOneAndUpdate({email:email},{tasks:array});
            res.status(200).send({task:response});
        }
    }
    catch(e){
        console.log(e);
        res.status(400).send({'msg':'not inserted the task'});
    }
});



//updating specific task
router.post('/update/:id',async(req,res)=>{
 const email = req.body.email;
 const id    = req.params.id;
 const rawTask  = req.body.task;
 const task     = new taskModel(rawTask);
  try{
    const allTasksData = await userTasksModel.findOne({email:email});
    const modifiedTasks = allTasksData.tasks.map((each)=>{
        console.log(String(each._id),id,String(each._id) === id);
        if(String(each._id) == id){
           return task
        }
        return each
    })
    await userTasksModel.updateOne({tasks:modifiedTasks});
   res.status(200).send({msg:'update sucessfully',task:task});
  }
  catch(error){
    console.log(error);
  res.status(400).send({msg:"not updated"});
  }
  
});


//deleting a specific task
    router.post('/del/:id',async(req,res)=>{
    try{
    const email = req.body.email;
    const id    = req.params.id;
    const allTasks   = await userTasksModel.findOne({email:email});
    const modifiedTasks      = allTasks.tasks.filter((each)=>{
        if(String(each._id) !== id){
            return true
        }
        return false
    })
    await userTasksModel.updateOne({tasks:modifiedTasks});
    res.status(200).send({msg:'deleted sucessfully'});
    }
    catch(error){
    res.status(400).send({msg:"not deleted"})
    }

    });






module.exports = router;
