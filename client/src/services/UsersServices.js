import request from "reqwest";
import when from "when";
import USERS from "../constants/UsersConstants.js";
import POSTS from "../constants/PostsConstants.js";
import PostsActions from "../actions/PostsActions.js";
import LoginStore from "../stores/LoginStore.js";
const { HOME_URL } = POSTS;
const { FOLLOW_URL, UPDATE_URL } = USERS;

class UsersServices {
  // create home store for this
  getHomePage() {
    request({
      url: HOME_URL + "0/0/",
      method: "GET",
      crossOrigin: true,
      headers: {
        Authorization: "Bearer " + LoginStore.jwt
      }
    }).then(function(response) {
      console.log(response.data);
      PostsActions.getFeed(response.data);
    });
  }

  moreHomePage(offset, lastId) {
    request({
      url: HOME_URL + offset + "/" + lastId,
      method: "GET",
      crossOrigin: true,
      headers: {
        Authorization: "Bearer " + LoginStore.jwt
      }
    }).then(function(response) {
      console.log(response);
      PostsActions.getMoreFeed(response);
    });
  }

  followUser(user_id) {
    return when(
      request({
        url: FOLLOW_URL + user_id,
        method: "PUT",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        }
      })
    );
  }

  updateUser(update) {
    return when(
      request({
        url: UPDATE_URL,
        method: "PUT",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: update
      })
    );
  }
}

export default new UsersServices();
