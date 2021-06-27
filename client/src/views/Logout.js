import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { changeAccountStatus } from '../state/actions';
import { LOGGED_OUT } from '../state/reducers/accountStatus';
export default function Logout() {
    const history = useHistory()
    const dispatch = useDispatch();
    const logout = () => {
        alert("You have been logged out. Thank you for visiting");
        localStorage.clear();
        dispatch(changeAccountStatus(LOGGED_OUT));
        history.push("/home")
    }
    return (
        <div 
        className='d-flex flex-column justify-content-center align-items-center logout'
        style={{
            margin: "0vh auto",
            backgroundColor: 'transparent',
            height: '100vh',
            position: 'absolute',
            marginTop: '-45vh'
          }}
    >
        <h4>Thank You For Visiting</h4>
        <Link 
         onClick={logout()}
         style={{
            margin: "5vh 0",
            fontSize: "3vh",
            color: "white",
            textDecoration: "none",
            border: '.05rem solid white',
            padding: '2rem 3rem',
            boxShadow:'0 0 1.5rem white',
            backgroundColor: '#222'
          }}
        >Logout</Link>

    </div>
    )
}