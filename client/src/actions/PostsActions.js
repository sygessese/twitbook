import AppDispatcher from "../dispatchers/AppDispatcher.js";
import POSTS from "../constants/PostsConstants.js";
const { POSTS_GET, FEED_GET, POSTS_CLEAR } = POSTS;

export default {
  getPosts: data => {
    AppDispatcher.dispatch({
      actionType: POSTS_GET,
      posts: data.posts,
      thread: data.thread
    });
  },
  getFeed: feed => {
    AppDispatcher.dispatch({
      actionType: FEED_GET,
      feed: feed
    });
  },
  clearPosts: () => {
    AppDispatcher.dispatch({
      actionType: POSTS_CLEAR
    });
  }
};

// given posts payload (from threads services), getThreads dispatches action and payload to store
