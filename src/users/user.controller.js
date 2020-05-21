import model from "./user.model";
import postModel from "../posts/post.model";
import threadModel from "../threads/thread.model";

const createUser = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(404).json(e);
  }
};

const updateUser = model => async (req, res) => {
  try {
    const updatedDoc = await model.findByIdAndUpdate(req.user._id, req.body);
    return res.status(201).json({ data: updatedDoc });
  } catch (e) {
    res.status(404).json(e);
  }
};

const filterUserFeed = model => async (req, res) => {
  // so user is not waiting?
  res.status(201).end();
  try {
    var doc = await model.findById(req.user._id).populate({
      path: "feed.itemId"
    });

    var count = doc.feed.length;
    doc.feed = doc.feed.filter(item => item.itemId);
    if (count !== doc.feed.length) {
      await doc.save();
    }
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
};

// to follow user
const followUser = model => async (req, res) => {
  try {
    if (req.user.following.toString().indexOf(req.params.user) > -1) {
      res
        .status(201)
        .json({ data: { message: "You are already following this user" } });
    } else {
      const userToBeFollowed = await model.findById(req.params.user);
      if (!userToBeFollowed.followers[req.user._id]) {
        const userToBeFollowedUpdated = await model.findOneAndUpdate(
          { _id: req.params.user },
          { $push: { followers: req.user._id } }
        );
      }

      const thisUser = await model.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.user } }
      );
      console.log(thisUser);
      let userPosts = await postModel
        .find()
        .where("createdBy")
        .in(thisUser.following)
        .exec();
      userPosts = userPosts.map(post => {
        return { itemId: post._id, itemModel: "post" };
      });
      let userThreads = await threadModel
        .find()
        .where("createdBy")
        .in(thisUser.following)
        .exec();
      userThreads = userThreads.map(thread => {
        return { itemId: thread._id, itemModel: "thread" };
      });
      console.log(userPosts);
      console.log(userThreads);
      thisUser.feed = [...userPosts, ...userThreads];
      await thisUser.save();

      // const thisUser = await model.findOneAndUpdate(
      //   { _id: req.user._id },
      //   { $push: { following: req.params.user } }
      // );

      return res.status(201).json({
        data: {
          message: `You are now following ${userToBeFollowed.username}`
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

// first index of slice represents starting index of set to be returned
const getHomePage = model => async (req, res) => {
  console.log((parseInt(req.params.offset) + 5) * -1);
  try {
    var doc = await model
      .findById(req.user._id)
      .slice("feed", [(parseInt(req.params.offset) + 5) * -1, 5])
      .populate({
        path: "feed.itemId",
        populate: { path: "createdBy ", select: "username" }
      });
    var endOfFeed = 6;
    doc.feed.forEach((item, index) => {
      if (item._id.toString() === req.params.lastId) endOfFeed = index;
    });
    // search lastId in doc.feed, if found, return slice and property saying: feed-end: true
    console.log(doc.feed, endOfFeed);
    if (endOfFeed === 6) {
      res.status(200).json({ data: doc.feed.reverse(), endOfFeed: false });
    }
    if (endOfFeed < 6) {
      doc.feed = doc.feed.slice(0, endOfFeed);
      doc.feed = doc.feed.reverse();
      res.status(200).json({ data: doc.feed, endOfFeed: true });
    }

    // var count = doc.feed.length;
    // doc.feed = doc.feed.filter(item => item.itemId);
    // if (count !== doc.feed.length) {
    //   await doc.save();
    // }
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
};

const controller = {
  createUser: createUser(model),
  followUser: followUser(model),
  getHomePage: getHomePage(model),
  updateUser: updateUser(model),
  filterUserFeed: filterUserFeed(model)
};

export default controller;

// id 5e6cab7f3bd21baca222cca8
