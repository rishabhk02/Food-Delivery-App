const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

let vegPizzaModel = new mongoose.model('vegPizzas',menuSchema);
let nonVegPizzaModel = new mongoose.model('nonVegPizzas',menuSchema);
let vegBurgerModel = new mongoose.model('vegBurgers',menuSchema);
let nonVegBurgerModel = new mongoose.model('nonVegBurgers',menuSchema);
let beverageModel = new mongoose.model('beverages',menuSchema);


module.exports = {vegPizzaModel,nonVegPizzaModel,vegBurgerModel,nonVegBurgerModel,beverageModel};