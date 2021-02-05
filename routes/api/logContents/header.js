const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        Header         = require('../../../models/Header');
        // header      = require('./logContents/header')

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:headerID', auth, async (req, res)=> {
    try{
        const header = await Header.findOne({ _id: req.params.headerID })

        if(!header){
            return res.status(400).json({ msg: 'There is no header for this logID'})
        }

        res.json(header)
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
    // res.json(user.name)
    const {Date, day, depot} = req.body;
    
    const headerData = {
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
        }
    }

    try{
        let header = await new Header(headerData);
        await header.save();
        return(res.json(header))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;





















/*

const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../../middleware/auth'),
        User        = require('../../../models/User'),
        Header         = require('../../../models/Header');
        // header      = require('./logContents/header')

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:headerID', auth, async (req, res)=> {
    try{
        const header = await Header.findOne({ _id: req.params.headerID })

        if(!header){
            return res.status(400).json({ msg: 'There is no header for this logID'})
        }

        res.json(header)
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
    // res.json(user.name)
    const {Date, day, depot, brakeType} = req.body;
    
    const headerData = {
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

    try{
        let header = await new Header(headerData);
        await header.save();
        return(res.json(header))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;
*/