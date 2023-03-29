require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const flash = require('express-flash');
const passport = require('passport');


// JSON format (add-to-cart);
app.use(express.json());


// URL encoded (register-form-data)
app.use(express.urlencoded({ extended: false }));


// Data-Base Connecton
mongoose.connect("mongodb://127.0.0.1:27017/FoodApp", { useNewUrlParser: true });

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Connection Error"));
connection.once('open', () => {
    console.log("Database Connected SuccessFully");
});

// session-store for cart
let mongoStore = MongoDBStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/FoodApp',
});


// session-config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


// flash for session store
app.use(flash());

// Passport-config
require('./serverSide/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


// Global-Middlewaes
app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})


// Assets for CSS
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/resources/views'));

// Getting all the routes
require('./routes/route')(app);



app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});