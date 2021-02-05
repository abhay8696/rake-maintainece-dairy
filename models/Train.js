const mongoose = require('mongoose');
Schema = mongoose.Schema


const TrainSchema = new mongoose.Schema({
    log: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
    },
    SerialNo: { 
        type: Number
    },
    trainNo: { 
        type: Number
    },
    trainName: { 
        type: String
    },
    formation: {
        memoNo: { 
            type: String
        },
        timeRecieved: {
            type : String
        },
        pitlineNo: { type: Number},
    },
    load: {
        type: Number
    },
    protectionOfRake: {
        lineBlockingTime:{
            type : String
        },
        lineReleaseTime:{
            type : String
        },
    },
    timeUnfitMemoIssued:{
        type : String
    },
    timeReplacementProvided:{
        type : String
    },
    remarks:{
        type: String
    },
    coaches :
        [{ type: Schema.Types.ObjectId, ref: 'coach' }],
    sickCoaches :
        [{ type: Schema.Types.ObjectId, ref: 'sickCoach' }],
    brakeType: {
        type: String
    },
    pressure: {
        fp: {
            front: { type: String },
            rear: { type: String }
        },
        bp: {
            front: { type: String },
            rear: { type: String }
        }
    },
    washingAndCleaning: {
        checkBox: {
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
    },
})


module.exports = Train = mongoose.model('train', TrainSchema);






























/*
const mongoose = require('mongoose');
Schema = mongoose.Schema


const TrainSchema = new mongoose.Schema({
    SerialNo: { 
        type: Number
    },
    trainNo: { 
        type: Number
    },
    trainName: { 
        type: String
    },
    formation: {
        memoNo: { 
            type: String
        },
        timeRecieved: {
            hour: { 
                type: Number 
            },
            minute: { 
                type: Number
            }
        },
        pitlineNo: { type: Number},
    },
    load: {
        type: Number
    },
    protectionOfRake: {
        lineBlockingTime:{
            hour: { type: Number },
            minute: { type: Number}
        },
        lineReleaseTime:{
            hour: { type: Number },
            minute: { type: Number}
        },
    },
    timeUnfitMemoIssued:{
        hour: { type: Number },
        minute: { type: Number}
    },
    timeReplacementProvided:{
        hour: { type: Number },
        minute: { type: Number}
    },
    remarks:{
        type: String
    },
    coaches :
        [{ type: Schema.Types.ObjectId, ref: 'coach' }],
})


module.exports = Train = mongoose.model('train', TrainSchema);
*/