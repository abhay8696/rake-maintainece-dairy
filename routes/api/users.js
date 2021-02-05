const   express     = require('express'),
        router      = express.Router(),
        {check, validationResult} = require('express-validator/check'),
        bycrypt = require('bcryptjs'),
        jwt     = require('jsonwebtoken'),
        config  = require('config'),
        User = require('../../models/User'), //import user model
        Profile     = require('../../models/Profile'), 
        cors = require('../../middleware/cors')

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

        
        const { name, email, password, batch, designation} = req.body;

        try{
            //see if user already exists
            let user = await User.findOne({ email })
            if(user){   //user already exists
                res.status(400).json({ errors: [{ msg: 'User already exist!'}]})
            }

            //create new user
            user = new User({
                name,   email,  password, batch, designation
            })

            

            //encrypt password
            const salt = await bycrypt.genSalt(10);
            user.password = await bycrypt.hash(password, salt)

            await user.save();

            //create new profile
            let profile = new Profile({
                user: user.id,
                name: name,
                batch: batch,
                designation: designation
            })
            await profile.save();

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000},
                (err, token)=> {
                    if(err) throw err;
                    res.json({ token })
                }
                )

        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
        
    }
)

module.exports = router;