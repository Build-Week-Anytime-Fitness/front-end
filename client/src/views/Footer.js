import {Link} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";

export default function Footer() {
    return (
        <BottomNavigation
            className={"footer d-flex align-content-center-content-center"}
            style={{height: "10vh", textAlign: "center", backgroundColor: 'black', color: '#AAA', marginTop: '50vh'}}
        >
            <div
                className="d-flex flex-row flex-wrap"
            >
                {" "}

                <Link
                    to="/"
                    className="button"
                    style={{color: "#666", margin: "0 1rem"}}
                >
                    Do not sell my personal info
                </Link>
                <Link
                    to="/"
                    className="button"
                    style={{color: "#666", margin: "0 1rem"}}
                >
                    Terms and Conditions
                </Link>
                <Link
                to="/"
                className="button"
                style={{ color: "#666", margin: '0 1rem' }}
            >
                Data settings
            </Link>
                <Link
                    to="/"
                    className="button"
                    style={{color: "#666", margin: "0 1rem"}}
                >
                    Privacy Policy
                </Link>

                <Link
                    to="/home"
                    className="button"
                    style={{color: "#666", margin: "0 1rem"}}
                >
                    Home
                </Link>
            </div>
        </BottomNavigation>
    );
}
