import StudentList from './StudentList'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import NotFound from './NotFound';
import TaskList from './TaskList';


function App() {

    return (
        <div>
            <p>Menu</p>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/students" element={<StudentList/>}/>
                    <Route path="/students/:id/tasks" element={<TaskList/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
