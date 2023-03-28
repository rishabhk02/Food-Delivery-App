const axios = require('axios');

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
})