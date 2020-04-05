import request from "reqwest";
import when from "when";
import POSTS from "../constants/PostsConstants";
import PostsActions from "../actions/PostsActions.js";
import LoginStore from "../stores/LoginStore.js";
const { POSTS_URL, HOME_URL, REPLY_URL } = POSTS;

class PostsService {
  getPosts(thread_id) {
    request({
      url: POSTS_URL + thread_id,
      method: "GET",
      crossOrigin: true,
      headers: {
        Authorization: "Bearer " + LoginStore.jwt
      }
    }).then(function(response) {
      PostsActions.getPosts(response);
    });
  }

  addPost(data) {
    // {content: string, thread_id: string}
    return when(
      request({
        url: POSTS_URL + data.thread,
        method: "POST",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: data
      })
    );
  }

  deletePost(post_id) {
    // {post_id: int}
    when(
      request({
        url: THREADS_URL,
        method: "DELETE",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: { post_id }
      })
    );
  }

  addReply(data) {
    // {text: string}, add user_id on server
    return when(
      request({
        url: REPLY_URL + data.post_id,
        method: "PUT",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: data
      })
    );
  }
}

export default new PostsService();

// delete expects req.body.thread_id to be an int
// update expects req.body.thread_update to be an object ex: {title: 'new-title'}, and thread_id to be int
