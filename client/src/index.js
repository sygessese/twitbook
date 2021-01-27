import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedApp from "./components/AuthenticatedApp.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Home from "./components/Home.js";
import Threads from "./components/Threads.js";
import Posts from "./components/Posts.js";
import LoginActions from "./actions/LoginActions";
import Settings from "./components/Settings";
import LoggedOut from "./components/LoggedOut.js";
import NotFound from "./components/NotFound.js";

// Mounts AuthenticatedApp (nav bar)
// Mounts an additional component depending on URL
var Routes = () => (
  <Router>
    <AuthenticatedApp /> 
    <Switch>
      <Route path="/" exact component={LoggedOut} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/threads" exact component={Threads} />
      <Route path="/threads/:thread_id" component={Posts} />
      <Route path="/home" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

let token = localStorage.getItem("jwt");
let username = localStorage.getItem("username");

if (token && username) {
  LoginActions.loginUser({ token, username });
}

ReactDOM.render(<Routes />, document.getElementById("app"));
