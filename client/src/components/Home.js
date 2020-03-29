import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import LoginStore from "../stores/LoginStore";
import styled from "styled-components";

export default AuthenticatedComponent(
  class Home extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {}

    render() {
      if (!LoginStore.isLoggedIn()) {
        return (
          <div
            style={{
              marginTop: "7%",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "10%"
            }}
          >
            <FrontPageLogo> Twitook </FrontPageLogo>
          </div>
        );
      } else {
        return (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              marginTop: "7%",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "10%"
            }}
          >
            <h1>Hello {this.props.user ? this.props.user : ""}</h1>
          </div>
        );
      }
    }
  }
);

const FrontPageLogo = styled.h1`
  font-size: 15vw;
  font-family: alegrey;
  text-align: center;
  margin-right: 5%;
`;
