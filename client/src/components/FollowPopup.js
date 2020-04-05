import React from "react";
import { Popup, Button } from "semantic-ui-react";
import UsersServices from "../services/UsersServices";

const FollowPopup = props => {
  const startFollowing = () => {
    UsersServices.followUser(props.id)
      .then(s => {
        console.log(s);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Popup
      trigger={<span>{props.username}</span>}
      hoverable
      style={{ display: "flex" }}
    >
      <p>Click follow to see {props.id}'s activity in your home feed</p>
      <Button onClick={startFollowing}>Follow</Button>
    </Popup>
  );
};

export default FollowPopup;
