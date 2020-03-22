import model from "./post.model";

// to get messages from all people who have this user as a follower
const getHomePage = model => async (req, res) => {
  try {
    const data = await model.find();
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).end();
  }
};

// to create a message
const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const controllers = {
  getHomePage: getHomePage(model),
  createOne: createOne(model)
};

export default controllers;
