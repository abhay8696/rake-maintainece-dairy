const   mongoose    = require('mongoose'),
        config      = require('config'),
        db          = config.get('mongoURI');
    
const connectDB = async ()=> {
    try{
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex : true
        });
        console.log('Database Connected...')
    } catch(err){
        console.log('Check your network connection, it may be a problem.')
        console.err(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;