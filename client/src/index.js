import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedApp from "./components/AuthenticatedApp.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Home from "./components/Home.js";
import Threads from "./components/Threads.js";
// import RouterContainer from "./services/RouterContainer";
import LoginActions from "./actions/LoginActions";

var Routes = () => (
  <Router>
    <AuthenticatedApp />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/threads" component={Threads} />
    </Switch>
  </Router>
);

let token = localStorage.getItem("jwt");
let username = localStorage.getItem("username");

if (token && username) {
  LoginActions.loginUser({ token, username });
}

ReactDOM.render(<Routes />, document.getElementById("app"));
