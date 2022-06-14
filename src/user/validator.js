const Joi = require("@hapi/joi");

module.exports = {
  auth: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },

  addNew: {
    body: {
      username: Joi.string().max(1000).required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      inn: Joi.number().default(0),
      phone: Joi.string().max(50).required(),
      address: Joi.string().max(1000).required(),
      title: Joi.string().max(1000).required(),
      desc: Joi.string().max(1000).required(),
      active: Joi.boolean().default(true)
    },
  },

  updateOne: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      username: Joi.string().max(1000).required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      inn: Joi.number().default(0),
      phone: Joi.string().max(50).required(),
      address: Joi.string().max(1000).required(),
      title: Joi.string().max(1000).required(),
      desc: Joi.string().max(1000).required(),
      active: Joi.boolean().default(true)
    },
  },

  deleteOne: {
    params: {
      id: Joi.string().required(),
    },
  },

  updateAgent: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      phone: Joi.string().max(50).required(),
      address: Joi.string().max(1000).required(),
      title: Joi.string().max(1000).required(),
      desc: Joi.string().max(1000).required()
    },
  },
};
