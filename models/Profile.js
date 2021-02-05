const   mongoose = require('mongoose'),
        Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String
    },
    batch: {
        type: String,
    },
    designation: {
        type: String
    },
    staff: {
        type: Object
    },
    logs: 
        [{ type: Schema.Types.ObjectId, ref: 'log' }]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);




/*
const   mongoose = require('mongoose'),
        Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String
    },
    batch: {
        type: String,
    },
    designation: {
        type: String
    },
    staff: {
        type: Object
    },
    logs: 
        [{ type: Schema.Types.ObjectId, ref: 'log' }]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);

*/