import {useState} from "react"
import './StudentForm.css'

function StudentsForm (props) {
    const {onAdd} = props
    const [name, setName] = useState('')
    const [status, setStatus] = useState('ACTIVE')

    const options = [{
        label: 'ACTIVE',
        value: 'ACTIVE'
    }, {
        label: 'INACTIVE',
        value: 'INACTIVE'
    }, {
        label: 'FREEZED',
        value: 'FREEZED'
    }]

    const addStudent = () => {
        onAdd({
            name,
            status
        })
    }

    return (
        <div className="student-form">
            <div className="name">
                <input type='text' placeholder='name' onChange={(evt) => setName(evt.target.value)}></input>
            </div>
            <div className="status">
                <select onChange={(evt) => setStatus(evt.target.value)}>
                    {
                        options.map((o) => <option key={o.value} value={o.value}> {o.label} </option>)
                    }
                </select>
            </div>
            <div className="add">
                <input type='button' value='Add student' onClick={addStudent}/>
            </div>
        </div>
    )
}

export default StudentsForm;