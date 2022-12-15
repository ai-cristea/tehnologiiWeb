import { Link } from 'react-router-dom';
import './Student.css'

function Student (props) {
    const {item} = props;

    return (

        <div className="student"> 
            <div className="name">
                {item.name}
            </div>
            <div className="status">
                {item.status}
            </div>
            <div className="tasks">
                <Link to={`/students/${item.id}/tasks`}> See tasks... </Link>
            </div>
        </div>
    )
}

export default Student;