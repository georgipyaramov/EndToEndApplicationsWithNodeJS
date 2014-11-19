var User = require('./models/ChatUser'),
    Message = require('./models/Message');

function insertNewUser(requestObject) {
    var newUser = new User({username: requestObject['user'], password: requestObject['pass']});
    newUser.save(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log("User %s inserted!", requestObject['user']);
        }
    })
}

function getUser(username, callback) {
    User.findOne({username: username}).exec(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            callback(user);
        }
    });
}

function sendMessage(requestObject) {
    var from = requestObject['from'],
        to = requestObject['to'],
        content = requestObject['text'];

    getUser(from, function (foundSender) {
        var sender = foundSender;
        getUser(to, function (receiver) {
            var newMessage = new Message({
                    sender: sender._id,
                    receiver: receiver._id,
                    content: content,
                    dateSent: new Date() }
            );

            newMessage.save(function (error, message) {
                if (error) {
                    console.log(error);
                } else {
                    sender.sentMessages.push(message);
                    sender.save();
                }
            });
        });
    });
};

function getMessages(input) {
    var firstUsername = input['with'],
        secondUsername = input['and'];

    getUser(firstUsername, function (firstUserFound) {
        var firstUser = firstUserFound;
        getUser(secondUsername, function (secondUser) {
            Message.find()
                .where('sender').in([firstUser._id, secondUser._id])
                .where('receiver').in([firstUser._id, secondUser._id])
                //.or([{ sender: firstUser._id }, { sender: secondUser._id }])
                //.or([{ receiver: firstUser._id }, { receiver: secondUser._id }])
                .exec(function (err, messages) {
                    if (err) {
                        console.log(err);
                    } else {
                        var u = {}, a = [];

                        for (var i = 0, l = messages.length; i < l; ++i) {
                            if (u.hasOwnProperty(messages[i]._id)) {
                                continue;
                            }
                            a.push(messages[i]);
                            u[messages[i]._id] = 1;
                        }
                        console.log(a);
                    }
                });
        })
    })
}

module.exports = {
    registerUser: insertNewUser,
    sendMessage: sendMessage,
    getMessages: getMessages
};