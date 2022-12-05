let express = require('express')
const { Op } = require('sequelize')
let router = express.Router()
const Course = require("../models/course")
const Student = require('../models/student')

Course.belongsToMany(Student, { through: "Enrollments" })

router.route('/getCourses').get(async (req, res) => {
    const {simplified} = req.query;
    const {pIsDone} = req.query;
    try {
        const tasks = await Course.findAll();
        res.status(200).json(tasks);
    } catch (error){
        res.status(500).json(error);
    }
})

router.route('/addCourse').post(async (req, res) => {
    try {
        const newCourse = await Course.create(req.body) 
        res.status(200).json(newCourse)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;