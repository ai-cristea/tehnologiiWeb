import { Link } from "react-router-dom";

function NotFound () {

    return(
        <div>
            <p>Page Not Found</p>
            <Link to={"/"}> Go to homepage!</Link>
        </div>
    )
}

export default NotFound;