import { useEffect, useState } from "react"
import Student from './Student'
import './StudentList.css'
import StudentForm from './StudentForm'

const SERVER = 'http://localhost:8080/api'

function StudentList () {
    const [students, setStudents] = useState([])

    // part II
    const addStudent = async (student) => {
        await fetch(`${SERVER}/addStudent`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        getStudents()
    }
    // end part II

    const getStudents = async () => {
        const response = await fetch(`${SERVER}/getStudents`)

        const data = await response.json()
        setStudents(data)
    }

    useEffect(() => {
        getStudents()
      }, [])

    return (

        <div className="student-list">
            {
                students.map(e => <Student key={e.id} item={e} />)
            }
            <StudentForm onAdd={addStudent}/>
        </div>
    )
}

export default StudentList
