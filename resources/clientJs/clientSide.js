const axios = require('axios');
const moment = require('moment');
const addToCartBtn = document.querySelectorAll('.add-To-Cart');
// console.log(addToCartBtn);

function updateCart(itemDetail){
    axios.post('/addToCart',itemDetail).then((res)=>{
        console.log('rishabh');
    }).catch(err=>{
        console.log(err);
    })
}

addToCartBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log(e);
        // console.log(btn.dataset.item);
        let curItemDetail = JSON.parse(btn.dataset.item);
        console.log(curItemDetail);
        updateCart(curItemDetail);
    })
});

// getting adminJs
require('./admin')();

// Changin order status
// getting order from orderStatus.ejs
let order = document.querySelector('#hiddenInput')? document.querySelector('#hiddenInput').value : null;

order = JSON.parse(order);

let statusLine = document.querySelectorAll('.status_line');
let br = document.createElement('br');
let time = document.createElement('small');

function statusUpdate(order){
    let stepCompleted = true;
    statusLine.forEach((curStatus)=>{
        let dataProp = curStatus.dataset.status;
        if(stepCompleted){
            curStatus.classList.add('completed');
        }
        if(dataProp===order.status){
            stepCompleted=false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            curStatus.appendChild(br);
            curStatus.appendChild(time);
        }
    })

}

statusUpdate(order);