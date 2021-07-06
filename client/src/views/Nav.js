import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Logo from '../assets/anywhereWhite.png';
import { useSelector } from 'react-redux';
import { 
    LOGGED_OUT,
    STUDENT,
    INSTRUCTOR
} from '../state/reducers/accountStatus';
export default function Nav() {
    const accountStatus = useSelector(state=>state.userState.accountStatus);
    const displayLinks =(accountStatus)=>{
        if(accountStatus===LOGGED_OUT){
            return(
                <>
                    <Link
                        id="nav-sign-up"
                        to="signup" className="button">
                        Signup
                    </Link>
                    <Link
                        id="nav-log-in"
                        to="login" className="button">
                        Login
                    </Link>
                    <Link
                        id="nav-classes"
                        to="classes" className="button">
                        Classes
                    </Link>
                </>
            );
        }
        else if(accountStatus===STUDENT||accountStatus===INSTRUCTOR){
            return(
                <>
                    <Link
                        id="nav-classes"
                        to="classes" className="button">
                        Classes
                    </Link>
                    <Link
                        id="nav-cart"
                        to="cart" className="button">
                        Cart
                    </Link>
                    <Link
                        to="logout" className="button">
                        Logout
                    </Link>
                </>
            );
        }
        else{
            return(
                <div>Failed to display navbar</div>
            );
        }
    };  

    return (
    <AppBar className={'d-flex flex-row flex-wrap justify-content-between'} position={'fixed'} style={{backgroundColor: 'black'}}>
        <div className={'d-flex flex-row'} style={{width: '550px'}}>
            <img className={'image-resizer'} src={Logo} alt='Anywhere Fitness'></img>
            <Link to="/home" className="button">
                <h1 style={{color: '#AAA'}}>Anywhere Fitness Club</h1>
            </Link>
        </div>
        <div className={"d-flex flex-row flex-wrap justify-content-center"} style={{width: '550px'}}>
            {
                displayLinks(accountStatus)
            }
            {/* <Link
                id="nav-classes"
                to="classes" className="button">
                Classes
            </Link>
            <Link id="nav-instructor" to="instructors" className="button">
                Instructor Portal
            </Link> */}
            
        </div>

    </AppBar>
    )
}