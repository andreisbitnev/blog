"use strict";
const Joi = require("joi");
const config = require("../config")

module.exports = {
    name: Joi.string(config.commentDefault.name),
    avatar: Joi.string().default(config.commentDefault.avatar),
    text: Joi.string().required(),
    timestamp: Joi.number(),
    comments: Joi.array()
};
