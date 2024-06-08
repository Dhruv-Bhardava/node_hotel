const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


//AUTHENTICATION CODE configuration
passport.use(new localStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
        // console.log('Recevied credentials : ', USERNAME, password);

        const user = await Person.findOne({username : USERNAME});
        if(!user) 
            return done(null, false, {message : 'Incorrect username.'});

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, {message : 'Incorrect password'});
        }

    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;