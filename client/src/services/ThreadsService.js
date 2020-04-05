import request from "reqwest";
import when from "when";
import THREADS from "../constants/ThreadsConstants";
import ThreadsActions from "../actions/ThreadsActions.js";
import LoginStore from "../stores/LoginStore.js";
const { THREADS_URL } = THREADS;

class ThreadsService {
  getThreads() {
    request({
      url: THREADS_URL,
      method: "GET",
      crossOrigin: true,
      headers: {
        Authorization: "Bearer " + LoginStore.jwt
      }
    }).then(function(response) {
      console.log(response.data);
      ThreadsActions.getThreads(response.data);
    });
  }

  addThread(data) {
    // {name: string, description: string, createdBy: userID, createdByUsername: string}
    return when(
      request({
        url: THREADS_URL,
        method: "POST",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: { ...data, createdByUsername: LoginStore.user }
      })
    );
  }

  deleteThread(data) {
    // {thread_id: int}
    return when(
      request({
        url: THREADS_URL,
        method: "DELETE",
        crossOrigin: true,
        headers: {
          Authorization: "Bearer " + LoginStore.jwt
        },
        type: "json",
        data: data
      })
    );
  }

  updateThread(data) {
    // {thread_id, thread_update: {title: string}}
    when(
      request({
        url: THREADS_URL,
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

export default new ThreadsService();

// delete expects req.body.thread_id to be an int
// update expects req.body.thread_update to be an object ex: {title: 'new-title'}, and thread_id to be int
