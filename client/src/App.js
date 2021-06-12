import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.scss";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Signup from "./views/forms/components/SignUpForm"
import Login from "./views/forms/components/LogInForm";
import Logout from "./views/Logout";
import PrivateRoute from "./views/PrivateRoute";
import Classes from "./views/classes/Classes";
import Instructors from "./views/Instructors";
import Cart from "./views/cart/Cart";
import Footer from "./views/Footer";
import ReactPlayer from "react-player";
import Video from "./assets/ANYWHERE.mp4";
import React from "react";

function App() {

  return (
    <Router>
      <div className={"d-flex flex-column justify-content-start align-items-center wrapper"}>
        <Nav />
        <div
          className="d-flex justify-content-center flex-column"
          style={{
            marginTop: '20vh'
          }}
        >
          {/* <ReactPlayer
            url={Video}
            playing={true}
            loop={true}
            height={'40vh'}
            style={{margin: 'auto auto'}}
            id={'video-player'}
        /> */}
          <Link
            to="home"
            className="button"
            style={{ color: "white", padding: "3vh 5vw", border: '1px solid white', borderRadius: '50px', backgroundColor: '#222' }}
          >
            <h4 style={{ color: "white"}}>Step Inside</h4>
          </Link>
        </div>
        <Switch>
          <Route path={"/home"} component={Home} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/login"} component={Login} />
          <Route path={"/logout"} component={Logout} />
          <Route path={"/cart"} component={Cart} />
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
