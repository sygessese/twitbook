import AppDispatcher from "../dispatchers/AppDispatcher.js";
import POSTS from "../constants/PostsConstants.js";
const { POSTS_GET, FEED_GET, POSTS_CLEAR, FEED_GET_MORE } = POSTS;

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

  getMoreFeed: feed => {
    AppDispatcher.dispatch({
      actionType: FEED_GET_MORE,
      feed: feed.data,
      endOfFeed: feed.endOfFeed
    });
  },

  clearPosts: () => {
    AppDispatcher.dispatch({
      actionType: POSTS_CLEAR
    });
  }
};

// given posts payload (from threads services), getThreads dispatches action and payload to store
