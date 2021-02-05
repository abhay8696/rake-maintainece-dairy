const   mongoose = require('mongoose'),
        Schema = mongoose.Schema

const   Header      = require('./Header'),
        Staff       = require('./Staff'),
        TrainList   = require('./Train'),
        Coach       = require('./Coach'),
        SickCoach   = require('./SickCoach'),
        Cleaning    = require('./WashingAndCleaning')

const LogSchema = new mongoose.Schema({
    header : 
        [{ type: Schema.Types.ObjectId, ref: 'header' }],
    staff :
        [{ type: Schema.Types.ObjectId, ref: 'staff' }],
    trains :
        [{ type: Schema.Types.ObjectId, ref: 'train' }],
    washingAndCleaning :
        [{ type: Schema.Types.ObjectId, ref: 'washingAndCleaning' }]
})

module.exports = Log = mongoose.model('log', LogSchema);
