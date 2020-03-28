import model from "./thread.model";

const createThread = model => async (req, res) => {
  try {
    console.log(req.user);
    const doc = await model.create({ ...req.body, createdBy: req.user._id });
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

const deleteThread = model => async (req, res) => {
  try {
    const doc = await model.findOne({ id: req.body.thread_id });
    console.log("user: ", req.user);
    console.log("doc: ", doc);
    if (req.user._id === doc.createdBy) {
      return res.status(201).json({ data: doc });
    }
    res.status(404).json({
      message: "ERROR: A thread may only be deleted by it's creator."
    });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const updateThread = model => async (req, res) => {
  try {
    const doc = await model.findOne({ id: req.body.thread_id });
    console.log("user: ", req.user);
    console.log("doc: ", doc);
    if (req.user._id === doc.createdBy) {
      const updatedDoc = await model.findByIdAndUpdate(
        req.body.thread_id,
        req.body.thread_update
      );
      return res.status(201).json({ data: updatedDoc });
    }
    res.status(404).json({
      message: "ERROR: A thread may only be updated by it's creator."
    });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

const controller = {
  createThread: createThread(model),
  getThreads: getThreads(model),
  deleteThread: deleteThread(model),
  updateThread: updateThread(model)
};

export default controller;

// 5e6cadbc5497f9ae12108a2a thread id
