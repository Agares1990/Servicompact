$(document).ready(function () {


$(".slideEventImg i:eq(1)").click(function () {
    if( $(".slideEventImg img.activeImg").is(":last-of-type"))
        $(".slideEventImg img:first-of-type").addClass("activeImg").siblings().removeClass("activeImg");
    else
    $(".slideEventImg img.activeImg").removeClass("activeImg").next().addClass("activeImg");
    });



$(".slideEventImg i:eq(0)").click(function () {
    if( $(".slideEventImg img.activeImg").is(":first-of-type"))
        $(".slideEventImg img:last-of-type").addClass("activeImg").siblings().removeClass("activeImg");
    else
    $(".slideEventImg img.activeImg").removeClass("activeImg").prev().addClass("activeImg");

});



});//ready
