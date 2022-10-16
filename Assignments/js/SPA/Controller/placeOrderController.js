function saveOrder(){
    let orderID = $('#txtOrderID').val()
    let cusId = $('#selectCusId').val()
    let cusName = $('#orderCustomerName').val()
    let date = $('#txtDate').val()
    let item = orderArray

    let total = 0;
    orderArray.forEach(cartItem => {
        let found = itemArray.find(item => {return item.itemCode == cartItem.iCode})
        found.itemQty =  found.itemQty - cartItem.iQty
        total = total + parseInt(cartItem.total)
    })

    var order = {orderID, cusId, cusName, date, item, total}
    orderDetails.push(order)

    loadAllOrderId()
    $('#txtFinalTotal').val(total);

}

$('#btnSubmitOrder').click(function(){
    saveOrder()
    clearOrderForm()
    $('#txtOrderID').val(calculateNextId())

});

//load orderId
function loadAllOrderId() {
   // $("#selectOrderId").empty();
    for (let or of orderDetails) {
        $("#selectOrderId").append(`<option>${or.orderID}</option>`);
    }
}

//clear
function clearOrderForm(){
    $('#selectCusId').val('')
    $('#orderCustomerName').val('')
    $('#orderCustomerAddress').val('')
    $('#txtDate').val('')
    $('#selectItemCode').val('')
    $('#txtItemDescription').val('')
    $('#itemPrice').val('')
    $('#txtQTYOnHand').val('')
    $('#txtTotal').val('')
}

//id generate
$('#txtOrderID').val(calculateNextId())

function calculateNextId() {
    if (orderDetails.length > 0) {
        let id = orderDetails[orderDetails.length - 1].orderID;
        let [pre, frag] = id.split("-");
        let num = parseInt(frag) + 1;
        let count = num.toString().length;
        if (count == 1) {
            return pre + "-00" + num;
        } else if (count == 2) {
            return pre + "-0" + num;
        } else {
            return pre + "-" + num;
        }
    } else {
        return "O-001";
    }
}

//load table_1
function loadOrders_1() {
    $("#orderDetails_1").empty();
    $("#orderDetails_2").empty();

    let oid = $("#selectOrderId").val()

    let foundOrder = orderDetails.find(order => { return order.orderID == oid})

        var row = `<tr><td>${foundOrder.date}</td><td>${foundOrder.cusId}</td><td>${foundOrder.cusName}</td><td>${foundOrder.total}</td></tr>`
        $("#orderDetails_1").append(row);

    foundOrder.item.forEach(or2 => {
        var row = `<tr><td>${or2.iCode}</td><td>${or2.iName}</td><td>${or2.iPrice}</td><td>${or2.iQty}</td><td>${or2.total}</td></tr>`
        $("#orderDetails_2").append(row);
    })

}

//load table_2
function loadOrders_2() {


    for (var or2 of orderArray){

    }
}

function loadOrderDetails() {
    console.log("this runs")
    loadOrders_1()
    loadOrders_2()
}

//final total










