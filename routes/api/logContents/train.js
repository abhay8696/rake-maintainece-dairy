const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        Train         = require('../../../models/Train'),
        Log         = require('../../../models/Log');
        // header      = require('./logContents/header')

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:logId/:trainId', auth, async (req, res)=> {
    try{
        const train = await Train.findOne({_id:req.params.trainId})
                            .populate('coaches')

        if(!train){
            return res.status(400).json({ msg: 'There is no train for this logID'})
            // return res.status(400).json(req.params.trainId)
        }

        res.json(train)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/
// @desc    create/update user profile
// @access  Private


//////////////////////////////////////////////////////////////////////////////////
//create new train, if already present push new train in list
router.post('/:logId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {SerialNo, trainNo, trainName, load, remarks, brakeType} = req.body
    
    const trainData={
        // SerialNo, trainNo, trainName, memoNo, pitlineNo, remarks
        SerialNo: SerialNo,
        trainNo :trainNo,
        trainName: trainName,
        formation: {
            memoNo: req.body.formation.memoNo,
            timeRecieved: req.body.formation.timeRecieved,
            pitlineNo: req.body.formation.pitlineNo
        },
        load: load,
        protectionOfRake: {
            lineBlockingTime: req.body.protectionOfRake.lineBlockingTime,
            lineReleaseTime: req.body.protectionOfRake.lineReleaseTime,
        },
        timeUnfitMemoIssued: req.body.timeUnfitMemoIssued,
        timeReplacementProvided: req.body.timeReplacementProvided,
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
        },
        washingAndCleaning: {
            checkBox: req.body.washingAndCleaning.checkBox,
            internalCleaning: req.body.washingAndCleaning.internalCleaning,
            externalCleaning: req.body.washingAndCleaning.externalCleaning,
            lavatoryFloorCleaning: req.body.washingAndCleaning.lavatoryFloorCleaning,
            disinfectionOfLavatory: req.body.washingAndCleaning.disinfectionOfLavatory,
            pestControl: req.body.washingAndCleaning.pestControl,
        },
        remarks: remarks
    }
    try{
        //find log
        const log = await Log.findOne({ _id: req.params.logId })
        const profile = await Profile.findOne({ user: req.user.id })

        //check if train with that trainNo exist
        let train = await new Train(trainData)

        await train.save();
        await log.trains.push(train)
        await log.save() 
        await profile.save()
        return(res.json(train))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
//////////////////////////////////////////////////////////////////////////////////////////////
//Edit train data
router.post('/:trainId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {SerialNo, trainNo, trainName, load, remarks, brakeType} = req.body
    
    const trainData={
        // SerialNo, trainNo, trainName, memoNo, pitlineNo, remarks
        SerialNo: SerialNo,
        trainNo :trainNo,
        trainName: trainName,
        formation: {
            memoNo: req.body.formation.memoNo,
            timeRecieved: req.body.formation.timeRecieved,
            pitlineNo: req.body.formation.pitlineNo
        },
        load: load,
        protectionOfRake: {
            lineBlockingTime: req.body.protectionOfRake.lineBlockingTime,
            lineReleaseTime: req.body.protectionOfRake.lineReleaseTime,
        },
        timeUnfitMemoIssued: req.body.timeUnfitMemoIssued,
        timeReplacementProvided: req.body.timeReplacementProvided,
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
        },

        remarks: remarks
    }

    try{
        //check for log
        let log = await Log.findOne({_id: req.params.logId})
        //find train list by id
        let train = await Train.findById({_id:req.params.trainId})

        if(train){
            train.trains.push(trainData)
            await train.save();
            return(res.json(train))
        }else return(res.json('No train List Present at this ID'))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.delete(
    '/:trainId', 
    auth, 
    async (req, res)=> {
        try{
            let train = await Train.findByIdAndDelete({_id:req.params.trainId})
            return (res.json('deleted! train id: '+train))
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
    )

module.exports = router;



/*
router.post('/', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {SerialNo, trainNo, trainName, load, remarks} = req.body
    
    const trainList={
        // SerialNo, trainNo, trainName, memoNo, pitlineNo, remarks
        SerialNo: SerialNo,
        trainNo :trainNo,
        trainName: trainName,
        
        formation: {
            memoNo: req.body.formation.memoNo,
            timeRecieved: {
                hour: req.body.formation.timeRecieved.hour,
                minute: req.body.formation.timeRecieved.minute
            },
            pitlineNo: req.body.formation.pitlineNo
        },

        load: load,

        protectionOfRake: {
            lineBlockingTime: {
                hour: req.body.protectionOfRake.lineBlockingTime.hour,
                minute: req.body.protectionOfRake.lineBlockingTime.minute
            },
            lineReleaseTime: {
                hour: req.body.protectionOfRake.lineReleaseTime.hour,
                minute: req.body.protectionOfRake.lineReleaseTime.minute
            },
        },

        timeUnfitMemoIssued:{
            hour: req.body.timeUnfitMemoIssued.hour,
            minute: req.body.timeUnfitMemoIssued.minute,
        },

        timeReplacementProvided:{
            hour: req.body.timeReplacementProvided.hour,
            minute: req.body.timeReplacementProvided.minute,
        },

        remarks: remarks
    }

    try{
        let train = await TrainList.findOne({ trainNo: req.body.trainNo })
        
        if(!train){
            train = await new TrainList(trainList);
            await train.save();
            return(res.json(train))
        }else{
            train = await TrainList.findOneAndUpdate(
                { trainNo: req.body.trainNo },
                (trainList)
                )
            await train.save();
            res.json(train)
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})




router.delete(
    '/:trainListId/:trainSerialNo', 
    auth, 
    async (req, res)=> {
        try{
            let trainList = await TrainList.findById({_id:req.params.trainListId})
            let serialNo = req.params.trainSerialNo;
            let t = trainList.trains[1]
                // t = JSON.parse(t)
            res.send(t)
            if(trainList){

                let SerialNo = await trainList.trains.forEach(train=> {
                    if (train.SerialNo === serialNo){
                        return train.SerialNo
                    }else return res.send(req.params.trainSerialNo)
                })
                res.json('lll')
                // const index = trainList.trains.indexOf(SerialNo);
                // if (index > -1) {
                // trainList.trains.splice(index, 1);
                // }
                
                await trainList.save();
                return(res.json(trainList))
            }
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
    )
*/