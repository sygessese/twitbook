import model from "./user.model";

const createUser = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(404).json(e);
  }
};

// to follow user
const followUser = model => async (req, res) => {
  try {
    if (req.user.following.toString().indexOf(req.params.user) > -1) {
      res
        .status(201)
        .json({ data: { mesage: "you are already following this user" } });
    } else {
      const userToBeFollowed = await model.findOneAndUpdate(
        { _id: req.params.user },
        { $push: { followers: req.user._id } }
      );
      const thisUser = await model.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.user } }
      );
      return res.status(201).json({ data: [userToBeFollowed, thisUser] });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

//userModel.find( {id: _id}, { feed: { $slice: [ 20, 10 ] } } ),
//returns ten after skipping first 20

//userModel.find( {id: _id}, { feed: { $slice: [ -20, 10 ] } } )
// returns ten before last 20
const getHomePage = model => async (req, res) => {
  try {
    var doc = await model.findById(req.user._id).populate({
      path: "feed.itemId",
      populate: { path: "createdBy ", select: "username" }
    });
    res.status(200).json({ data: doc.feed });
    doc.feed = doc.feed.filter(item => item.itemId);
    await doc.save();
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
};

const controller = {
  createUser: createUser(model),
  followUser: followUser(model),
  getHomePage: getHomePage(model)
};

export default controller;

// id 5e6cab7f3bd21baca222cca8
