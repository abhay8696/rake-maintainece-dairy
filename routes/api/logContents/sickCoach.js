const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        SickCoach         = require('../../../models/SickCoach'),
        Log         = require('../../../models/Log'),
        Train       = require('../../../models/Train');
        // header      = require('./logContents/header') 

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:sickCoachId', auth, async (req, res)=> {
    try{
        const sickCoach = await SickCoach.findOne({ _id: req.params.sickCoachId })

        if(!sickCoach){
            return res.status(400).json({ msg: 'There is no sick coach for this logID'})
        }
 
        res.json(sickCoach)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/
// @desc    create/update user profile
// @access  Private

router.post('/:logId/:trainId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {
        serialNo, owningRailway, coachNo, 
        coachCode, returnDate, description, pohStation, pohDate,
        iohStation, iohDate
    } = req.body;

    const sickCoachData = {
        log: req.params.logId,
        train: req.params.trainId,
        serialNo: serialNo,
        owningRailway: owningRailway,
        coachNo:coachNo,
        coachCode : coachCode,
        returnDate: returnDate,
        pohStation: pohStation,
        pohDate: pohDate,
        iohStation: iohStation,
        iohDate: iohDate,
        description:description
    }
    try{
        //check for log and train
        const   log = await Log.findOne({ _id: req.params.logId }),
                train = await Train.findOne({ _id: req.params.trainId })

                if(train) console.log('found train')
        
        //create new sickCoach
        let sickCoach = await new SickCoach(sickCoachData)

        await sickCoach.save();
        await train.sickCoaches.push(sickCoach)
        await train.save();
        await log.save()
        
        return(res.json(log))

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.delete(
    '/:sickCoachId', 
    auth, 
    async (req, res)=> {
        try{
            const sickCoach = await SickCoach.findOne({id:req.params.sickCoachID})
    
            if(sickCoach){ //if sickCoach exists, delete it
                await SickCoach.findByIdAndDelete(req.params.sickCoachId);
                return(res.json('Deleted!'))
            }else{
                res.json('sickCoach not found!')
            }
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
    )

module.exports = router;