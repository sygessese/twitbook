import React from "react";
import { Popup, Button } from "semantic-ui-react";
import UsersServices from "../services/UsersServices";

class FollowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: `Click follow to see ${this.props.username}'s activity in your home feed`
    };
  }

  startFollowing = () => {
    UsersServices.followUser(this.props.id)
      .then(s => {
        this.setState({
          message: s.data.message
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <Popup
        trigger={<span>{this.props.username}</span>}
        hoverable
        style={{ display: "flex" }}
      >
        <p>{this.state.message}</p>
        <Button onClick={this.startFollowing.bind(this)}>Follow</Button>
      </Popup>
    );
  }
}

export default FollowPopup;
