const userData = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController(){
    return {
        register: function(req,res){
            return res.render("register");
        },

        addUser: async function(req,res){
            const {userName,email,password} = req.body;

            // Checking if all field are filled or not
            if(!userName || !email || !password){
                req.flash("error","All fiels are required");
                req.flash('userName',userName);
                req.flash('email',email);
                console.log("Error");
                return res.redirect('/register');
            }

            // Checking if user already exist
            userData.find({email:email}).then(result=>{
                if(result!=""){
                    req.flash("Email already registered");
                    console.log('Error 2');
                    return res.redirect('/register');
                }
            });

            // Hashing the user password:
            const hashPassword = await bcrypt.hash(password,10);

            // Creating a new user
            const newUser = new userData({
                name: userName,
                email: email,
                password: hashPassword
            });

            newUser.save().then(()=>{
                return res.redirect('/');
            }).catch(err=>{
                console.log(err);
                req.flash('Something went wrong');
                return res.redirect('/register');
            });
        },

        login: function(req,res){
            res.render('login');
        },

        loginUser: function(req,res,next){
            const {email,password} = req.body;

            // Check if all fiels are filled or not
            if(!email || !password){
                req.flash('error','All fields are required');
                return res.redirect('/login');
            }

            // user-authenticaton using passport
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login');
                }

                req.login(user,(err)=>{
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }

                    return res.redirect('/');
                })
            })(req,res,next);
        },

        logout: function(req,res,next){
            req.logout(function(err){
                if(err){return next(err)};
                res.redirect('/');
            })
        }
    }
}

module.exports = authController;