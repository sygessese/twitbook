import config from "./config";
import User from "./users/user.model";
import jwt from "jsonwebtoken";

// returns new token, stores user id
export const newToken = user => {
  return jwt.sign(
    { id: user.id, username: user.username },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp
    }
  );
};

// checks token is alive, returns user
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// creates new user, creates new token, returns token
export const signup = async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token, username: user.username });
  } catch (e) {
    let error;
    if (e.errmsg.indexOf("username_1") !== -1) {
      error =
        "ERROR: There is already an account associated with this username";
    }
    if (e.errmsg.indexOf("email_1") !== -1) {
      error = "ERROR: There is already an account associated with this email";
    }
    return res.status(500).send(error);
  }
};

// finds user by email, checks password, creates new token, returns token
export const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: "need username and password" });
  }

  const invalid = "Invalid username and password combination";

  try {
    const user = await User.findOne({ username: req.body.username })
      .select("email password username")
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ token, username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

// grabs token from header, if token is alive then returns user id, uses user id to find
// user in database, adds user info to request object, continues with route
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(400).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).send({ Message: "Token has expired" });
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(403).end();
  }

  req.user = user;
  next();
};

// sign in needs username and password
// sign up needs email, username and password
// protect needs bearer token in header, attaches user to req as property
