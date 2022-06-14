const Joi = require("@hapi/joi");
module.exports = {
  findAll: {
    query: {
      status: Joi.number().default(0).max(1),
      customerComment: Joi.string(),
      agentComment: Joi.string(),
    },
  },

  addNew: {
    body: {
      agent: Joi.string().required(),
      customer: Joi.string().required(),
      customerComment: Joi.string(),
      // agentComment: Joi.string(),
      time: Joi.string(),
      items: Joi.array().items({
        title: Joi.string().required(),
        price: Joi.number().default(0),
        quantity: Joi.number().default(0),
        measure: Joi.string().required(),
      }),
    },
  },

  updateOne: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      status: Joi.number().default(1).max(1),
      customerComment: Joi.string(),
      agentComment: Joi.string(),
    },
  },

  deleteOne: {
    params: {
      id: Joi.string().required(),
    },
  },
};
