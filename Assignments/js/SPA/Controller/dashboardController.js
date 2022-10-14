$("#home").click(function () {
    $("#dashboardContent").css('display','block');
    $("#customerContent").css('display','none');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','none');
    $("#orderDetails").css('display','none');
});

$("#customer").click(function () {
    $("#dashboardContent").css('display','none');
    $("#customerContent").css('display','block');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','none');
    $("#orderDetails").css('display','none');
});

$("#item").click(function () {
    $("#dashboardContent").css('display','none');
    $("#customerContent").css('display','none');
    $("#itemContent").css('display','block');
    $("#orderContent").css('display','none');
    $("#orderDetails").css('display','none');
});

$("#order").click(function () {
    $("#dashboardContent").css('display','none');
    $("#customerContent").css('display','none');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','block');
    $("#orderDetails").css('display','none');
});
$("#saveOrder").click(function () {
    $("#dashboardContent").css('display','none');
    $("#customerContent").css('display','none');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','none');
    $("#orderDetails").css('display','block');
});