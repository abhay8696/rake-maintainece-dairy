const mongoose = require('mongoose');

const WashingAndCleaningSchema = new mongoose.Schema({
    log: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
    },
    washingAndCleaning: {
        type: Boolean
    },
    internalCleaning: {
        type: Boolean
    },
    externalCleaning: {
        type: Boolean
    },
    lavatoryFloorCleaning: {
        type: Boolean
    },
    disinfectionOfLavatory: {
        type: Boolean
    },
    pestControl: {
        type: Boolean
    }
})

module.exports = WashingAndCleaning = mongoose.model('washingAndCleaning', WashingAndCleaningSchema)