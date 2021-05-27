import {Link} from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';

export default function Footer() {
    return (
        <BottomNavigation className={'footer d-flex'} style={{height: '10vh', textAlign: 'center'}}>
            <div
                className="d-flex flex-row flex-wrap"
                style={{ alignSelf: "center", margin: "5vh auto"}}
            >
                {/* {" "}
                <Link
                    to="/"
                    className="button"
                    style={{ color: "#666", margin: '0 1rem' }}
                >
                    Data settings
                </Link> */}
                <Link
                    to="/"
                    className="button"
                    style={{ color: "#666", margin: "0 1rem" }}
                >
                    Do not sell my personal info
                </Link>
                <Link
                    to="/"
                    className="button"
                    style={{ color: "#666", margin: "0 1rem" }}
                >
                    Privacy Policy
                </Link>
                <Link
                    to='/'
                    className='button'
                    style={{ color: '#666', margin: '0 1rem'}}
                >
                    Terms and Conditions
                </Link>
                <Link
                    to="instructors"
                    className="button"
                    style={{ color: "#666", margin: '0 1rem' }}
                >
                    Instructor Portal
                </Link>
            </div>
        </BottomNavigation>
    )
}