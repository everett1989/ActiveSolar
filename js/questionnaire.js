
//Hides all DIV questions and result except for 1 question initially
$(document).ready(function(){
    $('.questions').hide();    
    $('.results').hide();
    $('#question-0').show();
    
});
//Opens up the appropriate DIV tag and closes non-relevent ones.
$('.trigger').click(function() {
    $('.questions').hide();
    $('.results').hide();
    $('#' + $(this).data('rel')).show();
});
