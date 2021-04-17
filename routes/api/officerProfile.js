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

        const allUser = await User.find()
        

        if(!officerProfile){
            return res.json({ msg: 'There is no profile for this officer'})
        }

        res.json({officerProfile, allUser})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;