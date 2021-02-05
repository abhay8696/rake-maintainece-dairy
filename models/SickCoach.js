const mongoose = require('mongoose');

const SickCoachSchema = new mongoose.Schema({
    log: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train'
    },
    owningRailway: {
        type: String
    },
    coachNo: {
        type: Number
    },
    coachCode: {
        type: String
    },
    returnDate: {
        type: String
    },
    pohStation: {
        type: String
    },
    pohDate: {
        type: String
    },
    iohStation: {
        type: String
    },
    iohDate: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = SickCoach = mongoose.model('sickCoach', SickCoachSchema);