function fillContent(page) {
    document.getElementById("content").innerHTML = '<object type="text/html" width="100%" height="100%" data="' + page + '" ></object>';
}

$('select').change(function() {
    if ($(this).children('option:first-child').is(':selected')) {
        $(this).addClass('placeholder');
    } else {
        $(this).removeClass('placeholder');
    }
});