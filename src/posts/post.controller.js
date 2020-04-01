import model from "./post.model";
import threadModel from "../threads/thread.model";

// to get messages from all people who have this user as a follower
// use .populate("user_id", "username")

// move feed route to user model, push new posts and threads into all "followers"
//userModel.find( {id: _id}, { feed: { $slice: [ 20, 10 ] } } ), returns ten after skipping first 20
//userModel.find( {id: _id}, { feed: { $slice: [ -20, 10 ] } } )
const getHomePage = model => async (req, res) => {
  try {
    const data = await model
      .find()
      .sort("-createdAt")
      .populate("createdBy", "username");
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
};

// to create a post on a thread
// expect body to be {content: string, thread_id: thread_id}
// add createdBy
const createPost = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// to get all posts for a thread
const getPosts = model => async (req, res) => {
  try {
    const docs = await model
      .find({ thread: req.params.thread_id })
      .populate("createdBy username")
      .exec();
    // .populate("replies")
    const thread = await threadModel.findById(req.params.thread_id);
    res.status(201).json({ posts: docs, thread: thread });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

// to delete a post on a thread
const deletePost = model => async (req, res) => {
  try {
    const doc = await model.findOne({ _id: req.body.post_id });
    if (req.user._id === doc.createdBy) {
      const deletedDoc = await model.findOneAndDelete({ _id: doc._id });
      return res.status(201).json({ data: deletedDoc });
    }
    res.status(404).json({
      message: "ERROR: A post may only be deleted by it's creator."
    });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

// to update a post on a thread (most likely to add a reply)
const updatePost = model => async (req, res) => {
  try {
    const doc = await model.findOneAndUpdate(
      { _id: req.body.post_id, createdBy: req.user._id },
      { replies: [...doc.replies, req.body.reply] }
    );

    return res.status(201).json({ data: updatedDoc });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const controllers = {
  getHomePage: getHomePage(model),
  createPost: createPost(model),
  getPosts: getPosts(model),
  updatePost: updatePost(model),
  deletePost: deletePost(model)
};

export default controllers;
// {content: 'string', createdBy: user_id, thread: thread_id }
