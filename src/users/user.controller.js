import model from "./user.model";

const createUser = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(404).json(e);
  }
};

const controller = {
  createUser: createUser(model)
};

export default controller;

// id 5e6cab7f3bd21baca222cca8
