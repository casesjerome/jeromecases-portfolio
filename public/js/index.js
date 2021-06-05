"use strict";
// Navigation Scroll
$(window).scroll(function () {
  const navBar = $(".navbar");
  navBar.toggleClass("scrolled", $(this).scrollTop() >= navBar.height());
});

//Navigation Active State
$(document).ready(function () {
  const about = $("#navAbout"),
    contact = $("#navContact"),
    resume = $("#navResume"),
    portfolio = $("#navPortfolio"),
    navLink = $("nav-link");

  for (let i = 0; i < navLink.length - 1; i++) {
    //removes all active class
    navLink[i].removeClass("active");
  }

  if ($(document).attr("URL").indexOf("about") > 0) {
    //checks if page is "About"
    about.addClass("active");
  } else if ($(document).attr("URL").indexOf("resume") > 0) {
    //checks if page is "index"
    resume.addClass("active"); //adds active class at load
    const pos = $("#contact .container").offset().top; //absolute top position of contact section

    $(window).scroll(function () {
      let scroll = $(document).scrollTop() + $(window).height(); //scroll range relative to document height
      const posAdj =
        pos + ($(window).height() - $(".navbar").outerHeight()) - 100; //adjust to viewing size

      if (scroll >= posAdj) {
        resume.removeClass("active");
        contact.addClass("active");
      } else {
        resume.addClass("active");
        contact.removeClass("active");
      }
    });
  } else {
    portfolio.addClass("active");
  }
});

//Modal trigger for Contact
  $(document).ready(function () {  
    $("#triggerModal").click();   
 });

//Enable Bootstrap Popover
if ($("section").is(".wPopover")) {
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}
