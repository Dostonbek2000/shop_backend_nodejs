const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
bluebird.promisifyAll(jwt);
const { ErrorHandler } = require("./../util/error");
const Agent = require("../user/model");
const Product = require("../product/model");
const Order = require("../order/model");

module.exports = {
  auth: async function (req, res, next) {
    try {
      const doc = await Agent.findOne({ username: req.body.username, password: req.body.password, role: 'agent' }).exec();
      if(!doc) throw new Error();
      const token = jwt.sign({
        id: doc.id,
        title: doc.title, 
        role: "agent"
      }, process.env.TOKEN_SECRET_KEY,
      { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRESIN });

      return res.status(200).json({ token });
    } catch (err) {
      return next(new ErrorHandler(403, "Forbidden access"));
    }
  },

  findAgent: async function(req,res,next){
    try {
      const doc = await Agent.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get User"));
    }
  },

  updateAgent: async function(req,res,next){
    console.log('req',req);
    try {
      const doc = await Agent.findByIdAndUpdate(req.params.id,req.body).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update the User"));
    }
  },

  findAllProduct: async function (req, res, next) {
    try {
      const docs = await Product.find({agent:req.params.id}).exec();
      if(!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to find products"));
    }
  },

  addNewProduct: async function (req, res, next) {
    try {
      const newProduct = new Product(req.body);
      if (req.file) {
        newProduct.media = `http://localhost:8000/public/product/${req.file.filename}`;
      }
      const doc = await newProduct.save();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new product"));
    }
  },

  updateProduct: async function (req, res, next) {
    try {
      const doc = await Product.findByIdAndUpdate(
        req.params.id,
        req.body
      ).exec();
      if(!doc) throw new Error();
      res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update the product"));
    }
  },

  deleteProduct: async function (req, res, next) {
    try {
      const doc = await Product.findByIdAndDelete(req.params.id).exec();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete the product"));
    }
  },

  getOrders: async function (req, res, next) {
    try {   
      const docs = await Order.find({ agent: req.identifier.id }).populate('customer',{username:0,password:0,inn:0,role:0,active:0}).exec();
      if(!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to find Orders"));
    }
  },

  updateOrder: async function (req, res, next) {
    try {
      const doc = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
        agentComment: req.body.agentComment
      }).exec();
      if(!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Order"));
    }
  } 
}
