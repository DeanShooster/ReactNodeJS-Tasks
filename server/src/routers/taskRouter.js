require('../db/mongoose');
const express = require('express');
const Task = require('../db/model/task');
const {TaskError} = require('../middleware/errorHandler');

const router = express.Router();

//-------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get('/tasks/:page',async(req,res,next)=>{
    try{
        const page = req.params.page;
        const tasks = await Task.find().limit(4).skip((page-1)*4);
        res.send(tasks);
    }
    catch{ next(e);}
});


router.get('/task/:id', async(req,res,next)=>{
    try{
        const task = await Task.findOne({title: req.params.id});
        if(!task) return next(new TaskError(`Task ${req.params.taskName} was not found.`,404));
        res.send([task]);
    }
    catch{ next(e);}
});

//-------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post('/task',async(req,res,next)=>{
    try{
        const newTask = { title: req.body.title, info: req.body.info, check: false, date: req.body.date };
        if(newTask.title === '' ) return next(new TaskError('Could not create a new Task. Missing information.',404));
        const task = new Task(newTask);
        if(!task) return next(new TaskError('Could not create a new Task. Missing information.',404));
        await task.save();
        res.send(task);
    }
    catch(e){ next(e); }
});

//-------------------------------------- PATCH REQUESTS --------------------------------------------------------------- //

router.patch('/task',async(req,res,next)=>{
    try{
        const task = await Task.updateOne({_id: req.body.id}, {$set: {check: req.body.check}});
        if(!task.acknowledged) return next( new TaskError('Failed to update the task. Task not found.',404) );
        res.send(task);
    }
    catch(e){next(e);}
});

//-------------------------------------- DELETE REQUESTS --------------------------------------------------------------- //

router.delete('/tasks', async(req,res,next)=>{
    try{
        const task = await Task.deleteMany( {_id: {$in: req.body }});
        console.log(task);
        if(!task.acknowledged) return next(new TaskError('Failed to delete the tasks. Tasks not found.',404));
        res.send(task);
    }
    catch(e){next(e);}
});

module.exports = router;