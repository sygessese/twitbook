import React from "react";
import Auth from "../services/AuthService";
import { Form, Input, Button, Message } from "semantic-ui-react";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      serverValidationError: "",
      clientEmailValidationError: false,
      clientPasswordValidationError: false
    };
  }

  signup(e) {
    e.preventDefault();
    Auth.signup(this.state.username, this.state.password, this.state.email)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({ error: err.response });
      });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: event.target.value });
  }

  validate(field) {
    switch (field) {
      case "username":
        console.log("Oranges are $0.59 a pound.");
        break;
      case "password":
        let passwordRegex = RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})"
        );
        !passwordRegex.test(this.state.password)
          ? this.setState({
              clientPasswordValidationError: true
            })
          : this.setState({ clientPasswordValidationError: false });
        break;
      case "email":
        let emailRegex = RegExp(
          "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$"
        );
        !emailRegex.test(this.state.email)
          ? this.setState({
              clientEmailValidationError: true
            })
          : this.setState({ clientEmailValidationError: false });
    }
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
        <Form>
          <Form.Field
            control={Input}
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            className="form-control"
            id="username"
            placeholder="Username"
            label="Username"
          />
          <Form.Field
            control={Input}
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            className="form-control"
            id="password"
            placeholder="Password"
            label="Password"
            type="password"
            // onBlur={() => {
            //   this.validate("password");
            // }}
            // error={
            //   this.state.clientPasswordValidationError
            //     ? {
            //         content:
            //           "Password must be longer than 6 characters, contain lowercase and uppercase letters, a number, and a special character",
            //         pointing: "below"
            //       }
            //     : false
            // }
          />
          <Form.Field
            control={Input}
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
            className="form-control"
            id="email"
            onBlur={() => {
              this.validate("email");
            }}
            error={
              this.state.clientEmailValidationError
                ? {
                    content: "Please enter a valid email address",
                    pointing: "below"
                  }
                : false
            }
            placeholder="Email"
            label="E-mail"
          />
          <Button onClick={this.signup.bind(this)}>Submit</Button>
        </Form>
        {this.state.error ? (
          <Message warning header="Error" content={this.state.error} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
