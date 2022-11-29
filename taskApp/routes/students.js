let express = require('express')
const { Op } = require('sequelize')
let router = express.Router()
const Student = require("../models/student")
const Task = require('../models/task')

Student.hasMany(Task)

router.route('/getStudents').get(async (req, res) => {
    const {simplified} = req.query;
    const {pIsDone} = req.query;
    try {
        const tasks = await Student.findAll();
        res.status(200).json(tasks);
    } catch (error){
        res.status(500).json(error);
    }
})

router.route('/addStudent').post(async (req, res) => {
    try {
        const newTask = await Student.create(req.body) 
        res.status(200).json(newTask)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;