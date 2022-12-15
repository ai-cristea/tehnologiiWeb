import './Task.css'

function Task (props) {
    const {item} = props;

    return (

        <div className="task"> 
            <div className="title">
                {item.title}
            </div>
            <div className="isDone">
                {item.isDone}
            </div>
        </div>
    )
}

export default Task;