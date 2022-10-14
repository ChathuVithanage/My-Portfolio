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

//calculate final Total
function calFinalTot() {
}

