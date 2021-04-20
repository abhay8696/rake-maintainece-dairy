const mongoose = require('mongoose')

const OfficerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    //
    employeeId: {
        type: Number
    },
})

module.exports = Officer = mongoose.model('officer', OfficerSchema);
