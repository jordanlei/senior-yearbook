var mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const SALT_WORK_FACTOR = 10; 
require('dotenv').config();


var uri= process.env.MONGO_DB_CONNECTION
// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    year: Number,
    email: String,
    bio: String,
    school: String,
    avatar: String,
    isLive: Boolean, 
    tags: String,
    });


//prior to saving password, generate a salt and encrypt
userSchema.pre('save', function(next){
    let user = this; 
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err) return next(err); 
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err); 
            user.password = hash; 
            next(); 
        })
    })
})



// export userSchema as a class called User
module.exports = mongoose.model('User', userSchema);

userSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}