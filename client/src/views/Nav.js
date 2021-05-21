import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Logo from '../assets/transparent.png'

export default function Nav() {
    return (
    <AppBar className={'d-flex flex-row flex-wrap justify-content-between'} color={'inherit'}>
        <div className={'d-flex flex-row flex-wrap'}>
            <img className={'image-resizer'} src={Logo} alt='Anywhere Fitness'></img>
            <Link to="/home" className="btn">
                <h1>Anywhere Fitness Club</h1>
            </Link>
        </div>
        <div className={"d-flex flex-row flex-wrap justify-content-center"}>

            <Link
                to="signup" className="btn">
                Signup
            </Link>
            <Link
                to="login" className="btn">
                Login
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