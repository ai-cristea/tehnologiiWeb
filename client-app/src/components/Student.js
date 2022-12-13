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
        </div>
    )
}

export default Student;