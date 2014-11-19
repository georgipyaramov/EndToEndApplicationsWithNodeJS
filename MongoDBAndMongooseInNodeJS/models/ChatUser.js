var mongoose = require('mongoose');
var Message = require('./Message');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sentMessages: [
        {type: Schema.ObjectId, ref: 'Message'}
    ]
});

var ChatUser = mongoose.model('ChatUser', usersSchema);

module.exports = ChatUser;

