const   express             = require('express'),
        router              = express.Router(),
        auth                = require('../../middleware/auth'),
        OfficerProfile      = require('../../models/OfficerProfile'),
        Officer             = require('../../models/Officer'),
        User                = require('../../models/User'),
        Profile                = require('../../models/Profile'),
        { check, validationResult } = require('express-validator')


// @route   GET api/officerProfile/me
// @desc    Get current officer profile
// @access  Private
router.get('/me', auth, async (req, res)=> {
    try{
        const officerProfile = await OfficerProfile.findOne({ officer: req.user.id })
            .populate(
                'officer',
                ['name', 'email','designation', 'employeeId']
            )

        const allUser = await Profile.find().select('-logs')
        

        if(!officerProfile){
            return res.json({ msg: 'There is no profile for this officer'})
        }

        res.json({officerProfile, allUser})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   GET api/officerProfile/user
// @desc    Get supervisor/user profile
// @access  Private

router.get('/user/:userID', async (req, res)=> {
    // res.json(req.params.userID) "employeeId": 1111,
    try{
        const profile = await Profile.findById(req.params.userID)
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

module.exports = router;