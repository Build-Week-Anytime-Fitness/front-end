import {Link} from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';

export default function Footer() {
    return (
        <BottomNavigation className={'footer'}>
            <div
                className="d-flex flex-row"
                style={{ alignSelf: "end", margin: "0.5vh 2vw"}}
            >
                {" "}
                <Link
                    to="/"
                    className="btn"
                    style={{ color: "#666", margin: '0 1rem' }}
                >
                    Data settings
                </Link>
                <Link
                    to="/"
                    className="btn"
                    style={{ color: "#666", margin: "0 1rem" }}
                >
                    Do not sell my personal info
                </Link>
                <Link
                    to="/"
                    className="btn"
                    style={{ color: "#666", margin: "0 1rem" }}
                >
                    Privacy Policy
                </Link>
                <Link
                    to='/'
                    className='btn'
                    style={{ color: '#666', margin: '0 1rem'}}
                >
                    Terms and Conditions
                </Link>
                <Link
                    to="instructors"
                    className="btn"
                    style={{ color: "#666", margin: '0 1rem' }}
                >
                    Instructor Portal
                </Link>
            </div>
        </BottomNavigation>
    )
}