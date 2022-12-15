import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Task from './Task'
import './TaskList.css'

const SERVER = 'http://localhost:8080/api'

function TaskList () {
    const [tasks, setTasks] = useState([])
    const {id} = useParams();

    const navigate = useNavigate();

    const getTasks = async () => {
        const response = await fetch(`${SERVER}/students/${id}/task`)

        const data = await response.json()
        setTasks(data)
    }

    useEffect(() => {
        getTasks()
      }, [])

    return (
        <div>
            <div className="task-list">
                {
                    tasks.map(e => <Task key={e.id} item={e} />)
                }
            </div>
            <button onClick={() => {
                navigate("/students")
            }}> Go to students</button>
        </div>
    )
}

export default TaskList