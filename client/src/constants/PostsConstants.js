var BASE_URL = "http://localhost:8000/";
// var BASE_URL = "http://twitook.herokuapp.com/";

export default {
  BASE_URL: BASE_URL,
  POSTS_URL: BASE_URL + "api/posts/thread/",
  HOME_URL: BASE_URL + "api/users/home/",
  REPLY_URL: BASE_URL + "api/posts/",
  FEED_GET: "FEED_GET",
  FEED_GET_MORE: "FEED_GET_MORE",
  POSTS_GET: "POSTS_GET",
  POSTS_ADD: "POSTS_ADD",
  POSTS_DELETE: "POSTS_DELETE",
  POSTS_UPDATE: "POSTS_UPDATE",
  POSTS_CLEAR: "POSTS_CLEAR",
  POSTS_REPLY: "POSTS_REPLY"
};
