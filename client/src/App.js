import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Signup from "./views/forms/components/SignUpForm"
import Login from "./views/forms/components/LogInForm";
import Logout from "./views/Logout";
import PrivateRoute from "./views/PrivateRoute";
import Classes from "./views/classes/Classes";
import Instructors from "./views/Instructors";
import Footer from "./views/Footer";

function App() {
  <button></button>;
  return (
    <Router>
      <div className={"d-flex flex-column justify-content-start align-items-center wrapper"}>
        <Nav />
        <div
          className="d-flex justify-content-center align-items-start"
        >
          <Link
            to="home"
            className="button"
            style={{ color: "#666", marginTop: '3vh', marginBottom: '15vh', padding: "3vh 5vw" }}
          >
            <h4 style={{ color: "black"}}>Step Inside</h4>
          </Link>
        </div>
        <Switch>
          <Route path={"/home"} component={Home} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/login"} component={Login} />
          <Route path={"/logout"} component={Logout} />

          <PrivateRoute exact path={"/classes"} component={Classes}/>
          <PrivateRoute exact path={"/instructors"} component={Instructors} />

          {/* <Route exact path={"/classes"} component={Classes} /> */}
          {/* <Route exact path={"/instructors"} component={Instructors} /> */}
          
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
