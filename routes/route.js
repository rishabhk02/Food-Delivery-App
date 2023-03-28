const menuDetailController = require('../serverSide/controllers/menuDetailController');
const cartController = require('../serverSide/controllers/cartController');
const authController = require('../serverSide/controllers/authController');

function routesInitialization(app){
    // Home routes
    app.get('/',(req,res)=>{
        res.render('home');
    })

    // Menu-Details Routes
    app.get('/VegPizza',menuDetailController().vegPizza);
    app.get('/NonVegPizza',menuDetailController().nonVegPizza);
    app.get('/VegBurger',menuDetailController().vegBurger);
    app.get('/NonVegBurger',menuDetailController().nonVegBurger);
    app.get('/Beverages',menuDetailController().beverages);

    // Cart-routes
    app.get('/cart',cartController().cart);
    app.post('/addToCart',cartController().updateCart);

    // Login-routes
    app.get('/login',authController().login);
    app.post('/login',authController().loginUser);
    
    // Register-routes
    app.get('/register',authController().register);
    app.post('/register',authController().addUser);
}

module.exports = routesInitialization;