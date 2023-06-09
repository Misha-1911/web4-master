const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName: { type: String, require: true },
    message: { type: String, require: true },
    date: { type: Date, require: true }
})

const Messages = new model('messages', schema, 'messages');

module.exports = { Messages };
