const LocalStrategy = require('passport-local').Strategy;
const userData = require('../models/userModel');
const bcrypt = require('bcrypt');

function passportInit(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},async function(email,password,done){
        // Check if email exist or not
        const user = await userData.findOne({email:email});
        if(!user){
            return done(null,false,{message: "No user with this email"});
        }

        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null,user,{message: 'Logged in successfully'});
            }
            console.log('Wrong Password');
            return done(null,false,{message: "Wrong email or password"});
        }).catch(err=>{
            console.log(err);
            return done(null,false,{message: 'Something went wrong'});
        });

    }))


    // Serailize the user to store in session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    // Deserialize the user 
    passport.deserializeUser(async (id,done)=>{
        const user = await userData.findOne({_id:id});
        if(!user){
            done(error,false);
        }
        done(null,user);
    })
}

module.exports=passportInit;