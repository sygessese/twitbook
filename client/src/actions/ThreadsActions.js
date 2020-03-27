import AppDispatcher from "../dispatchers/AppDispatcher.js";
import THREADS from "../constants/ThreadsConstants.js";
const { THREADS_GET } = THREADS;

export default {
  getThreads: threads => {
    AppDispatcher.dispatch({
      actionType: THREADS_GET,
      threads: threads
    });
  }
};
