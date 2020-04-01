import React from "react";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      setting: ""
    };
  }

  updateUser(e) {
    e.preventDefault();
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
      ></div>
    );
  }
}
