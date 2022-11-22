let express = require('express')
let router = express.Router()
const Task = require("../Task")

const tasks = [new Task(1, "tema1", true),
new Task(2, "tema2", false),
new Task(3, "tema3", false),
new Task(4, "tema4", false)]

const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
        res.status(400).json({"error" : "wrong input for id"})
    } else {
        next();
    }
}

router.route('/getTask/:id').get(checkId, (req, res) => {
    const task = tasks.find(task => task.id == req.params.id)
    if (task) {
        res.status(200).json(task)
    } else {
        res.status(400).json({error: "task not found!"})
    }
})

router.route('/getTasks').get((req, res) => {
    //throw new Error("custom error");
    let filteredTasks = [];
    if (req.query.isDone) {
        filteredTasks = tasks.filter(task => (task.isDone).toString().toLowerCase() == req.query.isDone)
    } else {
        filteredTasks = tasks;
    }
    res.json(filteredTasks)
})

router.route('/addTask').post((req, res) => {
    let task = new Task(req.body.id, req.body.title, req.body.isDone);
    tasks.push(task)

    res.json(task)
})

router.route('/modifyTask/:id').put((req, res) => {
    let task = tasks.find(task => task.id == req.params.id)

    task.title = req.body.title;
    task.isDone = req.body.isDone;

    res.json(task)
})

router.route('/deleteTask/:id').delete((req, res) => {
    let index = tasks.findIndex(task =>  task.id == req.params.id)

    tasks.splice(index, 1);

    res.json(tasks);
})

module.exports = router;