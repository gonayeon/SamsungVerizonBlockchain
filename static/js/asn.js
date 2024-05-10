$(function(){
    $('#asn-tab li').click(function(){
        $(this).siblings('li').removeClass('selected');
        $(this).addClass('selected');
    });
});