const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firebaseId: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    phoneNumber: {type: String, require: true},
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    pseudo: { type: String, require: true },
    description: { type: String, require: true},
    campus: { type: String, require: true },
    birthDay: { type: String, require: true },
})

module.exports = mongoose.model("User", userSchema);