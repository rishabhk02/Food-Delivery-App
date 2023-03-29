const order = require('../models/orderModel');
const moment = require('moment');

function orderController(){
   return {
    storeOrder: function(req,res){
        const {phone,address} = req.body;
        if(!phone || !address){
            req.flash('error','All fielsds are required');
            return res.redirect('/cart');
        }
        // console.log(req.user);

        const newOrder = new order({
            customerId: req.user._id,
            items: req.session.cart.items,
            phone: phone,
            deliveryAddress: address            
        });

        newOrder.save().then(result=>{
            req.flash('Success','Order placed successfully');
            delete req.session.cart;
            return res.redirect('/customerOrder');
        }).catch(err=>{
            console.log(err);
            return res.redirect('/cart');
        })
    },

    orderpage: async function(req,res){
        const allorder = await order.find({customerId: req.user._id},null,{sort:{'createdAt':-1}});
        res.header('Cache-Control', 'no-cache, private,  no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        return res.render('customerOrder',{allorder: allorder,moment});
    },

    showStatus: async function(req,res){
        const curOrder = await order.findById(req.params.id);

        // Checking if requested user has particular order or not
        if(req.user._id.toString()=== curOrder.customerId.toString()){
            return res.render('orderStatus',{curOrder});           
        }
        res.redirect('/');
    }


   }
}

module.exports = orderController;