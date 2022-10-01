var links = []
var names = []
jQuery(function () {
    $('ul li').each(function (i) {
        var string = $(this).html()
        var lowerString = string.toLowerCase();
        var dashString = lowerString.replaceAll(" ", "-");
        links.push(dashString)
        names.push(string)
    });

    $('ul li').each(function (i) {
        $(this).replaceWith('<div class="golink"><a href="#' + links[i] + '">' + names[i] + '</a></div>')
    })

    $('h1').html("OpenRGB Supported Devices")

});