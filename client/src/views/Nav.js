import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'

export default function Nav() {
    return (
    <AppBar className={'d-flex flex-row flex-wrap justify-content-between'}>
        <div>
            <h1>Anywhere Fitness</h1>
        </div>
        <div className={"d-flex flex-row flex-wrap justify-content-center"}>
            <Link to="/home" className="btn">
                Home
            </Link>
            <Link
                to="login" className="btn">
                Signup/ Login
            </Link>
            <Link
                to="logout" className="btn">
                Logout
            </Link>

            <Link
                to="classes" className="btn">
                Classes
            </Link>
            <Link to="instructors" className="btn">
                Instructor Portal
            </Link>
        </div>

    </AppBar>
    )
}