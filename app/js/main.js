"use strict"

$(document).ready(function () {


    let peopleSliderList= $('.people-say__list');
    let peopleSaySliderList = $('.people-say__slider-list'); 
    let countOfDots = peopleSaySliderList.find("li").length; 


    peopleSliderList.slick({
        slidesToShow: 1, 
        slidesToScroll: 1, 
        arrows: false, 
        asNavFor: peopleSaySliderList,  
        draggable: false, 
        swipe: false, 
        mobileFirst: true 
    });


    peopleSaySliderList.slick({ 
        arrows: false, 
        asNavFor: peopleSliderList, 
        focusOnSelect: true, 
        swipe: false, 
        centerMode: true, 
        mobileFirst: true, 
        draggable: false, 
        slidesToShow: 3,
        responsive: [{
            breakpoint: 576, 
            settings: {
                slidesToShow: countOfDots, 
            }
        }]
    });






    let mobileMenuToggle = $(".header__mobile-menu");
    let mobileMenu = $(".header__nav-list"); 

    mobileMenuToggle.click(function () {
        mobileMenu.toggleClass('nav-open');
        mobileMenuToggle.toggleClass('nav-open');
    });


    $(function () {
        $("a[href^='#']").click(function () {
            let _href = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(_href).offset().top + "px"
            });
            return false;
        });
    });







    let position = [];
    let currentActive = null; 
    let navLinks = $('.header__nav-link');
    let anchor = $(".anchor"); 


    navLinks.click(function () {
        navLinks.removeClass('active');
        $(this).addClass('active');
    });


    anchor.each(function () {
        position.push({
            top: $(this).position().top - 100,
            a: navLinks.filter('[href="#' + $(this).attr('id') + '"]')
        });
    });







    let headerNav = $('.header__nav');


    $(window).scroll(function () {
        let top = $(document).scrollTop();
        let height = 80;

        if (top > height) {
            headerNav.addClass('scrollBackgroundColor');
        } else {
            headerNav.removeClass('scrollBackgroundColor');
        }
    });
   






    let videoBlock = $('.video__block');
    let modalWindow = $('.modal-window'); 
    let closeModalVideo = $('.modal-window__video-close');
    let videoVisible = $('.modal-window__video-visible'); 


    videoBlock.click(function () {
        modalWindow.toggleClass('nav-open');
    });


    closeModalVideo.click(function () {
        modalWindow.removeClass('nav-open');
        videoVisible.attr("src", videoVisible.attr("src")); 
    });
});






