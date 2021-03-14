const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        Coach         = require('../../../models/Coach'),
        Log         = require('../../../models/Log'),
        Train       = require('../../../models/Train');
        // header      = require('./logContents/header') 

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:coachId', auth, async (req, res)=> {
    try{
        const coach = await Coach.findOne({ _id: req.params.coachId })

        if(!coach){
            return res.status(400).json({ msg: 'There is no coach for this logID'})
        }

        res.json(coach)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/log/traint/coach/
// @desc    create/update coach
// @access  Private

router.post('/:logId/:trainId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {
        serialNo, owningRailway, coachNo, 
        coachCode, mechCode, returnDate, 
        angleCock, underGearWorks, pipeLineWorks, 
        carpentryWorks, airBrakeWorks, pohStation, pohDate,
        iohStation, iohDate, schedule
    } = req.body;

    const coachData = {
        log: req.params.logId,
        train: req.params.trainId,
        serialNo: serialNo,
        owningRailway: owningRailway,
        coachNo:coachNo,
        coachCode : coachCode,
        mechCode: mechCode,
        returnDate: returnDate,
        angleCock: angleCock,
        underGearWorks: underGearWorks,
        pipeLineWorks: pipeLineWorks,
        carpentryWorks: carpentryWorks,
        airBrakeWorks: airBrakeWorks,
        pohStation: pohStation,
        pohDate: pohDate,
        iohStation: iohStation,
        iohDate: iohDate,
        schedule: schedule
    }
    try{
        //check for log and train
        const   log = await Log.findOne({ _id: req.params.logId }),
                train = await Train.findOne({ _id: req.params.trainId })

                if(train) console.log('found train')

        //create new coach
        const coach = await new Coach(coachData)

        await coach.save();
        await train.coaches.push(coach)
        await train.save();
        await log.save()
        
        return(res.json(train))
        //push new coach in rake
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.delete(
    '/:coachId', 
    auth, 
    async (req, res)=> {
        try{
            const coach = await Coach.findOne({id:req.params.coachID})
    
            if(coach){ //if coach exists, delete it
                await Coach.findByIdAndDelete(req.params.coachId);
                return(res.json('Deleted!'))
            }else{
                res.json('coach not found!')
            }
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
    )

module.exports = router;