import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./App.css";
import Nav from './views/nav'
import Home from './views/home'
import Login from './views/login'
import Logout from './views/logout'
import PrivateRoute from "./views/PrivateRoute";
import Classes from "./views/classes";
import Instructors from "./views/instructors";
import Footer from './views/footer'

function App() {
    return (
        <Router>
            <div className={'d-flex flex-column justify-content-center wrapper'}>
                <Nav/>
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/login"} component={Login} />
                    <Route path={"/logout"} component={Logout}/>
                    <PrivateRoute exact path={"/classes"} component={Classes}/>
                    <PrivateRoute exact path={"/instructors"} component={Instructors}/>
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
