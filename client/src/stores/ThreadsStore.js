import THREADS from "../constants/ThreadsConstants";
import LOGIN from "../constants/LoginConstants";
import BaseStore from "./BaseStore";

const { LOGOUT_USER } = LOGIN;
const { THREADS_GET } = THREADS;

class ThreadsStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._threads = "";
  }

  // todo; add threads_add, threads_delete
  _registerToActions(action) {
    switch (action.actionType) {
      case THREADS_GET:
        this._threads = action.threads;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._threads = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get threads() {
    return this._threads;
  }
}

export default new ThreadsStore();
