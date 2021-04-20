const   mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        User = require('./User')

const OfficerProfileSchema = new mongoose.Schema({
    officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'officer'
    },
    name:{
        type: String
    },
    designation: {
        type: String
    },
    //
    employeeId: {
        type: Number
    },
    supervisors: 
        [{ type: Schema.Types.ObjectId, ref: 'user' }],
    supervisorProfiles: 
        [{ type: Schema.Types.ObjectId, ref: 'profile' }]
})

module.exports = OfficerProfile = mongoose.model('officerProfile', OfficerProfileSchema);
