const   express         = require('express'),
        app             = express(),
        connectDB       = require('./config/db'),
        path            = require('path');

connectDB();

// Init Middleware
app.use(express.json({ extended: false}))

// app.get('/', (req, res)=> res.send('API RUNNING'))

//Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/officers', require('./routes/api/officers'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/officerAuth', require('./routes/api/officerAuth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/officerProfile', require('./routes/api/officerProfile'))
app.use('/api/officerProfile/allUserAllLogs', require('./routes/api/allUserAllLogs'))
app.use('/api/log', require('./routes/api/log'))
app.use('/api/log/header', require('./routes/api/logContents/header'))
app.use('/api/log/train', require('./routes/api/logContents/train'))
app.use('/api/staff', require('./routes/api/logContents/staff'))
app.use('/api/log/coach', require('./routes/api/logContents/coach'))
app.use('/api/log/sickCoach', require('./routes/api/logContents/sickCoach'))
app.use('/api/log/washingAndCleaning', require('./routes/api/logContents/washingAndCleaning'))

// console.log(process.env)
//Serve static assest in production
// process.env.NODE_ENV = 'production'
if(process.env.NODE_ENV === 'production'){ 
    console.log('found production')
    //set the static folder
    app.use(express.static('client/build'))
    if(express.static('client/build')) console.log(true)
    console.log('client called...')

    app.get('*', (req, res)=> {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}else{
    console.log('not production')
    console.log(process.env.NODE_ENV)
    }


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> console.log(`Server ready on port ${PORT}`))