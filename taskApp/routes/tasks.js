let express = require('express')
const { Op } = require('sequelize')
const Student = require('../models/student')
let router = express.Router()
const Task = require("../models/task")

const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
        res.status(400).json({"error" : "wrong input for id"})
    } else {
        next();
    }
}

router.route('/getTask/:id').get(checkId, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task){
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: `Task with id ${req.params.id} not found!`})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.route('/getTasks').get(async (req, res) => {
    const {simplified} = req.query;
    const {pIsDone} = req.query;
    try {
        const tasks = await Task.findAll({
            //attributes: ['title'],
            attributes: simplified ? {exclude: "id"} : undefined,
            where: pIsDone ? {isDone: Boolean(pIsDone) } : undefined
        });
        res.status(200).json(tasks);
    } catch (error){
        res.status(500).json(error);
    }
})

router.route('/addTask').post(async (req, res) => {
    try {
        const newTask = await Task.create(req.body) 
        res.status(200).json(newTask)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.route('/students/:studentId/task').post(async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.studentId)
        if (student){
            const newTask = new Task(req.body) 
            newTask.StudentId = student.id;
            await newTask.save();
            res.status(200).json({"message": "task created!"})
        } else {
            res.status(404).json({ error: `Student with id ${req.params.studentId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.route('/students/:studentId/task').get(async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.studentId, {
            include: [Task]
        })
        if (student){
            res.status(200).json(student.Tasks)
        } else {
            res.status(404).json({ error: `Student with id ${req.params.studentId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.route('/students/:studentId/task/:taskId').put(async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.studentId)
        if (student){
            const tasks = await student.getTasks({id : req.params.taskId})
            let task = tasks.shift();
            if (task){
                task = await task.update(req.body);
            }
            res.status(200).json(task)
        } else {
            res.status(404).json({ error: `Student with id ${req.params.studentId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.route('/modifyTask/:id').put(async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task){
            const updatedTask = await task.update(req.body);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: `Task with id ${req.params.id} not found!`})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.route('/deleteTask/:id').delete((req, res) => {
    try {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((rows)=> {
            if (rows  === 1){
                res.status(200).json({ status: "task deleted!"})
            } else {
                res.status(202).json({ status: "task does not exists!"})
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;