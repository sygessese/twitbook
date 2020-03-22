import model from "./thread.model";

const createThread = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const getThreads = model => async (req, res) => {
  try {
    const docs = await model.find({});
    res.status(201).json({ data: docs });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const controller = {
  createThread: createThread(model),
  getThreads: getThreads(model)
};

export default controller;

// 5e6cadbc5497f9ae12108a2a thread id
