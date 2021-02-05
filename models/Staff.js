const   mongoose = require('mongoose'),
        Schema = mongoose.Schema

const StaffSchema = new mongoose.Schema({
    log: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
    },
    underGear: {
        type:  String
    },
    brakePower: {
        type:  String
    },
    pipeFitting: {
        type:  String
    },
    carpentry: {
        type:  String
    },
    oiling: {
        type:  String
    },
    otherWorks: {
        type:  String
    },
    totalSacntionedStrength: {
        onRoll: {
            type: Number
        },
        physicallyPresent: {
            type: Number
        },
        underRest: {
            type: Number
        },
        onLeave: {
            type: Number
        },
        absent: {
            type: Number
        },
        sick: {
            type: Number
        }
    },

})

module.exports = Staff = mongoose.model('staff', StaffSchema);
