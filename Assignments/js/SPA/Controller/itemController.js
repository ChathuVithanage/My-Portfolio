var itemArray = []

function saveItem(){

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemPrice").val();
    var itemObject = {itemCode,itemName,itemQty,unitPrice}

    itemArray.push(itemObject)
    console.log(itemArray)
}

$("#btnItem").click(function () {
    alert("saved")
    saveItem()
    loadItem()
    bindRowClickEvents()
    setTestifiedValues()
})

//load item
function loadItem() {
    $("#tblItem").empty();

    for (var i of itemArray){
        var raw = `<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemQty}</td><td>${i.unitPrice}</td></tr>`
        $("#tblItem").append(raw);
    }
}

//clear inputField
function clear(){
    $('#txtItemCode').val('')
    $('#txtItemName').val('')
    $('#txtItemQty').val('')
    $('#txtItemPrice').val('')
}

function bindRowClickEvents() {
    $("#tblItem>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();

        $('#txtItemCode').val(code);
        $('#txtItemName').val(name);
        $('#txtItemQty').val(qty);
        $('#txtItemPrice').val(unitPrice);

    });
}

//search Item
$("#txtItemCode").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtItemCode").val();
        let item = searchItem(typedId);
        if (item != null) {
            setTestifiedValues(item.itemCode, item.itemName, item.itemQty, item.unitPrice);
        } else {
            alert("There is no item available for that " + typedId);
            setTestifiedValues("", "", "", "");
        }
    }
});

function searchItem(itemCode) {
    for (let item of itemArray) {
        if (item.itemCode == itemCode) {
            return item;
        }
    }
    return null;
}

function setTestifiedValues(code, name, qty, price) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(name);
    $("#txtItemQty").val(qty);
    $("#txtItemPrice").val(price);
}

//update customer
$('#btnItemUpdate').click(function(){
    let itemCode=$('#txtItemCode').val()
    let it=updateItem(itemCode)
    if(it){
        Swal.fire({
            title: 'Item Updated Successfully',
        })
        $('#txtItemCode').val('')
        $('#txtItemName').val('')
        $('#txtItemQty').val('')
        $('#txtItemPrice').val('')
    }
    else{
        Swal.fire("Update Failed" )
    }
})

function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.itemCode = $("#txtItemCode").val();
        item.itemName = $("#txtItemName").val();
        item.itemQty = $("#txtItemQty").val();
        item.unitPrice = $("#txtItemPrice").val();
        loadItem();
        clear()
        setTestifiedValues()
        return true;
    } else {
        return false;
    }

}

//remove item
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemArray.indexOf(item);
        itemArray.splice(indexNumber, 1);
        loadItem();
        return true;
    } else {
        return false;
    }
}

$("#btnItemDelete").click(function () {
    let deleteCode = $("#txtItemCode").val();

    let del = confirm("Do you want to delete item :" + deleteCode);
    if (del){
        if (deleteItem(deleteCode)) {
            setTestifiedValues("", "", "", "");
        } else {
            alert("No such item to delete. please check the id");
        }
    }
});