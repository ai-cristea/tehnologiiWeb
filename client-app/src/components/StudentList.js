import { useState, useEffect } from "react";
import Student from './Student'
import './StudentList.css'

const SERVER = 'http://localhost:8080/api'

function StudentList () {
    const [students, setStudents] = useState([])

    const getStudents = async () => {
        const response = await fetch( SERVER + "/getStudents")
        const data = await response.json()
        setStudents(data)
    }

    useEffect( () => {
        getStudents()
    }, [])

     return (
        <div className="student-list">
            {
                students.map(e => <Student key={e.id} item={e} />)
            }
        </div>
     ) 
}

export default StudentList;