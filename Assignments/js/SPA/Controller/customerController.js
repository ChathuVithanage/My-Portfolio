//save customer
var customerArray = []

function saveCustomer(){

    let cusID = $("#txtCustomerID").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();
    var customerObject = {cusID,cusName,cusAddress,cusSalary}

    customerArray.push(customerObject)
    console.log(customerArray)

    loadAllCustomersInOrder()
}

$("#btnCustomer").click(function () {
    alert("saved")
    saveCustomer()
    loadCustomer()
    bindRowClickEvents()
    setTestifiedValues()
    cleartextField()
})

//load customer
function loadCustomer() {
    $("#tblCustomer").empty();

    for (var c of customerArray){
        var row = `<tr><td>${c.cusID}</td><td>${c.cusName}</td><td>${c.cusAddress}</td><td>${c.cusSalary}</td></tr>`
        $("#tblCustomer").append(row);
    }
}

$("#btnGetAll").click(function () {
    loadCustomer();
});

//table row val select
function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerSalary').val(salary);

    });
}

//clear inputField
function cleartextField(){
    $('#txtCustomerID').val('')
    $('#txtCustomerName').val('')
    $('#txtCustomerAddress').val('')
    $('#txtCustomerSalary').val('')
}

//search customer
$("#txtCustomerID").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTestifiedValues(customer.cusID, customer.cusName, customer.cusAddress, customer.cusSalary);
        } else {
            alert("There is no customer available for that " + typedId);
            setTestifiedValues("", "", "", "");
        }
    }
});

function searchCustomer(cusID) {
    for (let customer of customerArray) {
        if (customer.cusID == cusID) {
            return customer;
        }
    }
    return null;
}

function setTestifiedValues(id, name, address, salary) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}

//update customer
$('#btnCusUpdate').click(function(){
    let customerId=$('#txtCustomerID').val()
    let response=updateCustomer(customerId)
    if(response){
        Swal.fire({
            title: 'Customer Updated Successfully',
        })
        $('#txtCustomerID').val('')
        $('#txtCustomerName').val('')
        $('#txtCustomerAddress').val('')
        $('#txtCustomerSalary').val('')
    }
    else{
        Swal.fire("Update Failed" )
    }
})

function updateCustomer(cusID) {
    let customer = searchCustomer(cusID);
    if (customer != null) {
        customer.cusID = $("#txtCustomerID").val();
        customer.cusName = $("#txtCustomerName").val();
        customer.cusAddress = $("#txtCustomerAddress").val();
        customer.cusSalary = $("#txtCustomerSalary").val();
        loadCustomer();
        clear()
        setTestifiedValues()
        return true;
    } else {
        return false;
    }

}

//remove customer
function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customerArray.indexOf(customer);
        customerArray.splice(indexNumber, 1);
        loadCustomer();
        return true;
    } else {
        return false;
    }
}

$("#btnCusDelete").click(function () {
    let deleteID = $("#txtCustomerID").val();

    let del = confirm("Do you really want to delete customer id :" + deleteID);
    if (del){
        if (deleteCustomer(deleteID)) {
            setTestifiedValues("", "", "", "");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }

    clear()
});

//validation

     $("#txtCustomerID").focus();

    const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
    const cusNameRegEx = /^[A-Z][a-z]{3,15}.[A-Z][a-z]{3,15}$/;
    const cusAddressRegEx = /^[A-z ]{3,60}$/;
    const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

    let customerValidations = [];
    customerValidations.push({reg: cusIDRegEx, field: $('#txtCustomerID')});
    customerValidations.push({reg: cusNameRegEx, field: $('#txtCustomerName'),error:''});
    customerValidations.push({reg: cusAddressRegEx, field: $('#txtCustomerAddress'),error:''});
    customerValidations.push({reg: cusSalaryRegEx, field: $('#txtCustomerSalary'),error:''});


    //disable key
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
    event.preventDefault();
                            }
    });

    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkValidity();
    });

    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('blur', function (event) {
    checkValidity();
    });

function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
    if (check(validation.reg,validation.field)) {
        textSuccess(validation.field,"");
    } else {
    errorCount=errorCount+1;
    setTextError(validation.field,validation.error);
            }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
    defaultText(txtField,"");
        } else {
    txtField.css('border', '2px solid red');
    txtField.parent().children('span').text(error);
        }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
    defaultText(txtField,"");
        } else {
    txtField.css('border', '2px solid green');
    txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
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
