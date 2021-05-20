import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import PrivateRoute from "./views/PrivateRoute";
import Classes from "./views/Classes";
import Instructors from "./views/Instructors";
import Footer from "./views/Footer";

function App() {
  <button></button>;
  return (
    <Router>
      <div className={"d-flex flex-column justify-content-center wrapper"}>
        <Nav />
        <div
          className="d-flex justify-content-center align-items-"
        >
          <button
            to="home"
            className="btn"
            style={{ color: "#666", marginTop: '-40vh' }}
          >
            <h4 style={{ color: "black", padding: "3vh 5vw", border: '1px solid black' }}>Step Inside</h4>
          </button>
        </div>
        <Switch>
          <Route path={"/home"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/logout"} component={Logout} />
          {/* <PrivateRoute exact path={"/classes"} component={Classes}/> */}
          <Route exact path={"/classes"} component={Classes} />

          <PrivateRoute exact path={"/instructors"} component={Instructors} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
