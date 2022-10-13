var order=[];

//for customer
function loadAllCustomersInOrder() {
    $("#selectCusId").empty();
    for (let cus of customerArray) {
        $("#selectCusId").append(`<option>${cus.cusID}</option>`);
    }
}

//combobox on action to customer
$("#selectCusId").click(function() {
     let typedId = $("#selectCusId").val();
     let cus = searchCustomerForOrder(typedId);

        setValues( cus.cusName, cus.cusAddress);
});

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
    $("#selectItemCode").empty();
    for (let item of itemArray) {
        $("#selectItemCode").append(`<option>${item.itemCode}</option>`);
    }
}

//combobox on action to customer
$("#selectItemCode").click(function() {
     let typedId = $("#selectItemCode").val();
     let item = searchItemsForOrder(typedId);

        setValuesToItem( item.itemName , item.unitPrice, item.itemQty);
});

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
      let total = $("#itemPrice").val();
}
