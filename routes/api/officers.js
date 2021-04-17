const   express = require('express'),
        router  = express.Router(),
        {check, validationResult} = require('express-validator/check'),
        bycrypt = require('bcryptjs'),
        jwt     = require('jsonwebtoken'),
        config  = require('config'),
        Officer    = require('../../models/Officer'), //import user model
        OfficerProfile = require('../../models/OfficerProfile'), 
        cors    = require('../../middleware/cors')

// @route   POST api/users
// @desc    Register User
// @access  Public

let checkValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').not().isEmpty(),
    check(
        'password', 
        'Please enter a valid password with minimum length of 6 char'
    ).isLength({min: 6})
]
 
router.post('/',
    checkValidation,
    async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).json({errors: errors.array()})
        }

        
        const { name, email, password, designation, employeeId} = req.body;

        try{
            //see if officer already exists
            let officer = await Officer.findOne({ email })
            if(officer){   //officer already exists
                res.status(400).json({ errors: [{ msg: 'Officer already exist!'}]})
            }

            //create new user
            officer = new Officer({
                name,   email,  password, designation, employeeId
            })

            

            //encrypt password
            const salt = await bycrypt.genSalt(10);
            officer.password = await bycrypt.hash(password, salt)

            await officer.save();

            //create new profile
            let officerProfile = new OfficerProfile({
                officer: officer.id,
                name: name,
                designation: designation,
                employeeId: employeeId
            })
            await officerProfile.save();

            //return jsonwebtoken
            const payload = {
                user: {
                    id: officer.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000},
                (err, token)=> {
                    if(err) throw err;
                    res.json({ 
                        "New account created...: ":token,
                        "profile..: ": officerProfile,
                        "payload :": payload
                 })
                }
                )

        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
        
    }
)

module.exports = router;