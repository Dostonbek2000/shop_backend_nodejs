const Joi = require("@hapi/joi");

module.exports = {
  addNew: {
    body: {
      agent: Joi.string().required(),
      title: Joi.string().min(2).max(100).required(),
      desc: Joi.string().max(1000),
      price: Joi.number().default(0),
      quantity: Joi.number().default(0),
      measure: Joi.string().max(1000),
      active: Joi.boolean().default(true)
    }
  },

  updateOne: {
    params: {
      id: Joi.string().required()
    },
    body: {
      agent: Joi.string().required(),
      title: Joi.string().min(2).max(100).required(),
      desc: Joi.string().max(1000),
      price: Joi.number().default(0),
      quantity: Joi.number().default(0),
      measure: Joi.string().max(1000),
      active: Joi.boolean().default(true)
    }
  },

  deleteOne: {
    params: {
      id: Joi.string().required()
    }
  }
};
