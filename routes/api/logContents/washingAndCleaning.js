const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        WashingAndCleaning         = require('../../../models/WashingAndCleaning');
        // header      = require('./logContents/header') 

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:logId/:washingId', auth, async (req, res)=> {
    try{
        const washing = await WashingAndCleaning.findOne({ id: req.params.washingId })

        if(!washing){
            return res.status(400).json({ msg: 'There is no washing for this logID'})
        }

        res.json(washing)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/
// @desc    create/update user profile
// @access  Private

router.post('/:logId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    const {
        washingAndCleaning,
        internalCleaning, externalCleaning,
        lavatoryFloorCleaning, disinfectionOfLavatory,
        pestControl
    } = req.body;

    const washingData = {
        log: req.params.logId,
        washingAndCleaning:washingAndCleaning,
        internalCleaning:internalCleaning,
        externalCleaning:externalCleaning,
        lavatoryFloorCleaning:lavatoryFloorCleaning,
        disinfectionOfLavatory:disinfectionOfLavatory,
        pestControl:pestControl
    }
    try{
        //check for log
        let log = await Log.findOne({_id: req.params.logId})

        //check for washingData
        let washing = await WashingAndCleaning.findOne({log: req.params.logId})

        if(!washing){
            washing = await new WashingAndCleaning(washingData)
            await washing.save();
            await log.washingAndCleaning.push(washing)
            await log.save()
        }else{
            washing = await WashingAndCleaning.findOneAndUpdate({log:req.params.logId}, washingData, {new: true})
            // if(sta) return(res.json(sta))
            // else{return(res.json('not found2'))}
            await washing.save();
            // await log.staff.push(staff)
            await log.save()
            return(res.json(log)) 
        } 
        return(res.json(washing))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;