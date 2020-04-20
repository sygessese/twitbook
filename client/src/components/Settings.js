import React, { Component } from "react";
import { Button, Form, Input, Radio, Select, Icon } from "semantic-ui-react";
import UsersServices from "../services/UsersServices";
import LoginActions from "../actions/LoginActions";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameMessage: "",
      email: "",
      emailMessage: "",
      password: "",
      password2: "",
      passwordMessage: ""
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(e, type) {
    e.preventDefault();
    console.log(this.state[type]);
    UsersServices.updateUser({ [type]: this.state[type] })
      .then(() => {
        if (type === "username") {
          LoginActions.updateUsername(this.state.username);
        }
        this.setState({ [type + "Message"]: "Success!", [type]: "" }, () => {
          setTimeout(() => {
            this.setState({ [type + "Message"]: "" });
          }, 3000);
        });
      })
      .catch(() =>
        this.setState({ [type + "Message"]: "Error!" }, () => {
          setTimeout(() => {
            this.setState({ [type + "Message"]: "" });
          }, 3000);
        })
      );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, email } = this.state;
    this.setState({ submittedName: name, submittedEmail: email });
  };

  render() {
    const { username, email, password, password2 } = this.state;

    return (
      <div
        style={{
          paddingTop: "7em",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "10%"
        }}
      >
        <h1 style={{ marginBottom: "1em" }}>Settings: </h1>
        <Form>
          <Form.Group style={{ marginBottom: "3em" }}>
            <Form.Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange.bind(this)}
              width={8}
              style={{ marginBottom: "1em" }}
            />
            <Form.Button
              content="Update"
              onClick={e => this.updateUser(e, "username")}
            />
            {this.state.usernameMessage}
          </Form.Group>

          <Form.Group style={{ marginBottom: "3em" }}>
            <Form.Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange.bind(this)}
              width={8}
              style={{ marginBottom: "1em" }}
            />
            <Form.Button
              content="Update"
              onClick={e => this.updateUser(e, "email")}
            />{" "}
            {this.state.emailMessage}
          </Form.Group>

          <Form.Group>
            <Form.Input
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange.bind(this)}
              width={8}
              style={{ marginBottom: "1em" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={this.handleChange.bind(this)}
              width={8}
              style={{ marginBottom: "1em" }}
            />
            <Form.Button
              content="Update"
              onClick={e => {
                if (password !== password2) {
                  this.setState(
                    { passwordMessage: "Passwords don't match!" },
                    () => {
                      setTimeout(() => {
                        this.setState({ passwordMessage: "" });
                      }, 3000);
                    }
                  );
                  return;
                }
                this.setState({ password2: "" });
                this.updateUser(e, "password");
              }}
            />{" "}
            {this.state.passwordMessage}
          </Form.Group>
        </Form>
      </div>
    );
  }
}

// form
// update username, password, email
// select icon photo
// display who youre following and who follows you
// a remove button for who youre following

// multiple buttons with onclick, only one button can be submit for the entire form

// get request user info on page load
