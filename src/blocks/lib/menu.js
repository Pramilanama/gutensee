export function menu_dropdown_script(){
    jQuery(document).ready(function() {
      
        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */
    
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.scroll-up').fadeIn();
            } else {
                jQuery('.scroll-up').fadeOut();
            }
        });
        
        jQuery('.scroll-up').click(function () {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 700);
            return false;
        });
        

        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = jQuery('.home-section'),
            gutensee      = jQuery('.gutensee-custom'),
            navHeight   = gutensee.height(),
           // worksgrid   = jQuery('#works-grid'),
            width       = Math.max(jQuery(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        gutenseeAnimation(gutensee, homeSection, navHeight);
        gutenseeSubmenu(width);
        gutenseeSubmenuTouch(width)
        hoverDropdown(width, mobileTest);

        jQuery(window).resize(function() {
            var width = Math.max(jQuery(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

       /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height(jQuery(window).height());
                } else {
                    homeSection.height(jQuery(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Transparent gutensee animation
         /* ---------------------------------------------- */

        function gutenseeAnimation(gutensee, homeSection, navHeight) {
            var topScroll = jQuery(window).scrollTop();
            if (gutensee.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    gutensee.removeClass('gutensee-transparent');
                } else {
                    gutensee.addClass('gutensee-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * gutensee submenu
         /* ---------------------------------------------- */

        function gutenseeSubmenu(width) {
            if (width > 1100) {
                jQuery('.gutensee-custom .gutensee-nav > li.dropdown').hover(function() {
                    var MenuLeftOffset  = jQuery('.dropdown-menu', jQuery(this)).offset().left;
                    var Menu1LevelWidth = jQuery('.dropdown-menu', jQuery(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        jQuery(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        jQuery(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if (jQuery('.dropdown', jQuery(this)).length > 0) {
                        var Menu2LevelWidth = jQuery('.dropdown-menu', jQuery(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            jQuery(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            jQuery(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

          /* ---------------------------------------------- /*
         * gutensee submenu click on firebox 
         /* ---------------------------------------------- */
         
        function gutenseeSubmenuTouch(width) {
            if (width > 1100 && navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
               jQuery('li.dropdown').find('.fa-angle-down').each(function(){
                   jQuery(this).on('click', function(){
                    var thisVal=jQuery(this).parent().parent();
                   var MenuLeftOffsetss  =thisVal.offset().left; 
                    var Menu1LevelWidth = jQuery('.dropdown-menu', thisVal).width();
                    if (width - MenuLeftOffsetss < Menu1LevelWidth * 2) {
                       thisVal.children('.dropdown-menu').addClass('leftauto');
                    } else {
                        thisVal.children('.dropdown-menu').removeClass('leftauto');
                    }
                    if (jQuery('.dropdown', thisVal).length > 0) {
                        var Menu2LevelWidth = jQuery('.dropdown-menu', thisVal).width();
                        if (width - MenuLeftOffsetss - Menu1LevelWidth < Menu2LevelWidth) {
                            thisVal.children('.dropdown-menu').addClass('left-side');
                        } else {
                            thisVal.children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            });
        }}

        /* ---------------------------------------------- /*
         * gutensee hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 1100) && (mobileTest !== true)) {
                jQuery('.gutensee-custom').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                jQuery('.gutensee-custom .gutensee-nav > li.dropdown, .gutensee-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var jQuerythis = jQuery(this);
                        setTimeoutConst = setTimeout(function() {
                            jQuerythis.addClass('open');
                            jQuerythis.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        jQuery(this).removeClass('open');
                        jQuery(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                jQuery('.gutensee-custom .gutensee-nav > li.dropdown, .gutensee-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                jQuery('.gutensee-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    jQuery(this).parent().siblings().removeClass('open');
                    jQuery(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    jQuery(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * gutensee collapse on click
         /* ---------------------------------------------- */
             

        jQuery(document).on('click','.gutensee-collapse.in',function(e) {
            if( jQuery(e.target).is('a') && jQuery(e.target).attr('class') != 'dropdown-toggle' ) {
                jQuery(this).collapse('hide');
            }
        });
console.log(jQuery(window).width())

        if( jQuery(window).width() > 1100) {
           jQuery('.nav li.dropdown').hover(function() {
             if( jQuery(window).width() > 1100 ) {
                jQuery('.dropdown-menu').removeAttr("style");
              }
               jQuery(this).addClass('open');

           }, function() {
               jQuery(this).removeClass('open');
           }); 
           jQuery('.nav li.dropdown-submenu').hover(function() {
               jQuery(this).addClass('open');
           }, function() {
               jQuery(this).removeClass('open');
           }); 
        }
        
         jQuery('li.dropdown').find('a').each(function (){
           var link = jQuery(this).attr('href');
              if (link==='' || link==="#") {
                jQuery(this).on('click', function(){
                if( jQuery(window).width() < 1100) {
                    jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
                    jQuery(this).next().slideToggle();
                }
                return false;
                }); 
              }
       });
        
        jQuery('li.dropdown').find('.fa-angle-down').each(function(){
            jQuery(this).on('click', function(){
                if( jQuery(window).width() < 1100) {
                    jQuery(this).parent().next().slideToggle();
                }
                return false;
            });
        });


      jQuery('li.dropdown').find('.fa-angle-down').each(function(){
            jQuery(this).on('click', function(){
              if(jQuery(window).width() > 1100 && window.matchMedia("(pointer: coarse)").matches && navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                 jQuery(this).parent().parent().siblings().removeClass('open');
                jQuery(this).parent().parent().toggleClass('open');
              }
                return false;
            });
        
        });
    
       /* ---------------------------------------------- /*
         * Navbar menu sticky
         /* ---------------------------------------------- */
            jQuery(window).bind('scroll', function () {
                 if ( jQuery(window).scrollTop() > 100) {
                jQuery('.gutensee.gutensee-custom').addClass('stickymenu');
            } else {
                 jQuery('.gutensee.gutensee-custom').removeClass('stickymenu');
            }
        });
    
    });
}