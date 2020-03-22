import React, { Component } from "react";
import Form from "./Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      user_password: "",
      type: "signup"
    };
  }

  //changeType() {}

  render() {
    return <Form />;
  }
}
export default App;


// if this.state.isauthnenticated, render authenticatedApp, else render preauthenticatedApp