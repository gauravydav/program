
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    project: { type: String, required: true }
});

const User = mongoose.model('User', userSchema)
module.exports=User;