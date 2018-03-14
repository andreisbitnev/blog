const Joi = require("joi");

function createComment(commentsJson, commentBody, commentTemplate) {
    return new Promise((resolve, reject) => {
        const commentsObj = JSON.parse(commentsJson);
        const schema = require(commentTemplate);
        const validComment = validate(commentBody, schema);
        const updatedComments = insertComment(commentsObj, validComment);
        resolve(JSON.stringify(updatedComments));
    })
}
function validate(commentBody, schema) {
    return Joi.attempt(commentBody, schema);
}
function insertComment(object, comment) {
    object.comments.push(comment);
    return object;
}
module.exports = {
    createComment
};
