var mongoose = require('mongoose'),
    chatDb = require('./chat-db'),
    async = require('async');

mongoose.connect('mongodb://localhost/ChatDb');

// First insert the users, the comment this and uncomment the message part,
// I had some problems with the async nature of NodeJs
chatDb.registerUser({user:'NDOE', pass:'are-BezP@ssw0rd'});
chatDb.registerUser({user:'QvkataDLG', pass:'are-BezP@ssw0rd'});

//chatDb.sendMessage({from:'NDOE', to:'QvkataDLG', text:'Kak e Qvka?'});
//chatDb.sendMessage({from:'QvkataDLG', to:'NDOE', text:'Extra'});
//chatDb.sendMessage({from:'QvkataDLG', to:'NDOE', text:'Haide da igraem na нинтендо :)'});
//var messages = chatDb.getMessages({with: 'NDOE', and: 'QvkataDLG'});
//console.log(messages);