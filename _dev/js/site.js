/* includes */
// =require jquery
// =require jquery.owl.carousel

// site controls

$(function() {
 
  $("#hero").owlCarousel({

    // navigation      : true,
    time            : 5,
    autoPlay        : true,
    slideSpeed      : 500,
    paginationSpeed : 500,
    rewindSpeed     : 50,
    transitionStyle : "fade",
    singleItem      : true

  });
 
});