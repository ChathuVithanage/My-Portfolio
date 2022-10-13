function saveOrder(){
    let orderID = $('#txtOrderID').val()
    let cusId = $('#selectCusId').val()
    let date = $('#txtDate').val()
    let item = orderArray

    var order = {orderID, cusId, date, item}
    orderDetails.push(order)

}

$('#btnSubmitOrder').click(function(){
    saveOrder()
    $('#txtOrderID').val(calculateNextId())

});

//id gernarate
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