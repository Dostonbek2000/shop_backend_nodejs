const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
bluebird.promisifyAll(jwt);
// const { encrypt, decrypt } = require("./../util/crypto-helper");
const { ErrorHandler } = require("./../util/error");
const Customer = require("../user/model");
const Product = require('../product/model');
const Order = require('../order/model');

module.exports = {
  auth: async function (req, res, next) {
    try {
      const doc = await Customer.findOne({ username: req.body.username, password: req.body.password, role: 'customer' }).exec();
      if(!doc) throw new Error();
      const token = jwt.sign({
        id: doc.id,
        name: doc.title, 
        role: "customer"
      }, process.env.TOKEN_SECRET_KEY,
      { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRESIN });

      return res.status(200).json({ token });
    } catch (err) {
      return next(new ErrorHandler(403, "Forbidden access"));
    }
  },
  findCustomer: async function(req,res,next){
    try {
      const doc = await Customer.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get User"));
    }
  },

  updateCustmer: async function(req,res,next){
   
    try {
      const doc = await Customer.findByIdAndUpdate(req.params.id,req.body).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update the User"));
    }
  },

  findAllAgents: async function (req, res, next) {
    try {
      const docs = await Customer.find({ active: true, role:"agent" }, {
        username: 0, password: 0, role: 0, inn: 0, active: 0
      }).exec();
      if(!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to find agents"));
    }
  },

  findAgentProducts: async function (req, res, next) {
    try {
      const doc = await Product.find({ agent: req.params.agentId, active: true }, { agent: 0, active: 0 }).exec();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to find products"));
    }
  },

  getOrders: async function (req, res, next) {
    try {   
      const docs = await Order.find({ customer: req.identifier.id }).populate('agent', {username:0,password:0,inn:0,role:0,active:0}).exec();
      if(!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to find Orders"));
    }
  },

  addOrder: async function (req, res, next) {
    try {
      const newOrder = new Order(req.body);
      const doc = await newOrder.save();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Order"));
    }
  },

  updateOrder: async function (req, res, next) {
    try {
      const doc = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
        customerComment: req.body.customerComment
      }).exec();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Order"));
    }
  } 
};
