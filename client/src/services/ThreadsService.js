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
      ThreadsActions.getThreads(response.data);
    });
  }
}

export default new ThreadsService();
