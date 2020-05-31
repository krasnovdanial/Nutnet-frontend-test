"use strict";

$(document).ready(function () {
  var peopleSliderList = $('.people-say__list');
  var peopleSaySliderList = $('.people-say__slider-list');
  var countOfDots = peopleSaySliderList.find("li").length;
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
        slidesToShow: countOfDots
      }
    }]
  });
  var mobileMenuToggle = $(".header__mobile-menu");
  var mobileMenu = $(".header__nav-list");
  mobileMenuToggle.click(function () {
    mobileMenu.toggleClass('nav-open');
    mobileMenuToggle.toggleClass('nav-open');
  });
  $(function () {
    $("a[href^='#']").click(function () {
      var _href = $(this).attr("href");

      $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
      });
      return false;
    });
  });
  var position = [];
  var currentActive = null;
  var navLinks = $('.header__nav-link');
  var anchor = $(".anchor");
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
  var headerNav = $('.header__nav');
  $(window).scroll(function () {
    var top = $(document).scrollTop();
    var height = 80;

    if (top > height) {
      headerNav.addClass('scrollBackgroundColor');
    } else {
      headerNav.removeClass('scrollBackgroundColor');
    }
  });
  var videoBlock = $('.video__block');
  var modalWindow = $('.modal-window');
  var closeModalVideo = $('.modal-window__video-close');
  var videoVisible = $('.modal-window__video-visible');
  videoBlock.click(function () {
    modalWindow.toggleClass('nav-open');
  });
  closeModalVideo.click(function () {
    modalWindow.removeClass('nav-open');
    videoVisible.attr("src", videoVisible.attr("src"));
  });
});