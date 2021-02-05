const Header = require('../../models/Header');
const Staff = require('../../models/Staff');
const Train = require('../../models/Train')
const Coach = require('../../models/Coach')

const   express     = require('express'),
        router      = express.Router(),
        auth        = require('../../middleware/auth'),
        User        = require('../../models/User'),
        Log         = require('../../models/Log')

        // headerData      = require('./logContents/testHeader')

// @route   GET api/log/:logID
// @desc    Get log with given logID
// @access  Private
router.get('/:logID', auth, async (req, res)=> {
    try{
        const log = await Log.findOne({ _id: req.params.logID })
            .populate('header')
            .populate('staff')
            .populate ({
                path: 'trains',
                populate: {
                    path: 'coaches',
                    model: Coach
                },
                model: Train
            })
            .populate ({
                path: 'trains',
                populate: {
                    path: 'sickCoaches',
                    model: SickCoach
                },
                model: Train
            })
            .populate('washingAndCleaning')

        if(!log){
            return res.status(400).json({ msg: 'There is no log for this logID'})
        }

        res.json(log)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @route   POST api/log/
// @desc    create new log
// @access  Private

router.post('/', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');

    const   d = new Date(),
            getDate = d.getDate(),
            getDay = d.getDay();
    // res.json(user.name)
    //headerData:
    const { date, day, depot} = req.body;

    //staffData:
    // const {underGear, brakePower, oiling, pipeFitting, carpentry, otherWorks} = req.body
    // const {onRoll, physicallyPresent, underRest, onLeave, absent, sick} = req.body.totalSacntionedStrength

    //TrainListData:
    // const {SerialNo, trainNo, trainName, load, remarks} = req.body  

   
  
    const headerData = {
        date: date,
        day : day,
        txr: req.user.name,
        depot: depot,
        dutyHrs: {
            from: req.body.dutyHrs.from,
            to: req.body.dutyHrs.to 
        },
    } 
    // const staffData = {
    //         underGear: underGear,
    //         brakePower: brakePower,
    //         pipeFitting: pipeFitting,
    //         carpentry: carpentry,
    //         oiling: oiling,
    //         otherWorks: otherWorks,

    //         totalSacntionedStrength: {
    //             onRoll: onRoll,
    //             physicallyPresent: physicallyPresent,
    //             underRest: underRest,
    //             onLeave: onLeave,
    //             absent: absent,
    //             sick: sick
    //         }
    //     }

    try{
        //find user's profile
        const profile = await Profile.findOne({ user: req.user.id })
        
        //create new Log
        let log = await new Log();
            // return (res.json(log))

        let header = await new Header(headerData);
            await header.save()
            await log.header.push(header)
            
        // let staff = await new Staff(staffData);
        //     await staff.save()
        //     await log.staff.push(staff)

        await log.save();
        
        //push saved log into user's profile
        await profile.logs.push(log)
        await profile.save()
        return(res.json(profile))
    }catch(err){
        console.error('!!!'+err.message);
        res.status(500).send('Server Error')
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @route   POST api/log/
// @desc    update log
// @access  Private

router.post('/:logId', auth, async (req, res)=> {
    const user = await User.findById(req.user.id).select('-password');
    // res.json(user.name)
    //headerData:
    const {date, day, depot} = req.body;

    //staffData:
    const {underGear, brakePower, oiling, pipeFitting, carpentry, otherWorks} = req.body
    // const {onRoll, physicallyPresent, underRest, onLeave, absent, sick} = req.body.totalSacntionedStrength

    //TrainListData:
    // const {SerialNo, trainNo, trainName, load, remarks} = req.body  



    const headerData = {
        date: date,
        day : day,
        txr: user.name,
        depot: depot,
        dutyHrs: {
            from: req.body.dutyHrs.from,
            to: req.body.dutyHrs.to 
        },
    }
    
    try{
        //find user's profile
        const profile = await Profile.findOne({ user: req.user.id })
        console.log(profile)
        //find log
        const log = await Log.findOne({ _id: req.params.logId })
            .populate('header')
            .populate('staff')
        let header, staff;
        // return (res.json(log))

        if(!log){
            return res.status(400).json({ msg: 'There is no log for this logID'})
        }

        //find header is present
        if(log.header[0]) {
            header = await Header.findOne({_id: log.header[0].id})
            if(header) console.log('found')
            } else{header=null; console.log(header)}

        // if header is not present create new, else edit them
        if(!header){
            header = await new Header(headerData);
            await header.save()
            await log.header.push(header)
        }else {
            header = await Header.findOneAndUpdate({_id: log.header[0].id}, headerData, {new: true})
            await header.save()
        }

        
        //save log
        await log.save();

        //push saved log into user's profile
        // await profile.logs.push(log)
        await profile.save()
        return(res.json(log))
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @route   DELETE api/log/
// @desc    delete log
// @access  Private

router.delete('/:logId', auth, async (req, res)=> {
    try{
        //find log
        const log = await Log.findOne({_id: req.params.logId })
        if(log){
            //find header and staff
            const header = await Header.findOneAndDelete({_id: log.header[0].id})
            const staff = await Staff.findOneAndDelete({_id: log.staff[0].id})
            
            await Log.findOneAndDelete({_id: req.params.logId })
            res.json('Log deleted successfully!')
        }else res.json('Log not found!')
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
module.exports = router;








/*

        //find user's profile
        const profile = await Profile.findOne({ user: req.user.id })
        //create new Log
        let log = await new Log()
        // res.json(log.staff)
        let header, staff;
        //find header&staff;
            if(log.header[0] && log.staff[0]){ //if header& staff is present
                header = await Header.findOne({_id: log.header[0].id})
                staff = await Staff.findOne({_id: log.staff[0].id})
                // res.json(true)
            }

        // if header & staff not present create new, else edit them
        if(!header){
            header = await new Header(headerData);
            await header.save()
            await log.header.push(header)
        }
        // else {
        //     header = await Header.findOneAndUpdate({_id: log.header[0].id}, headerData)
        //     await header.save()
        // }

        if(!staff){
            staff = await new Staff(staffData);
            await staff.save()
            await log.staff.push(staff)
        }
        // else {
        //     staff = await Staff.findOneAndUpdate({_id: log.staff[0].id}, staffData)
        //     await staff.save()
        // }
        
        //save log
        await log.save();
        
        //push saved log into user's profile
        await profile.logs.push(log)
        return(res.json(log))
*/