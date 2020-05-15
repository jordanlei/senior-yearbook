var mongoose = require('mongoose');
require('dotenv').config();


var uri= process.env.MONGO_DB_CONNECTION
// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(uri);

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    to: {type: String, required: true, unique: false},
    from: {type: String, required: true, unique: false},
    comment: {type: String, required: true, unique: false},
    avatar: String,
    image: String, 
    tagsfrom: String, 
    tagsto: String,
    });


// export userSchema as a class called User
module.exports = mongoose.model('Comment', commentSchema);

// userSchema.methods.standardizeName = function() {
//     this.name = this.name.toLowerCase();
//     return this.name;
// }