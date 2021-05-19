import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./App.css";
import Nav from './views/Nav'
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import PrivateRoute from "./views/PrivateRoute";
import Classes from "./views/Classes";
import Instructors from "./views/Instructors";
import Footer from './views/Footer'

function App() {
    return (
        <Router>
            <div className={'d-flex flex-column justify-content-center wrapper'}>
                <Nav/>
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/login"} component={Login} />
                    <Route path={"/logout"} component={Logout}/>
                    {/* <PrivateRoute exact path={"/classes"} component={Classes}/> */}
                    <Route exact path={"/classes"} component={Classes}/>

                    <PrivateRoute exact path={"/instructors"} component={Instructors}/>
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
