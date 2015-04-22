// Concatenate files 'library_one.js', 'library_two.js' and 'library_three.js'
// into file 'all.js'

/* includes */
// =require jquery
// =require bootstrap.custom
// =require bootstrap.select
// =require jquery.owl.carousel
// =require jquery.waypoints
// =require jquery.zoom



$(function() {

var homePageCarousel = function( ){
  var time = 10, // time in seconds
   $progressBar,
      $bar, 
      $elem, 
      isPause, 
      tick,
      percentTime;

    $("#hero").owlCarousel({

      // navigation      : true,
      slideSpeed      : 500,
      paginationSpeed : 500,
      rewindSpeed     : 300,
      transitionStyle : "fade",
      singleItem      : true,

      afterInit : progressBar,
      afterMove : moved,
      startDragging : pauseOnDragging

    });


    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem){
      $elem = elem;
      //build progress bar elements
      buildProgressBar();
      //start counting
      start();
    }

    //create div#progressBar and div#bar then prepend to $("#hero")
    function buildProgressBar(){
      $progressBar = $("<div>",{
        id:"progressBar"
      });
      $bar = $("<div>",{
        id:"bar"
      });
      $progressBar.append($bar).prependTo($elem);
    }

    function start() {
      //reset timer
      percentTime = 0;
      isPause = false;
      //run interval every 0.01 second
      tick = setInterval(interval, 10);
      };

    function interval() {
      if(isPause === false){
        percentTime += 1 / time;
        $bar.css({
           width: percentTime+"%"
         });
        //if percentTime is equal or greater than 100
        if(percentTime >= 100){
          //slide to next item 
          $elem.trigger('owl.next')
        }
      }
    }

    //pause while dragging 
    function pauseOnDragging(){
     isPause = true;
    }

    //moved callback
    function moved(){
    //clear interval
    clearTimeout(tick);
    //start again
      start();
    }

  }();
    //uncomment this to make pause on mouseover 
    // $elem.on('mouseover',function(){
    //   isPause = true;
    // })
    // $elem.on('mouseout',function(){
    //   isPause = false;
    // })

  /************************************************************
  *
  * Forms
  *
  */

  // Form selects

  $('.selectBox select').selectpicker();
  


  /************************************************************ 
  *
  * Product page
  *
  */

  if( $('.product-page').length ){

      // Custom select boxes
      $('.options select').selectpicker();

      var productCarousel = function( ){

        var carouselSpeed = 5000;

        var carousel = $("#page-body #images .viewport").owlCarousel({

          items : 1,
          itemsCustom : false,

          // needed?
              // itemsDesktop : [1199,1],
              // itemsDesktopSmall : [980,1],
              // itemsTablet: [768,1],
              // itemsTabletSmall: false,
              // itemsMobile : [479,1],

          singleItem : true,
          itemsScaleUp : true,

          autoPlay: true,
          stopOnHover: true,
          lazyLoad : true,
          lazyFollow : true,
          lazyEffect : "fade",
 
          paginationSpeed : 800,
          slideSpeed : 800,
          afterAction: applyZoomFunctionality
           // responsiveBaseWidth: '#page-body #images'
               // afterInit: afterOWLinit // do some work after OWL init
        });
 
      //     /************************************************************ 
      //     *
      //     * Zoom
      //     * 
      //     */

           function applyZoomFunctionality( ){
               productZoom(this.owl.currentItem);
           }
           $('.zoom a').click(function(e){
               e.preventDefault();

               $('#images').toggleClass('zoom');
               // fadeout viewfinder
               $('.large').fadeOut(100);
               // Ensure the right image is in to represent the zoom functionality
               if($('#images').hasClass('zoom')){
                   $('li.zoom a').text('zoomout');
                   carousel.trigger('owl.stop');
               } else {
                   $('li.zoom a').text('zoomin');
                   carousel.trigger('owl.play', carouselSpeed );
               }
           });

           function productZoom( imgNum ){

               var native_width = 0;
               var native_height = 0;

               // get relevant small image ~ 
               var $currImage  = $("#images").find(".small:eq("+ imgNum +")"),
                   $viewfinder = $(".large"),
                   $container  = $("#images");

               $viewfinder.css("background","url('" + $currImage.attr("src") + "') no-repeat");
               //Now the mousemove function
               $container.unbind('mousemove');
               $container.bind('mousemove', function(e){

                   // if disabled - don't do anything
                   if($container.hasClass('zoom')){

                       //When the user hovers on the image, the script will first calculate
                       //the native dimensions if they don't exist. Only after the native dimensions
                       //are available, the script will show the zoomed version.
                       if(!native_width && !native_height) {
                           //This will create a new image object with the same image as that in .small
                           //We cannot directly get the dimensions from .small because of the 
                           //width specified to 200px in the html. To get the actual dimensions we have
                           //created this image object.
                           var image_object = new Image();
                           image_object.src = $currImage.attr("src");

                           //This code is wrapped in the .load function which is important.
                           //width and height of the object would return 0 if accessed before 
                           //the image gets loaded.
                           native_width = image_object.width;
                          native_height = image_object.height;
                       } else {
                           //x/y coordinates of the mouse
                           //This is the position of .magnify with respect to the document.
                           var magnify_offset = $(this).offset();
                           //We will deduct the positions of .magnify from the mouse positions with
                           //respect to the document to get the mouse positions with respect to the 
                           //container(.magnify)
                           var mx = e.pageX - magnify_offset.left;
                           var my = e.pageY - magnify_offset.top;

                           //Finally the code to fade out the glass if the mouse is outside the container
                           if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
                               $viewfinder.fadeIn(100);
                          } else {
                               $viewfinder.fadeOut(100);
                           } if ($viewfinder.is(":visible")) {
                               //The background position of .large will be changed according to the position
                               //of the mouse over the .small image. So we will get the ratio of the pixel
                               //under the mouse pointer with respect to the image and use that to position the 
                               //large image inside the magnifying glass
                               var rx = Math.round(mx/$currImage.width()*native_width - $viewfinder.width()/2)*-1;
                               var ry = Math.round(my/$currImage.height()*native_height - $viewfinder.height()/2)*-1;
                               var bgp = rx + "px " + ry + "px";

                               //Time to move the magnifying glass with the mouse
                               var px = mx - $viewfinder.width()/2;
                               var py = my - $viewfinder.height()/2;
                               //Now the glass moves with the mouse
                               //The logic is to deduct half of the glass's width and height from the 
                               //mouse coordinates to place it with its center at the mouse coordinates

                               //If you hover on the image now, you should see the magnifying glass in action
                               $viewfinder.css({left: px, top: py, backgroundPosition: bgp});
                           }
                       }
                   }

               });
           }

      }();

       
      var setImageContainer = function(){

        var winWidth = $(window).width(),
            width = 0;
            if($("#product .text").css('text-align') === "left"){
              $('#page-body #images').css('width', winWidth);
            } else {
              $('#page-body #images').css('width', winWidth /2);
            }

       };


       $(window).resize(function(){
           setImageContainer();
       });

       setImageContainer();

      // // Tabbed product info
      // $('.detail-navigation a').bind('click', function(e) { 
      //     e.preventDefault();

      //     var $anchor         = $(this),
      //         $li             = $anchor.parent('li'),
      //         contentID       = $anchor.attr('href'),
      //         $content        = $(contentID);

      //     $('.detail .active').removeClass('active');

      //     $li.addClass('active');
      //     $content.addClass('active');

      // });
  }


});