var mongoose = require('mongoose');
var ChatUser = require('./ChatUser');


var Schema = mongoose.Schema;
var messageSchema = new Schema({
    sender: {type: Schema.ObjectId, ref: 'ChatUser', required: true},
    receiver: {type: Schema.ObjectId, ref: 'ChatUser', required: true},
    content: {type: String, required: true},
    dateSent: {type: Date, required: true}
});

messageSchema.methods.getFormatedMessage = function () {
    //  var sender = this.sender.name;
    var date = this.dateSent;
    var content = this.content;
    var message = 'From : $s; Sent on : $s; Message : $s', sender, date, content;
    return message;
};

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;