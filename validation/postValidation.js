let Joi = require('joi');

    let commentSchema = ({
        user_id: Joi.string().required(),
        text: Joi.string().min(5)
    });
module.exports = {
    title: Joi.string().min(5),
    details: Joi.string().min(10),
    comments: commentSchema
    
};