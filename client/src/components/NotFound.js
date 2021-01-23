import React from "react";

export default class NotFound extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <div
        style={{
          paddingTop: "7em",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "10%"
        }}
      >
        <h1 style={{ marginBottom: "1em" }}>404</h1>
      </div>
    );
  }
}
