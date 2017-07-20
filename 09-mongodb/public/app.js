
// A $( document ).ready() block.
$( document ).ready(function() {

    //on hover: buttons except delete turn green, then they turn yellow
    $(".button").hover(function(){
        $(this).css("background-color", "green");
        }, function(){
        $(this).css("background-color", "yellow");
    });

    //on hover: delete button turns red then white
    $(".delete").hover(function(){
        $(this).css("background-color", "red");
        }, function(){
        $(this).css("background-color", "white");
    });

    //on hover: onLoad turns white
    $(".deletebtn").hover(function(){
        $(this).css("color", "white");
    });
});