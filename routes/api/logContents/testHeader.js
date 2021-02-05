const headerData = {
    date: Date,
    day : day,
    txr: user.name,
    depot: depot,
    dutyHrs: {
        from:{
            hour: req.body.dutyHrs.from.hour,
            minute: req.body.dutyHrs.from.minute
        },
        to:{
            hour: req.body.dutyHrs.to.hour,
            minute: req.body.dutyHrs.to.minute
        }
    },
    brakeType: brakeType,
    pressure: {
        fp: {
            front: req.body.pressure.fp.front,
            rear: req.body.pressure.fp.rear
        },
        bp: {
            front: req.body.pressure.bp.front,
            rear: req.body.pressure.bp.rear
        }
    }
}

module.exports = headerData;