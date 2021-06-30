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
import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
import {getAccountStatus} from "./state/actions/index";
import Checkout from "./views/cart/Checkout";
import CheckoutSuccess from "./views/cart/CheckoutSuccess";
function App() {
  // if previously logged in, grab the account status using the actions
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAccountStatus());
  },[dispatch]);
  //
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
          <ReactPlayer
            url={Video}
            playing={true}
            loop={true}
            height={'40vh'}
            style={{margin: 'auto auto', }}
            id={'video-player'}
            playsinline={true}
        />
          <Link
            to="home"
            className="button"
            style={{ color: "white", padding: "3vh 5vw", border: '1px solid white', borderRadius: '50px', margin: '10vh 0', backgroundColor: '#222', opacity: '0.8' }}
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
          <PrivateRoute exact path={"/checkout"} component={Checkout} />
          <PrivateRoute exact path={"/checkout/success"} component={CheckoutSuccess} />
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
