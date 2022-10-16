var orderArray=[];

//for customer
function loadAllCustomersInOrder() {
    //$("#selectCusId").empty();
    for (let cus of customerArray) {
        $("#selectCusId").append(`<option>${cus.cusID}</option>`);
    }
}

//combobox on action to customer
function selectCustomer() {
     let typedId = $("#selectCusId").val();
     let cus = searchCustomerForOrder(typedId);

        setValues( cus.cusName, cus.cusAddress);
}

function searchCustomerForOrder(cusID) {
    for (let cus of customerArray) {
        if (cus.cusID == cusID) {
            return cus;
        }
    }
    return null;
}

function setValues(name, address) {
    $("#orderCustomerName").val(name);
    $("#orderCustomerAddress").val(address);

}

//select to item
function loadAllItemsInOrder() {
    //$("#selectItemCode").empty();
    for (let item of itemArray) {
        $("#selectItemCode").append(`<option>${item.itemCode}</option>`);
    }
}

//combobox on action to customer
function selectItem() {
     let typedId = $("#selectItemCode").val();
     let item = searchItemsForOrder(typedId);

        setValuesToItem( item.itemName , item.unitPrice, item.itemQty);
}

function searchItemsForOrder(itemCode) {
    for (let item of itemArray) {
        if (item.itemCode == itemCode) {
            return item;
        }
    }
    return null;
}

function setValuesToItem(itemName, unitPrice, itemQty) {
    $("#txtItemDescription").val(itemName);
    $("#itemPrice").val(unitPrice);
    $("#txtQTYOnHand").val(itemQty);

}



function addItemToCart(){
      let iCode = $("#selectItemCode").val();
      let iName = $("#txtItemDescription").val();
      let iPrice = $("#itemPrice").val();
      let iQty = $("#txtQty").val();
      let total = $("#txtTotal").val();

      var cartObject ={iCode, iName, iPrice, iQty, total}
      orderArray.push(cartObject)
      console.log(orderArray)
}

$("#btnAddToTable").click(function () {
      addItemToCart()
      loadItemToCart()
      clearOrderQty()
    setOrderTblValues()
    bindOrderRowClickEvents()
});

//add to cart table
function loadItemToCart(){
    $("#orderTable").empty();

    for (var a of orderArray){
        var cart = `<tr><td>${a.iCode}</td><td>${a.iName}</td><td>${a.iPrice}</td><td>${a.iQty}</td><td>${a.total}</td></tr>`
        $("#orderTable").append(cart);
    }
}

//Calculate Total
$('#txtQty').keyup(function(){
    let price = $('#itemPrice').val()
    let orderQty = $('#txtQty').val();
    let total= price * orderQty;
    $('#txtTotal').val(total);
});

//clear orderQty textField
function clearOrderQty(){
    $('#txtQty').val('')
}

//calculate balance
$('#txtCash').on('keydown',function(event){
    if(event.key=='Enter'){
        let tot=  $('#txtFinalTotal').val();
        let cash=$('#txtCash').val()
        let balance=cash-tot;
        $('#txtBalance').val(balance)

    }
})

function bindOrderRowClickEvents() {
    $("#orderTable>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let itName = $(this).children(":eq(1)").text();
        let itPrice = $(this).children(":eq(2)").text();
        let itQty = $(this).children(":eq(3)").text();
        let itTotal = $(this).children(":eq(4)").text();

        $('#txtTblCode').val(code);
        $('#txtTblName').val(itName);
        $('#txtTblPrice').val(itPrice);
        $('#txtTblQty').val(itQty);
        $('#txtTblTotal').val(itTotal);

    });
}

function setOrderTblValues(code, itName, itPrice, itQty, itTotal) {
    $("#txtTblCode").val(code);
    $("#txtTblName").val(itName);
    $("#txtTblPrice").val(itPrice);
    $("#txtTblQty").val(itQty);
    $("#txtTblTotal").val(itTotal);
}

function deleteOrder(code){
        let indexNumber = orderArray.indexOf(code);
        orderArray.splice(indexNumber, 1);
        loadItemToCart()
}

$("#btnOrderDelete").click(function () {
    let deleteOID = $("#txtTblCode").val();

    let delve = confirm("Do you really want to delete customer id :" + deleteOID);
    if (delve){
        if (deleteOrder(deleteOID)) {
            setOrderTblValues("", "", "", "","");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
    clearOrderItem()

});

function clearOrderItem(){
    $("#txtTblCode").val('');
    $("#txtTblName").val('');
    $("#txtTblPrice").val('');
    $("#txtTblQty").val('');
    $("#txtTblTotal").val('');
}
