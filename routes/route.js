const menuDetailController = require('../serverSide/controllers/menuDetailController');
const cartController = require('../serverSide/controllers/cartController');
const authController = require('../serverSide/controllers/authController');
const orderController = require('../serverSide/controllers/orderController');

// middlewares
const guest = require('../serverSide/middlewares/guest');
const auth =  require('../serverSide/middlewares/auth');
const adminAuth = require('../serverSide/middlewares/adminAuth');
const adminController = require('../serverSide/controllers/adminController');

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
    app.get('/login',guest,authController().login);
    app.post('/login',authController().loginUser);
    app.post('/logout',authController().logout);
    
    // Register-routes
    app.get('/register',guest,authController().register);
    app.post('/register',authController().addUser);

    // Order-routes
    app.post('/placeOrder',orderController().storeOrder);
    app.get('/customerOrder',auth,orderController().orderpage);
    app.get('/orderStatus/:id',auth,orderController().showStatus);

    // admin-routes 
    app.get('/adminPanel',adminAuth,adminController().adminPanel);
    app.post('/updateOrderStatus',adminAuth,adminController().updateOrderStatus)
}

module.exports = routesInitialization;