import POSTS from "../constants/PostsConstants";
import LOGIN from "../constants/LoginConstants";
import BaseStore from "./BaseStore";

const { LOGOUT_USER } = LOGIN;
const { POSTS_GET, FEED_GET, POSTS_CLEAR } = POSTS;

class PostsStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._posts = "";
    this._feed = "";
    this._thread = "";
  }

  //
  _registerToActions(action) {
    switch (action.actionType) {
      case POSTS_GET:
        this._posts = action.posts;
        this._thread = action.thread;
        this.emitChange();
        break;
      case POSTS_CLEAR:
        this._posts = null;
        this._thread = null;
        this.emitChange();
        break;
      case FEED_GET:
        this._feed = action.feed;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._posts = null;
        this._feed = null;
        this._thread = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get posts() {
    return this._posts;
  }

  get thread() {
    return this._thread;
  }

  get feed() {
    return this._feed;
  }
}

export default new PostsStore();
