const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        Staff         = require('../../../models/Staff');
        Log         = require('../../../models/Log')
        // header      = require('./logContents/header')

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:logId/:staff', auth, async (req, res)=> {
    try{
        const staff = await Staff.findOne({ id: req.params.staffID })
        const log = await Log.findOne({ id: req.params.logId })

        if(!staff){
            return res.status(400).json({ msg: 'There is no staff for this logID'})
        }

        res.json(staff)
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
    const {underGear, brakePower, oiling, pipeFitting, carpentry, otherWorks} = req.body
    const {onRoll, physicallyPresent, underRest, onLeave, absent, sick} = req.body.totalSacntionedStrength
    const staffData = {
        log: req.params.logId,
        underGear: underGear,
        brakePower: brakePower,
        pipeFitting: pipeFitting,
        carpentry: carpentry,
        oiling: oiling,
        otherWorks: otherWorks,

        totalSacntionedStrength: {
            onRoll: onRoll,
            physicallyPresent: physicallyPresent,
            underRest: underRest,
            onLeave: onLeave,
            absent: absent,
            sick: sick
        }
    }
    try{
        //check for log
        let log = await Log.findOne({_id: req.params.logId})

        //check for staff
        let staff = await Staff.findOne({log:req.params.logId})
        // return (res.json('found'+staff))
        if(!staff){
            staff = await new Staff(staffData);
            await staff.save();
            await log.staff.push(staff)
            await log.save()
            return(res.json(log)) 
        }else{
            staff = await Staff.findOneAndUpdate({log:req.params.logId}, staffData, {new: true})
            // if(sta) return(res.json(sta))
            // else{return(res.json('not found2'))}
            await staff.save();
            // await log.staff.push(staff)
            await log.save()
            return(res.json(log)) 
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;