import React from "react";
import Auth from "../services/AuthService";
import { Form, Input, Button } from "semantic-ui-react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({ [e.target.id]: event.target.value });
  }

  render() {
    return (
      <div
        style={{
          marginTop: "7%",
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "10%"
        }}
      >
        <h1>Login</h1>
        <Form>
          <Form.Field
            control={Input}
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            id="username"
            placeholder="Username"
            label="Username"
          />
          <Form.Field
            control={Input}
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            id="password"
            placeholder="Password"
            label="Password"
            type="password"
          />
          <Button onClick={this.login.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }
}
