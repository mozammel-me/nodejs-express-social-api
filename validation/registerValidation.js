let Joi = require('joi');

module.exports = {
    name: Joi.string().min(3),
    email: Joi.string().email().min(3),
    password: Joi.string().min(5)
}