const axios = require('axios');
const moment = require('moment');

function initAdmin() {

    const orderTableBody = document.querySelector('#table_Body'); 
    
    let allorders = [];

    let markup;

    axios.get('/adminPanel', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        allorders = res.data;
        console.log(allorders);
        markup = generateMarkup(allorders);
        orderTableBody.innerHTML = markup;
    }).catch(err => {
        console.log(err);
    });
}

function renderItems(items) {
    let parseItems = Object.values(items);
    return parseItems.map((menuItems) => {
        return `
             <p style="color:#DE042E;">${menuItems.item.name}  <span style="color:#0B639C;">${menuItems.qty} pcs</span>`;
    }).join('');
}

function generateMarkup(allorders) {
    return allorders.map(curOrder => {
        return `
        <tr>
            <td>
                <p>${curOrder._id}</p>
                <div>${renderItems(curOrder.items)}</div>
            </td>
            <td>${curOrder.customerId.name}</td>
            <td>${curOrder.deliveryAddress}</td>
            <td>
                <div>
                    <form action="/updateOrderStatus" method="Post">
                        <input type="hidden" name="orderId" value="${curOrder._id}">
                        <select name="status" onchange="this.form.submit()">
                            <option value="Placed" ${curOrder.status === 'Placed' ? 'selected' : ''}>Placed</option>
                            <option value="Confirmed" ${curOrder.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Prepared" ${curOrder.status === 'Prepared' ? 'selected' : ''}>Prepared</option>
                            <option value="Delivered" ${curOrder.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Completed" ${curOrder.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </form>
                </div>
            </td>
            <td>
                ${moment(curOrder.createdAt).format('hh:mm A')}<br>${moment(curOrder.createdAt).format('YYYY-MM-DD')}
            </td>        
        </tr>`
    })
}

module.exports = initAdmin;