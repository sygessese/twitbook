import model from "./post.model";
import threadModel from "../threads/thread.model";
import userModel from "../users/user.model";

// to create a post on a thread
const createPost = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body, createdBy: req.user._id });
    const pArray = req.user.followers.map(async userId => {
      const response = userModel.findByIdAndUpdate(userId, {
        $push: { feed: { itemId: doc._id, itemModel: "post" } }
      });
      return response;
    });
    const feedUpdated = await Promise.all(pArray);
    res.status(201).json({ data: [doc, pArray, feedUpdated] });
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
      .sort("-createdAt")
      .populate("replies.createdBy", "username")
      .populate("createdBy", "username")
      .exec();
    const thread = await threadModel.findByIdAndUpdate(req.params.thread_id, {
      comments: docs.length
    });
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
    // push comment to feed too
    return res.status(201).json({ data: updatedDoc });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

// to update a post on a thread (most likely to add a reply)
const addReply = model => async (req, res) => {
  try {
    const doc = await model.findOneAndUpdate(
      { _id: req.params.post_id },
      { $push: { replies: { text: req.body.text, createdBy: req.user._id } } }
    );
    const docId = doc.replies[doc.replies.length - 1]._id;
    const pArray = req.user.followers.map(async userId => {
      const response = userModel.findByIdAndUpdate(userId, {
        $push: { feed: docId }
      });
      return response;
    });
    await Promise.all(pArray);

    return res.status(201).json({ data: doc });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const controllers = {
  createPost: createPost(model),
  getPosts: getPosts(model),
  updatePost: updatePost(model),
  deletePost: deletePost(model),
  addReply: addReply(model)
};

export default controllers;
// {content: 'string', createdBy: user_id, thread: thread_id }
