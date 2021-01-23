import React from "react";
import Auth from "../services/AuthService";
import { Form, Input, Button, Message } from "semantic-ui-react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
    
    this.loginResponse = this.loginResponse.bind(this)
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .then(this.loginResponse)
      .catch(function(err) {
        console.log("Error logging in", err);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  loginResponse(r) {
    if (r.status === 401) {
      this.setState({ error: r.response})
    } 
    if (r.token) {
      this.props.history.push("/home");
    }
  }

  reroute(){
    this.props.history.push("/home");
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
        <Form  error>
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
          {(this.state.error) ? <Message
            error
            header="Error"
            content={this.state.error}
            /> : ""}
          <Button onClick={this.login.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }
}
