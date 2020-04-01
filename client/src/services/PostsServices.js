import request from "reqwest";
import when from "when";
import POSTS from "../constants/PostsConstants";
import PostsActions from "../actions/PostsActions.js";
import LoginStore from "../stores/LoginStore.js";
const { POSTS_URL, HOME_URL } = POSTS;

class PostsService {
  // create home store for this
  getHomePage() {
    request({
      url: HOME_URL,
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
        url: POSTS_URL + data.thread_id,
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

  // updatePost(data) {
  //   // {thread_id, thread_update: {title: string}}
  //   when(
  //     request({
  //       url: THREADS_URL,
  //       method: "PUT",
  //       crossOrigin: true,
  //       headers: {
  //         Authorization: "Bearer " + LoginStore.jwt
  //       },
  //       type: "json",
  //       data: data
  //     })
  //   );
  // }
}

export default new PostsService();

// delete expects req.body.thread_id to be an int
// update expects req.body.thread_update to be an object ex: {title: 'new-title'}, and thread_id to be int
