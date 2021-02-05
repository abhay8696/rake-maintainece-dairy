const mongoose  = require('mongoose');


const CoachSchema = new mongoose.Schema({
    log: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train'
    },
    serialNo: {
        type: Number
    },
    owningRailway: {
        type: String
    },
    coachNo : {
        type: Number
    },
    coachCode: {
        type: String
    },
    mechCode: {
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
    angleCock: {
        type: String 
    },
    underGearWorks: {
        type: String
    },
    pipeLineWorks: {
        type: String
    },
    carpentryWorks: {
        type: String
    },
    airBrakeWorks: {
        type: String
    },
})





module.exports = Coach = mongoose.model('coach', CoachSchema);














/*

    poh: {
        station: {
            type: String
        },
        date: {
            type: String
        }
    },
    ioh: {
        station: {
            type: String
        },
        date: {
            type: String
        }
    },
*/