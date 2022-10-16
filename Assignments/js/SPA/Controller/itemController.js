var itemArray = []

function saveItem(){

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemPrice").val();
    var itemObject = {itemCode,itemName,itemQty,unitPrice}

    itemArray.push(itemObject)
    console.log(itemArray)

    loadAllItemsInOrder()
}

$("#btnItem").click(function () {
    alert("saved")
    saveItem()
    loadItem()
    bindRowClickEvents()
    setTestifiedValuesItem()
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
            setTestifiedValuesItem(item.itemCode, item.itemName, item.itemQty, item.unitPrice);
        } else {
            alert("There is no item available for that " + typedId);
            setTestifiedValuesItem("", "", "", "");
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

function setTestifiedValuesItem(code, name, qty, price) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(name);
    $("#txtItemQty").val(qty);
    $("#txtItemPrice").val(price);
}

//update item
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
        setTestifiedValuesItem()
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
            setTestifiedValuesItem("", "", "", "");
        } else {
            alert("No such item to delete. please check the id");
        }
    }
});

//validation

$("#txtItemCode").focus();

const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[a-z]{3,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const unitPriceRegEx = /^[0-9]{1,}$/;

let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#txtItemCode')});
itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:''});
itemValidations.push({reg: itemQtyRegEx, field: $('#txtItemQty'),error:''});
itemValidations.push({reg: unitPriceRegEx, field: $('#txtItemPrice'),error:''});


//disable key
$("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").on('keyup', function (event) {
    checkItemValidity();
});

$("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").on('blur', function (event) {
    checkItemValidity();
});

function checkItemValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (check(validation.reg,validation.field)) {
            textItemSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setItemTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function checkItems(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textItemSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultItemText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnCustomer").attr('disabled',true);
    }else{
        $("#btnCustomer").attr('disabled',false);
    }
}