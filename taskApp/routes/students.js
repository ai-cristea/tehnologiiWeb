let express = require('express')
const { Op } = require('sequelize')
const Course = require('../models/course')
let router = express.Router()
const Student = require("../models/student")
const Task = require('../models/task')

Student.hasMany(Task)
Student.belongsToMany(Course, { through: "Enrollments" })

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

router.route('/courses/:courseId/students/:studentId').post(async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId)
        if (course){
            const student = await Student.findByPk(req.params.studentId)
            if (student){
                course.addStudent(student)
                await course.save()
                res.status(200).json({ message: `Student was enrolled!`})
            } else {
                res.status(404).json({ error: `Student with id ${req.params.studentId} not found!`})
            }
        } else {
            res.status(404).json({ error: `Course with id ${req.params.courseId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.route('/courses/:courseId/students').get(async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId)
        if (course){
            const students = await course.getStudents({ attributes : ['id', 'name'] })
            if (students.length > 0 ){
                res.status(200).json(students)
            } else {
                res.status(404).json({ error: `Student with id ${req.params.studentId} not found!`})
            }
        } else {
            res.status(404).json({ error: `Course with id ${req.params.courseId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;