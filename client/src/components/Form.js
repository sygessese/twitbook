import React, { Component } from "react";
import { FormContainer } from "./Styles";
import Input from "./Input";

//https://itnext.io/keep-calm-and-handle-forms-in-react-js-52c67eea340e

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      user_email: true,
      user_password: true
    };
  }

  validForm = () => {
    const keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "isValid") {
        // filtering away `isValid`, this belongs to the form, as we only want to look at input elements
        continue;
      }
      if (!this.state[keys[i]]) {
        return false;
      }
    }
    return true;
  };
  notify = (name, isValid) => {
    this.setState({ [name]: isValid }, () => {
      // this happens after the first `setState`
      this.setState({
        isValid: this.validForm()
      });
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if (!this.state.isValid) {
      console.log("form is NOT valid");
    } else {
      console.log("valid form");
    }
  };

  render() {
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <div>
          <Input
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            errMessage="Please enter a valid E-mail address"
            desc="E-mail:"
            name="user_email"
            notify={this.notify}
            title="I am a custom inbox"
          />
          <Input
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
            errMessage="Must be at least 8 digits long, and contain a lowercase letter, an uppercase letter, a number, and a special character"
            desc="Password:"
            name="user_password"
            notify={this.notify}
            title="I am a custom inbox"
          />
        </div>
        <button disabled={!this.state.isValid}>Submit</button>
      </FormContainer>
    );
  }
}
export default Form;
