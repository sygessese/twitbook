import React from "react";
import { Tab } from "semantic-ui-react";

import LoginStore from "../stores/LoginStore";
import Login from "./Login";
import Signup from "./Signup";

class LoggedOut extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.reroute();
    }

    // reroutes to home if user is still logged in
    reroute() {
      if (LoginStore.isLoggedIn()) {
        this.props.history.push("/home");
      }
    }
    // children of routed components won't have access to router
    // pass history to allow routing
    render() {
      const panes = [
        {
          menuItem: "Login",
          render: () => (
            <Tab.Pane>
              <Login history={this.props.history} />
            </Tab.Pane>
          )
        },
        {
          menuItem: "Signup",
          render: () => (
            <Tab.Pane>
              <Signup history={this.props.history} />
            </Tab.Pane>
          )
        }
      ];
      
        return (
          <div
            style={{
              paddingTop: "7%",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "10%"
            }}
          >
            <Tab panes={panes} />
          </div>
        );

    }
  }

  export default LoggedOut
