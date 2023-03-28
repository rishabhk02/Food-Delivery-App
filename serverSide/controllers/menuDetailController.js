const {vegPizzaModel,nonVegPizzaModel,vegBurgerModel,nonVegBurgerModel,beverageModel} = require('../models/menuModel');

function menuDetailController(){
    return {
        vegPizza: async function(req,res){
            const vegPizzaData = await vegPizzaModel.find();
            return res.render('menuDetail/menuDetails',{Data: vegPizzaData});
        },

        nonVegPizza: async function(req,res){
            const nonVegPizzaData = await nonVegPizzaModel.find();
            return res.render('menuDetail/menuDetails',{Data: nonVegPizzaData});
        },

        vegBurger: async function(req,res){
            const vegBurgerData = await vegBurgerModel.find();
            return res.render('menuDetail/menuDetails',{Data: vegBurgerData});
        },

        nonVegBurger: async function(req,res){
            const nonVegBurgerData = await nonVegBurgerModel.find();
            return res.render('menuDetail/menuDetails',{Data: nonVegBurgerData});
        },

        beverages: async function(req,res){
            const beverageData = await beverageModel.find();
            return res.render('menuDetail/menuDetails',{Data: beverageData});
        }
    }
}

module.exports = menuDetailController;