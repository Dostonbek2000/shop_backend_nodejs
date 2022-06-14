const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
bluebird.promisifyAll(jwt);
const { ErrorHandler } = require("./../util/error");
const User = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      const docs = await User.find({}).exec();
      if (!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Users"));
    }
  },

  addNew: async function (req, res, next) {
    console.log("req",req);
    try {
      const newUser = new User(req.body);
      if (req.file) {
        newUser.media = `http://localhost:8000/public/users/${req.file.filename}`;
      }
      const doc = await newUser.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new User"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await User.findByIdAndUpdate(req.params.id, req.body).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update User"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
      const doc = await User.findByIdAndDelete(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete User"));
    }
  },
};
