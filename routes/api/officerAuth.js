const   express     = require('express'),
        router      = express.Router(),
        auth    = require('../../middleware/auth'),
        Officer    = require('../../models/Officer'),
        bycrypt = require('bcryptjs'),
        jwt     = require('jsonwebtoken'),
        config  = require('config'),
        {check, validationResult} = require('express-validator/check'),
        cors = require('../../middleware/cors')

// @route   GET api/officers
// @desc    Login Officer
// @access  Public

//GET request for JWT
router.get('/',auth, async (req, res)=> {
    try {
        const officer = await Officer.findById(req.user.id).select('-password');
        res.json(officer)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//OFFICER LOGIN AUTHENTICATION
let checkValidation = [
    check('email', 'Please include a valid email').not().isEmpty(),
    check(
        'password', 
        'Please enter a valid password'
    ).exists()
]

router.post('/', 
    checkValidation, 
    async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body; //destructuring

        try{
            let officer = await Officer.findOne({ email })
            
            //check if officer exists with given email
            if(!officer){
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }]})
            }

            //compare given password with original password
            const isMatch = await bycrypt.compare(password, officer.password)

            if(!isMatch){
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }]})
            }


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
                        "token": token,
                        "payload :": payload
                 })
                }
                )

        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
        

    }
);


module.exports = router;