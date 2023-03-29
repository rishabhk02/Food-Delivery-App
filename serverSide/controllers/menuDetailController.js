const {vegPizzaModel,nonVegPizzaModel,vegBurgerModel,nonVegBurgerModel,beverageModel} = require('../models/menuModel');

function menuDetailController(){
    return {
        vegPizza: async function(req,res){
            const vegPizzaData = await vegPizzaModel.find();
            return res.render('menuDetail/menuDetails',{Data: vegPizzaData, heading: 'Veg Pizza'});
        },

        nonVegPizza: async function(req,res){
            const nonVegPizzaData = await nonVegPizzaModel.find();
            return res.render('menuDetail/menuDetails',{Data: nonVegPizzaData, heading: 'Non-veg Pizza'});
        },

        vegBurger: async function(req,res){
            const vegBurgerData = await vegBurgerModel.find();
            return res.render('menuDetail/menuDetails',{Data: vegBurgerData, heading: 'Veg Burger'});
        },

        nonVegBurger: async function(req,res){
            const nonVegBurgerData = await nonVegBurgerModel.find();
            return res.render('menuDetail/menuDetails',{Data: nonVegBurgerData, heading: 'Non-veg Burger'});
        },

        beverages: async function(req,res){
            const beverageData = await beverageModel.find();
            return res.render('menuDetail/menuDetails',{Data: beverageData, heading: 'Beverages'});
        }
    }
}

module.exports = menuDetailController;