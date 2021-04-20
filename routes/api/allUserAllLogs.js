const   express     = require('express'),
        router      = express.Router(),
        auth    = require('../../middleware/auth'),
        User    = require('../../models/User'),
        bycrypt = require('bcryptjs'),
        jwt     = require('jsonwebtoken'),
        config  = require('config'),
        {check, validationResult} = require('express-validator/check'),
        cors = require('../../middleware/cors')

// @route   POST api/users
// @desc    For OFFICER:- Login User
// @access  Private


router.get('/:userID',async (req, res)=> {
    // res.json(req.params.userID) "employeeId": 1111,
    try{
        const profile = await Profile.findOne({user:{_id: req.params.userID}})
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


module.exports = router;