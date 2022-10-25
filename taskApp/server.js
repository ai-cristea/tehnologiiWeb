let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

let app = express()
let router = express.Router()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

const array = [
    {
        title: "tema1",
        isDone: true
    },{
        title: "tema2",
        isDone: false
    },{
        title: "tema3",
        isDone: false
    },{
        title: "tema4",
        isDone: false
    }
]

router.route('/getTasks').get((req, res)=> {
    res.json(array)
})

router.route('/addTask').post((req, res) => {
    let task = req.body
    array.push(task)

    res.json(task)
})

let port = 8080
app.listen(port)

console.log("Server is running on http://localhost:" + port)
