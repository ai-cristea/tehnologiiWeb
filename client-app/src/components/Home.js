import { useNavigate } from "react-router-dom";

function Home () {

    const navigate = useNavigate();

    return(
        <div>
            <p>Home</p>
            <button onClick={() => {
                navigate("/students")
            }}> Go to students! </button>
        </div>
    )
}

export default Home;