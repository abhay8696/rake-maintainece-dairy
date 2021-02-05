const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    //Duty hrs,  Air/Vaccum Brake checkbox, Pit Line Complex, Pressure level (front & rear)
    date: {
        type: String
    },
    day:{
        type: String
    },
    txr: {
        type: String,
    },
    depot: {
        type: String
    },
    dutyHrs: {
        from:{
            type: String
        },
        to: {
            type: String
        }
    }
}) 


module.exports = Header = mongoose.model('header', HeaderSchema);






/*

    dutyHrs: {
        from:{
            hour: { type: Number },
            minute: { type: Number}
        },
        to: {
            hour: { type: Number },
            minute: { type: Number} 
        }
    }
*/




























/*
const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    //Duty hrs,  Air/Vaccum Brake checkbox, Pit Line Complex, Pressure level (front & rear)
    date: {
        type: Date,
        default: Date.now 
    },
    day:{
        type: String
    },
    txr: {
        type: String,
    },
    depot: {
        type: String
    },
    dutyHrs: {
        from:{
            hour: { type: Number },
            minute: { type: Number}
        },
        to: {
            hour: { type: Number },
            minute: { type: Number} 
        }
    },
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
    }
})


module.exports = Header = mongoose.model('header', HeaderSchema);
*/