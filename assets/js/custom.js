
var main = function(){

   // cache the window object
  $window = $(window);

   //Initiating WOW for animations
  new WOW().init();
    
   //=================== Background Parallax ===================//
  $('section[data-type="background"]').each(function(){
    // declare the variable to affect the defined data-type
    var $scroll = $(this);
                   
    $(window).scroll(function() {
       // also, negative value because we're scrolling upwards                            
      var yPos = -($window.scrollTop() / $scroll.data('speed'));
       // background position
      var coords = '0% '+ yPos + 'px';
       // move the background
      $scroll.css({ backgroundPosition: coords });   
    }); // end window scroll 
  });  // end section function
  
  $('#cover').backstretch([
    'assets/images/mattCover2.jpg',
    'assets/images/banner1.jpg',
    'assets/images/banner2.jpg'
    ], {duration: 5000, fade: 750});



   //================= NAVBAR Links Active =================//
    // Add 'active' class when about link is clicked
  $('.aboutLink').click(function(){
    $('.aboutLink').addClass('active');
    $('.skillsLink').removeClass('active');
    $('.resumeLink').removeClass('active');
  });
  $('.skillsLink').click(function(){
    $('.aboutLink').removeClass('active');
    $('.skillsLink').addClass('active');
    $('.resumeLink').removeClass('active');
  });
  $('.resumeLink').click(function(){
    $('.aboutLink').removeClass('active');
    $('.skillsLink').removeClass('active');
    $('.resumeLink').addClass('active');
  });
  

    //================= NAVBAR TRANSITION =================//
  $window.on('scroll', function(){
    var topToWindow = $window.scrollTop();  //from top of window to top of website page
    var aboutDist = $('#about').offset().top; //distance from top of #about element to top of page
    var navHeight = 72; //approximated. Cannot use .height() function since .navbar height changes and messes up calculation below.
    var aboutToWindow = aboutDist - topToWindow;
    var aboutToNavBottom = aboutToWindow - navHeight;
    var resumeDist = $('#resume').offset().top;
    var resumeToNavBottom = resumeDist - topToWindow - navHeight;
    var skillsToTop = $('#skills').offset().top; //distance from top of #skills to top of page
    var skillsToNavBottom = skillsToTop - topToWindow - navHeight;
    var blogToTop = $('#blog').offset().top;
    var blogToNavBottom = blogToTop - topToWindow - navHeight;
    var contactToTop = $('#contact').offset().top;
    var contactToNavBottom = contactToTop - topToWindow - navHeight;
    // document.getElementById('skillsToNavBottom').innerHTML = "skillsToNavBottom: "+skillsToNavBottom;

      //ADDING Navbar Classes to make transition into #about section
    if(aboutToNavBottom<=0){
      $('.navbar').addClass('scroll-nav');
      $('.navbar a').addClass('scroll-nav-link');
    }else{
      $('.navbar').removeClass('scroll-nav');
      $('.navbar a').removeClass('scroll-nav-link');
    }
      //Adding 'active' class upon transition into resume area
    if(aboutToNavBottom >= 0){
      $('.aboutLink').removeClass('active');
      $('.skillsLink').removeClass('active');
      $('.resumeLink').removeClass('active');
      $('.blogLink').removeClass('active');
      $('.contactLink').removeClass('active');
    } else if(aboutToNavBottom < 0 && skillsToNavBottom >0){
      $('.aboutLink').addClass('active');
      $('.skillsLink').removeClass('active');
      $('.resumeLink').removeClass('active');
      $('.blogLink').removeClass('active');
      $('.contactLink').removeClass('active');
    } else if(skillsToNavBottom < 0 && resumeToNavBottom >0){
      $('.aboutLink').removeClass('active');
      $('.skillsLink').addClass('active');
      $('.resumeLink').removeClass('active');
      $('.blogLink').removeClass('active');
      $('.contactLink').removeClass('active');
    } else if(resumeToNavBottom < 0 && blogToNavBottom >0){
      $('.aboutLink').removeClass('active');
      $('.skillsLink').removeClass('active');
      $('.resumeLink').addClass('active');
      $('.blogLink').removeClass('active');
      $('.contactLink').removeClass('active');
    }else if(blogToNavBottom < 0 && contactToNavBottom >0) {
      $('.aboutLink').removeClass('active');
      $('.skillsLink').removeClass('active');
      $('.resumeLink').removeClass('active');
      $('.blogLink').addClass('active');
      $('.contactLink').removeClass('active');
    } else{
      $('.aboutLink').removeClass('active');
      $('.skillsLink').removeClass('active');
      $('.resumeLink').removeClass('active');
      $('.blogLink').removeClass('active');
      $('.contactLink').addClass('active');
    }
    //======^^^^ / NAVBAR TRANSITION ^^^^ ======//
  }); /*    /window Scroll    */
  

  //=============================================================//
  //Navbar min-window auto-collapse on link clink:
  $('.navbar-collapse li').click(function(){
    if($(this).hasClass('blogLink')) {

    }
    else{
      $('.navbar-collapse').removeClass('in');
    }
  });
  //=============================================================//
  
    //================= Create Gauges on Scroll =================//
  $window.on('scroll', gaugeOnScroll); //call function to create gauges upon scroll
  $window.on('scroll', animateBars);  //call function to create bars
    
    //function to trigger gauge creation
  function gaugeOnScroll(){
    var scrolled = $window.scrollTop();
    var win_height_padded = $window.height()*.9;

    $('#hardware-skills:not(.animated)').each(function(){
      var $targetObject = $(this); //cache the current object #hardware-skills
      var offsetTop = $targetObject.offset().top;
      if(scrolled + win_height_padded > offsetTop){
        createGauge("gauge1", 85, "#FF6E3B"); //Pro-E
        createGauge("gauge2", 70, "#FF6E3B"); //Inventor
        createGauge("gauge3", 51, "#FF6E3B"); //Solidworks
        createGauge("gauge4", 35, "#FF6E3B"); //ANSYS
        createGauge("gauge5", 20, "#FF6E3B"); //EAGLE PCB
        $targetObject.addClass(' animated ');
      }
    });
    $('#software-skills:not(.animated)').each(function(){
      var $targetObject = $(this); //cache the current object #software-skills
      var offsetTop = $targetObject.offset().top;
      if(scrolled + win_height_padded > offsetTop){
        createGauge("gauge6", 70, "#44A0CC"); //HTML & CSS
        createGauge("gauge7", 55, "#44A0CC"); //Javascript
        createGauge("gauge8", 50, "#44A0CC"); //jQuery
        createGauge("gauge9", 22, "#44A0CC"); //PHP
        createGauge("gauge10", 36, "#44A0CC"); //Java
        $targetObject.addClass(' animated ');
      }
    }); 
  }
  
    //function to create bars
  function animateBars() {
    var scrolled = $window.scrollTop();
    var win_height_padded = $window.height()*1.0;

    $('.bar:not(.animated)').each(function(){
      var $targetObject = $(this); // cache the current object #knowledge
      var offsetTop = $targetObject.offset().top;
      //var targetClass = $targetObject.children();
      var percent = $(this).attr("data-percent");
      var W = $('.bar').width();
       
      if(scrolled + win_height_padded > offsetTop){
        var animateDist = percent*(W/100);
        $targetObject.children('.box').animate({left:animateDist}, 2000, "swing");
        $targetObject.children('.box').append(percent+"%");
        $targetObject.children('.bar-fill').animate({width:animateDist}, 2000, "swing");
        $targetObject.addClass('animated');
      }
    });
  }
  

   // ================= Gauge Animation =================//
   //create all radial gauges:
  function createGauge(gaugeID, score, color){
    var canvas = document.getElementById(gaugeID);
    var ctx = canvas.getContext("2d");
    var winWidth = window.innerWidth;
    var pi = Math.PI;

    if(winWidth >1200){
        ctx.canvas.width = 180;
        ctx.canvas.height = 180;
      } else if(winWidth > 600 && winWidth<=1200){
        ctx.canvas.width = 150;
        ctx.canvas.height = 150;
      } else {
        ctx.canvas.width = 100;
        ctx.canvas.height = 100;
      }
    var canvasColor = "#333";
    var bgColor = "#E2E2E2";
    var gColor = color;
    // ctx.canvas.width = winWidth/8;
    // ctx.canvas.height= winWidth/8;
    var W = canvas.width;
    var H = canvas.height;
    var gDiameter = W/3;
    var gWidth = W/18;
    var gOrigin = -pi/2; //origin is at the top (phased ccw 90deg by -pi/2)
    var gStop = 2*pi - pi/2; //also at the top, but wound around 2pi
    var angle = -pi/2; //initialized at the origin
    var finalPercent = score; //we want 2pi to correspond with 100%, and also shifted backward pi/2
    var percent = 0;

    setInterval(animateGauge, 30);

    function animateGauge(){


      //clear canvas 
      ctx.fillStyle = canvasColor;
      ctx.fillRect(0,0,W,H);

       //draw background of gauge
      ctx.strokeStyle = bgColor;
      ctx.lineWidth = gWidth;
      ctx.beginPath();
      ctx.arc(W/2,H/2,gDiameter,gOrigin,gStop);
      ctx.stroke();

      //text of percentage 
      ctx.fillStyle = gColor;
      ctx.font = "20px Helvetica";
      text = percent + "%";
      text_width = ctx.measureText(text).width;
      ctx.fillText(text, W/2 - text_width/2, H/2+5); 

      //redraw gauge at increased percent level 
      ctx.beginPath();
      ctx.strokeStyle = gColor;
      ctx.lineWidth = gWidth;
      angle = (percent)*2*pi/100-pi/2; //convert percent to radians
      ctx.arc(W/2, H/2, gDiameter, gOrigin, angle);
      ctx.stroke();

      //add one until percent reaches final
      if(percent<finalPercent){
        percent+=1;
      }else{
        clearInterval(animateGauge);
      } // else
    } // animateGauge
  } // /createGauge


    //================= RESUME CLICK FUNCTIONS =================//
  $('.resume-btn').click(function(){
    $this = $(this);
    $this.children().children().toggleClass('glyphicon-menu-down');
    $this.children().children().toggleClass('glyphicon-menu-right');
  });
  
} //~~~~~~~~~ END MAIN ~~~~~~~~~~~~~

$(document).ready(main);

/* Create HTML5 element for IE */
document.createElement("section");
