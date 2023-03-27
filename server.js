const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');


// middlewares
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname+'/resources/views'));

app.get('/',(req,res)=>{
    res.render('home');
})



app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});