var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var form = new Schema ({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String
});

module.exports = mongoose.model('form', form);