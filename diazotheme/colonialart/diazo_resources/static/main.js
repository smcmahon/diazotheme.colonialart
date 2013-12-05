/* JavaScript for the 'ICustomTheme' Plone browser layer */

/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */
$(function() {
    // initialize scrollable
    $("#navigator")
        .scrollable()
        .navigator();

    var api = $("#navigator").data("scrollable");

    $('table.citem').click(function(event) {
        var jqthis = $(this),
            url = jqthis.find('a').attr('href'),
            image_wrap = $('#image_wrap');

        event.preventDefault();

        // see if same thumb is being clicked
        if ($(this).hasClass("active")) { return; }

        // activate item
        $(".citem").removeClass("active");
        jqthis.addClass("active");

        image_wrap.children().fadeOut();
        image_wrap.load(url + " #content-core > *");

        if ((api.getIndex() > 0) || jqthis.prev('.citem').length) {
            $('.previmage').show();
        } else {
            $('.previmage').hide();
        }
        if ((api.getIndex() + 1 < api.getSize()) || $('table.active').next('.citem').length) {
            $('.nextimage').show();
        } else {
            $('.nextimage').hide();
        }

    }).filter(":first").click();

    $(".nextimage").on('click', function(event) {
        var active = $('table.active'),
            next = active.next('table.citem');

        if (next.length) {
            next.click();
        } else {
            if (api.getIndex() + 1 < api.getSize()) {
                active.removeClass('active');
                api.next();
                $(api.getItems()[api.getIndex()]).children().first().click()
            }
        }
    });
    $(".previmage").on('click', function(event) {
        var active = $('table.active'),
            prev = active.prev('table.citem');

        if (prev.length) {
            prev.click();
        } else {
            if (api.getIndex() > 0) {
                active.removeClass('active');
                api.prev();
                $(api.getItems()[api.getIndex()]).children().last().click()
            }
        }
    });

    $(".major_wrapper").fadeIn();

});

