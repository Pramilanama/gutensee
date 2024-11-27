import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { Fragment,useState } from '@wordpress/element';
import { useSelect,useDispatch } from '@wordpress/data';
import { InspectorControls, MediaUpload, MediaUploadCheck, BlockControls, RichText, FontSizePicker, useBlockProps, PanelColorSettings } from "@wordpress/block-editor";
import { PanelBody, ColorPalette, SelectControl, ToolbarGroup, ToolbarButton, RangeControl, BaseControl, TabPanel,  __experimentalBoxControl as BoxControl, ToggleControl, TextControl,  __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, Button, __experimentalInputControl as InputControl, TextareaControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from "@wordpress/components";
import { colors } from './lib/colors.js';
import { decodeEntities } from '@wordpress/html-entities';
import useNavigationEntities from './lib/use-navigation-entities';
import {menu_dropdown_script} from'./lib/menu.js';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import { addQueryArgs } from '@wordpress/url';
import MonacoEditor from '@monaco-editor/react';

const NavigationBlock = (props) => {

  const {attributes, setAttributes, clientId} = props;

  setAttributes({ uniqueid: 'navigationMenu' +clientId.slice(0,8) });

  const { uniqueid, controlType, colorType, textAlignment, menuname, previewtogglesize, togglesize, togglesizetab, togglesizemob, previewtogglepos, toggleposition, togglepositiontab, togglepositionmob, hidebtn, btntext, hidesearch, previewiconWidth, iconWidth, iconWidthtab, iconWidthmob, previewmargins, margins, marginstab, marginsmob, previewmenumargins, menumargins, menumarginstab, menumarginsmob, previewddmargins, ddmargins, ddmarginstab, ddmarginsmob, previewsubmenumargins, submenumargins, submenumarginstab, submenumarginsmob, previewbtnmargins, btnmargins, btnmarginstab, btnmarginsmob, previewsbtnmargins, sbtnmargins, sbtnmarginstab, sbtnmarginsmob, previewiconmargins, iconmargins, iconmarginstab, iconmarginsmob, previewpaddings, paddings, paddingstab, paddingsmob, previewmenupaddings, menupaddings, menupaddingstab, menupaddingsmob, previewbtnpaddings, btnpaddings, btnpaddingstab, btnpaddingsmob, previewiconpaddings, iconpaddings, iconpaddingstab, iconpaddingsmob, border, borderradius, btnborder, btnborderradius, iconborder, iconborderradius, sbtnborder, sbtnborderradius, toggleborder, toggleborderradius, boxshadow, sboxshadow, sbboxshadow, menuborder, menuborderradius, ddborder, ddborderradius, previewsubmenupaddings, submenupaddings, submenupaddingstab, submenupaddingsmob, submenuborder, submenuborderradius, sformborder, sformborderradius, hshadow, vshadow, blurshadow, shadowColor, shshadow, svshadow, sblurshadow, sshadowColor, sbhshadow, sbvshadow, sbblurshadow, sbshadowColor, animation, durations, delay, hidedesktop, hidemobile, hidetablet, menuColor, bgColor, mobbgColor, menubgColor, menubgHColor, ddColor, submenuColor, submenubgColor, menuHColor, bgHColor, submenuHColor, submenubgHColor, activeColor, activebgColor, activehColor, activebghColor, toggleColor, togglebgColor, toggleHColor, togglebgHColor, btnColor, btnhColor, btnbgColor, btnbghColor, iconColor, iconhColor, iconbgColor, iconbghColor, sbtnColor, sbtnhColor, sbtnbgColor, sbtnbghColor, fontfamily, menuFontWeight, previewmenufontsize, menufontSize, menufontSizetab, menufontSizemob, menuTransform, menuDecoration, previewmenulineheight, menuLineHeight, menuLineHeighttab, menuLineHeightmob, previewmenuLetterSpacing, menuLetterSpacing, menuLetterSpacingtab, menuLetterSpacingmob, submenufontfamily, previewsubmenufontsize, submenufontSize, submenufontSizetab, submenufontSizemob, submenuFontWeight, submenuTransform, submenuDecoration, previewsubmenulineheight, submenuLineHeight, submenuLineHeighttab, submenuLineHeightmob, previewsubmenuLetterSpacing, submenuLetterSpacing, submenuLetterSpacingtab, submenuLetterSpacingmob, btnfontfamily, btnFontWeight, previewbtnfontsize, btnfontSize, btnfontSizetab, btnfontSizemob, btnTransform, btnDecoration, previewbtnlineheight, btnLineHeight, btnLineHeighttab, btnLineHeightmob, previewbtnLetterSpacing, btnLetterSpacing, btnLetterSpacingtab, btnLetterSpacingmob, sbtnfontfamily, sbtnFontWeight, previewsbtnfontsize, sbtnfontSize, sbtnfontSizetab, sbtnfontSizemob, sbtnTransform, sbtnDecoration, previewsbtnlineheight, sbtnLineHeight, sbtnLineHeighttab, sbtnLineHeightmob, previewsbtnLetterSpacing, sbtnLetterSpacing, sbtnLetterSpacingtab, sbtnLetterSpacingmob, addclass, customcss, addcss, addjs, advid, advclass, advcss } = attributes;

  const blockclass='gutensee-blocks-menu navigation ml-auto';
  const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
  const animationclass='animated '+attributes.durations+' '+attributes.animation;
  const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
  const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
  const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
  const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

  const blocktop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
  const blockright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
  const blockbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
  const blockleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null; 

  function setPreviewmargins(value) {
    setAttributes({previewmargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewmenumargins(value) {
    setAttributes({previewmenumargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsubmenumargins(value) {
    setAttributes({previewsubmenumargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }
  function setPreviewddmargins(value) {
    setAttributes({previewddmargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewiconmargins(value) {
    setAttributes({previewiconmargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewbtnmargins(value) {
    setAttributes({previewbtnmargins:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewpaddings(value) {
    setAttributes({previewpaddings:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewmenupaddings(value) {
    setAttributes({previewmenupaddings:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsubmenupaddings(value) {
    setAttributes({previewsubmenupaddings:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewiconpaddings(value) {
    setAttributes({previewiconpaddings:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewbtnpaddings(value) {
    setAttributes({previewbtnpaddings:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewmenufontsize(value) {
    setAttributes({previewmenufontsize:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsubmenufontsize(value) {
    setAttributes({previewsubmenufontsize:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewbtnfontsize(value) {
    setAttributes({previewbtnfontsize:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsbtnfontsize(value) {
    setAttributes({previewsbtnfontsize:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewmenulineheight(value) {
    setAttributes({previewmenulineheight:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsubmenulineheight(value) {
    setAttributes({previewsubmenulineheight:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewbtnlineheight(value) {
    setAttributes({previewbtnlineheight:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsbtnlineheight(value) {
    setAttributes({previewsbtnlineheight:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewmenuLetterSpacing(value) {
    setAttributes({previewmenuLetterSpacing:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsubmenuLetterSpacing(value) {
    setAttributes({previewsubmenuLetterSpacing:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewbtnLetterSpacing(value) {
    setAttributes({previewbtnLetterSpacing:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewsbtnLetterSpacing(value) {
    setAttributes({previewsbtnLetterSpacing:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewiconWidth(value) {
    setAttributes({previewiconWidth:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewtogglesize(value) {
    setAttributes({previewtogglesize:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  function setPreviewtogglepos(value) {
    setAttributes({previewtogglepos:value});
    wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
  }

  
  function setShadowColor(value) {
    setAttributes({shadowColor:value});
  }
  function setsbShadowColor(value) {
    setAttributes({sbshadowColor:value});
  }
  function setsShadowColor(value) {
    setAttributes({sshadowColor:value});
  }

  const blockProps = useBlockProps();

  const uniqueid01='gutensee-toggler'+uniqueid;
  const abcdef='abcdef-0'+uniqueid;
  const abcdef1='abcdef-1'+uniqueid;
  const abcdef2='abcdef-2'+uniqueid;

  let url60 = gutensee_plugin.gutensee_pluginpath+'assets/css/menu.css';
  let link60 = document.createElement('link')
  link60.href = url60;
  link60.rel = "stylesheet";
  link60.type =  "text/css";
  jQuery('iframe').contents().find("head").append(link60);

  var urlscriptowl010=gutensee_plugin.gutensee_pluginpath+'assets/js/jquery.min.js';
   let linkscriptowl010 = document.createElement('script');
   linkscriptowl010.src=urlscriptowl010;
   jQuery('iframe').contents().find("#"+abcdef1).html(linkscriptowl010);

  var urlfontawesome=gutensee_plugin.gutensee_pluginpath+'assets/js/fontawesome.js';
  let linkfontawesome = document.createElement('script');
  linkfontawesome.src=urlfontawesome;
  jQuery('iframe').contents().find('head').append(linkfontawesome);

  var customurlscriptowl010=gutensee_plugin.gutensee_pluginpath+'assets/js/custom.js';
   let customlinkscriptowl010 = document.createElement('script');
   customlinkscriptowl010.src=customurlscriptowl010;
   jQuery('iframe').contents().find("#"+abcdef2).html(customlinkscriptowl010);

  jQuery('iframe').contents().find("#"+abcdef).html('<script>  jQuery(document).ready(function() {var toglick=0; jQuery("#'+uniqueid01+'").on("click", function(){ if(toglick % 2 == 0){jQuery(".collapse.gutensee-collapse.'+uniqueid+'").addClass("in");}});jQuery("#'+uniqueid+' #sbp-close").on("click", function(){  jQuery(".collapse.gutensee-collapse.'+uniqueid+'").removeClass("in"); });  var toglick1=0; jQuery(".menu-item-has-children.dropdown a").on("click", function(){if( jQuery(window).width() < 1100) { if(toglick1 % 2 == 0){jQuery(this).next(".dropdown-menu").show();}else{jQuery(this).next(".dropdown-menu").hide();} toglick1++;} return false; }); var tky=0;   jQuery("li.search_exists a.search-icon-sbp").on("click", function(e){      e.stopPropagation();      if( jQuery(window).width() < 1100) {          jQuery("li.dropdown,li.dropdown-submenu").removeClass("open");          if(tky % 2 ==0){             jQuery("ul.dropdown-menu.search-panel").css("display","block");          }else{             jQuery("ul.dropdown-menu.search-panel").css("display","none");          }         tky++;      }      return false;    });if( jQuery(window).width() > 1100) { jQuery(".nav li.dropdown-sbp").hover(function() { if( jQuery(window).width() > 1100 ) {jQuery(".dropdown-menu").removeAttr("style"); }   jQuery(this).addClass("open"); }, function() { jQuery(this).removeClass("open");});jQuery(".nav li.dropdown-submenu").hover(function() {jQuery(this).addClass("open");}, function() {jQuery(this).removeClass("open");  }); }   });</script>');        
  
  
  jQuery(document).ready(function(e) {
    jQuery("#"+uniqueid01).on("click", function(){
      jQuery(".collapse.gutensee-collapse."+uniqueid).addClass("in");
    });
    jQuery("#"+uniqueid+" #sbp-close").on("click", function(){
      jQuery(".collapse.gutensee-collapse."+uniqueid).removeClass("in");
    });

    if( jQuery(window).width() < 1100) {
      jQuery('li.dropdown').find('a').each(function (){
        var link = jQuery(this).attr('href');
        if (link==='' || link==="#") {
          jQuery(this).on('click', function(e){e.stopPropagation();
            if( jQuery(window).width() < 1100) {
                jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
                jQuery(this).next().slideToggle();
            }
            return false;
          }); 
        }
      });
    }
    var tk=0;
    jQuery('li.dropdown').find('.fa-caret-down').each(function(){
      jQuery(this).on('click', function(e){
        e.stopPropagation();
        if( jQuery(window).width() < 1100) {
            jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
            if(tk % 2 ==0){ jQuery(this).parent().next().css('display','block');}
            else{
               jQuery(this).parent().next().css('display','none');
            }
           tk++;
        }
        return false;
      });
    });

   var tky=0;
  if( jQuery(window).width() < 1100) {
  jQuery('nav li').removeClass('dropdown','menu-item');
   }
   var tk=0;
    jQuery('nav li').find('.fa-caret-down').each(function(){
      jQuery(this).on('click', function(e){
        e.stopPropagation();
        if( jQuery(window).width() < 1100) {
            jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
            if(tk % 2 ==0){ jQuery(this).parent().next().css('display','block');}
            else{
               jQuery(this).parent().next().css('display','none');
            }
           tk++;
        }
        return false;
      });
    });
     if( jQuery(window).width() > 1100) {
          
        jQuery(".nav li.dropdown-sbp").hover(function() {
           if( jQuery(window).width() > 1100 ) {
              jQuery(".dropdown-menu").removeAttr("style");
            }
             jQuery(this).addClass("open");
         }, function() {
             jQuery(this).removeClass("open");
         }); 
         jQuery(".nav li.dropdown-submenu").hover(function() {
             jQuery(this).addClass("open");
         }, function() {
             jQuery(this).removeClass("open");
         }); 
      }  
});
 

  const [isActive, setIsActive] = useState(false);
  const { invalidateResolution } = useDispatch('core/data');
  const isLoading = useSelect((select) => {
      return select('core/data').isResolving('core', 'getEntityRecords',  [
          'postType', 'wp_navigation'
      ]);
   });
  const { menus: classicMenus } = useNavigationEntities();
   // Create a custom function for the button so we can trigger this on click.
  const invalidateResolver = () => {
    setIsActive('refresh-menu remove');
    invalidateResolution('core', 'getEntityRecords', ['postType', 'wp_navigation']);
  };
  if (isLoading) {
      return <h3>Loading...</h3>;
  }
  //console.log(classicMenus);
  function setmenuname(value){
    setAttributes({menuname:value});
    setIsActive('refresh-menu');
  }
  let options = [];
//console.log(menus);
  if( classicMenus ) {
    options.push( { value: '', label: 'Select a menu' } )
    classicMenus.forEach( ( menu ) => {
      options.push( { value : menu.id, label : menu.name } )
    })
  } 
 // const [counters, setCounters] = useState( optionsdev);
 const nav_menu_items = wp.data.select('core').getEntityRecords('postType', 'nav_menu_item', { per_page: -1, id:menuname });
 let menus;
 if(menuname!=''){
  menus = wp.data.select('core').getMenuItems( { menus: menuname ,per_page: -1,});
}
else{
  menus=null;
}
 console.log(menus);
 let dev=0;
 function explore_menu(menus){
  let t=1;  let str='';  let bool=true;
  //console(menus);
  str += `<li class="sbp-menu-close"><span id="sbp-close" >x</span></li>`;
  if(menus){
    menus.forEach( ( items,idx,array ) => {
      console.log(items);
      if(items.parent==0){
        let parent = items.id;             
        let menu_array = '';        
        menus.forEach( ( item,ids,arrays ) => {
          if(item.parent==parent){
            bool = true;let str2='';
            str2 += `<a class="nav-link" taget="_blank"  rel="nofollow"  >${item.title.rendered}`;
           let parents = item.id;
           let str1='';
            menus.forEach( ( submenus,idsx,arraysx ) => {
              if( submenus.parent == parents ){
                let str3='';
                let parents1 = submenus.id;
                menus.forEach( ( submenus1,idsx1,arraysx1 ) => {
                if( submenus1.parent == parents1 ){
                  str3 += `<li class="menu-item"><a class="nav-link" taget="_blank" rel="nofollow" >${submenus1.title.rendered}</a></li>`;
                }
                 });
                let def=(str3!='')?'<ul class="dropdown-menu 3">'+str3+'</ul>':'';
                  str1 += ``;
                  if(def!=''){
                   str1 += `<li class="menu-item dropdown"><a class="nav-link" taget="_blank" rel="nofollow" >${submenus.title.rendered}<i class="fas fa-caret-down"></i></a>${def}</li>`;
                  }else{
                    str1 += `<li class="menu-item"><a class="nav-link" taget="_blank" rel="nofollow" >${submenus.title.rendered}</a></li>`;
                  }
              }
            });
            if(str1!=''){
              menu_array +=`<li class="menu-item current-menu-parent menu-item-has-children dropdown ">`;
              menu_array += str2;                    
              menu_array += `<i class="fas fa-caret-down"></i></a>`;
              menu_array +=`<ul class="dropdown-menu">`;
              menu_array += str1;   
              menu_array += `</ul></li>`;
            }else{
             menu_array +=`<li class="menu-item current-menu-parent menu-item-has-children">`;
              menu_array += str2;                    
              menu_array += `</a>`;
              menu_array += `</li>`; 
            }
            
          }
        })
        if( bool == true && menu_array.length > 0 ) {                           
          str += `<li class="menu-item  menu-item-has-children dropdown ">`;
          str += `<a class="nav-link" taget="_blank"  rel="nofollow" >${items.title.rendered}<i class="fas fa-caret-down"></i></a>`;             
          str += `<ul class="dropdown-menu">\n`;
          str += menu_array;
          str += `</ul>`;             
        } else {
          // echo "<pre>"; print_r($menu_item); 
          str += `<li class="menu-item ">`;
          str += `<a class="nav-link" taget="_blank"  rel="nofollow" >${items.title.rendered}</a>`;
        }              
      }
      str +=`</li>`;          
      t++;
    })

    if(hidebtn===true){
      str += `<li class="menu-item header-button">
                <a  class="theme-btn btn-style-one"  style="outline: none;">
                  <span class="txt">${btntext}</span>
                </a>
              </li>`;
    }
    if(hidesearch===true){
      str +=`<li class="menu-item dropdown-sbp search_exists">
              <a href="#" title="Search" class="search-icon-sbp dropdown dev" aria-haspopup="true" aria-expanded="false" style="outline: none;">
                <i class="fas fa-search"></i>
              </a>
              <ul class="dropdown-menu pull-right search-panel leftauto left-side" role="menu">
                <li>
                  <div class="form-gutensee-container">
                    <form id="searchform" autocomplete="off" role="Search" method="get" class="search-form" action="javascript:void(0);">
                        <input type="search" class="search-field" placeholder="Search" value="" name="s">
                        <input type="submit" class="search-submit" value="Search">
                    </form>           
                  </div>
                </li>
              </ul>
            </li>`;
    }

  } else {
  str += `<!-- no menu defined in location ${menus} -->`;
  }  
  return str;
}
const wp_navigations = wp.data.select('core').getEntityRecords('postType', 'wp_navigation');    
const nav_menus = wp.data.select('core').getEntityRecords('taxonomy', 'nav_menu');
const menuItems = wp.data.select('core').getEntityRecords('root', 'menuItem');
// gh.map((sd)=>{
//  console.log(sd.submenus) ;
// })
const commentcount=explore_menu(menus);
//console.log(menus);
//console.log(commentcount);
const menuscript=menu_dropdown_script();

  const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
  const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
  const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
  const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

  const togglebordertop=(toggleborder.top != undefined) ? `${toggleborder.top.width} ${toggleborder.top.style} ${toggleborder.top.color}` : null;
  const toggleborderright=(toggleborder.right != undefined) ? `${toggleborder.right.width} ${toggleborder.right.style} ${toggleborder.right.color}` : null;
  const toggleborderbottom=(toggleborder.bottom != undefined) ? `${toggleborder.bottom.width} ${toggleborder.bottom.style} ${toggleborder.bottom.color}` : null;
  const toggleborderleft=(toggleborder.left != undefined) ? `${toggleborder.left.width} ${toggleborder.left.style} ${toggleborder.left.color}` : null;

  const menubordertop=(menuborder.top != undefined) ? `${menuborder.top.width} ${menuborder.top.style} ${menuborder.top.color}` : null;
  const menuborderright=(menuborder.right != undefined) ? `${menuborder.right.width} ${menuborder.right.style} ${menuborder.right.color}` : null;
  const menuborderbottom=(menuborder.bottom != undefined) ? `${menuborder.bottom.width} ${menuborder.bottom.style} ${menuborder.bottom.color}` : null;
  const menuborderleft=(menuborder.left != undefined) ? `${menuborder.left.width} ${menuborder.left.style} ${menuborder.left.color}` : null;

  const ddbordertop=(ddborder.top != undefined) ? `${ddborder.top.width} ${ddborder.top.style} ${ddborder.top.color}` : null;
  const ddborderright=(ddborder.right != undefined) ? `${ddborder.right.width} ${ddborder.right.style} ${ddborder.right.color}` : null;
  const ddborderbottom=(ddborder.bottom != undefined) ? `${ddborder.bottom.width} ${ddborder.bottom.style} ${ddborder.bottom.color}` : null;
  const ddborderleft=(ddborder.left != undefined) ? `${ddborder.left.width} ${ddborder.left.style} ${ddborder.left.color}` : null;

  const submenubordertop=(submenuborder.top != undefined) ? `${submenuborder.top.width} ${submenuborder.top.style} ${submenuborder.top.color}` : null;
  const submenuborderright=(submenuborder.right != undefined) ? `${submenuborder.right.width} ${submenuborder.right.style} ${submenuborder.right.color}` : null;
  const submenuborderbottom=(submenuborder.bottom != undefined) ? `${submenuborder.bottom.width} ${submenuborder.bottom.style} ${submenuborder.bottom.color}` : null;
  const submenuborderleft=(submenuborder.left != undefined) ? `${submenuborder.left.width} ${submenuborder.left.style} ${submenuborder.left.color}` : null;

  const btnbordertop=(btnborder.top != undefined) ? `${btnborder.top.width} ${btnborder.top.style} ${btnborder.top.color}` : null;
  const btnborderright=(btnborder.right != undefined) ? `${btnborder.right.width} ${btnborder.right.style} ${btnborder.right.color}` : null;
  const btnborderbottom=(btnborder.bottom != undefined) ? `${btnborder.bottom.width} ${btnborder.bottom.style} ${btnborder.bottom.color}` : null;
  const btnborderleft=(btnborder.left != undefined) ? `${btnborder.left.width} ${btnborder.left.style} ${btnborder.left.color}` : null;

  const iconbordertop=(iconborder.top != undefined) ? `${iconborder.top.width} ${iconborder.top.style} ${iconborder.top.color}` : null;
  const iconborderright=(iconborder.right != undefined) ? `${iconborder.right.width} ${iconborder.right.style} ${iconborder.right.color}` : null;
  const iconborderbottom=(iconborder.bottom != undefined) ? `${iconborder.bottom.width} ${iconborder.bottom.style} ${iconborder.bottom.color}` : null;
  const iconborderleft=(iconborder.left != undefined) ? `${iconborder.left.width} ${iconborder.left.style} ${iconborder.left.color}` : null;

  const sformbordertop=(sformborder.top != undefined) ? `${sformborder.top.width} ${sformborder.top.style} ${sformborder.top.color}` : null;
  const sformborderright=(sformborder.right != undefined) ? `${sformborder.right.width} ${sformborder.right.style} ${sformborder.right.color}` : null;
  const sformborderbottom=(sformborder.bottom != undefined) ? `${sformborder.bottom.width} ${sformborder.bottom.style} ${sformborder.bottom.color}` : null;
  const sformborderleft=(sformborder.left != undefined) ? `${sformborder.left.width} ${sformborder.left.style} ${sformborder.left.color}` : null;

  const sbtnbordertop=(sbtnborder.top != undefined) ? `${sbtnborder.top.width} ${sbtnborder.top.style} ${sbtnborder.top.color}` : null;
  const sbtnborderright=(sbtnborder.right != undefined) ? `${sbtnborder.right.width} ${sbtnborder.right.style} ${sbtnborder.right.color}` : null;
  const sbtnborderbottom=(sbtnborder.bottom != undefined) ? `${sbtnborder.bottom.width} ${sbtnborder.bottom.style} ${sbtnborder.bottom.color}` : null;
  const sbtnborderleft=(sbtnborder.left != undefined) ? `${sbtnborder.left.width} ${sbtnborder.left.style} ${sbtnborder.left.color}` : null;

  const menuboxshadow=(boxshadow ===true) ? `${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor}`: undefined;
  const smenuboxshadow=(sboxshadow ===true) ? `${shshadow}px ${svshadow}px ${sblurshadow}px ${sshadowColor}`: undefined;
  const sbmenuboxshadow=(sbboxshadow ===true) ? `${sbhshadow}px ${sbvshadow}px ${sbblurshadow}px ${sbshadowColor}`: undefined;

  if(fontfamily !=null){
    let url = 'https://fonts.googleapis.com/css2?family='+fontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
    let link = document.createElement('link')
    link.href = url;
    link.rel = "stylesheet";
    link.type =  "text/css";

    if ( jQuery("body").hasClass("site-editor-php") ) { 
      jQuery('iframe').contents().find("head").append(link);
    }else{
      document.head.appendChild(link);
    }
  }
  if(submenufontfamily !=null){
    let url = 'https://fonts.googleapis.com/css2?family='+submenufontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
    let link = document.createElement('link')
    link.href = url;
    link.rel = "stylesheet";
    link.type =  "text/css";

    if ( jQuery("body").hasClass("site-editor-php") ) { 
      jQuery('iframe').contents().find("head").append(link);
    }else{
      document.head.appendChild(link);
    }
  }
  if(btnfontfamily !=null){
    let url = 'https://fonts.googleapis.com/css2?family='+btnfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
    let link = document.createElement('link')
    link.href = url;
    link.rel = "stylesheet";
    link.type =  "text/css";

    if ( jQuery("body").hasClass("site-editor-php") ) { 
      jQuery('iframe').contents().find("head").append(link);
    }else{
      document.head.appendChild(link);
    }
  }
  if(sbtnfontfamily !=null){
    let url = 'https://fonts.googleapis.com/css2?family='+sbtnfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
    let link = document.createElement('link')
    link.href = url;
    link.rel = "stylesheet";
    link.type =  "text/css";

    if ( jQuery("body").hasClass("site-editor-php") ) { 
      jQuery('iframe').contents().find("head").append(link);
    }else{
      document.head.appendChild(link);
    }
  }

jQuery(`.gutensee-toggle.${uniqueid}`).on('click', function(){
      jQuery(`.collapse.gutensee-collapse.${uniqueid}`).toggleClass('in');
});

setAttributes({'addcss':`<style>.gutensee-block #${uniqueid} ul.nav.gutensee-nav{
              background-color:${bgColor};
              color: ${menuColor};
              border: ${border.width} ${border.style} ${border.color};
              border-top:${bordertop};
              border-right:${borderright};
              border-bottom:${borderbottom};
              border-left:${borderleft};
              border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
              padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};              
              box-shadow: ${menuboxshadow};
            }
            .gutensee-block .gutensee-collapse.in #${uniqueid} ul.nav.gutensee-nav {
              background-color: ${mobbgColor};
            }
            .gutensee-block #${uniqueid} .gutensee-nav li>a:not(.gutensee-block #${uniqueid} .dropdown-menu>li>a,
            .gutensee.gutensee-block #${uniqueid} .header-button a,
            .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp,
            .gutensee-block #${uniqueid} .gutensee-nav li.active a){              
              background-color:${menubgColor};
              color: ${menuColor};
              border: ${menuborder.width} ${menuborder.style} ${menuborder.color};
              border-top:${menubordertop};
              border-right:${menuborderright};
              border-bottom:${menuborderbottom};
              border-left:${menuborderleft};
              border-radius: ${menuborderradius.top} ${menuborderradius.right} ${menuborderradius.bottom} ${menuborderradius.left};
              padding: ${menupaddings.top} ${menupaddings.right} ${menupaddings.bottom} ${menupaddings.left};
              margin: ${menumargins.top} ${menumargins.right} ${menumargins.bottom} ${menumargins.left};
              font-family:${fontfamily};
              font-size: ${menufontSize};
              font-weight: ${menuFontWeight};
              line-height: ${menuLineHeight};
              text-transform:${menuTransform};
              text-decoration:${menuDecoration};
              letter-spacing:${menuLetterSpacing};
            }
            .gutensee-block #${uniqueid}{
              margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
              animation-delay: ${delay}ms;

            }
            .gutensee-block #${uniqueid} .dropdown-menu>li>a{
              background-color:${submenubgColor};
              color: ${submenuColor};
              font-family:${submenufontfamily};
              font-size: ${submenufontSize};
              font-weight: ${submenuFontWeight};
              line-height: ${submenuLineHeight};
              text-transform:${submenuTransform};
              text-decoration:${submenuDecoration};
              letter-spacing:${submenuLetterSpacing};
              border: ${submenuborder.width} ${submenuborder.style} ${submenuborder.color};
              border-top:${submenubordertop};
              border-right:${submenuborderright};
              border-bottom:${submenuborderbottom};
              border-left:${submenuborderleft};
              border-radius: ${submenuborderradius.top} ${submenuborderradius.right} ${submenuborderradius.bottom} ${submenuborderradius.left};
              padding: ${submenupaddings.top} ${submenupaddings.right} ${submenupaddings.bottom} ${submenupaddings.left};
              margin: ${submenumargins.top} ${submenumargins.right} ${submenumargins.bottom} ${submenumargins.left};
            }
              .gutensee-block #${uniqueid} .gutensee-nav li.active a,
              .gutensee-block #${uniqueid} .dropdown-menu > li.active > a {
                background-color:${activebgColor};
                color:${activeColor};
                border: ${menuborder.width} ${menuborder.style} ${menuborder.color};
                border-top:${menubordertop};
                border-right:${menuborderright};
                border-bottom:${menuborderbottom};
                border-left:${menuborderleft};
                border-radius: ${menuborderradius.top} ${menuborderradius.right} ${menuborderradius.bottom} ${menuborderradius.left};
                padding: ${menupaddings.top} ${menupaddings.right} ${menupaddings.bottom} ${menupaddings.left};
                margin: ${menumargins.top} ${menumargins.right} ${menumargins.bottom} ${menumargins.left};
                font-family:${fontfamily};
                font-size: ${menufontSize};
                font-weight: ${menuFontWeight};
                line-height: ${menuLineHeight};
                text-transform:${menuTransform};
                text-decoration:${menuDecoration};
                letter-spacing:${menuLetterSpacing};
              }
              .gutensee-block #${uniqueid} .gutensee-nav > li.active > a:hover,
              .gutensee-block #${uniqueid} .dropdown-menu > li.active > a:hover {
                  background-color:${activebghColor};
                  color:${activehColor};
              }

            .gutensee-block #${uniqueid} .open .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu),
            .gutensee-block #${uniqueid} .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu){
              background-color:${ddColor};
              margin: ${ddmargins.top} ${ddmargins.right} ${ddmargins.bottom} ${ddmargins.left};
              border: ${ddborder.width} ${ddborder.style} ${ddborder.color};
              border: ${ddborder.width} ${ddborder.style} ${ddborder.color};
              border-top:${ddbordertop};
              border-right:${ddborderright};
              border-bottom:${ddborderbottom};
              border-left:${ddborderleft};
              border-radius: ${ddborderradius.top} ${ddborderradius.right} ${ddborderradius.bottom} ${ddborderradius.left};
              box-shadow: ${smenuboxshadow};

            }
            .gutensee-block #${uniqueid} .open.search_exists .dropdown-menu{
              box-shadow: ${sbmenuboxshadow};
            }
             .gutensee-block #${uniqueid} .gutensee-nav li>a:not(.gutensee-block #${uniqueid} .dropdown-menu>li>a,
             .gutensee.gutensee-block #${uniqueid} .header-button a,
             .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp,
             .gutensee-block #${uniqueid} .gutensee-nav li.active a:hover):hover{              
              background-color:${menubgHColor};
              color: ${menuHColor};
            }
            .gutensee-block #${uniqueid} .open .dropdown-menu>li>a:hover{
              background-color:${submenubgHColor};
              color: ${submenuHColor};
            }
            .gutensee.gutensee-block #${uniqueid} .header-button a{
              margin:${btnmargins.top} ${btnmargins.right} ${btnmargins.bottom} ${btnmargins.left};
              padding: ${btnpaddings.top} ${btnpaddings.right} ${btnpaddings.bottom} ${btnpaddings.left};
              background-color:${btnbgColor};
              color: ${btnColor};
              border: ${btnborder.width} ${btnborder.style} ${btnborder.color};
              border-top:${btnbordertop};
              border-right:${btnborderright};
              border-bottom:${btnborderbottom};
              border-left:${btnborderleft};
              border-radius: ${btnborderradius.top} ${btnborderradius.right} ${btnborderradius.bottom} ${btnborderradius.left};
             
            }
            .gutensee.gutensee-block #${uniqueid} .header-button a span{
              font-family:${btnfontfamily};
              font-size: ${btnfontSize};
              font-weight: ${btnFontWeight};
              line-height: ${btnLineHeight};
              text-transform:${btnTransform};
              text-decoration:${btnDecoration};
              letter-spacing:${btnLetterSpacing};
            }
            .gutensee.gutensee-block #${uniqueid} .header-button a:hover{
              background-color:${btnbghColor};
              color: ${btnhColor};             
            }
            .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp{
              margin:${iconmargins.top} ${iconmargins.right} ${iconmargins.bottom} ${iconmargins.left};
              padding: ${iconpaddings.top} ${iconpaddings.right} ${iconpaddings.bottom} ${iconpaddings.left};
              background-color:${iconbgColor};
              color: ${iconColor};
              border: ${iconborder.width} ${iconborder.style} ${iconborder.color};
              border-top:${iconbordertop};
              border-right:${iconborderright};
              border-bottom:${iconborderbottom};
              border-left:${iconborderleft};
              border-radius: ${iconborderradius.top} ${iconborderradius.right} ${iconborderradius.bottom} ${iconborderradius.left};
              font-size:${iconWidth}px;
            }
             .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp:hover{
              background-color:${iconbghColor};
              color: ${iconhColor};
            }
            .gutensee-block #${uniqueid} .dropdown-menu.search-panel{                       
              border: ${sformborder.width} ${sformborder.style} ${sformborder.color};
              border-top:${sformbordertop};
              border-right:${sformborderright};
              border-bottom:${sformborderbottom};
              border-left:${sformborderleft};
              border-radius: ${sformborderradius.top} ${sformborderradius.right} ${sformborderradius.bottom} ${sformborderradius.left};
            }
            .gutensee-block #${uniqueid} .dropdown-menu.search-panel .search-form input[type="submit"]{
              background-color:${sbtnbgColor};
              border-color:${sbtnbgColor};
              color: ${sbtnColor};
              border: ${sbtnborder.width} ${sbtnborder.style} ${sbtnborder.color};
              border-top:${sbtnbordertop};
              border-right:${sbtnborderright};
              border-bottom:${sbtnborderbottom};
              border-left:${sbtnborderleft};
              font-family:${sbtnfontfamily};
              font-size: ${sbtnfontSize};
              font-weight: ${sbtnFontWeight};
              line-height: ${sbtnLineHeight};
              text-transform:${sbtnTransform};
              text-decoration:${sbtnDecoration};
              letter-spacing:${sbtnLetterSpacing};
            }
            .gutensee-block #${uniqueid} .dropdown-menu.search-panel .search-form input{
              border-radius: ${sbtnborderradius.top} ${sbtnborderradius.right} ${sbtnborderradius.bottom} ${sbtnborderradius.left};
            }
            .gutensee-block #${uniqueid} .dropdown-menu.search-panel .search-form input[type="submit"]:hover{
              background-color:${sbtnbghColor};
              border-color:${sbtnbghColor};
              color: ${sbtnhColor};
            }
            .gutensee-toggle#${uniqueid01} {
              color: ${toggleColor};
              background-color: ${togglebgColor};
              border: ${toggleborder.width} ${toggleborder.style} ${toggleborder.color};
              border-top:${togglebordertop};
              border-right:${toggleborderright};
              border-bottom:${toggleborderbottom};
              border-left:${toggleborderleft};
              border-radius: ${toggleborderradius.top} ${toggleborderradius.right} ${toggleborderradius.bottom} ${toggleborderradius.left};
              font-size: ${togglesize}px;
              font-weight: 400;
            }
            .gutensee-toggle#${uniqueid01}:hover {
              color: ${toggleHColor};
              background-color: ${togglebgHColor};
            }
            .gutensee-toggle.left{
              float:left;
            }
            .gutensee-toggle.right{
              float:right;
            }
            .gutensee-toggle.center{
                position: relative;
                top: 50%;
                left: 50%;
                transform: translateX(-50%);
                float: none;
            }
            @media (max-width:1024px){
              .gutensee-block #${uniqueid} ul.nav.gutensee-nav{
                padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left}; 
              }
              .gutensee-block #${uniqueid} .gutensee-nav li>a:not(.gutensee-block #${uniqueid} .dropdown-menu>li>a,
              .gutensee.gutensee-block #${uniqueid} .header-button a,
              .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp,
              .gutensee-block #${uniqueid} .gutensee-nav li.active a){              
                  padding: ${menupaddingstab.top} ${menupaddingstab.right} ${menupaddingstab.bottom} ${menupaddingstab.left};
                  margin: ${menumarginstab.top} ${menumarginstab.right} ${menumarginstab.bottom} ${menumarginstab.left};
                  font-size: ${menufontSizetab};
                  line-height: ${menuLineHeighttab};
                  letter-spacing:${menuLetterSpacingtab};
              }
              .gutensee-block #${uniqueid}{
                  margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
                
              }
              .gutensee-block #${uniqueid} .dropdown-menu>li>a{
                  font-size: ${submenufontSizetab};
                  line-height: ${submenuLineHeighttab};
                  letter-spacing:${submenuLetterSpacingtab};
                  padding: ${submenupaddingstab.top} ${submenupaddingstab.right} ${submenupaddingstab.bottom} ${submenupaddingstab.left};
                  margin: ${submenumarginstab.top} ${submenumarginstab.right} ${submenumarginstab.bottom} ${submenumarginstab.left};
              }
              .gutensee-block #${uniqueid} .gutensee-nav li.active a,
              .gutensee-block #${uniqueid} .dropdown-menu > li.active > a {
                  padding: ${menupaddingstab.top} ${menupaddingstab.right} ${menupaddingstab.bottom} ${menupaddingstab.left};
                  margin: ${menumarginstab.top} ${menumarginstab.right} ${menumarginstab.bottom} ${menumarginstab.left};
                  font-size: ${menufontSizetab};
                  line-height: ${menuLineHeighttab};
                  letter-spacing:${menuLetterSpacingtab};
              }
              .gutensee-block #${uniqueid} .open .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu),
              .gutensee-block #${uniqueid} .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu){
                margin: ${ddmarginstab.top} ${ddmarginstab.right} ${ddmarginstab.bottom} ${ddmarginstab.left};
              }
              .gutensee.gutensee-block #${uniqueid} .header-button a{
                margin:${btnmarginstab.top} ${btnmarginstab.right} ${btnmarginstab.bottom} ${btnmarginstab.left};
                padding: ${btnpaddingstab.top} ${btnpaddingstab.right} ${btnpaddingstab.bottom} ${btnpaddingstab.left};
              }
             .gutensee.gutensee-block #${uniqueid} .header-button a span{
                font-size: ${btnfontSizetab};
                line-height: ${btnLineHeighttab};
                letter-spacing:${btnLetterSpacingtab};
              }
              .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp{
                  margin:${iconmarginstab.top} ${iconmarginstab.right} ${iconmarginstab.bottom} ${iconmarginstab.left};
                  padding: ${iconpaddingstab.top} ${iconpaddingstab.right} ${iconpaddingstab.bottom} ${iconpaddingstab.left};
                  font-size:${iconWidthtab}px;
              }             
              .gutensee-block #${uniqueid} .dropdown-menu.search-panel .search-form input[type="submit"]{
                  font-size: ${sbtnfontSizetab};
                  line-height: ${sbtnLineHeighttab};
                  letter-spacing:${sbtnLetterSpacingtab};
              }
              .gutensee-toggle#${uniqueid01} {
                  font-size: ${togglesizetab}px;
              }
              .gutensee-toggle.tab-left{
                float:left;
              }
              .gutensee-toggle.tab-right{
                float:right;
              }
              .gutensee-toggle.tab-center{
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translateX(-50%);
                  float: none;
              }
            }
            @media (max-width:767px){
              .gutensee-block #${uniqueid} ul.nav.gutensee-nav{
                padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left}; 
              }
              .gutensee-block #${uniqueid} .gutensee-nav li>a:not(.gutensee-block #${uniqueid} .dropdown-menu>li>a,
              .gutensee.gutensee-block #${uniqueid} .header-button a,
              .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp,
              .gutensee-block #${uniqueid} .gutensee-nav li.active a){              
                  padding: ${menupaddingsmob.top} ${menupaddingsmob.right} ${menupaddingsmob.bottom} ${menupaddingsmob.left};
                  margin: ${menumarginsmob.top} ${menumarginsmob.right} ${menumarginsmob.bottom} ${menumarginsmob.left};
                  font-size: ${menufontSizemob};
                  line-height: ${menuLineHeightmob};
                  letter-spacing:${menuLetterSpacing};
              }
              .gutensee-block #${uniqueid}{
                  margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
                
              }
              .gutensee-block #${uniqueid} .dropdown-menu>li>a{
                  font-size: ${submenufontSizemob};
                  line-height: ${submenuLineHeightmob};
                  letter-spacing:${submenuLetterSpacingmob};
                  padding: ${submenupaddingsmob.top} ${submenupaddingsmob.right} ${submenupaddingsmob.bottom} ${submenupaddingsmob.left};
                  margin: ${submenumarginsmob.top} ${submenumarginsmob.right} ${submenumarginsmob.bottom} ${submenumarginsmob.left};
              }
              .gutensee-block #${uniqueid} .gutensee-nav li.active a,
              .gutensee-block #${uniqueid} .dropdown-menu > li.active > a {
                  padding: ${menupaddingsmob.top} ${menupaddingsmob.right} ${menupaddingsmob.bottom} ${menupaddingsmob.left};
                  margin: ${menumarginsmob.top} ${menumarginsmob.right} ${menumarginsmob.bottom} ${menumarginsmob.left};
                  font-size: ${menufontSizemob};
                  line-height: ${menuLineHeightmob};
                  letter-spacing:${menuLetterSpacingmob};
              }
              .gutensee-block #${uniqueid} .open .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu),
              .gutensee-block #${uniqueid} .dropdown-menu:not(.gutensee-block #${uniqueid} .open.search_exists .dropdown-menu){
                margin: ${ddmarginsmob.top} ${ddmarginsmob.right} ${ddmarginsmob.bottom} ${ddmarginsmob.left};
              }
              .gutensee.gutensee-block #${uniqueid} .header-button a{
                margin:${btnmarginsmob.top} ${btnmarginsmob.right} ${btnmarginsmob.bottom} ${btnmarginsmob.left};
                padding: ${btnpaddingsmob.top} ${btnpaddingsmob.right} ${btnpaddingsmob.bottom} ${btnpaddingsmob.left};
              }
             .gutensee.gutensee-block #${uniqueid} .header-button a span{
                font-size: ${btnfontSizemob};
                line-height: ${btnLineHeightmob};
                letter-spacing:${btnLetterSpacingmob};
              }
              .gutensee-block #${uniqueid} .gutensee-nav li>a.search-icon-sbp{
                  margin:${iconmarginsmob.top} ${iconmarginsmob.right} ${iconmarginsmob.bottom} ${iconmarginsmob.left};
                  padding: ${iconpaddingsmob.top} ${iconpaddingsmob.right} ${iconpaddingsmob.bottom} ${iconpaddingsmob.left};
                  font-size:${iconWidthmob}px;
              }             
              .gutensee-block #${uniqueid} .dropdown-menu.search-panel .search-form input[type="submit"]{
                font-size: ${sbtnfontSizemob};
                line-height: ${sbtnLineHeightmob};
                letter-spacing:${sbtnLetterSpacingmob};
              }
              .gutensee-toggle#${uniqueid01} {
                font-size: ${togglesizemob}px;
              }
              .gutensee-toggle.mob-left{
                float:left;
              }
              .gutensee-toggle.mob-right{
                float:right;
              }
              .gutensee-toggle.mob-center{
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translateX(-50%);
                  float: none;
              }
            }</style>`});

  setAttributes({'addjs':`<script>
                            var url2 = "https://fonts.googleapis.com/css2?family=${fontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                            var link2 = document.createElement("link");
                            link2.href = url2;
                            link2.rel = "stylesheet";
                            link2.type =  "text/css";             
                            document.head.appendChild(link2);
                        
                            var textFamilyurl2 = "https://fonts.googleapis.com/css2?family=${submenufontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                            var textFamilylink2 = document.createElement("link");
                            textFamilylink2.href = textFamilyurl2;
                            textFamilylink2.rel = "stylesheet";
                            textFamilylink2.type =  "text/css";           
                            document.head.appendChild(textFamilylink2);

                            var btnFamilyurl2 = "https://fonts.googleapis.com/css2?family=${btnfontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                            var btnFamilylink2 = document.createElement("link");
                            btnFamilylink2.href = btnFamilyurl2;
                            btnFamilylink2.rel = "stylesheet";
                            btnFamilylink2.type =  "text/css";           
                            document.head.appendChild(btnFamilylink2);

                            var sbtnFamilyurl2 = "https://fonts.googleapis.com/css2?family=${sbtnfontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                            var sbtnFamilylink2 = document.createElement("link");
                            sbtnFamilylink2.href = sbtnFamilyurl2;
                            sbtnFamilylink2.rel = "stylesheet";
                            sbtnFamilylink2.type =  "text/css";           
                            document.head.appendChild(sbtnFamilylink2);

                            jQuery(document).ready(function() {
                                jQuery("#${uniqueid01}").on("click", function(){
                                  jQuery(".collapse.gutensee-collapse.${uniqueid}").addClass("in");
                                });
                                jQuery("#${uniqueid} #sbp-close").on("click", function(){
                                  jQuery(".gutensee-collapse.${uniqueid} ").removeClass("in");
                                });
                                jQuery(document).on("click",".gutensee-collapse.in",function(e) {
                                    if( jQuery(e.target).is("a") && jQuery(e.target).attr("class") != "dropdown-toggle" ) {
                                        jQuery(this).collapse("hide");
                                    }
                                });
                                if( jQuery(window).width() > 1100) {
                                   jQuery(".nav li.dropdown").hover(function() {
                                     if( jQuery(window).width() > 1100 ) {
                                        jQuery(".dropdown-menu").removeAttr("style");
                                      }
                                       jQuery(this).addClass("open");
                                   }, function() {
                                       jQuery(this).removeClass("open");
                                   }); 
                                   jQuery(".nav li.dropdown-submenu").hover(function() {
                                       jQuery(this).addClass("open");
                                   }, function() {
                                       jQuery(this).removeClass("open");
                                   }); 

                                   jQuery(".nav li.dropdown-sbp").hover(function() {
                                     if( jQuery(window).width() > 1100 ) {
                                        jQuery(".dropdown-menu").removeAttr("style");
                                      }
                                       jQuery(this).addClass("open");
                                   }, function() {
                                       jQuery(this).removeClass("open");
                                   }); 
                                   jQuery(".nav li.dropdown-submenu").hover(function() {
                                       jQuery(this).addClass("open");
                                   }, function() {
                                       jQuery(this).removeClass("open");
                                   }); 
                                }   
                            }); 
                          </script>`
                });
  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{
          __html: [
            `${addcss}
            ${advcss}`         
            ].join('\n')
          }}>
        </style>
      <InspectorControls>
        <div className="gutensee_block_controlType_flex_panel">
          <div className="gutensee_block_main_section_panel">          
            <Button isSmall={true} isPressed={controlType === 'basic'} onClick={() => setAttributes({controlType: 'basic',})} >
              Basic
            </Button>
            
            <Button isSmall={true} isPressed={controlType === 'style'} onClick={() => setAttributes({controlType: 'style',})}>
              Style
            </Button>

            <Button isSmall={true} isPressed={controlType === 'typo'} onClick={() => setAttributes({controlType: 'typo',})}>
              Typo
            </Button>

          </div>
        </div>

        {/* Basic Cont*/}
        {controlType === 'basic' && (
          <>
          <div className="gutensee_block_content_section">
            <div className={'gutensee-menu'}>
              <p>{__('Menu', 'gutensee-blocks')}</p>
              <SelectControl
                value={menuname}
                onChange={setmenuname}
                options={options}
              />
            </div>

            <Button
              variant="link"
              href={ addQueryArgs( 'nav-menus.php', {
                post_type: 'wp_navigation',
              } ) }
              target="_blank"
            >
              { __( 'Create & Update Menu' ) }
            </Button>

            <ToggleControl
              label={__('Enable/Disable on Button','gutensee-blocks-plus')}
              checked={hidebtn}
              onChange={(newval) => setAttributes({ hidebtn: newval })}
            />
            { hidebtn === true && (
              <>
                <InputControl
                  label={__('Button Text','gutensee-blocks-plus')}
                  value={ btntext }
                  onChange={ (userVal)=> setAttributes({btntext:userVal}) }
                />
              </>
            )}
            <ToggleControl
              label={__('Enable/Disable on Search','gutensee-blocks-plus')}
              checked={hidesearch}
              onChange={(newval) => setAttributes({ hidesearch: newval })}
            />
            { hidesearch === true && (
              <> 
                <RadioGroup label="Width" onChange={ setPreviewiconWidth } checked={ previewiconWidth } className={"preview-icon"}>
                  <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                  <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                  <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                </RadioGroup>
                { previewiconWidth === 'Desktop' && (
                  <>                             
                  <RangeControl 
                      label={__('Width(px)','gutensee-blocks-plus')}
                      value={iconWidth}
                      onChange={(newtext) => setAttributes({ iconWidth: newtext })}
                      min={0}
                      max={500}
                  />
                  </>
                )}
                { previewiconWidth === 'Tablet' && (
                  <>                             
                  <RangeControl 
                      label={__('Width(px)','gutensee-blocks-plus')}
                      value={iconWidthtab}
                      onChange={(newtext) => setAttributes({ iconWidthtab: newtext })}
                      min={0}
                      max={500}
                  />
                  </>
                )}
                { previewiconWidth === 'Mobile' && (
                  <>                             
                  <RangeControl 
                      label={__('Width(px)','gutensee-blocks-plus')}
                      value={iconWidthmob}
                      onChange={(newtext) => setAttributes({ iconWidthmob: newtext })}
                      min={0}
                      max={500}
                  />
                  </>
                )}
              </>
            )} 
            <RadioGroup label="Width" onChange={ setPreviewtogglepos } checked={ previewtogglepos } className={"preview-icon"}>
              <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
              <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
              <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
            </RadioGroup>
            { previewtogglepos === 'Desktop' && (
              <> 
                <SelectControl
                  label={__('Toggle Position ','gutensee-blocks')}
                  value={ toggleposition }
                  options={ [
                      { label: __('Right','gutensee-blocks'), value: 'right' },
                      { label: __('left','gutensee-blocks'), value: 'left' },
                      { label: __('Center','gutensee-blocks'), value: 'center' },
                  ] }
                  onChange={ (newtext) => setAttributes({ toggleposition: newtext }) }           
                />
              </>
            )}
            { previewtogglepos === 'Tablet' && (
              <>  
                <SelectControl
                  label={__('Toggle Position ','gutensee-blocks')}
                  value={ togglepositiontab }
                  options={ [
                      { label: __('Right','gutensee-blocks'), value: 'tab-right' },
                      { label: __('left','gutensee-blocks'), value: 'tab-left' },
                      { label: __('Center','gutensee-blocks'), value: 'tab-center' },
                  ] }
                  onChange={ (newtext) => setAttributes({ togglepositiontab: newtext }) }           
                />
              </>
            )}
            { previewtogglepos === 'Mobile' && (
              <>  
                <SelectControl
                  label={__('Toggle Position ','gutensee-blocks')}
                  value={ togglepositionmob }
                  options={ [
                      { label: __('Right','gutensee-blocks'), value: 'mob-right' },
                      { label: __('left','gutensee-blocks'), value: 'mob-left' },
                      { label: __('Center','gutensee-blocks'), value: 'mob-center' },
                  ] }
                  onChange={ (newtext) => setAttributes({ togglepositionmob: newtext }) }           
                />
              </>
            )}  
            <RadioGroup label="Width" onChange={ setPreviewtogglesize } checked={ previewtogglesize } className={"preview-icon"}>
              <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
              <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
              <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
            </RadioGroup>
            { previewtogglesize === 'Desktop' && (
              <>                             
                <UnitControl 
                  label={__('Toggle Size(px)','gutensee-blocks')}          
                  value={ togglesize}
                  onChange={(newtext) => setAttributes({ togglesize: newtext })}
                />
              </>
            )}
            { previewtogglesize === 'Tablet' && (
              <>                             
                <UnitControl 
                  label={__('Toggle Size(px)','gutensee-blocks')}          
                  value={ togglesizetab}
                  onChange={(newtext) => setAttributes({ togglesizetab: newtext })}
                />
              </>
            )}
            { previewtogglesize === 'Mobile' && (
              <>                             
                <UnitControl 
                  label={__('Toggle Size(px)','gutensee-blocks')}          
                  value={ togglesizemob}
                  onChange={(newtext) => setAttributes({ togglesizemob: newtext })}
                />
              </>
            )}            
            <SelectControl
              label={__('Animation','gutensee')}
              value={ animation }
              options={ animationslist }
              onChange={ (newtext) => setAttributes({ animation: newtext }) }           
            />  
            { animation != '' && (
              <>
                <SelectControl
                    label={__('Durations','gutensee')}
                    value={ durations }
                    options={ animationsdurations }
                    onChange={ (newtext) => setAttributes({ durations: newtext }) }           
                />  
                <TextControl
                    label={__('Delay(ms)','gutensee')}         
                    value={delay}
                  onChange={(newtext) => setAttributes({ delay: newtext })}
                />
             </>
            )}
            <PanelBody initialOpen={false}  title={__('Visiblity','gutensee')} className={'gutensee-panel-edit gutensee-visible'}>
              <ToggleControl
                label={__('Desktop','gutensee')}
                checked={hidedesktop}
                onChange={(newval) => setAttributes({ hidedesktop: newval })}
              />
              <ToggleControl
                label={__('Tablet','gutensee')}
                checked={hidetablet}
                onChange={(newval) => setAttributes({ hidetablet: newval })}
              />
              <ToggleControl
                label={__('Mobile','gutensee')}
                checked={hidemobile}
                onChange={(newval) => setAttributes({ hidemobile: newval })}
              />
            </PanelBody>
          </div>
          </>
        )}

        {/* Basic Cont*/}
        {controlType === 'style' && (
          <>
          <div className="gutensee_block_content_section">
          
            <PanelBody initialOpen={false}  title={__('Color','gutensee')} className={'gutensee-panel-edit'}>
              <div className="gutensee_block_controlType_flex_panel">
                <div className="gutensee_block_main_section_panel">          
                  <Button isSmall={true} isPressed={colorType === 'normal'} onClick={() => setAttributes({colorType: 'normal',})} >
                    Normal
                  </Button>
                  
                  <Button isSmall={true} isPressed={controlType === 'hover'} onClick={() => setAttributes({colorType: 'hover',})}>
                    Hover
                  </Button>

                </div>
              </div>

              {/* Basic Cont*/}
              {colorType === 'normal' && (
                <>                
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Background','gutensee')}
                            value={ bgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ bgColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Mobile Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Mobile Background','gutensee')}
                            value={ mobbgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ mobbgColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Menu','gutensee')}
                            value={ menuColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ menuColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Menu Background','gutensee')}
                            value={ menubgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ menubgColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Dropdown Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Dropdown Background','gutensee')}
                            value={ ddColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ ddColor: newtext }) }
                        />
                  </div>
                </div>                 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Sub Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Sub Menu','gutensee')}
                            value={ submenuColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ submenuColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Sub Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Sub Menu Background','gutensee')}
                            value={ submenubgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ submenubgColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Active Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Active Menu','gutensee')}
                            value={ activeColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ activeColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Active Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Active Menu Background','gutensee')}
                            value={ activebgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ activebgColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Toggle Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Toggle Background','gutensee')}
                            value={ togglebgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ togglebgColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Toggle','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Toggle','gutensee')}
                            value={ toggleColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ toggleColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Button','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Button','gutensee')}
                            value={ btnColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ btnColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Button Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Button Background','gutensee')}
                            value={ btnbgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ btnbgColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Icon','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Icon','gutensee')}
                            value={ iconColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ iconColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Icon Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Icon Background','gutensee')}
                            value={ iconbgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ iconbgColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Button','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Button','gutensee')}
                            value={ sbtnColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ sbtnColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Button Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Button Background','gutensee')}
                            value={ sbtnbgColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ sbtnbgColor: newtext }) }
                        />
                  </div>
                </div>                           
                </>
              )}

              {/* Basic Cont*/}
              {colorType === 'hover' && (
                <>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Menu','gutensee')}
                            value={ menuHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ menuHColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Menu Background','gutensee')}
                            value={ menubgHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ menubgHColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Sub Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Sub Menu','gutensee')}
                            value={ submenuHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ submenuHColor: newtext }) }
                        />
                  </div>
                </div> 
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Sub Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Sub Menu Background','gutensee')}
                            value={ submenubgHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ submenubgHColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Active Menu','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Active Menu','gutensee')}
                            value={ activehColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ activehColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Active Menu Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Active Menu Background','gutensee')}
                            value={ activebghColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ activebghColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Toggle Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Toggle Background','gutensee')}
                            value={ togglebgHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ togglebgHColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Toggle','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Toggle','gutensee')}
                            value={ toggleHColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ toggleHColor: newtext }) }
                        />
                  </div>
                </div>              
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Button','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Button','gutensee')}
                            value={ btnhColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ btnhColor: newtext }) }
                        />
                  </div>
                </div>              
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Button Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Button Background','gutensee')}
                            value={ btnbghColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ btnbghColor: newtext }) }
                        />
                  </div>
                </div>
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Icon','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Icon','gutensee')}
                            value={ iconhColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ iconhColor: newtext }) }
                        />
                  </div>
                </div>              
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Icon Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Icon Background','gutensee')}
                            value={ iconbghColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ iconbghColor: newtext }) }
                        />
                  </div>
                </div>              
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Button','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Button','gutensee')}
                            value={ sbtnhColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ sbtnhColor: newtext }) }
                        />
                  </div>
                </div>              
                <div className="gutensee_block_section_flex_panel">
                  <p className="gutensee_block_section_panel_label">
                    { __('Search Button Background','gutensee')}
                  </p>
                  <div className="gutensee_block_section_panel">           
                    <ColorPalette
                      className={'gutensee-color'}
                            title={ __('Search Button Background','gutensee')}
                            value={ sbtnbghColor }
                            enableAlpha={'true'}
                            onChange={ (newtext) => setAttributes({ sbtnbghColor: newtext }) }
                        />
                  </div>
                </div>              
                </>
              )}
            </PanelBody>

            <PanelBody initialOpen={false}  title={__('Box Shadow','gutensee')} className={'gutensee-panel-edit'}>  
              <PanelBody initialOpen={false}  title={__('Menu','gutensee')} className={'gutensee-panel-edit'}>          
                <ToggleControl
                  label={__('Add Box Shadow','gutensee')}
                  checked={boxshadow}
                  onChange={(newval) => setAttributes({ boxshadow: newval })}
                />
                { boxshadow != '' && (  
                  <>  
                    <RangeControl 
                      label={ __('Horizontal Shadow(px)','gutensee') }         
                        value={ hshadow}
                        onChange={(newtext) => setAttributes({ hshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <RangeControl 
                      label={ __('Vertical Shadow(px)','gutensee') }         
                        value={ vshadow}
                          onChange={(newtext) => setAttributes({ vshadow: newtext })}
                      min={0}
                      max={100}
                    />  
                    <RangeControl 
                      label={ __('Blur Shadow(px)','gutensee') }         
                        value={ blurshadow}
                          onChange={(newtext) => setAttributes({ blurshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <div className="gutensee_block_section_flex_panel">
                      <p className="gutensee_block_section_panel_label">
                        { __('Box Shadow','gutensee')}
                      </p>
                      <div className="gutensee_block_section_panel">           
                        <ColorPalette
                          className={'gutensee-color'}
                                title={ __('Box Shadow','gutensee')}
                                value={ shadowColor }
                                onChange={ (newtext) => setAttributes({ shadowColor: newtext }) }
                            />
                      </div>
                    </div>
                  </>
                )}
              </PanelBody>
              <PanelBody initialOpen={false}  title={__('Sub Menu','gutensee')} className={'gutensee-panel-edit'}>          
                <ToggleControl
                  label={__('Add Box Shadow','gutensee')}
                  checked={sboxshadow}
                  onChange={(newval) => setAttributes({ sboxshadow: newval })}
                />
                { boxshadow != '' && (  
                  <>  
                    <RangeControl 
                      label={ __('Horizontal Shadow(px)','gutensee') }         
                        value={ shshadow}
                        onChange={(newtext) => setAttributes({ shshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <RangeControl 
                      label={ __('Vertical Shadow(px)','gutensee') }         
                        value={ svshadow}
                          onChange={(newtext) => setAttributes({ svshadow: newtext })}
                      min={0}
                      max={100}
                    />  
                    <RangeControl 
                      label={ __('Blur Shadow(px)','gutensee') }         
                        value={ sblurshadow}
                          onChange={(newtext) => setAttributes({ ssblurshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <div className="gutensee_block_section_flex_panel">
                      <p className="gutensee_block_section_panel_label">
                        { __('Box Shadow','gutensee')}
                      </p>
                      <div className="gutensee_block_section_panel">           
                        <ColorPalette
                          className={'gutensee-color'}
                                title={ __('Box Shadow','gutensee')}
                                value={ sshadowColor }
                                onChange={ (newtext) => setAttributes({ sshadowColor: newtext }) }
                            />
                      </div>
                    </div>
                  </>
                )}
              </PanelBody>
              <PanelBody initialOpen={false}  title={__('Search Box','gutensee')} className={'gutensee-panel-edit'}>                        
                <ToggleControl
                  label={__('Add Box Shadow','gutensee')}
                  checked={sbboxshadow}
                  onChange={(newval) => setAttributes({ sbboxshadow: newval })}
                />
                { boxshadow != '' && (  
                  <>  
                    <RangeControl 
                      label={ __('Horizontal Shadow(px)','gutensee') }         
                        value={ sbhshadow}
                        onChange={(newtext) => setAttributes({ sbhshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <RangeControl 
                      label={ __('Vertical Shadow(px)','gutensee') }         
                        value={ sbvshadow}
                          onChange={(newtext) => setAttributes({ sbvshadow: newtext })}
                      min={0}
                      max={100}
                    />  
                    <RangeControl 
                      label={ __('Blur Shadow(px)','gutensee') }         
                        value={ sbblurshadow}
                          onChange={(newtext) => setAttributes({ sbblurshadow: newtext })}
                      min={0}
                      max={100}
                    />
                    <div className="gutensee_block_section_flex_panel">
                      <p className="gutensee_block_section_panel_label">
                        { __('Box Shadow','gutensee')}
                      </p>
                      <div className="gutensee_block_section_panel">           
                        <ColorPalette
                          className={'gutensee-color'}
                                title={ __('Box Shadow','gutensee')}
                                value={ sbshadowColor }
                                onChange={ (newtext) => setAttributes({ sbshadowColor: newtext }) }
                            />
                      </div>
                    </div>
                  </>
                )}
              </PanelBody>
            </PanelBody>        

            <PanelBody initialOpen={false}  title={__('Spacing','gutensee')} className={'gutensee-panel-edit'}>
              <RadioGroup label="Width" onChange={ setPreviewmargins } checked={ previewmargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmargins === 'Desktop' && (
                <>
                  <BoxControl
                    id={"gutensee-margin"} 
                    label={__('Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={margins}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...margins,
                        margins: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}
              { previewmargins === 'Tablet' && (
                    <>
                  <BoxControl
                    id={"gutensee-margin"} 
                    label={__('Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={marginstab}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...marginstab,
                        marginstab: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}              
              { previewmargins === 'Mobile' && (
                    <>
                  <BoxControl 
                    id={"gutensee-margin"}
                    label={__('Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={marginsmob}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...marginsmob,
                        marginsmob: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}

              <RadioGroup label="Width" onChange={ setPreviewmenumargins } checked={ previewmenumargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmargins === 'Desktop' && (
                <>
                  <BoxControl
                      id={"gutensee-margin"} 
                      label={__('Menu Margin','gutensee-blocks')}
                      values={menumargins}
                      sides={['top', 'bottom','left','right']}
                      allowReset={false}
                      units={[]}
                      onChange={(newValue) =>
                        setAttributes({
                          ...menumargins,
                            menumargins: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                        })
                      }
                  />
                </>
              )}
              { previewmargins === 'Tablet' && (
                <>
                  <BoxControl
                      id={"gutensee-margin"} 
                      label={__('Menu Margin','gutensee-blocks')}
                      values={menumarginstab}
                      sides={['top', 'bottom','left','right']}
                      allowReset={false}
                      units={[]}
                      onChange={(newValue) =>
                        setAttributes({
                          ...menumarginstab,
                            menumarginstab: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                        })
                      }
                  />
                </>
              )}
              { previewmargins === 'Mobile' && (
                <>
                  <BoxControl
                      id={"gutensee-margin"} 
                      label={__('Menu Margin','gutensee-blocks')}
                      values={menumarginsmob}
                      sides={['top', 'bottom','left','right']}
                      allowReset={false}
                      units={[]}
                      onChange={(newValue) =>
                        setAttributes({
                          ...menumarginsmob,
                            menumarginsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                        })
                      }
                  />
                </>
              )} 

              <RadioGroup label="Width" onChange={ setPreviewddmargins } checked={ previewddmargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewddmargins === 'Desktop' && (
                <>
                  <BoxControl 
                    label={__('Dropdown Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={ddmargins}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...ddmargins,
                        ddmargins: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}
              { previewddmargins === 'Tablet' && (
                <>
                  <BoxControl 
                    label={__('Dropdown Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={ddmarginstab}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...ddmarginstab,
                        ddmarginstab: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}
              { previewddmargins === 'Mobile' && (
                <>
                  <BoxControl 
                    label={__('Dropdown Margin','gutensee')}
                    inputProps={{ min: -300 }}
                    values={ddmarginsmob}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...ddmarginsmob,
                        ddmarginsmob: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                      })
                    }
                  />
                </>
              )}
              
              <RadioGroup label="Width" onChange={ setPreviewsubmenumargins } checked={ previewsubmenumargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewsubmenumargins === 'Desktop' && (
                <>
                  <BoxControl 
                    label={__('Submenu Margin','gutensee-blocks')}
                    values={submenumargins}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...submenumargins,
                          submenumargins: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewsubmenumargins === 'Tablet' && (
                <>
                  <BoxControl 
                    label={__('Submenu Margin','gutensee-blocks')}
                    values={submenumarginstabdd}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...submenumarginstabdd,
                          submenumarginstabdd: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewsubmenumargins === 'Mobile' && (
                <>
                  <BoxControl 
                    label={__('Submenu Margin','gutensee-blocks')}
                    values={submenumarginsmob}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...submenumarginsmob,
                          submenumarginsmob: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )} 

              <RadioGroup label="Width" onChange={ setPreviewbtnmargins } checked={ previewbtnmargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewbtnmargins === 'Desktop' && (
                <>
                  <BoxControl 
                    label={__('Button Margin','gutensee-blocks-plus')}
                    values={btnmargins}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...btnmargins,
                          btnmargins: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewbtnmargins === 'Tablet' && (
                <>
                  <BoxControl 
                    label={__('Button Margin','gutensee-blocks-plus')}
                    values={btnmarginstab}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...btnmarginstab,
                          btnmarginstab: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewbtnmargins === 'Mobile' && (
                <>
                  <BoxControl 
                    label={__('Button Margin','gutensee-blocks-plus')}
                    values={btnmarginsmob}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...btnmarginsmob,
                          btnmarginsmob: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              
              
              <RadioGroup label="Width" onChange={ setPreviewiconmargins } checked={ previewiconmargins } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewiconmargins === 'Desktop' && (
                <>
                  <BoxControl 
                    label={__('Search Icon Margin','gutensee-blocks-plus')}
                    values={iconmargins}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...iconmargins,
                          iconmargins: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewiconmargins === 'Tablet' && (
                <>
                  <BoxControl 
                    label={__('Search Icon Margin','gutensee-blocks-plus')}
                    values={iconmarginstab}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...iconmarginstab,
                          iconmarginstab: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              { previewiconmargins === 'Mobile' && (
                <>
                  <BoxControl 
                    label={__('Search Icon Margin','gutensee-blocks-plus')}
                    values={iconmarginsmob}
                    sides={['top', 'bottom','left','right']}
                    allowReset={false}
                    units={[]}
                    onChange={(newValue) =>
                      setAttributes({
                        ...iconmarginsmob,
                          iconmarginsmob: {
                            top: newValue.top,
                            left: newValue.left,
                            right: newValue.right,
                            bottom: newValue.bottom,
                          },
                      })
                    }
                  />
                </>
              )}
              
              <RadioGroup label="Width" onChange={ setPreviewpaddings } checked={ previewpaddings } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewpaddings === 'Desktop' && (
                <>
                  <BoxControl
                    values={paddings}
                    label={__('Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...paddings,
                            paddings: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewpaddings === 'Tablet' && (
                <>
                  <BoxControl
                    values={paddingstab}
                    label={__('Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...paddingstab,
                            paddingstab: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewpaddings === 'Mobile' && (
                <>
                  <BoxControl
                    values={paddingsmob}
                    label={__('Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...paddingsmob,
                            paddingsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              
              <RadioGroup label="Width" onChange={ setPreviewmenupaddings } checked={ previewmenupaddings } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmenupaddings === 'Desktop' && (
                <>
                  <BoxControl
                    values={menupaddings}
                    label={__('Menu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...menupaddings,
                            menupaddings: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewmenupaddings === 'Tablet' && (
                <>
                  <BoxControl
                    values={menupaddingstab}
                    label={__('Menu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...menupaddingstab,
                            menupaddingstab: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewmenupaddings === 'Mobile' && (
                <>
                  <BoxControl
                    values={menupaddingsmob}
                    label={__('Menu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...menupaddingsmob,
                            menupaddingsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              <RadioGroup label="Width" onChange={ setPreviewsubmenupaddings } checked={ previewsubmenupaddings } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewsubmenupaddings === 'Desktop' && (
                <>
                  <BoxControl
                    values={submenupaddings}
                    label={__('Submenu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...submenupaddings,
                            submenupaddings: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}                          
              { previewsubmenupaddings === 'Tablet' && (
                <>
                  <BoxControl
                    values={submenupaddingstab}
                    label={__('Submenu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...submenupaddingstab,
                            submenupaddingstab: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}                          
              { previewsubmenupaddings === 'Mobile' && (
                <>
                  <BoxControl
                    values={submenupaddingsmob}
                    label={__('Submenu Padding','gutensee-blocks')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...submenupaddingsmob,
                            submenupaddingsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}                          
              <RadioGroup label="Width" onChange={ setPreviewsubmenupaddings } checked={ previewbtnpaddings } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewbtnpaddings === 'Desktop' && (
                <>
                  <BoxControl
                    values={btnpaddings}
                    label={__('Button Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...btnpaddings,
                            btnpaddings: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewbtnpaddings === 'Tablet' && (
                <>
                  <BoxControl
                    values={btnpaddingstabmob}
                    label={__('Button Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...btnpaddingstabmob,
                            btnpaddingstabmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewbtnpaddings === 'Mobile' && (
                <>
                  <BoxControl
                    values={btnpaddingsmob}
                    label={__('Button Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...btnpaddingsmob,
                            btnpaddingsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              <RadioGroup label="Width" onChange={ setPreviewiconpaddings } checked={ previewiconpaddings } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewiconpaddings === 'Desktop' && (
                <>
                  <BoxControl
                    values={iconpaddings}
                    label={__('Search Icon Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...iconpaddings,
                            iconpaddings: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewiconpaddings === 'Tablet' && (
                <>
                  <BoxControl
                    values={iconpaddingstab}
                    label={__('Search Icon Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...iconpaddingstab,
                            iconpaddingstab: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}
              { previewiconpaddings === 'Mobile' && (
                <>
                  <BoxControl
                    values={iconpaddingsmob}
                    label={__('Search Icon Padding','gutensee-blocks-plus')}
                    units={[]}
                    allowReset={false}
                    onChange={(newValue) =>
                      setAttributes({
                          ...iconpaddingsmob,
                            iconpaddingsmob: {
                              top: newValue.top,
                              left: newValue.left,
                              right: newValue.right,
                              bottom: newValue.bottom,
                            },
                      })
                    }
                  />
                </>
              )}              
            </PanelBody>

            <PanelBody initialOpen={false}  title={__('Border','gutensee')} className={'gutensee-panel-edit'}>
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={ colors }
                label={ __( 'Border' ,'gutensee') }
                onChange={(newtext) => setAttributes({ border: newtext })}
                value={ border }
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Border Radius','gutensee')}
                values={ borderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...borderradius,
                        borderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Toggle Border' ,'gutensee-blocks') }
                value={ toggleborder }
                onChange={(newtext) => setAttributes({ toggleborder: newtext })}                                      
              /> 
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Toggle Border Radius','gutensee')}
                values={ toggleborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...toggleborderradius,
                        toggleborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Menu Border' ,'gutensee-blocks') }
                value={ menuborder }
                onChange={(newtext) => setAttributes({ menuborder: newtext })}                                      
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Menu Border Radius','gutensee')}
                values={menuborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...menuborderradius,
                        menuborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={ colors }
                label={ __( 'DropDown Border' ,'gutensee') }
                onChange={(newtext) => setAttributes({ ddborder: newtext })}
                value={ ddborder }
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('DropDown Border Radius','gutensee')}
                values={ddborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...ddborderradius,
                        ddborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Submenu Border' ,'gutensee-blocks') }
                value={ submenuborder }
                onChange={(newtext) => setAttributes({ submenuborder: newtext })}
                                        
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Submenu Border Radius','gutensee')}
                values={submenuborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...submenuborderradius,
                        submenuborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              /> 
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Button Border' ,'gutensee-blocks') }
                value={ btnborder }
                onChange={(newtext) => setAttributes({ btnborder: newtext })}
                                        
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Button Border Radius','gutensee')}
                values={btnborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...btnborderradius,
                        btnborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              /> 
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Search Icon Border' ,'gutensee-blocks') }
                value={ btnborder }
                onChange={(newtext) => setAttributes({ iconborder: newtext })}
                                        
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Search Icon Border Radius','gutensee')}
                values={btnborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...btnborderradius,
                        btnborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              /> 
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Search Form Border' ,'gutensee-blocks') }
                value={ sformborder }
                onChange={(newtext) => setAttributes({ sformborder: newtext })}
                                        
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Search Form Border Radius','gutensee')}
                values={sformborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...sformborderradius,
                        sformborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
              <BorderBoxControl
                className={'gutensee-border-control'}
                colors={colors}
                label={ __( 'Search Button Border' ,'gutensee-blocks') }
                value={ sbtnborder }
                onChange={(newtext) => setAttributes({ sbtnborder: newtext })}
                                        
              />
              <BoxControl
                className={'gutensee-border-radius-control'}
                label={__('Search Button Border Radius','gutensee')}
                values={sbtnborderradius}
                onChange={(newValue) =>
                  setAttributes({
                      ...sbtnborderradius,
                        sbtnborderradius: {
                          top: newValue.top,
                          left: newValue.left,
                          right: newValue.right,
                          bottom: newValue.bottom,
                        },
                  })
                }
              />
            </PanelBody>


            <InputControl
                label={__('Advance ID','gutensee')}
                value={ advid }
                onChange={ (userVal)=> setAttributes({advid:userVal}) }
            />       

            <InputControl
                label={__('Advance Class','gutensee')}
                value={ advclass }
                onChange={ (userVal)=> setAttributes({advclass:userVal}) }
            />

            <label>Custom CSS</label>
              <MonacoEditor
                  height="200px"
                  language="css"
                  value={advcss}
                  onChange={ (userVal)=> setAttributes({advcss:userVal}) }
                  options={{
                      lineNumbers: true,
                      theme: 'vs-light', // You can change to 'vs-dark' or other themes
                  }}
              />


          </div>
          </>
        )} 

        {/* Basic Cont*/}
        {controlType === 'typo' && (
          <>
          <div className="gutensee_block_content_section">
            <PanelBody initialOpen={false}  title={__('Menu','gutensee')} className={'gutensee-panel-edit'}>
             <SelectControl
                label={__(' Font Family','gutensee-blocks')}
                value={ fontfamily }
                options={fontfamilylist}
                onChange={ (newtext) => setAttributes({ fontfamily: newtext }) }
              />
              <RadioGroup label="Width" onChange={ setPreviewmenufontsize } checked={ previewmenufontsize } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmenufontsize === 'Desktop' && (
                <>  
                  <UnitControl
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}                     
                    value={ menufontSize }
                    onChange={(userVal) => setAttributes({
                        menufontSize: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}
              { previewmenufontsize === 'Tablet' && (
                <>  
                  <UnitControl
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}                     
                    value={ menufontSizetab }
                    onChange={(userVal) => setAttributes({
                        menufontSizetab: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}
              { previewmenufontsize === 'Mobile' && (
                <>  
                  <UnitControl
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}                     
                    value={ menufontSizemob }
                    onChange={(userVal) => setAttributes({
                        menufontSizemob: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}

              <SelectControl
                label={__('Font Weight','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ menuFontWeight }
                options={ fontweightslist }
                onChange={ (newtext) => setAttributes({ menuFontWeight: newtext }) }           
              />
              <RadioGroup label="Width" onChange={ setPreviewmenulineheight } checked={ previewmenulineheight } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmenulineheight === 'Desktop' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ menuLineHeight}
                    onChange={(newtext) => setAttributes({ menuLineHeight: newtext })}
                  />
                </>
              )}
              { previewmenulineheight === 'Tablet' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ menuLineHeighttab}
                    onChange={(newtext) => setAttributes({ menuLineHeighttab: newtext })}
                  />
                </>
              )}
              { previewmenulineheight === 'Mobile' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ menuLineHeight}
                    onChange={(newtext) => setAttributes({ menuLineHeight: newtext })}
                  />
                </>
              )}
              <SelectControl
                label={__('Transform','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ menuTransform }
                options={ transformslist }
                onChange={ (newtext) => setAttributes({ menuTransform: newtext }) }            
              />
              <RadioGroup label="Width" onChange={ setPreviewmenuLetterSpacing } checked={ previewmenuLetterSpacing } className={"preview-icon"}>
                  <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                  <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                  <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewmenuLetterSpacing === 'Desktop' && (
                <>                  
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ menuLetterSpacing}
                    onChange={(newtext) => setAttributes({ menuLetterSpacing: newtext })}
                  />
                </>
              )}
              { previewmenuLetterSpacing === 'Tablet' && (
                <>                  
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ menuLetterSpacingtab}
                    onChange={(newtext) => setAttributes({ menuLetterSpacingtab: newtext })}
                  />
                </>
              )}
              { previewmenuLetterSpacing === 'Mobile' && (
                <>                  
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ menuLetterSpacingmob}
                    onChange={(newtext) => setAttributes({ menuLetterSpacingmob: newtext })}
                  />
                </>
              )}
              <SelectControl
                label={__('Decoration ','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ menuDecoration }
                options={ decorationslist }
                onChange={ (newtext) => setAttributes({ menuDecoration: newtext }) }           
              />
            </PanelBody>
            <PanelBody initialOpen={false}  title={__('Sub Menu','gutensee')} className={'gutensee-panel-edit'}>
              <SelectControl
                label={__(' Font Family','gutensee-blocks')}
                value={ submenufontfamily }
                options={fontfamilylist}
                onChange={ (newtext) => setAttributes({ submenufontfamily: newtext }) }
              />
              <RadioGroup label="Width" onChange={ setPreviewsubmenufontsize } checked={ previewsubmenufontsize } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewsubmenufontsize === 'Desktop' && (
                <>  
                  <UnitControl 
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}
                    value={ submenufontSize }
                    onChange={(userVal) => setAttributes({
                        sumenufontSize: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}
              { previewsubmenufontsize === 'Tablet' && (
                <>  
                  <UnitControl 
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}
                    value={ submenufontSizetab }
                    onChange={(userVal) => setAttributes({
                        sumenufontSizetab: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}
              { previewsubmenufontsize === 'Mobile' && (
                <>  
                  <UnitControl 
                    label={__(' Font Size','gutensee')}
                    className={'gutensee-singl'}
                    value={ submenufontSizemob }
                    onChange={(userVal) => setAttributes({
                        sumenufontSizemob: userVal
                      })}
                    allowReset={false}
                  />
                </>
              )}
              <SelectControl
                label={__('Font Weight','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ submenuFontWeight }
                options={ fontweightslist }
                onChange={ (newtext) => setAttributes({ submenuFontWeight: newtext }) }           
              />
              <RadioGroup label="Width" onChange={ setPreviewsubmenulineheight } checked={ previewsubmenulineheight } className={"preview-icon"}>
                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewsubmenulineheight === 'Desktop' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ submenuLineHeight}
                    onChange={(newtext) => setAttributes({ submenuLineHeight: newtext })}
                  />
                </>
              )}
              { previewsubmenulineheight === 'Tablet' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ submenuLineHeighttab}
                    onChange={(newtext) => setAttributes({ submenuLineHeighttab: newtext })}
                  />
                </>
              )}
              { previewsubmenulineheight === 'Mobile' && (
                <>                      
                  <UnitControl 
                    label={__('line Height(px)','gutensee-blocks')}          
                    className={'gutensee-singl'}                     
                    value={ submenuLineHeightmob}
                    onChange={(newtext) => setAttributes({ submenuLineHeightmob: newtext })}
                  />
                </>
              )}
              <SelectControl
                label={__('Transform','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ submenuTransform }
                options={ transformslist }
                onChange={ (newtext) => setAttributes({ submenuTransform: newtext }) }            
              />
              <RadioGroup label="Width" onChange={ setPreviewsubmenuLetterSpacing } checked={ previewsubmenuLetterSpacing } className={"preview-icon"}>
                  <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                  <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                  <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
              </RadioGroup>
              { previewsubmenuLetterSpacing === 'Desktop' && (
                <>
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ submenuLetterSpacing}
                    onChange={(newtext) => setAttributes({ submenuLetterSpacing: newtext })}
                  />
                </>
              )}
              { previewsubmenuLetterSpacing === 'Tablet' && (
                <>
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ submenuLetterSpacingtab}
                    onChange={(newtext) => setAttributes({ submenuLetterSpacingtab: newtext })}
                  />
                </>
              )}
              { previewsubmenuLetterSpacing === 'Mobile' && (
                <>
                  <UnitControl 
                    label={__('Letter Spacing','gutensee-blocks')}         
                    className={'gutensee-singl'}                     
                    value={ submenuLetterSpacingmob}
                    onChange={(newtext) => setAttributes({ submenuLetterSpacingmob: newtext })}
                  />
                </>
              )}
              <SelectControl
                label={__('Decoration ','gutensee-blocks')}
                className={'gutensee-single'}                     
                value={ submenuDecoration }
                options={ decorationslist }
                onChange={ (newtext) => setAttributes({ submenuDecoration: newtext }) }           
              />
            </PanelBody>
            { hidebtn === true && (
              <>
                <PanelBody initialOpen={false}  title={__('Button','gutensee')} className={'gutensee-panel-edit'}>
                  <SelectControl
                    label={__(' Font Family','gutensee-blocks')}
                    value={ btnfontfamily }
                    options={fontfamilylist}
                    onChange={ (newtext) => setAttributes({ btnfontfamily: newtext }) }
                  />
                  <RadioGroup label="Width" onChange={ setPreviewbtnfontsize } checked={ previewbtnfontsize } className={"preview-icon"}>
                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                  </RadioGroup>
                  { previewbtnfontsize === 'Desktop' && (
                    <>  
                      <UnitControl 
                        label={__(' Font Size','gutensee')}
                        className={'gutensee-singl'}
                        value={ btnfontSize }
                        onChange={(userVal) => setAttributes({
                            btnfontSize: userVal
                          })}
                        allowReset={false}
                      />
                    </>
                  )}
                  { previewbtnfontsize === 'Tablet' && (
                    <>  
                      <UnitControl 
                        label={__(' Font Size','gutensee')}
                        className={'gutensee-singl'}
                        value={ btnfontSize }
                        onChange={(userVal) => setAttributes({
                            btnfontSize: userVal
                          })}
                        allowReset={false}
                      />
                    </>
                  )}
                  { previewbtnfontsize === 'Mobile' && (
                    <>  
                      <UnitControl 
                        label={__(' Font Size','gutensee')}
                        className={'gutensee-singl'}
                        value={ btnfontSizemob }
                        onChange={(userVal) => setAttributes({
                            btnfontSizemob: userVal
                          })}
                        allowReset={false}
                      />
                    </>
                  )}
                  <SelectControl
                    label={__('Font Weight','gutensee-blocks')}
                    className={'gutensee-single'}                     
                    value={ btnFontWeight }
                    options={ fontweightslist }
                    onChange={ (newtext) => setAttributes({ btnFontWeight: newtext }) }           
                  />
                  <RadioGroup label="Width" onChange={ setPreviewbtnlineheight } checked={ previewbtnlineheight } className={"preview-icon"}>
                      <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                      <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                      <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                  </RadioGroup>
                  { previewbtnlineheight === 'Desktop' && (
                    <>
                      <UnitControl 
                        label={__('line Height(px)','gutensee-blocks')}          
                        className={'gutensee-singl'}                     
                        value={ btnLineHeight}
                        onChange={(newtext) => setAttributes({ btnLineHeight: newtext })}
                      />
                    </>
                  )}
                  { previewbtnlineheight === 'Tablet' && (
                    <>
                      <UnitControl 
                        label={__('line Height(px)','gutensee-blocks')}          
                        className={'gutensee-singl'}                     
                        value={ btnLineHeighttab}
                        onChange={(newtext) => setAttributes({ btnLineHeighttab: newtext })}
                      />
                    </>
                  )}
                  { previewbtnlineheight === 'Mobile' && (
                    <>
                      <UnitControl 
                        label={__('line Height(px)','gutensee-blocks')}          
                        className={'gutensee-singl'}                     
                        value={ btnLineHeightmob}
                        onChange={(newtext) => setAttributes({ btnLineHeightmob: newtext })}
                      />
                    </>
                  )}
                  <SelectControl
                    label={__('Transform','gutensee-blocks')}
                    className={'gutensee-single'}                     
                    value={ btnTransform }
                    options={ transformslist }
                    onChange={ (newtext) => setAttributes({ btnTransform: newtext }) }            
                  />
                  <RadioGroup label="Width" onChange={ setPreviewbtnLetterSpacing } checked={ previewbtnLetterSpacing } className={"preview-icon"}>
                      <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                      <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                      <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                  </RadioGroup>
                  { previewbtnLetterSpacing === 'Desktop' && (
                    <>                      
                      <UnitControl 
                        label={__('Letter Spacing','gutensee-blocks')}         
                        className={'gutensee-singl'}                     
                        value={ btnLetterSpacing}
                        onChange={(newtext) => setAttributes({ btnLetterSpacing: newtext })}
                      />
                    </>
                  )}
                  { previewbtnLetterSpacing === 'Tablet' && (
                    <>                      
                      <UnitControl 
                        label={__('Letter Spacing','gutensee-blocks')}         
                        className={'gutensee-singl'}                     
                        value={ btnLetterSpacingtab}
                        onChange={(newtext) => setAttributes({ btnLetterSpacingtab: newtext })}
                      />
                    </>
                  )}
                  { previewbtnLetterSpacing === 'Mobile' && (
                    <>                      
                      <UnitControl 
                        label={__('Letter Spacing','gutensee-blocks')}         
                        className={'gutensee-singl'}                     
                        value={ btnLetterSpacingmob}
                        onChange={(newtext) => setAttributes({ btnLetterSpacingmob: newtext })}
                      />
                    </>
                  )}
                  <SelectControl
                    label={__('Decoration ','gutensee-blocks')}
                    className={'gutensee-single'}                     
                    value={ btnDecoration }
                    options={ decorationslist }
                    onChange={ (newtext) => setAttributes({ btnDecoration: newtext }) }           
                  />
                </PanelBody>
              </>
            )}

            { hidesearch === true && (
              <>
                <PanelBody initialOpen={false}  title={__('Search Button','gutensee')} className={'gutensee-panel-edit'}>
                   <SelectControl
                      label={__(' Font Family','gutensee-blocks')}
                      value={ sbtnfontfamily }
                      options={fontfamilylist}
                      onChange={ (newtext) => setAttributes({ sbtnfontfamily: newtext }) }
                    />
                    <RadioGroup label="Width" onChange={ setPreviewsbtnfontsize } checked={ previewsbtnfontsize } className={"preview-icon"}>
                      <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                      <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                      <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                    </RadioGroup>
                    { previewsbtnfontsize === 'Desktop' && (
                      <>  
                        <UnitControl
                          label={__(' Font Size','gutensee')}
                          className={'gutensee-singl'}                     
                          value={ sbtnfontSize }
                          onChange={(userVal) => setAttributes({
                              sbtnfontSize: userVal
                            })}
                          allowReset={false}
                        />
                      </>
                    )}
                    { previewsbtnfontsize === 'Tablet' && (
                      <>  
                        <UnitControl
                          label={__(' Font Size','gutensee')}
                          className={'gutensee-singl'}                     
                          value={ sbtnfontSizetab }
                          onChange={(userVal) => setAttributes({
                              sbtnfontSizetab: userVal
                            })}
                          allowReset={false}
                        />
                      </>
                    )}
                    { previewsbtnfontsize === 'Mobile' && (
                      <>  
                        <UnitControl
                          label={__(' Font Size','gutensee')}
                          className={'gutensee-singl'}                     
                          value={ sbtnfontSizemob }
                          onChange={(userVal) => setAttributes({
                              sbtnfontSizemob: userVal
                            })}
                          allowReset={false}
                        />
                      </>
                    )}
                    <SelectControl
                      label={__('Font Weight','gutensee-blocks')}
                      className={'gutensee-single'}                     
                      value={ sbtnFontWeight }
                      options={ fontweightslist }
                      onChange={ (newtext) => setAttributes({ sbtnFontWeight: newtext }) }           
                    />
                    <RadioGroup label="Width" onChange={ setPreviewsbtnlineheight } checked={ previewsbtnlineheight } className={"preview-icon"}>
                      <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                      <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                      <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                    </RadioGroup>
                    { previewsbtnlineheight === 'Desktop' && (
                      <>                      
                        <UnitControl 
                          label={__('line Height(px)','gutensee-blocks')}          
                          className={'gutensee-singl'}                     
                          value={ sbtnLineHeight}
                          onChange={(newtext) => setAttributes({ sbtnLineHeight: newtext })}
                        />
                      </>
                    )}
                    { previewsbtnlineheight === 'Tablet' && (
                      <>                      
                        <UnitControl 
                          label={__('line Height(px)','gutensee-blocks')}          
                          className={'gutensee-singl'}                     
                          value={ sbtnLineHeighttab}
                          onChange={(newtext) => setAttributes({ sbtnLineHeighttab: newtext })}
                        />
                      </>
                    )}
                    { previewsbtnlineheight === 'Mobile' && (
                      <>                      
                        <UnitControl 
                          label={__('line Height(px)','gutensee-blocks')}          
                          className={'gutensee-singl'}                     
                          value={ sbtnLineHeightmob}
                          onChange={(newtext) => setAttributes({ sbtnLineHeightmob: newtext })}
                        />
                      </>
                    )}
                    <SelectControl
                      label={__('Transform','gutensee-blocks')}
                      className={'gutensee-single'}                     
                      value={ sbtnTransform }
                      options={ transformslist }
                      onChange={ (newtext) => setAttributes({ sbtnTransform: newtext }) }            
                    />
                    <RadioGroup label="Width" onChange={ setPreviewsbtnLetterSpacing } checked={ previewsbtnLetterSpacing } className={"preview-icon"}>
                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                    </RadioGroup>
                    { previewsbtnLetterSpacing === 'Desktop' && (
                      <>                      
                        <UnitControl 
                          label={__('Letter Spacing','gutensee-blocks')}         
                          className={'gutensee-singl'}                     
                          value={ sbtnLetterSpacing}
                          onChange={(newtext) => setAttributes({ sbtnLetterSpacing: newtext })}
                        />
                      </>
                    )}
                    { previewsbtnLetterSpacing === 'Tablet' && (
                      <>                      
                        <UnitControl 
                          label={__('Letter Spacing','gutensee-blocks')}         
                          className={'gutensee-singl'}                     
                          value={ sbtnLetterSpacingtab}
                          onChange={(newtext) => setAttributes({ sbtnLetterSpacingtab: newtext })}
                        />
                      </>
                    )}
                    { previewsbtnLetterSpacing === 'Mobile' && (
                      <>                      
                        <UnitControl 
                          label={__('Letter Spacing','gutensee-blocks')}         
                          className={'gutensee-singl'}                     
                          value={ sbtnLetterSpacingmob}
                          onChange={(newtext) => setAttributes({ sbtnLetterSpacingmob: newtext })}
                        />
                      </>
                    )}
                    <SelectControl
                      label={__('Decoration ','gutensee-blocks')}
                      className={'gutensee-single'}                     
                      value={ sbtnDecoration }
                      options={ decorationslist }
                      onChange={ (newtext) => setAttributes({ sbtnDecoration: newtext }) }           
                    />
                </PanelBody>
              </>
            )}

          </div>
          </>
        )}

      </InspectorControls>
      <div id={advid}>
        {(menuname == 0) ?(
        <>
          <span>No Selected Menu, Please select menu...</span>
        </>
        ):( (menus == null && menuname !=0  ) ? (
          <>
            <button type="button" className={isActive} onClick={invalidateResolver}>
                 Refresh Menu
             </button>
          </>
          ):(
          <>
            <nav className={`gutensee gutensee-block trsprnt-menu ${displayclass} ${advclass}`} role="navigation" >
              <div class="gutensee-container">
                <div class="gutensee-header">
                  <button id={uniqueid01} className={`${'gutensee-toggle'} ${uniqueid} ${toggleposition} ${togglepositiontab} ${togglepositionmob}`} data-toggle="collapse" type="button" aria-controls="menu" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                  </button>
                </div>
                <div className={`${'collapse gutensee-collapse'} ${uniqueid}`} id="custom-collapse">
                  <div className={`${blockclass} ${alignmentClass} ${animationclass}  ${addclass}`} id={uniqueid}>
                    <ul class="nav gutensee-nav gutensee-right" dangerouslySetInnerHTML={{__html: commentcount}} />                
                  </div>
                </div>
              </div>
            </nav>
            <div id={abcdef1}>
            </div>
            <div id={abcdef2}>
            </div>
            <div id={abcdef}>
            </div>
          </>
        )  
        )}   
      </div>
    </Fragment>
  );
};

registerBlockType('gutensee/gutensee-navigation', {
    title:__('Navigation','gutensee-blocks-plus'),
    icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><g stroke="null" id="Layer_1"><title stroke="null">Menu</title><rect stroke="#009999" id="svg_1" height="23.11782" width="22.99285" y="0.41281" x="0.53137" fill-opacity="0" stroke-width="NaN" fill="none"/><line id="svg_6" y2="7.41063" x2="17.43861" y1="7.41063" x1="5.56357" fill-opacity="0" stroke-width="NaN" stroke="#009999" fill="none"/><line id="svg_9" y2="11.59683" x2="17.25116" y1="11.59683" x1="5.37613" fill-opacity="0" stroke-width="NaN" stroke="#009999" fill="none"/><line id="svg_10" y2="15.97047" x2="17.18868" y1="15.97047" x1="5.31365" fill-opacity="0" stroke-width="NaN" stroke="#009999" fill="none"/></g></svg>,
    category:'gutensee',
    example: {
          'attributes' : {
              'mode' : 'preview',
          }
      },
    keywords:['Nav','Menu', 'Gutensee', 'navigation'],
    supports: {
      html: false,
      anchor: true,
    },
    attributes:{
      uniqueid:{
        type:'string'
      },
      controlType:{
        type:'string',
        default:'basic',
      },
      colorType:{
        type:'string',
        default:'normal',
      },
      menuname:{
        type:'string',
        default:'',
      },
      textAlignment:{
        type:'string',
      },
      previewtogglesize:{
        type:'boolean',
        default:'Desktop',
      },
      togglesize:{
        type:'number',
        default:28,
      },
      togglesizetab:{
        type:'number',
        default:28,
      },
      togglesizemob:{
        type:'number',
        default:28,
      },
      previewtogglepos:{
        type:'boolean',
        default:'Desktop',
      },
      toggleposition:{
        type:'string',
        default:'right',
      },
      togglepositiontab:{
        type:'string',
        default:'tab-right',
      },
      togglepositionmob:{
        type:'string',
        default:'mob-right',
      },
      hidebtn:{
        type:'boolean',
        default:true
      },
      hidesearch:{
        type:'boolean',
        default:true
      },
      borderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      border:{
        type: 'object',
          default: {
            color: ' ',
            style: ' ',
            width: '',        
          },
      },
      menuborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      menuborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      submenuborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      submenuborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      btnborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      btnborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      sformborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      sformborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      previewiconWidth:{
        type:'boolean',
        default:'Desktop',
      },
      iconWidth:{
        type:'number',
        default:16,
      },
      iconWidthtab:{
        type:'number',
        default:16,
      },
      iconWidthmob:{
        type:'number',
        default:16,
      },
      iconborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      iconborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      sbtnborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      sbtnborder:{
        type: 'object',
          default: {
            color: '#FC3549',
            style: 'solid',
            width: '1px',        
          },
      },
      ddborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      ddborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      toggleborderradius:{
        type: 'object',
          default: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
            },
      },
      toggleborder:{
        type: 'object',
          default: {
            color: '',
            style: '',
            width: '',        
          },
      },
      hidedesktop:{
        type:'boolean',
        default:true
      },
      hidetablet:{
          type:'boolean',
          default:true
      },
      hidemobile:{
          type:'boolean',
          default:true
      },
      animation:{
          type:'string',
          default:''
      },
      durations:{
          type:'string',
          default:' '
      },
      delay:{
          type:'string',
      },
      boxshadow:{
        type:'boolean',
        default:false
      },    
      hshadow: {
          type: 'number',
          default: 0
      },
      vshadow: {
          type: 'number',
          default: 10
      },
      blurshadow: {
          type: 'number',
          default: 30
      },
      shadowColor:{
          type:'string',
          default:'rgba(0, 0, 0, 0.1)'
      },
      sboxshadow:{
        type:'boolean',
        default:false
      },    
      shshadow: {
          type: 'number',
          default: 0
      },
      svshadow: {
          type: 'number',
          default: 10
      },
      sblurshadow: {
          type: 'number',
          default: 30
      },
      sshadowColor:{
          type:'string',
          default:'rgba(0, 0, 0, 0.1)'
      },
      sbboxshadow:{
        type:'boolean',
        default:false
      },    
      sbhshadow: {
          type: 'number',
          default: 0
      },
      sbvshadow: {
          type: 'number',
          default: 10
      },
      sbblurshadow: {
          type: 'number',
          default: 30
      },
      sbshadowColor:{
          type:'string',
          default:'rgba(0, 0, 0, 0.1)'
      },
      menuColor:{
        type:'string',
        default:'#262626'
      },
      bgColor:{
        type:'string',
        default:'#fff'
      },
      menubgColor:{
        type:'string',
      },
      menubgHColor:{
        type:'string',
      default:'#FC3549'
      },
      ddColor:{
        type:'string',
        default:'#e3e3e3'
      },
      submenuColor:{
        type:'string',
      default:'#262626'
      },
      submenubgColor:{
        type:'string',
      default:'#f6f6f6'
      },
      menuHColor:{
        type:'string',
        default:'#fff',
      },
      bgHColor:{
        type:'string',
      },
      submenuHColor:{
        type:'string',
        default:'#fff'
      },
      submenubgHColor:{
        type:'string',
        default:'#FC3549'
      },
      toggleColor:{
        type:'string',
        default:'#fff'
      },
      togglebgColor:{
        type:'string',
        default:'#FC3549'
      },
      mobbgColor:{
        type:'string',
        default:'#ffffff',
      },
      toggleHColor:{
        type:'string',
        default:'#FC3549'
      },
      togglebgHColor:{
        type:'string',
        default:'#fff'
      },
      activebgColor:{
        type:'string',
        default:'#FC3549'
      },
      activeColor:{
        type:'string',
        default:'#fff'
      },
      activebghColor:{
        type:'string',
      },
      activehColor:{
        type:'string',
      },
      btnColor:{
        type:'string',
         default:'#fff',
      },
      btnhColor:{
        type:'string',
        default:'#fff',
      },
      btnbgColor:{
        type:'string',
        default:'#86A700',
      },
      btnbghColor:{
        type:'string',
         default:'#ff5e14',
      },
      iconbgColor:{
        type:'string',
        default:'#84000D'
      },
      iconColor:{
        type:'string',
        default:'#fff'
      },
      iconbghColor:{
        type:'string',
        default:'#FC3549'
      },
      iconhColor:{
        type:'string',
      },
      sbtnColor:{
        type:'string',
        default:'#fff'
      },
      sbtnbgColor:{
        type:'string',
        default:'#FC3549'
      },
      sbtnbghColor:{
        type:'string',
      },
      sbtnhColor:{
        type:'string',
      },
      fontfamily:{
        type:'string',
        default:'Nunito',
      },
      menuFontWeight:{
        type:'string',
        default:600
      },
      previewmenulineheight:{
        type:'boolean',
        default:'Desktop'
      },      
      menuLineHeight:{
        type:'number',
        default:'30px'
      },      
      menuLineHeighttab:{
        type:'number',
        default:'30px'
      },      
      menuLineHeightmob:{
        type:'number',
        default:'30px'
      },      
      menuTransform:{
        type:'string',
        default:'capitalize',
      },
      menuDecoration:{
        type:'string',
        default:'none',
      },
      previewmenuLetterSpacing:{
        type:'boolean',
        default:'Desktop'
      },      
      menuLetterSpacing:{
        type:'number'
      },
      menuLetterSpacingtab:{
        type:'number'
      },
      menuLetterSpacingmob:{
        type:'number'
      },
      previewmenufontsize:{
        type:'boolean',
        default:'Desktop'
      },      
      menufontSize:{
        type:'string',
        default:'20px'
      },
      menufontSizetab:{
        type:'string',
        default:'20px'
      },
      menufontSizemob:{
        type:'string',
        default:'20px'
      },
      submenufontfamily:{
        type:'string',
        default:'Nunito',
      },
      submenuFontWeight:{
        type:'string',
        default:600
      },
      previewsubmenulineheight:{
        type:'boolean',
        default:'Desktop'
      },       
      submenuLineleight:{
        type:'number',
        default:'30px',
      },      
      submenuLineHeighttab:{
        type:'number',
        default:'30px',
      },      
      submenuLineHeightmob:{
        type:'number',
        default:'30px',
      },      
      submenuTransform:{
        type:'string',
        default:'capitalize'
      },
      submenuDecoration:{
        type:'string',
        default:'none',
      },
      preview:{
        type:'boolean',
        default:'Desktop'
      },          
      submenuLetterSpacing:{
        type:'number',
        default:0.7,
      },
      previewsubmenufontsize:{
        type:'boolean',
        default:'Desktop'
      },      
      submenufontSize:{
        type:'string',
        default:'20px'
      },
      submenufontSizetab:{
        type:'string',
        default:'20px'
      },
      submenufontSizemob:{
        type:'string',
        default:'20px'
      },
      btnfontfamily:{
        type:'string',
        default:'Nunito',
      },
      btnFontWeight:{
        type:'string',
        default:600
      },
      previewbtnlineheight:{
        type:'boolean',
        default:'Desktop'
      },
      btnLineHeight:{
        type:'number',
        default:'30px'
      },      
      btnLineHeighttab:{
        type:'number',
        default:'30px'
      },      
      btnLineHeightmob:{
        type:'number',
        default:'30px'
      },      
      btnTransform:{
        type:'string',
        default:'capitalize'
      },
      btnDecoration:{
        type:'string'
      },
      previewbtnLetterSpacing:{
        type:'boolean',
        default:'Desktop'
      },
      btnLetterSpacing:{
        type:'number'
      },
      btnLetterSpacingtab:{
        type:'number'
      },
      btnLetterSpacingmob:{
        type:'number'
      },
      previewbtnfontsize:{
        type:'boolean',
        default:'Desktop'
      },
      btnfontSize:{
        type:'string',
        default:'20px'
      },
      btnfontSizetab:{
        type:'string',
        default:'20px'
      },
      btnfontSizemob:{
        type:'string',
        default:'20px'
      },
      sbtnfontfamily:{
        type:'string',
        default:'Nunito',
      },
      sbtnFontWeight:{
        type:'string',
        default:600
      },
      previewsbtnlineheight:{
        type:'boolean',
        default:'Desktop'
      },
      sbtnLineHeight:{
        type:'number',
        default:'10px'
      },
      sbtnLineHeighttab:{
        type:'number',
        default:'10px'
      },
      sbtnLineHeightmob:{
        type:'number',
        default:'10px'
      },      
      sbtnTransform:{
        type:'string',
        default:'capitalize'
      },
      sbtnDecoration:{
        type:'string',
        default:'none',
      },
      previewsbtnLetterSpacing:{
        type:'boolean',
        default:'Desktop'
      },
      sbtnLetterSpacing:{
        type:'number',
      },
      sbtnLetterSpacingtab:{
        type:'number',
      },
      sbtnLetterSpacingmob:{
        type:'number',
      },
      previewsbtnfontsize:{
        type:'boolean',
        default:'Desktop'
      },
      sbtnfontSize:{
        type:'string',
        default:'20px',
      },
      sbtnfontSizetab:{
        type:'string',
        default:'20px',
      },
      sbtnfontSizemob:{
        type:'string',
        default:'20px',
      },
      btntext:{
        type:'string',
        default:'Buy Now',
      },
      addclass:{
        type:'string',
      },
      customcss:{
        type:'string',
      },
      previewmargins:{
        type:'boolean',
        default:'Desktop'
      },
      margins:{
        default: {
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px'
        }
      },
      marginstab:{
        default: {
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px'
        }
      },
      marginsmob:{
        default: {
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px'
        }
      },
      previewmenumargins:{
        type:'boolean',
        default:'Desktop'
      },      
      menumargins:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      menumarginstab:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      menumarginsmob:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      previewddmargins:{
        type:'boolean',
        default:'Desktop'
      },      
      ddmargins:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      ddmarginstab:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      ddmarginsmob:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      previewsubmenumargins:{
        type:'boolean',
        default:'Desktop'
      },      
      submenumargins:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      submenumarginstab:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      submenumarginsmob:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      previewbtnmargins:{
        type:'boolean',
        default:'Desktop'
      },      
      btnmargins:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      btnmarginstab:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      btnmarginsmob:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },      
      previewiconmargins:{
        type:'boolean',
        default:'Desktop'
      },      
      iconmargins:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      iconmarginstab:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      iconmarginsmob:{
        default: {
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px'
        }
      },
      previewpaddings:{
        type:'boolean',
        default:'Desktop'
      },      
      paddings:{
        default: {
          top: '15px',
          left: '20px',
          right: '20px',
          bottom: '15px'
        }
      },
      paddingstab:{
        default: {
          top: '15px',
          left: '20px',
          right: '20px',
          bottom: '15px'
        }
      },
      paddingsmob:{
        default: {
          top: '15px',
          left: '20px',
          right: '20px',
          bottom: '15px'
        }
      },
      previewmenupaddings:{
        type:'boolean',
        default:'Desktop'
      },      
      menupaddings:{
        default: {
          top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      menupaddingstab:{
        default: {
          top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      menupaddingsmob:{
        default: {
          top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      previewsubmenupaddings:{
        type:'boolean',
        default:'Desktop'
      },      
      submenupaddings:{
        default: {
         top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      submenupaddingstab:{
        default: {
         top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      submenupaddingsmob:{
        default: {
         top: '10px',
          left: '21px',
          right: '21px',
          bottom: '10px'
        }
      },
      previewbtnpaddings:{
        type:'boolean',
        default:'Desktop'
      },      
      btnpaddings:{
        default: {
          top: '10px',
          left: '33px',
          right: '33px',
          bottom: '10px'
        }
      },
      btnpaddingstab:{
        default: {
          top: '10px',
          left: '33px',
          right: '33px',
          bottom: '10px'
        }
      },
      btnpaddingsmob:{
        default: {
          top: '10px',
          left: '33px',
          right: '33px',
          bottom: '10px'
        }
      },
      previewiconpaddings:{
        type:'boolean',
        default:'Desktop'
      },      
      iconpaddings:{
        default: {
          top: '12px',
          left: '17px',
          right: '17px',
          bottom: '12px'
        }
      },
      iconpaddingstab:{
        default: {
          top: '12px',
          left: '17px',
          right: '17px',
          bottom: '12px'
        }
      },
      iconpaddingsmob:{
        default: {
          top: '12px',
          left: '17px',
          right: '17px',
          bottom: '12px'
        }
      },
      addcss:{
        type:'string',
      },
      addjs:{
        type:'string',
      },
      advid:{
        type:'string',
      },
      advclass:{
        type:'string',
      },
      advcss:{
        type:'string',
      },
    },
    edit:NavigationBlock,
});
