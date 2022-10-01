jQuery(function () {

    $('ul li').each(function (i) {
        $(this).replaceWith('<div class="golink">' + $(this).html() + '</div>')
    })

    $('h1').html("OpenRGB Supported Devices")

});