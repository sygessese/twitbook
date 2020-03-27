import THREADS from "../constants/ThreadsConstants";
import LOGIN from "../constants/LoginConstants";
import BaseStore from "./BaseStore";

const { LOGOUT_USER } = LOGIN;
const { THREADS_GET } = THREADS;

class ThreadsStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.threads = "";
  }

  // todo; add threads_add, threads_delete
  _registerToActions(action) {
    switch (action.actionType) {
      case THREADS_GET:
        this.threads = action.threads;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this.threads = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get thread() {
    return this.threads;
  }
}

export default new ThreadsStore();
