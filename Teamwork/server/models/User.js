var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, require: '{PATH} is required', unique: true},
    firstName: {type: String, require: '{PATH} is required'},
    lastName: {type: String, require: '{PATH} is required'},
    salt: String,
    hashPass: String,
    roles: [String],
    addresses: [{type: String, required: true}],
    phoneNumbers: [{type: String, required: true}],
    isDeleted: {type: Boolean, default: false}
});

userSchema.method({
    authenticate: function(pass){
        if (encryption.generateHashedPassword(this.salt, pass) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seed = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123');
            User.create({username: 'admin1', firstName: 'Admin', lastName: 'First', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123');
            User.create({username: 'admin2', firstName: 'Admin', lastName: 'Second', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123');
            User.create({username: 'user', firstName: 'User', lastName: 'First', salt: salt, hashPass: hashedPwd});
            console.log('Users seeded.');
        }
    });
};