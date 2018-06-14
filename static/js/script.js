$(document).ready( function() {
    console.log('working');
    $('form').on('submit', function(e) {
        e.preventDefault();
        var newData = $(this).serialize();
        var url = $(this).attr('action');
        $.ajax({
            method: 'PUT',
            url: url,
            data: newData
        }).done( function(data) {
            console.log(data);
            window.location = '/bikes'
        })
    })
})

