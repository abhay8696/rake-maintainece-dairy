const   express             = require('express'),
        router              = express.Router(),
        auth                = require('../../middleware/auth'),
        Profile             = require('../../models/Profile'),
        User                = require('../../models/User'),
        Log                 = require('../../models/Log'),
        WashingAndCleaning  = require('../../models/WashingAndCleaning'),
        Train               = require('../../models/Train'),
        { check, validationResult } = require('express-validator')


// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res)=> {
    try{
        const profile = await Profile.findOne({ user: req.user.id })
            .populate(
                'user',
                ['name', 'email', 'batch', 'designation', 'employeeId']
            )
            .populate({ //nested populate
                path: 'logs',
                populate: {
                    path: 'header',
                    model: Header
                },
                model: Log
            })
            .populate({ //nested populate
                path: 'logs',
                populate: {
                    path: 'staff',
                    model: Staff
                },
                model: Log
            })
            .populate({
                path: 'logs',
                    populate: {
                        path: 'trains',
                            populate: {
                                path: 'coaches',
                                model: Coach
                            },
                        model: Train
                    },
                model: Log
            })
            .populate({
                path: 'logs',
                    populate: {
                        path: 'trains',
                            populate: {
                                path: 'sickCoaches',
                                model: SickCoach
                            },
                        model: Train
                    },
                model: Log
            })
            .populate({
                path: 'logs',
                populate: {
                    path: 'washingAndCleaning',
                    model: WashingAndCleaning
                },
                model: Log
            })

        if(!profile){
            return res.json({ msg: 'There is no profile for this user'})
        }

        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/
// @desc    create/update user profile
// @access  Private

router.post('/', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    let {batch, designation, staff} = req.body
    let profileInfo = {
        user : req.user.id,
        name: user.name,
        employeeId: user.employeeId,
        batch : batch,
        designation : designation,
        staff:staff
    }
    // if(clerk) profileInfo.staff = clerk;
    // if(MCM) profileInfo.staff = MCM;
    // if(TECH) profileInfo.staff = TECH;
    // if(helper) profileInfo.staff = helper;
    
    try{
        
        let profile = await Profile.findOne({user : req.user.id});

        if(profile){    // find if given profile already exists
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                profileInfo,
                { new : true } 
            )
            await profile.save()
            res.send(profile)
        }else{  // if given profile does not exist, create new
        profile = await new Profile(profileInfo);
        await profile.save()
        return( res.json(profile)) 
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

 
module.exports = router;




/*
const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../middleware/auth'),
        Profile     = require('../../models/Profile'),
        User        = require('../../models/User'),
        Log         = require('../../models/Log'),
        { check, validationResult } = require('express-validator')


// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res)=> {
    try{
        const profile = await Profile.findOne({ user: req.user.id })
            .populate(
                'user',
                ['name', 'email']
            )
            .populate({ //nested populate
                path: 'logs',
                populate: {
                    path: 'header',
                    model: Header
                },
                model: Log
            })

        if(!profile){
            return res.json({ msg: 'There is no profile for this user'})
        }

        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/
// @desc    create/update user profile
// @access  Private

router.post('/', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    let {batch, designation, staff} = req.body
    let profileInfo = {
        user : req.user.id,
        name: user.name,
        batch : batch,
        designation : designation,
        staff:staff
    }
    // if(clerk) profileInfo.staff = clerk;
    // if(MCM) profileInfo.staff = MCM;
    // if(TECH) profileInfo.staff = TECH;
    // if(helper) profileInfo.staff = helper;
    
    try{
        
        let profile = await Profile.findOne({user : req.user.id});

        if(profile){    // find if given profile already exists
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                profileInfo,
                { new : true } 
            )
            await profile.save()
            res.send(profile)
        }else{  // if given profile does not exist, create new
        profile = await new Profile(profileInfo);
        await profile.save()
        return( res.json(profile)) 
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

 
module.exports = router;
*/