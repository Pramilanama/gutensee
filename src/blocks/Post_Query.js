import {registerBlockType} from "@wordpress/blocks"
import { createElement } from '@wordpress/element';
import { postList as icon, pin, list, grid } from '@wordpress/icons';
const { __, sprintf} = wp.i18n;
import { get, includes, pickBy } from 'lodash';
import classnames from 'classnames';
const { withDispatch, withSelect, useSelect, useDispatch  } = wp.data;
import {colors, dualcolors, gradcolors} from './lib/colors';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { BaseControl, Button,TabPanel, TextareaControl,  __experimentalInputControl as InputControl, FormToggle, PanelBody, Placeholder, QueryControls, RadioControl, RangeControl, Spinner, ToggleControl, ToolbarGroup, SelectControl, TextControl, __experimentalBorderBoxControl as BorderBoxControl,   __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import { dateI18n, format, getSettings } from '@wordpress/date';
import {InspectorControls, PanelColorSettings,FontSizePicker, BlockAlignmentToolbar, BlockControls, __experimentalImageSizeControl as ImageSizeControl, useBlockProps, store as blockEditorStore, ColorPalette, __experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { store as noticeStore } from '@wordpress/notices';
import { useInstanceId } from '@wordpress/compose';
import {Fragment, useEffect } from '@wordpress/element';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from "react-dom";
import React, { Component } from 'react'
const ITEM_TYPE = 'REORDERABLE_ITEM';
import MonacoEditor from '@monaco-editor/react';

const BlockEdit=(props)=>{
    const { attributes, setAttributes, clientId  } = props;
    setAttributes({ uniqueid: 'gutenseepostquery' +clientId.slice(0,8) });
    const {  uniqueid, enableslider, displayAuthor,  reorder, controlType, colorType, poststyle, columnNumber, postgap, textalign, authortype, authorimgwidth, authorimgbr, sortOrder, hidepagination, selectedCategories, postCount, displayContent, excerptLimit, readMoreText, displayTags, displayCat, displayComment, displayDate, displayAuth, disablebtn, buttonlabel, opennewtab, boxshadow, previewmargins, previewfeaturedmargins, previewmetamargins, previewheadingmargins, previewcontentmargins, previewbuttonmargins, previewpaddings, previewfeaturedpaddings, previewmetapaddings, previewheadingpaddings, previewcontentpaddings, previewbuttonpaddings, margins, marginstab, marginsmob, featuredmargins, featuredmarginstab, featuredmarginsmob, metamargins, metamarginstab, metamarginsmob, headingmargins, headingmarginstab, headingmarginsmob, contentmargins, contentmarginstab, contentmarginsmob, buttonmargins, buttonmarginstab, buttonmarginsmob, paddings, paddingstab, paddingsmob, featuredpaddings, featuredpaddingstab, featuredpaddingsmob, metapaddings, metapaddingstab, metapaddingsmob, headingpaddings, headingpaddingstab, headingpaddingsmob, contentpaddings, contentpaddingstab, contentpaddingsmob, buttonpaddings, buttonpaddingstab, buttonpaddingsmob, borderradius, border, featuredborderradius, featuredborder, metaborderradius, metaborder, metagap,  headingborderradius, headingborder, contentborderradius, contentborder, buttonborderradius, buttonborder, previewfontsize, previewmetafontsize, previewcontentfontsize, previewreadmorefontsize, previewlineheight, previewmetalineheight, previewcontentlineheight, previewreadmorelineheight, previewltrspaceing, previewmetaltrspaceing, previewcontentltrspaceing, previewreadmoreltrspaceing, hshadow, vshadow, blurshadow, btnhshadow, btnvshadow, btnblurshadow, hidemobile, hidetablet, hidedesktop, shadowColor, btnshadowColor, animation, durations, delay, postsToShow, order, orderBy, selectedAuthor, displayFeaturedImage, displayTitle, displayPostContentRadio, displayPostContent, displayPostDate, autoplay, bgImageOverlay, bgOverlayColor, bgOverlayOpacity, postLayout, columns, excerptLength, featuredImageAlign, featuredImageSizeSlug, featuredImageSizeWidth, featuredImageSizeHeight, addLinkToFeaturedImage, titleColor, bgColor, bggradientValue, bghColor, bggradienthValue, contentColor, btnColor, btnbgColor, btnbggradientValue, btnbggradienthValue, metaColor, metaiconColor, authorColor, authorhColor, boxBg,  titlehColor, btnhColor, btnbghColor, metahColor, metaiconhColor, llabelfontfamily,llabelfontSize, llabelFontWeight, llabelLineHeight, llabelTransform, llabelDecoration, llabelLetterSpacing, datefontfamily,datefontSize, dateFontWeight, dateLineHeight, dateTransform, dateDecoration, dateLetterSpacing, titlefontfamily, titlefontSize, titlefontSizetab, titlefontSizemob, titleFontWeight, titleLineHeight, titleLineHeighttab, titleLineHeightmob, titleTransform, titleDecoration, titleLetterSpacing, titleLetterSpacingtab, titleLetterSpacingmob, contentfontfamily, contentfontSize, contentfontSizetab, contentfontSizemob, contentFontWeight, contentLineHeight, contentLineHeightmob, contentLineHeighttab, contentTransform, contentDecoration, contentLetterSpacing, contentLetterSpacingtab, contentLetterSpacingmob,  metafontfamily, metafontSize, metafontSizetab, metafontSizemob, metaFontWeight, metaLineHeight, metaLineHeighttab, metaLineHeightmob, metaTransform, metaDecoration, metaLetterSpacing, metaLetterSpacingtab, metaLetterSpacingmob, readmorefontfamily, readmorefontSize, readmorefontSizetab, readmorefontSizemob, readmoreFontWeight, readmoreLineHeight, readmoreLineHeighttab, readmoreLineHeightmob, readmoreTransform, readmoreDecoration, readmoreLetterSpacing, readmoreLetterSpacingtab, readmoreLetterSpacingmob, llabeliconhColor, infiniteloop, enableautoplay, displaynav, displaydots, noitems, noscrollitems, navicon, dotssize, previewnavmargins, navmargins,navmarginstab, navmarginsmob, previewnavpaddings, navpaddings, navpaddingstab, navpaddingsmob, previewdotsmargins, dotsmargins, dotsmarginstab, dotsmarginsmob, previewdotspaddings, dotspaddings, dotspaddingstab, dotspaddingsmob, navborder, navborderradius, dotsborder, dotsborderradius, navColor, navbgColor, navbggradientValue, navhColor, navbghColor, navbggradienthValue, dotsbgColor, activedotsbgColor, addclass, addid, customcss, addcss, advid, advclass, advcss } = attributes;
    const sliderid='postquery'+uniqueid;
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [ commentsCount, setCommentsCount ] = useState();
    useEffect(()=>{
        apiFetch( { path:'/wp/v2/comments' } ).then(
                ( result ) => {             
                     setCommentsCount(result) ;
                })
    },[]);
    const blockProps = useBlockProps( {
        className: classnames( {
            [`${uniqueid}`]:uniqueid,
            'gutensee-plus wp-block-latest-posts__list blog block-row ': true,
            'is-grid': postLayout === 'grid',
            'has-dates': displayPostDate,
            'has-author': displayAuthor,
            [ `hide-desktop` ]:  hidedesktop===false,
            [ `hide-tablet` ]:  hidetablet===false,
            [ `hide-mobile` ]:  hidemobile===false,
            [ `${addclass}` ]:  addclass,           
            [ `wow animated ${attributes.durations}`]: durations,
            [ `wow animated ${attributes.animation}` ]: animation,
            [ `columns-${ columns }` ]: postLayout === 'grid',
        } ),
    } );

    const moveItem = (fromIndex, toIndex) => {
        const newOrder = [...reorder];
        const [movedItem] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, movedItem);
        setAttributes({ reorder: newOrder });
    };

    const DraggableItem = ({ id, index, moveItem, children }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));
    let itemshow;
    if(((poststyle=="list-layout") && (children=='Featured Image')) || ((poststyle=="cover-layout")  && (children=='Featured Image'))){itemshow='none';}else{itemshow='block';}

    return (
        <div class={children} ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', padding: '8px', border: '1px solid #ddd', marginBottom: '4px', display:itemshow }}>
            {children}
        </div>
    );
};

    useEffect(() => {
        apiFetch({ path: '/wp/v2/categories?per_page=100' }).then((categories) => {
            setCategories(categories);
        });
    }, []);

    useEffect(() => {
        const categoryQuery = selectedCategories.length ? `&categories=${selectedCategories.join(',')}` : '';
        if (jQuery('#'+sliderid).hasClass('slick-initialized')) {
            jQuery('#'+sliderid).slick('unslick');
        }
        clearTimeout(devid);
        apiFetch({ path: `/wp/v2/posts?page=${page}&_embed&order=${sortOrder}${categoryQuery}&per_page=${postCount}` }).then((posts) => {
            setPosts(posts);
            setTotalPages(posts._paging.totalPages);
        });
     {devid}
        return () => {
        clearTimeout(devid);
        };
    }, [page, sortOrder, selectedCategories, postCount]);

    const handleCategoryChange = (selected) => {
        setAttributes({ selectedCategories: selected });
    };

    const handlePostCountChange = (value) => {
        setAttributes({ postCount: Number(value) });
        setPage(1); // Reset to the first page when post count changes
    };

    const handleExcerptLimitChange = (value) => {
        setAttributes({ excerptLimit: Number(value) });
    };

    const stripParagraphTags = (content) => {
        return content.replace(/<\/?p[^>]*>/g, '');
    };

    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };

    function setPoststyle(newtext){
        setAttributes({poststyle:newtext});
        if(enableslider==true){
            jQuery('#'+sliderid).slick('unslick');        
            {devid}
            return () => {
            clearTimeout(devid);
            };
        }
        
    }

    function setPreviewmargins(value) {
        setAttributes({previewmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewnavmargins(value) {
        setAttributes({previewnavmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewdotsmargins(value) {
        setAttributes({previewdotsmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewfeaturedmargins(value) {
        setAttributes({previewfeaturedmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewmetamargins(value) {
        setAttributes({previewmetamargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewheadingmargins(value) {
        setAttributes({previewheadingmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewcontentmargins(value) {
        setAttributes({previewcontentmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewbuttonmargins(value) {
        setAttributes({previewbuttonmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewpaddings(value) {
        setAttributes({previewpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewnavpaddings(value) {
        setAttributes({previewnavpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewdotspaddings(value) {
        setAttributes({previewdotspaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewfeaturedpaddings(value) {
        setAttributes({previewfeaturedmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewmetapaddings(value) {
        setAttributes({previewmetapaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewheadingpaddings(value) {
        setAttributes({previewheadingpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewcontentpaddings(value) {
        setAttributes({previewpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewbuttonpaddings(value) {
        setAttributes({previewbuttonpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewfontsize(value) {
        setAttributes({previewfontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewmetafontsize(value) {
        setAttributes({previewmetafontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewcontentfontsize(value) {
        setAttributes({previewcontentfontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewreadmorefontsize(value) {
        setAttributes({previewreadmorefontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewlineheight(value) {
        setAttributes({previewlineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewmetalineheight(value) {
        setAttributes({previewmetalineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewcontentlineheight(value) {
        setAttributes({previewcontentlineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewreadmorelineheight(value) {
        setAttributes({previewreadmorelineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewltrspaceing(value) {
        setAttributes({previewltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewmetaltrspaceing(value) {
        setAttributes({previewmetaltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewcontentltrspaceing(value) {
        setAttributes({previewcontentltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setPreviewreadmoreltrspaceing(value) {
        setAttributes({previewreadmoreltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
    }

    function setOverlayColor(value) {
        setAttributes({bgOverlayColor:value});
    }

    if(metafontfamily !=null){
        let url6 = 'https://fonts.googleapis.com/css2?family='+metafontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link6 = document.createElement('link')
          link6.href = url6;
          link6.rel = "stylesheet";
          link6.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link6);
      }else{
        document.head.appendChild(link6);
      }
    }
    if(titlefontfamily !=null){
        let url3 = 'https://fonts.googleapis.com/css2?family='+titlefontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link3 = document.createElement('link')
          link3.href = url3;
          link3.rel = "stylesheet";
          link3.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link3);
      }else{
        document.head.appendChild(link3);
      }
    }
    if(contentfontfamily !=null){
        let url4 = 'https://fonts.googleapis.com/css2?family='+contentfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link4 = document.createElement('link')
          link4.href = url4;
          link4.rel = "stylesheet";
          link4.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link4);
      }else{
        document.head.appendChild(link4);
      }
    }   
    if(readmorefontfamily !=null){
        let url5 = 'https://fonts.googleapis.com/css2?family='+readmorefontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link5 = document.createElement('link')
          link5.href = url5;
          link5.rel = "stylesheet";
          link5.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link5);
      }else{
        document.head.appendChild(link5);
      }
    }
    const infinites=(infiniteloop===true)?true:false;
    const nav=(displaynav===true)?true:false;
    const dot=(displaydots===true)?true:false;
    const autoplays=(autoplay===true)?true:false;

    let navright='';
    let navleft='';
    if(navicon === 'angle'){
      navleft="fas fa-chevron-left";
      navright="fas fa-chevron-right";
    }
    else if(navicon === 'doubleangle'){
      navleft='fa-solid fa-angles-left';
      navright='fa-solid fa-angles-right';
    }
    else if(navicon === 'arrow'){
      navleft='fa fa-arrow-left';
      navright='fa fa-arrow-right';
    }
    else if(navicon === 'longarrow'){
      navleft='fa fa-arrow-left-long';
      navright='fa fa-arrow-right-long';
    }

    const devid=setTimeout(()=>{
                    jQuery('#'+sliderid).not('.slick-initialized').slick({
                    // Add your desired settings here
                    dots: dot,
                    infinite: infinites,
                    autoplay: autoplays,
                    speed: 300,
                    slidesToShow: noitems,
                    slidesToScroll: noscrollitems,
                    adaptiveHeight: true,
                    arrows:nav,
                    prevArrow: '<button class="slide-nav nav-left '+navleft+'"></button>',
                    nextArrow: '<button class="slide-nav nav-right '+navright+'"></button>',
                    responsive: [
                      {
                        breakpoint: 1025,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                        }
                      },
                      {
                        breakpoint: 769,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1
                        }
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1
                        }
                      }
                    ]
                    });
                },100);

   if (enableslider === true) {
        // Initialize the slider if it's not already initialized
        {devid}
    } else if (enableslider === false) {
        // Ensure the element exists and is initialized before calling unslick
        if (jQuery('#'+sliderid).hasClass('slick-initialized')) {
            jQuery('#'+sliderid).slick('unslick');
        }
        clearTimeout(devid);
    }

    function setNoitems(newtext){
        setAttributes({noitems:newtext});
        if(enableslider==true){
            jQuery('#'+sliderid).slick('unslick');        
            {devid}
            return () => {
            clearTimeout(devid);
            };
        }
    }

    function findOcc(arr, key){
        let rty = 0;    
        arr?.map((x)=>{
            if(x['post'] === key ){ rty++;}
            else{rty;}   
        });
    
        return rty;
    }

    const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
    const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
    const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
    const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

    const navbordertop=(navborder.top != undefined) ? `${navborder.top.width} ${navborder.top.style} ${navborder.top.color}` : null;
    const navborderright=(navborder.right != undefined) ? `${navborder.right.width} ${navborder.right.style} ${navborder.right.color}` : null;
    const navborderbottom=(navborder.bottom != undefined) ? `${navborder.bottom.width} ${navborder.bottom.style} ${navborder.bottom.color}` : null;
    const navborderleft=(navborder.left != undefined) ? `${navborder.left.width} ${navborder.left.style} ${navborder.left.color}` : null;

    const dotsbordertop=(dotsborder.top != undefined) ? `${dotsborder.top.width} ${dotsborder.top.style} ${dotsborder.top.color}` : null;
    const dotsborderright=(dotsborder.right != undefined) ? `${dotsborder.right.width} ${dotsborder.right.style} ${dotsborder.right.color}` : null;
    const dotsborderbottom=(dotsborder.bottom != undefined) ? `${dotsborder.bottom.width} ${dotsborder.bottom.style} ${dotsborder.bottom.color}` : null;
    const dotsborderleft=(dotsborder.left != undefined) ? `${dotsborder.left.width} ${dotsborder.left.style} ${dotsborder.left.color}` : null;

    const featuredbordertop=(featuredborder.top != undefined) ? `${featuredborder.top.width} ${featuredborder.top.style} ${featuredborder.top.color}` : null;
    const featuredborderright=(featuredborder.right != undefined) ? `${featuredborder.right.width} ${featuredborder.right.style} ${featuredborder.right.color}` : null;
    const featuredborderbottom=(featuredborder.bottom != undefined) ? `${featuredborder.bottom.width} ${featuredborder.bottom.style} ${featuredborder.bottom.color}` : null;
    const featuredborderleft=(featuredborder.left != undefined) ? `${featuredborder.left.width} ${featuredborder.left.style} ${featuredborder.left.color}` : null;

    const metabordertop=(metaborder.top != undefined) ? `${metaborder.top.width} ${metaborder.top.style} ${metaborder.top.color}` : null;
    const metaborderright=(metaborder.right != undefined) ? `${metaborder.right.width} ${metaborder.right.style} ${metaborder.right.color}` : null;
    const metaborderbottom=(metaborder.bottom != undefined) ? `${metaborder.bottom.width} ${metaborder.bottom.style} ${metaborder.bottom.color}` : null;
    const metaborderleft=(metaborder.left != undefined) ? `${metaborder.left.width} ${metaborder.left.style} ${metaborder.left.color}` : null;

    const headingbordertop=(headingborder.top != undefined) ? `${headingborder.top.width} ${headingborder.top.style} ${headingborder.top.color}` : null;
    const headingborderright=(headingborder.right != undefined) ? `${headingborder.right.width} ${headingborder.right.style} ${headingborder.right.color}` : null;
    const headingborderbottom=(headingborder.bottom != undefined) ? `${headingborder.bottom.width} ${headingborder.bottom.style} ${headingborder.bottom.color}` : null;
    const headingborderleft=(headingborder.left != undefined) ? `${headingborder.left.width} ${headingborder.left.style} ${headingborder.left.color}` : null;

    const contentbordertop=(contentborder.top != undefined) ? `${contentborder.top.width} ${contentborder.top.style} ${contentborder.top.color}` : null;
    const contentborderright=(contentborder.right != undefined) ? `${contentborder.right.width} ${contentborder.right.style} ${contentborder.right.color}` : null;
    const contentborderbottom=(contentborder.bottom != undefined) ? `${contentborder.bottom.width} ${contentborder.bottom.style} ${contentborder.bottom.color}` : null;
    const contentborderleft=(contentborder.left != undefined) ? `${contentborder.left.width} ${contentborder.left.style} ${contentborder.left.color}` : null;

    const buttonbordertop=(buttonborder.top != undefined) ? `${buttonborder.top.width} ${buttonborder.top.style} ${buttonborder.top.color}` : null;
    const buttonborderright=(buttonborder.right != undefined) ? `${buttonborder.right.width} ${buttonborder.right.style} ${buttonborder.right.color}` : null;
    const buttonborderbottom=(buttonborder.bottom != undefined) ? `${buttonborder.bottom.width} ${buttonborder.bottom.style} ${buttonborder.bottom.color}` : null;
    const buttonborderleft=(buttonborder.left != undefined) ? `${buttonborder.left.width} ${buttonborder.left.style} ${buttonborder.left.color}` : null;

    const { createWarningNotice, removeNotice } = useDispatch( noticeStore );
    let noticeId;
    const showRedirectionPreventedNotice = ( event ) => {
        event.preventDefault();
        // Remove previous warning if any, to show one at a time per block.
        removeNotice( noticeId );
        noticeId = `block-library/core/latest-posts/redirection-prevented/${ instanceId }`;
        createWarningNotice( __( 'Links are disabled in the editor.','gutensee' ), {
            id: noticeId,
            type: 'snackbar',
        } );
    };

    let ColumnClass, Rowclass;
    switch(poststyle){
        case 'grid-layout':
            ColumnClass='block-col-'+columnNumber;
            Rowclass='block-row';
            break;
        case 'list-layout':
            ColumnClass='block-col-12';
            Rowclass='block-row';
            break;
        case 'masonry-layout':
            ColumnClass='masonry-column';
            Rowclass='masonry-row masonry-layout-'+columnNumber;
            break;
        case 'cover-layout':
            ColumnClass='block-col-'+columnNumber;
            Rowclass='block-row';
            break;
        default:
            ColumnClass='block-col-'+columnNumber;
            Rowclass='block-row';
            break;
    }
let postDate;

setAttributes({'addcss':`<style>
                            #${uniqueid}{
                        animation-delay: ${delay}ms;
                    }
                    #${uniqueid} .post{
                        background-color:${bgColor};
                        background-image:${bggradientValue};
                        border: ${border.width} ${border.style} ${border.color};
                        border-top:${bordertop};
                        border-right:${borderright};
                        border-bottom:${borderbottom};
                        border-left:${borderleft};
                        text-align:${textalign};
                        border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
                        margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
                        padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
                        box-shadow: ${vshadow}px ${hshadow}px ${blurshadow}px ${vshadow}px  ${shadowColor};
                        overflow:hidden;
                    }
                    #${uniqueid} .post:hover{
                        background-color:${bghColor};
                        background-image:${bggradienthValue};
                    }
                    #${uniqueid} .post .post-thumbnail{
                        border: ${featuredborder.width} ${featuredborder.style} ${featuredborder.color};
                        border-top:${featuredbordertop};
                        border-right:${featuredborderright};
                        border-bottom:${featuredborderbottom};
                        border-left:${featuredborderleft};
                        border-radius: ${featuredborderradius.top} ${featuredborderradius.right} ${featuredborderradius.bottom} ${featuredborderradius.left};
                        margin: ${featuredmargins.top} ${featuredmargins.right} ${featuredmargins.bottom} ${featuredmargins.left};
                        padding: ${featuredpaddings.top} ${featuredpaddings.right} ${featuredpaddings.bottom} ${featuredpaddings.left};
                        overflow:hidden;
                        font-size: 0;
                    }
                    #${uniqueid} .post .post-meta{
                        color:${metaColor};
                        border: ${metaborder.width} ${metaborder.style} ${metaborder.color};
                        border-top:${metabordertop};
                        border-right:${metaborderright};
                        border-bottom:${metaborderbottom};
                        border-left:${metaborderleft};
                        border-radius: ${metaborderradius.top} ${metaborderradius.right} ${metaborderradius.bottom} ${metaborderradius.left};
                        margin: ${metamargins.top} ${metamargins.right} ${metamargins.bottom} ${metamargins.left};
                        padding: ${metapaddings.top} ${metapaddings.right} ${metapaddings.bottom} ${metapaddings.left};                        
                        gap: ${metagap};
                        flex-wrap: wrap;
                        display: flex;
                    }
                    #${uniqueid} .post .post-meta span a{
                        color:${metaColor};
                        font-family:${metafontfamily};
                        font-size: ${metafontSize};
                        font-weight: ${metaFontWeight};
                        line-height: ${metaLineHeight};
                        text-transform:${metaTransform};
                        text-decoration:${metaDecoration};
                        letter-spacing:${metaLetterSpacing}px;
                    }
                     #${uniqueid} .post .post-meta span:hover i,
                     #${uniqueid} .post .post-meta span:hover a{
                        color:${metahColor};
                    }
                    #${uniqueid} .post .post-meta .author img{
                        width:${authorimgwidth}px;
                        height:auto;
                        border-radius:${authorimgbr};
                    }
                    #${uniqueid} .post header.post-entry-header h3{
                        border: ${headingborder.width} ${headingborder.style} ${headingborder.color};
                        border-top:${headingbordertop};
                        border-right:${headingborderright};
                        border-bottom:${headingborderbottom};
                        border-left:${headingborderleft};
                        border-radius: ${headingborderradius.top} ${headingborderradius.right} ${headingborderradius.bottom} ${headingborderradius.left};
                        margin: ${headingmargins.top} ${headingmargins.right} ${headingmargins.bottom} ${headingmargins.left};
                        padding: ${headingpaddings.top} ${headingpaddings.right} ${headingpaddings.bottom} ${headingpaddings.left};
                    }
                    #${uniqueid} .post header.post-entry-header h3,
                    #${uniqueid} .post header.post-entry-header h3 a{
                        color:${titleColor};
                        font-family:${titlefontfamily};
                        font-size: ${titlefontSize};
                        font-weight: ${titleFontWeight};
                        line-height: ${titleLineHeight};
                        text-transform:${titleTransform};
                        text-decoration:${titleDecoration};
                        letter-spacing:${titleLetterSpacing}px;
                    }
                    #${uniqueid} .post header.post-entry-header h3:hover,
                    #${uniqueid} .post header.post-entry-header h3 a:hover{
                        color:${titlehColor};
                    }
                    #${uniqueid} .post .post-entry-content{
                        color:${contentColor};
                        border: ${contentborder.width} ${contentborder.style} ${contentborder.color};
                        border-top:${contentbordertop};
                        border-right:${contentborderright};
                        border-bottom:${contentborderbottom};
                        border-left:${contentborderleft};
                        border-radius: ${contentborderradius.top} ${contentborderradius.right} ${contentborderradius.bottom} ${contentborderradius.left};
                        margin: ${contentmargins.top} ${contentmargins.right} ${contentmargins.bottom} ${contentmargins.left};
                        padding: ${contentpaddings.top} ${contentpaddings.right} ${contentpaddings.bottom} ${contentpaddings.left};
                    }
                    #${uniqueid} .post .post-entry-content p{
                        font-family:${contentfontfamily};
                        font-size: ${contentfontSize};
                        font-weight: ${contentFontWeight};
                        line-height: ${contentLineHeight};
                        text-transform:${contentTransform};
                        text-decoration:${contentDecoration};
                        letter-spacing:${contentLetterSpacing}px;
                    }
                    #${uniqueid} .post .post-entry-content .more-link{
                        color:${btnColor};
                        background-color:${btnbgColor};
                        background-image:${btnbggradientValue};
                        border: ${buttonborder.width} ${buttonborder.style} ${buttonborder.color};
                        border-top:${buttonbordertop};
                        border-right:${buttonborderright};
                        border-bottom:${buttonborderbottom};
                        border-left:${buttonborderleft};
                        border-radius: ${buttonborderradius.top} ${buttonborderradius.right} ${buttonborderradius.bottom} ${buttonborderradius.left};
                        margin: ${buttonmargins.top} ${buttonmargins.right} ${buttonmargins.bottom} ${buttonmargins.left};
                        padding: ${buttonpaddings.top} ${buttonpaddings.right} ${buttonpaddings.bottom} ${buttonpaddings.left};
                        font-family:${readmorefontfamily};
                        font-size: ${readmorefontSize};
                        font-weight: ${readmoreFontWeight};
                        line-height: ${readmoreLineHeight};
                        text-transform:${readmoreTransform};
                        text-decoration:${readmoreDecoration};
                        letter-spacing:${readmoreLetterSpacing}px;
                        display: inline-block;
                    }              
                     #${uniqueid} .post .post-entry-content .more-link:hover{
                        color:${btnhColor};
                        background-color:${btnbghColor};
                        background-image:${btnbggradienthValue};
                    }  
                    #${uniqueid} button.slide-nav {
                        background-color:${navbgColor};
                        background-image:${navbggradientValue};
                        color:${navColor}
                        border: ${navborder.width} ${navborder.style} ${navborder.color};
                        border-top:${navbordertop};
                        border-right:${navborderright};
                        border-bottom:${navborderbottom};
                        border-left:${navborderleft};
                        border-radius: ${navborderradius.top} ${navborderradius.right} ${navborderradius.bottom} ${navborderradius.left};
                        margin: ${navmargins.top} ${navmargins.right} ${navmargins.bottom} ${navmargins.left};
                        padding: ${navpaddings.top} ${navpaddings.right} ${navpaddings.bottom} ${navpaddings.left};                            
                    }
                    #${uniqueid} button.slide-nav:hover {
                        background-color:${navbghColor};
                        background-image:${navbggradienthValue};
                        color:${navhColor}                         
                    }
                    #${uniqueid} .slick-dots li button{
                        background: ${dotsbgColor};
                        width: ${dotssize};
                        height: ${dotssize};
                        border: ${dotsborder.width} ${dotsborder.style} ${dotsborder.color};
                        border-top:${dotsbordertop};
                        border-right:${dotsborderright};
                        border-bottom:${dotsborderbottom};
                        border-left:${dotsborderleft};
                        border-radius: ${dotsborderradius.top} ${dotsborderradius.right} ${dotsborderradius.bottom} ${dotsborderradius.left};
                        margin: ${dotsmargins.top} ${dotsmargins.right} ${dotsmargins.bottom} ${dotsmargins.left};
                        padding: ${dotspaddings.top} ${dotspaddings.right} ${dotspaddings.bottom} ${dotspaddings.left};
                    }   
                    #${uniqueid} .masonry-row{
                      gap: ${postgap}px;
                    }
                    @media (max-width:1024px){
                        #${uniqueid} .post{
                            margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
                            padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};
                        }
                        #${uniqueid} .post .post-thumbnail{
                            margin: ${featuredmarginstab.top} ${featuredmarginstab.right} ${featuredmarginstab.bottom} ${featuredmarginstab.left};
                            padding: ${featuredpaddingstab.top} ${featuredpaddingstab.right} ${featuredpaddingstab.bottom} ${featuredpaddingstab.left};
                        }
                        #${uniqueid} .post .post-meta{
                            margin: ${metamarginstab.top} ${metamarginstab.right} ${metamarginstab.bottom} ${metamarginstab.left};
                            padding: ${metapaddingstab.top} ${metapaddingstab.right} ${metapaddingstab.bottom} ${metapaddingstab.left};          
                        }
                        #${uniqueid} .post .post-meta span a{
                            font-size: ${metafontSizetab};
                            line-height: ${metaLineHeighttab};
                            letter-spacing:${metaLetterSpacingtab}px;
                        }
                        #${uniqueid} .post header.post-entry-header{
                            margin: ${headingmarginstab.top} ${headingmarginstab.right} ${headingmarginstab.bottom} ${headingmarginstab.left};
                            padding: ${headingpaddingstab.top} ${headingpaddingstab.right} ${headingpaddingstab.bottom} ${headingpaddingstab.left};
                        }
                        #${uniqueid} .post header.post-entry-header h3,
                        #${uniqueid} .post header.post-entry-header h3 a{
                            font-size: ${titlefontSizetab};
                            line-height: ${titleLineHeighttab};
                            letter-spacing:${titleLetterSpacingtab}px;
                        }
                        #${uniqueid} .post .post-entry-content{
                            margin: ${contentmarginstab.top} ${contentmarginstab.right} ${contentmarginstab.bottom} ${contentmarginstab.left};
                            padding: ${contentpaddingstab.top} ${contentpaddingstab.right} ${contentpaddingstab.bottom} ${contentpaddingstab.left};
                        }
                        #${uniqueid} .post .post-entry-content p{
                            font-size: ${contentfontSizetab};
                            line-height: ${contentLineHeighttab};
                            letter-spacing:${contentLetterSpacingtab}px;
                        }
                        #${uniqueid} .post .post-entry-content .more-link{
                            margin: ${buttonmarginstab.top} ${buttonmarginstab.right} ${buttonmarginstab.bottom} ${buttonmarginstab.left};
                            padding: ${buttonpaddingstab.top} ${buttonpaddingstab.right} ${buttonpaddingstab.bottom} ${buttonpaddingstab.left};                        
                            font-size: ${readmorefontSizetab};
                            line-height: ${readmoreLineHeighttab};
                            letter-spacing:${readmoreLetterSpacingtab}px;
                        }
                        #${uniqueid} button.slide-nav {
                            margin: ${navmarginstab.top} ${navmarginstab.right} ${navmarginstab.bottom} ${navmarginstab.left};
                            padding: ${navpaddingstab.top} ${navpaddingstab.right} ${navpaddingstab.bottom} ${navpaddingstab.left};                            
                        }
                        #${uniqueid} .slick-dots li button{
                            width: ${dotssize};
                            height: ${dotssize};
                            margin: ${dotsmarginstab.top} ${dotsmarginstab.right} ${dotsmarginstab.bottom} ${dotsmarginstab.left};
                            padding: ${dotspaddingstab.top} ${dotspaddingstab.right} ${dotspaddingstab.bottom} ${dotspaddingstab.left};
                        }                                   
                    }
                    @media (max-width:767px){
                        #${uniqueid} .post{
                            margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
                            padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};
                        }
                        #${uniqueid} .post .post-thumbnail{
                            margin: ${featuredmarginsmob.top} ${featuredmarginsmob.right} ${featuredmarginsmob.bottom} ${featuredmarginsmob.left};
                            padding: ${featuredpaddingsmob.top} ${featuredpaddingsmob.right} ${featuredpaddingsmob.bottom} ${featuredpaddingsmob.left};
                        }
                        #${uniqueid} .post .post-meta{
                            margin: ${metamarginsmob.top} ${metamarginsmob.right} ${metamarginsmob.bottom} ${metamarginsmob.left};
                            padding: ${metapaddingsmob.top} ${metapaddingsmob.right} ${metapaddingsmob.bottom} ${metapaddingsmob.left};          
                        }
                        #${uniqueid} .post .post-meta span a{
                            font-size: ${metafontSizemob};
                            line-height: ${metaLineHeightmob};
                            letter-spacing:${metaLetterSpacingmob}px;
                        }
                        #${uniqueid} .post header.post-entry-header{
                            margin: ${headingmarginsmob.top} ${headingmarginsmob.right} ${headingmarginsmob.bottom} ${headingmarginsmob.left};
                            padding: ${headingpaddingsmob.top} ${headingpaddingsmob.right} ${headingpaddingsmob.bottom} ${headingpaddingsmob.left};
                        }
                        #${uniqueid} .post header.post-entry-header h3,
                        #${uniqueid} .post header.post-entry-header h3 a{
                            font-size: ${titlefontSizemob};
                            line-height: ${titleLineHeightmob};
                            letter-spacing:${titleLetterSpacingmob}px;
                        }
                        #${uniqueid} .post .post-entry-content{
                            margin: ${contentmarginsmob.top} ${contentmarginsmob.right} ${contentmarginsmob.bottom} ${contentmarginsmob.left};
                            padding: ${contentpaddingsmob.top} ${contentpaddingsmob.right} ${contentpaddingsmob.bottom} ${contentpaddingsmob.left};
                        }
                        #${uniqueid} .post .post-entry-content p{
                            font-size: ${contentfontSizemob};
                            line-height: ${contentLineHeightmob};
                            letter-spacing:${contentLetterSpacingmob}px;
                        }
                        #${uniqueid} .post .post-entry-content .more-link{
                            margin: ${buttonmarginsmob.top} ${buttonmarginsmob.right} ${buttonmarginsmob.bottom} ${buttonmarginsmob.left};
                            padding: ${buttonpaddingsmob.top} ${buttonpaddingsmob.right} ${buttonpaddingsmob.bottom} ${buttonpaddingsmob.left};                        
                            font-size: ${readmorefontSizemob};
                            line-height: ${readmoreLineHeightmob};
                            letter-spacing:${readmoreLetterSpacingmob}px;
                        }
                        #${uniqueid} button.slide-nav {
                            margin: ${navmarginsmob.top} ${navmarginsmob.right} ${navmarginsmob.bottom} ${navmarginsmob.left};
                            padding: ${navpaddingsmob.top} ${navpaddingsmob.right} ${navpaddingsmob.bottom} ${navpaddingsmob.left};                            
                        }
                        #${uniqueid} .slick-dots li button{
                            width: ${dotssize};
                            height: ${dotssize};
                            margin: ${dotsmarginsmob.top} ${dotsmarginsmob.right} ${dotsmarginsmob.bottom} ${dotsmarginsmob.left};
                            padding: ${dotspaddingsmob.top} ${dotspaddingsmob.right} ${dotspaddingsmob.bottom} ${dotspaddingsmob.left};
                        }   
                    }   
                    ${customcss}</style>`});
     setAttributes({'addjs':`<script>
                                    var ${uniqueid}urlmeta = 'https://fonts.googleapis.com/css2?family=${metafontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap';
                                    var ${uniqueid}linkmeta = document.createElement('link');
                                    ${uniqueid}linkmeta.href = ${uniqueid}urlmeta;
                                    ${uniqueid}linkmeta.rel = "stylesheet";
                                    ${uniqueid}linkmeta.type =  "text/css";             
                                    document.head.appendChild(${uniqueid}linkmeta);

                                    var url13 = 'https://fonts.googleapis.com/css2?family=${titlefontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap';
                                    var link13 = document.createElement('link');
                                    link13.href = url13;
                                    link13.rel = "stylesheet";
                                    link13.type =  "text/css";             
                                    document.head.appendChild(link13);

                                    var url4 = "https://fonts.googleapis.com/css2?family=${contentfontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                                    var link4 = document.createElement("link");
                                    link4.href = url4;
                                    link4.rel = "stylesheet";
                                    link4.type =  "text/css";             
                                    document.head.appendChild(link4);

                                    var url5 = "https://fonts.googleapis.com/css2?family=${readmorefontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                                    var link5 = document.createElement("link");
                                    link5.href = url5;
                                    link5.rel = "stylesheet";
                                    link5.type =  "text/css";             
                                    document.head.appendChild(link5);

                                    var infinites=(${infiniteloop}===true)?true:false;
                                    var nav=(${displaynav}===true)?true:false;
                                    var dot=(${displaydots}===true)?true:false;
                                    var autoplays=(${autoplay}===true)?true:false;

                                    

                                   jQuery(document).ready(function($) {
                                   if (${enableslider} === true) {
                                    setTimeout(()=>{
                                                    jQuery('.single-item.${uniqueid}').not('.slick-initialized').slick({
                                                    // Add your desired settings here
                                                    dots: dot,
                                                    infinite: infinites,
                                                    autoplay: autoplays,
                                                    speed: 300,
                                                    slidesToShow: ${noitems},
                                                    slidesToScroll: ${noscrollitems},
                                                    adaptiveHeight: true,
                                                    arrows:nav,
                                                    prevArrow: '<button class="slide-nav nav-left ${navleft}"></button>',
                                                    nextArrow: '<button class="slide-nav nav-right ${navright}"></button>',
                                                    responsive: [
                                                      {
                                                        breakpoint: 1025,
                                                        settings: {
                                                          slidesToShow: 3,
                                                          slidesToScroll: 1,
                                                        }
                                                      },
                                                      {
                                                        breakpoint: 769,
                                                        settings: {
                                                          slidesToShow: 2,
                                                          slidesToScroll: 1
                                                        }
                                                      },
                                                      {
                                                        breakpoint: 600,
                                                        settings: {
                                                          slidesToShow: 1,
                                                          slidesToScroll: 1
                                                        }
                                                      }
                                                    ]
                                                    });
                                                },100);
                                } else if (${enableslider} === false) {
                                    if (jQuery('.single-item.${uniqueid}').hasClass('slick-initialized')) {
                                        jQuery('.single-item.${uniqueid}').slick('unslick');
                                    }
                                    clearTimeout();
                                }
});
                                </script>`
                });

    return (
        <>  
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
                {controlType === 'basic' && (
                <>
                    <div className="gutensee_block_content_section">                   

                        <ToggleControl
                            label={ __( 'Enable/Disable Slider','gutensee' ) }
                            checked={ enableslider }
                            onChange={ ( value ) =>
                                setAttributes( { enableslider: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable featured image','gutensee' ) }
                            checked={ displayFeaturedImage }
                            onChange={ ( value ) =>
                                setAttributes( { displayFeaturedImage: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable Post Title','gutensee' ) }
                            checked={ displayTitle }
                            onChange={ ( value ) =>
                                setAttributes( { displayTitle: value } )
                            }
                        />
                        <ToggleControl
                            label={__('Enable/Disable Pagination','gutensee')}
                            checked={hidepagination}
                            onChange={(value) => setAttributes({ hidepagination: value })}
                        />                        
                        <SelectControl
                            label={__('Style','gutensee')}
                            value={ poststyle }
                            options={ [
                                { label: __('Grid View ','gutensee'), value: 'grid-layout' },
                                { label: __('List View ','gutensee'), value: 'list-layout' },
                                { label: __('Masonry View','gutensee'), value: 'masonry-layout' },
                                { label: __('Cover View','gutensee'), value: 'cover-layout' },
                            ] }
                            onChange={ setPoststyle }                    
                        />
                        { enableslider == false && (
                            <>
                            { poststyle !='list-layout' && ( 
                                <>
                                    <SelectControl
                                        label={__('Columns','gutensee')}
                                        value={ columnNumber }
                                        options={ [
                                            { label: __('2 Columns','gutensee'), value: '6' },
                                            { label: __('3 Columns ','gutensee'), value: '4' },
                                            { label: __('4 Columns','gutensee'), value: '3' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ columnNumber: newtext }) }                    
                                    />
                                </>
                            )}
                            </>
                        )}
                        { (enableslider == false) && (poststyle==='masonry-layout') && ( 
                            <TextControl
                                label={__('Gap','gutensee')}
                                value={ postgap }
                                type={"number"}
                                onChange={ (newtext) => setAttributes({ postgap: newtext }) }                    
                            />
                        )}
                        <SelectControl
                            label={__('Text Align','gutensee')}
                            value={ textalign }
                            options={ [
                                { label: __('Left','gutensee'), value: 'left' },
                                { label: __('Center','gutensee'), value: 'center' },
                                { label: __('Right','gutensee'), value: 'right' },
                            ] }
                            onChange={ (newtext) => setAttributes({ textalign: newtext }) }                      
                        />

                        <SelectControl
                            label={__('Author Type','gutensee')}
                            value={ authortype }
                            options={ [
                                { label: __('Image','gutensee'), value: 'image' },
                                { label: __('Icon','gutensee'), value: 'icon' },                    
                            ] }
                            onChange={ (newtext) => setAttributes({ authortype: newtext }) }                      
                        />

                        { authortype == 'image' && ( 
                            <>
                                <RangeControl 
                                    label={ __('Author Image Width(px)','gutensee') }               
                                    value={ authorimgwidth}
                                    onChange={(newtext) => setAttributes({ authorimgwidth: newtext })}
                                    min={0}
                                    max={200}
                                />

                                <SelectControl
                                    label={__('Author Style','gutensee')}
                                    value={ authorimgbr }
                                    options={ [
                                        { label: __('Square','gutensee'), value: '0' },
                                        { label: __('Circle','gutensee'), value: '50%' },                    
                                    ] }
                                    onChange={ (newtext) => setAttributes({ authorimgbr: newtext }) }                      
                                />
                            </>
                            
                        )}

                        <PanelBody initialOpen={false}  title={__('Post Content','gutensee')} className={'gutensee-panel-edit'}>                            
                            <ToggleControl
                                label={ __( 'Enable/Disable Post content','gutensee' ) }
                                checked={ displayPostContent }
                                onChange={ ( value ) =>
                                    setAttributes( { displayPostContent: value } )
                                }
                            />
                            <SelectControl
                                label="Sort Order"
                                value={sortOrder}
                                options={[
                                    { label: 'Newest to Oldest', value: 'desc' },
                                    { label: 'Oldest to Newest', value: 'asc' },
                                ]}
                                onChange={(value) => setAttributes({ sortOrder: value })}
                            />                
                            <SelectControl
                                multiple
                                label="Categories"
                                value={selectedCategories}
                                options={categories.map((category) => ({
                                    label: category.name,
                                    value: category.id,
                                }))}
                                onChange={handleCategoryChange}
                            />
                            <TextControl
                                label="Number of Posts"
                                type="number"
                                value={postCount}
                                onChange={handlePostCountChange}
                            />
                            <ToggleControl
                                label="Display Full Content"
                                checked={displayContent}
                                onChange={(value) => setAttributes({ displayContent: value })}
                            />
                            {!displayContent && (
                                <TextControl
                                    label="Excerpt Word Limit"
                                    type="number"
                                    value={excerptLimit}
                                    onChange={handleExcerptLimitChange}
                                />
                            )}
                            <TextControl
                                label="Read More Button Text"
                                value={readMoreText}
                                onChange={(value) => setAttributes({ readMoreText: value })}
                            />
                        </PanelBody>

                        <PanelBody initialOpen={false}  title={__('Post Meta','gutensee')} className={'gutensee-panel-edit'}>
                                                    
                            <ToggleControl
                                label={ __( 'Enable/Disable post date','gutensee' ) }
                                checked={ displayDate }
                                onChange={ ( value ) =>
                                    setAttributes( { displayDate: value } )
                                }
                            />                  
                            <ToggleControl
                                label={ __( 'Enable/Disable author name','gutensee' ) }
                                checked={ displayAuthor }
                                onChange={ ( value ) =>
                                    setAttributes( { displayAuthor: value } )
                                }
                            />
                            <ToggleControl
                                label={ __( 'Enable/Disable Comment Count','gutensee' ) }
                                checked={ displayComment }
                                onChange={ ( value ) =>
                                    setAttributes( { displayComment: value } )
                                }
                            />
                            <ToggleControl
                                label={ __( 'Enable/Disable Categories','gutensee' ) }
                                checked={ displayCat }
                                onChange={ ( value ) =>
                                    setAttributes( { displayCat: value } )
                                }
                            />
                            <ToggleControl
                                label="Display Post Tags"
                                checked={displayTags}
                                onChange={(value) => setAttributes({ displayTags: value })}
                            />

                        </PanelBody>

                        <PanelBody initialOpen={false}  title={__('Reorder','gutensee')} className={'gutensee-panel-edit gutensee-drag-item'}>
                            <DndProvider backend={HTML5Backend} >
                                {reorder.map((field, index) => (
                                    <DraggableItem key={field} id={field} index={index} moveItem={moveItem}>
                                        {field}
                                    </DraggableItem>
                                ))}
                            </DndProvider>
                        </PanelBody>

                        { enableslider == true && ( 
                            <>
                                <PanelBody initialOpen={false}  title={__('Slider Settings','gutensee')} className={'gutensee-panel-edit'}>
                                    <ToggleControl
                                        label={ __( 'Enable/Disable infinite Loop','gutensee' ) }
                                        checked={ infiniteloop }
                                        onChange={ ( value ) =>
                                            setAttributes( { infiniteloop: value } )
                                        }
                                    />
                                    <ToggleControl
                                        label={ __( 'Enable/Disable Autoplay','gutensee' ) }
                                        checked={ enableautoplay }
                                        onChange={ ( value ) =>
                                            setAttributes( { enableautoplay: value } )
                                        }
                                    />
                                    <ToggleControl
                                        label={ __( 'Enable/Disable Navigation','gutensee' ) }
                                        checked={ displaynav }
                                        onChange={ ( value ) =>
                                            setAttributes( { displaynav: value } )
                                        }
                                    />
                                    <ToggleControl
                                        label={ __( 'Enable/Disable Dots','gutensee' ) }
                                        checked={ displaydots }
                                        onChange={ ( value ) =>
                                            setAttributes( { displaydots: value } )
                                        }
                                    />
                                    <TextControl
                                        type={"number"}
                                        label={__('Number of Items','gutensee')}               
                                        value={noitems}
                                        onChange={setNoitems}
                                        min={1}
                                    />
                                    <TextControl
                                        type={"number"}
                                        label={__('Number of Scroll Items','gutensee')}               
                                        value={noscrollitems}
                                        onChange={(newtext) => setAttributes({ noscrollitems: newtext })}
                                        min={1}
                                    />
                                    <SelectControl
                                        label={__('Nav Icon','gutensee')}
                                        value={ navicon }
                                        options={ [
                                            { label: __('Arrow','gutensee'), value: 'arrow' },
                                            { label: __('Long Arrow','gutensee'), value: 'longarrow' },
                                            { label: __('Right Angle','gutensee'), value: 'angle' },
                                            { label: __('Double Angle','gutensee'), value: 'doubleangle' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ navicon: newtext }) }                      
                                    />
                                    <TextControl
                                        type={"number"}
                                        label={__('Dots size','gutensee')}               
                                        value={dotssize}
                                        onChange={(newtext) => setAttributes({ dotssize: newtext })}
                                        min={1}
                                    />
                                    
                                </PanelBody>
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
                            )
                        }
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

                {/* Style Control*/}
                {controlType === 'style' && (
                    <>
                        <div className="gutensee_block_content_section">

                        <PanelBody initialOpen={false}  title={__('Color','gutensee')} className={'gutensee-panel-edit gutensee-button-dual-color'}>
                            <div className="gutensee_block_controlType_flex_panel">
                                <div className="gutensee_block_main_section_panel">                    
                                    <Button isSmall={true} isPressed={colorType === 'normal'} onClick={() => setAttributes({colorType: 'normal',})} >
                                        Normal
                                    </Button>
                                    
                                    <Button isSmall={true} isPressed={colorType === 'hover'} onClick={() => setAttributes({colorType: 'hover',})}>
                                        Hover
                                    </Button>

                                </div>
                            </div>

                            {/* Normal Color*/}
                            {colorType === 'normal' && (
                                <>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Background','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                        <PanelColorGradientSettings className="gutensee-color-gradient"
                                            settings={ [
                                                {
                                                    colorValue: attributes.bgColor,
                                                    gradientValue: attributes.bggradientValue,
                                                    colors:dualcolors,
                                                    gradients:gradcolors,
                                                    label:__("Background"),
                                                    onColorChange:(newValue) => setAttributes({bgColor: newValue }),
                                                    onGradientChange:(newValue) => setAttributes({bggradientValue: newValue }),
                                                },
                                            ] }
                                        />
                                    </div>
                                </div>
                                {enableslider === true && (
                                    <>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Nav Icon','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel">                     
                                                <ColorPalette
                                                    className={'gutensee-color'}
                                                    title={ __('Nav Icon','gutensee')}
                                                    value={ navColor }
                                                    onChange={ (newtext) => setAttributes({ navColor: newtext }) }
                                                />
                                            </div>
                                        </div>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Nav Icon Background','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                                <PanelColorGradientSettings className="gutensee-color-gradient"
                                                    settings={ [
                                                        {
                                                            colorValue: attributes.navbgColor,
                                                            gradientValue: attributes.navbggradientValue,
                                                            colors:dualcolors,
                                                            gradients:gradcolors,
                                                            label:__("Nav Background"),
                                                            onColorChange:(newValue) => setAttributes({navbgColor: newValue }),
                                                            onGradientChange:(newValue) => setAttributes({navbggradientValue: newValue }),
                                                        },
                                                    ] }
                                                />
                                            </div>
                                        </div>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Dots Background','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel">                     
                                                <ColorPalette
                                                    className={'gutensee-color'}
                                                    title={ __('Dots Background','gutensee')}
                                                    value={ dotsbgColor }
                                                    onChange={ (newtext) => setAttributes({ dotsbgColor: newtext }) }
                                                />
                                            </div>
                                        </div>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Active Dots Background','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel">                     
                                                <ColorPalette
                                                    className={'gutensee-color'}
                                                    title={ __('Active Dots Background','gutensee')}
                                                    value={ activedotsbgColor }
                                                    onChange={ (newtext) => setAttributes({ activedotsbgColor: newtext }) }
                                                />
                                            </div>
                                        </div>  
                                    </>
                                )}                         
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Meta','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                        <ColorPalette
                                            className={'gutensee-color'}
                                            title={ __('Meta','gutensee')}
                                            value={ metaColor }
                                            onChange={ (newtext) => setAttributes({ metaColor: newtext }) }
                                        />
                                    </div>
                                </div>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Title','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                        <ColorPalette
                                            className={'gutensee-color'}
                                            title={ __('Title','gutensee')}
                                            value={ titleColor }
                                            onChange={ (newtext) => setAttributes({ titleColor: newtext }) }
                                        />
                                    </div>
                                </div>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Content','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                        <ColorPalette
                                            className={'gutensee-color'}
                                            title={ __('Content','gutensee')}
                                            value={ contentColor }
                                            onChange={ (newtext) => setAttributes({ contentColor: newtext }) }
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
                                            onChange={ (newtext) => setAttributes({ btnColor: newtext }) }
                                        />
                                    </div>
                                </div>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Button Background','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                        <PanelColorGradientSettings className="gutensee-color-gradient"
                                            settings={ [
                                                {
                                                    colorValue: attributes.btnbgColor,
                                                    gradientValue: attributes.btnbggradientValue,
                                                    colors:dualcolors,
                                                    gradients:gradcolors,
                                                    label:__("Button Background"),
                                                    onColorChange:(newValue) => setAttributes({btnbgColor: newValue }),
                                                    onGradientChange:(newValue) => setAttributes({btnbggradientValue: newValue }),
                                                },
                                            ] }
                                        />
                                    </div>
                                </div>                          
                                </>
                            )}

                            {/* Hover Color*/}
                            {colorType === 'hover' && (
                                <>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Background','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                        <PanelColorGradientSettings className="gutensee-color-gradient"
                                            settings={ [
                                                {
                                                    colorValue: attributes.bghColor,
                                                    gradientValue: attributes.bggradienthValue,
                                                    colors:dualcolors,
                                                    gradients:gradcolors,
                                                    label:__("Background"),
                                                    onColorChange:(newValue) => setAttributes({bghColor: newValue }),
                                                    onGradientChange:(newValue) => setAttributes({bggradienthValue: newValue }),
                                                },
                                            ] }
                                        />
                                    </div>
                                </div>
                                {enableslider === true && (
                                    <>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Nav Icon','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel">                     
                                                <ColorPalette
                                                    className={'gutensee-color'}
                                                    title={ __('Nav Icon','gutensee')}
                                                    value={ navhColor }
                                                    onChange={ (newtext) => setAttributes({ navhColor: newtext }) }
                                                />
                                            </div>
                                        </div>
                                        <div className="gutensee_block_section_flex_panel">
                                            <p className="gutensee_block_section_panel_label">
                                                { __('Nav Icon Background','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                                <PanelColorGradientSettings className="gutensee-color-gradient"
                                                    settings={ [
                                                        {
                                                            colorValue: attributes.navbghColor,
                                                            gradientValue: attributes.navbggradienthValue,
                                                            colors:dualcolors,
                                                            gradients:gradcolors,
                                                            label:__("Nav Background"),
                                                            onColorChange:(newValue) => setAttributes({navbghColor: newValue }),
                                                            onGradientChange:(newValue) => setAttributes({navbggradienthValue: newValue }),
                                                        },
                                                    ] }
                                                />
                                            </div>
                                        </div>    
                                    </>
                                )}                      
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Meta','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                        <ColorPalette
                                            className={'gutensee-color'}
                                            title={ __('Meta','gutensee')}
                                            value={ metahColor }
                                            onChange={ (newtext) => setAttributes({ metahColor: newtext }) }
                                        />
                                    </div>
                                </div>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Title','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                        <ColorPalette
                                            className={'gutensee-color'}
                                            title={ __('Title','gutensee')}
                                            value={ titlehColor }
                                            onChange={ (newtext) => setAttributes({ titlehColor: newtext }) }
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
                                            onChange={ (newtext) => setAttributes({ btnhColor: newtext }) }
                                        />
                                    </div>
                                </div>
                                <div className="gutensee_block_section_flex_panel">
                                    <p className="gutensee_block_section_panel_label">
                                        { __('Button Background','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                        <PanelColorGradientSettings className="gutensee-color-gradient"
                                            settings={ [
                                                {
                                                    colorValue: attributes.btnbghColor,
                                                    gradientValue: attributes.btnbggradienthValue,
                                                    colors:dualcolors,
                                                    gradients:gradcolors,
                                                    label:__("Button Background"),
                                                    onColorChange:(newValue) => setAttributes({btnbghColor: newValue }),
                                                    onGradientChange:(newValue) => setAttributes({btnbggradienthValue: newValue }),
                                                },
                                            ] }
                                        />
                                    </div>
                                </div>                          
                                </>
                            )}
                        </PanelBody>

                        <PanelBody title={__('Image Overlay','gutensee')} initialOpen={false} className={'gutensee-panel-edit'}>
                            <div className="gutensee_block_section_flex_panel">
                                <p className="gutensee_block_section_panel_label">{__('Enable/Disable Overlay','gutensee')}</p>
                                <FormToggle
                                    checked={bgImageOverlay}
                                    onChange={() =>
                                                setAttributes({
                                                            bgImageOverlay: !bgImageOverlay,
                                                            })
                                            }
                                />
                            </div>
                            {bgImageOverlay && (
                                <Fragment>                              
                                <PanelColorSettings  
                                    initialOpen={open}
                                    className='gutensee-block-section-bg-overlay'
                                    title={ __('Overlay Color','gutensee') }
                                    colorSettings={[
                                        {
                                            value: bgOverlayColor,
                                            onChange: setOverlayColor,
                                            label: __('Overlay Color:','gutensee')
                                        },
                                    ]}
                                />
                                                            
                                <RangeControl
                                    label={__('Overlay Opacity','gutensee')}
                                    value={bgOverlayOpacity}
                                    onChange={(value) =>
                                        setAttributes({
                                                bgOverlayOpacity: value,
                                        })
                                    }
                                    min={0.1}
                                    max={1}
                                    step={0.01}
                                />
                                </Fragment>
                            )}
                        </PanelBody>

                        <PanelBody initialOpen={false}  title={__('Box Shadow','gutensee')} className={'gutensee-panel-edit'}>
                            
                            <ToggleControl
                                label={__('Add Box Shadow','gutensee')}
                                checked={boxshadow}
                                onChange={(newval) => setAttributes({ boxshadow: newval })}
                            />
                            
                            { boxshadow != '' && ( 
                                <>
                                    <RangeControl 
                                        label={ __('Horizontal(px)','gutensee') }               
                                        value={ hshadow}
                                        onChange={(newtext) => setAttributes({ hshadow: newtext })}
                                        min={0}
                                        max={100}
                                    />
                                    <RangeControl 
                                        label={ __('Vertical(px)','gutensee') }             
                                        value={ vshadow}
                                        onChange={(newtext) => setAttributes({ vshadow: newtext })}
                                        min={0}
                                        max={100}
                                    />  
                                    <RangeControl 
                                        label={ __('Blur(px)','gutensee') }             
                                        value={ blurshadow}
                                        onChange={(newtext) => setAttributes({ blurshadow: newtext })}
                                        min={0}
                                        max={100} 
                                    />
                                    <div className="gutensee_block_section_flex_panel">
                                        <p className="gutensee_block_section_panel_label">
                                            {__('Color', 'gutensee')}
                                        </p>
                                        <div className="gutensee_block_section_panel">                     
                                            <ColorPalette
                                                className={'gutensee-color'}
                                                enableAlpha={true}
                                                title={ __('Color','gutensee')}
                                                value={ shadowColor }
                                                onChange={ (newtext) => setAttributes({ shadowColor: newtext }) }
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

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

                            <RadioGroup label="Width" onChange={ setPreviewpaddings } checked={ previewpaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewpaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={paddings}
                                        label={__('Padding','gutensee')}
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
                                        label={__('Padding','gutensee')}
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
                                        label={__('Padding','gutensee')}
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

                            {enableslider === true && (
                                <>
                                    <RadioGroup label="Width" onChange={ setPreviewnavmargins } checked={ previewnavmargins } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>

                                    { previewnavmargins === 'Desktop' && (
                                        <>
                                            <BoxControl 
                                                label={__('Nav Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={navmargins}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navmargins,
                                                        navmargins: {
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

                                    { previewnavmargins === 'Tablet' && (
                                        <>
                                            <BoxControl 
                                                label={__('Nav Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={navmarginstab}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navmarginstab,
                                                        navmarginstab: {
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

                                    { previewnavmargins === 'Mobile' && (
                                        <>
                                            <BoxControl 
                                                label={__('Nav Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={navmarginsmob}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navmarginsmob,
                                                        navmarginsmob: {
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

                                    <RadioGroup label="Width" onChange={ setPreviewnavpaddings } checked={ previewnavpaddings } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>

                                    { previewnavpaddings === 'Desktop' && (
                                        <>                                  
                                            <BoxControl
                                                values={navpaddings}
                                                label={__('Nav Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navpaddings,
                                                        navpaddings: {
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

                                    { previewnavpaddings === 'Tablet' && (
                                        <>                                  
                                            <BoxControl
                                                values={navpaddingstab}
                                                label={__('Nav Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navpaddingstab,
                                                        navpaddingstab: {
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

                                    { previewnavpaddings === 'Mobile' && (
                                        <>                                  
                                            <BoxControl
                                                values={navpaddingsmob}
                                                label={__('Nav Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...navpaddingsmob,
                                                        navpaddingsmob: {
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

                                    <RadioGroup label="Width" onChange={ setPreviewdotsmargins } checked={ previewdotsmargins } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>

                                    { previewdotsmargins === 'Desktop' && (
                                        <>
                                            <BoxControl 
                                                label={__('Dots Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={dotsmargins}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotsmargins,
                                                        dotsmargins: {
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

                                    { previewdotsmargins === 'Tablet' && (
                                        <>
                                            <BoxControl 
                                                label={__('Dots Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={dotsmarginstab}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotsmarginstab,
                                                        dotsmarginstab: {
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

                                    { previewdotsmargins === 'Mobile' && (
                                        <>
                                            <BoxControl 
                                                label={__('Dots Margin','gutensee')}
                                                inputProps={{ min: -300 }}
                                                values={dotsmarginsmob}
                                                sides={['top', 'bottom','left','right']}
                                                allowReset={false}
                                                units={[]}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotsmarginsmob,
                                                        dotsmarginsmob: {
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

                                    <RadioGroup label="Width" onChange={ setPreviewdotspaddings } checked={ previewdotspaddings } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>

                                    { previewdotspaddings === 'Desktop' && (
                                        <>                                  
                                            <BoxControl
                                                values={dotspaddings}
                                                label={__('Dots Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotspaddings,
                                                        dotspaddings: {
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

                                    { previewdotspaddings === 'Tablet' && (
                                        <>                                  
                                            <BoxControl
                                                values={dotspaddingstab}
                                                label={__('Dots Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotspaddingstab,
                                                        dotspaddingstab: {
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

                                    { previewdotspaddings === 'Mobile' && (
                                        <>                                  
                                            <BoxControl
                                                values={dotspaddingsmob}
                                                label={__('Dots Padding','gutensee')}
                                                units={[]}
                                                allowReset={false}
                                                onChange={(newValue) =>
                                                    setAttributes({
                                                        ...dotspaddingsmob,
                                                        dotspaddingsmob: {
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
                                </>
                            )}
                            
                            <RadioGroup label="Width" onChange={ setPreviewfeaturedmargins } checked={ previewfeaturedmargins } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewfeaturedmargins === 'Desktop' && (
                                <>
                                    <BoxControl 
                                        label={__('Image Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={featuredmargins}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredmargins,
                                                featuredmargins: {
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

                            { previewfeaturedmargins === 'Tablet' && (
                                <>
                                    <BoxControl 
                                        label={__('Image Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={featuredmarginstab}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredmarginstab,
                                                featuredmarginstab: {
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

                            { previewfeaturedmargins === 'Mobile' && (
                                <>
                                    <BoxControl 
                                        label={__('Image Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={featuredmarginsmob}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredmarginsmob,
                                                featuredmarginsmob: {
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

                            <RadioGroup label="Width" onChange={ setPreviewfeaturedpaddings } checked={ previewfeaturedpaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewfeaturedpaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={featuredpaddings}
                                        label={__('Image Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredpaddings,
                                                featuredpaddings: {
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

                            { previewfeaturedpaddings === 'Tablet' && (
                                <>                                  
                                    <BoxControl
                                        values={featuredpaddingstab}
                                        label={__('Image Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredpaddingstab,
                                                featuredpaddingstab: {
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

                            { previewfeaturedpaddings === 'Mobile' && (
                                <>                                  
                                    <BoxControl
                                        values={featuredpaddingsmob}
                                        label={__('Image Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...featuredpaddingsmob,
                                                featuredpaddingsmob: {
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

                            
                            <RadioGroup label="Width" onChange={ setPreviewmetamargins } checked={ previewmetamargins } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewmetamargins === 'Desktop' && (
                                <>
                                    <BoxControl 
                                        label={__('Meta Margin','gutensee')}
                                        values={metamargins}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metamargins,
                                                metamargins: {
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

                            { previewmetamargins === 'Tablet' && (
                                <>
                                    <BoxControl 
                                        label={__('Meta Margin','gutensee')}
                                        values={metamarginstab}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metamarginstab,
                                                metamarginstab: {
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

                            { previewmetamargins === 'Mobile' && (
                                <>
                                    <BoxControl 
                                        label={__('Meta Margin','gutensee')}
                                        values={metamarginsmob}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metamarginsmob,
                                                metamarginsmob: {
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

                            <RadioGroup label="Width" onChange={ setPreviewmetapaddings } checked={ previewmetapaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewmetapaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={metapaddings}
                                        label={__('Meta Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metapaddings,
                                                metapaddings: {
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

                            { previewmetapaddings === 'Tablet' && (
                                <>                                  
                                    <BoxControl
                                        values={metapaddingstab}
                                        label={__('Meta Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metapaddingstab,
                                                metapaddingstab: {
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

                            { previewmetapaddings === 'Mobile' && (
                                <>                                  
                                    <BoxControl
                                        values={metapaddingsmob}
                                        label={__('Meta Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...metapaddingsmob,
                                                metapaddingsmob: {
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

                            <UnitControl 
                                className={"border-radius-top"} 
                                label={__('Meta Items Gap','gutensee')}
                                onChange={ (newtext) => setAttributes({ bordertopradius: newtext }) } 
                                value={ metagap } 
                                placeholder={"Meta Items Gap"} 
                            />
                            
                            <RadioGroup label="Width" onChange={ setPreviewheadingmargins } checked={ previewheadingmargins } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewheadingmargins === 'Desktop' && (
                                <>
                                    <BoxControl 
                                        label={__('Heading Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={headingmargins}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingmargins,
                                                headingmargins: {
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

                            { previewheadingmargins === 'Tablet' && (
                                <>
                                    <BoxControl 
                                        label={__('Heading Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={headingmarginstab}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingmarginstab,
                                                headingmarginstab: {
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

                            { previewheadingmargins === 'Mobile' && (
                                <>
                                    <BoxControl 
                                        label={__('Heading Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={headingmarginsmob}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingmarginsmob,
                                                headingmarginsmob: {
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
                        
                            <RadioGroup label="Width" onChange={ setPreviewheadingpaddings } checked={ previewheadingpaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewheadingpaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={headingpaddings}
                                        label={__('Heading Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingpaddings,
                                                headingpaddings: {
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

                            { previewheadingpaddings === 'Tablet' && (
                                <>                                  
                                    <BoxControl
                                        values={headingpaddingstab}
                                        label={__('Heading Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingpaddingstab,
                                                headingpaddingstab: {
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

                            { previewheadingpaddings === 'Mobile' && (
                                <>                                  
                                    <BoxControl
                                        values={headingpaddingsmob}
                                        label={__('Heading Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...headingpaddingsmob,
                                                headingpaddingsmob: {
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

                         
                            <RadioGroup label="Width" onChange={ setPreviewcontentmargins } checked={ previewcontentmargins } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewcontentmargins === 'Desktop' && (
                                <>
                                    <BoxControl 
                                        label={__('Content Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={contentmargins}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentmargins,
                                                contentmargins: {
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

                            { previewcontentmargins === 'Tablet' && (
                                <>
                                    <BoxControl 
                                        label={__('Content Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={contentmarginstab}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentmarginstab,
                                                contentmarginstab: {
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

                            { previewcontentmargins === 'Mobile' && (
                                <>
                                    <BoxControl 
                                        label={__('Content Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={contentmarginsmob}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentmarginsmob,
                                                contentmarginsmob: {
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

                            <RadioGroup label="Width" onChange={ setPreviewcontentpaddings } checked={ previewcontentpaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewcontentpaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={contentpaddings}
                                        label={__('Content Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentpaddings,
                                                contentpaddings: {
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

                            { previewcontentpaddings === 'Tablet' && (
                                <>                                  
                                    <BoxControl
                                        values={contentpaddingstab}
                                        label={__('Content Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentpaddingstab,
                                                contentpaddingstab: {
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

                            { previewcontentpaddings === 'Mobile' && (
                                <>                                  
                                    <BoxControl
                                        values={contentpaddingsmob}
                                        label={__('Content Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...contentpaddingsmob,
                                                contentpaddingsmob: {
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

                            
                            <RadioGroup label="Width" onChange={ setPreviewbuttonmargins } checked={ previewbuttonmargins } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewbuttonmargins === 'Desktop' && (
                                <>
                                    <BoxControl 
                                        label={__('Button Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={buttonmargins}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonmargins,
                                                buttonmargins: {
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

                            { previewbuttonmargins === 'Tablet' && (
                                <>
                                    <BoxControl 
                                        label={__('Button Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={buttonmarginstab}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonmarginstab,
                                                buttonmarginstab: {
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

                            { previewbuttonmargins === 'Mobile' && (
                                <>
                                    <BoxControl 
                                        label={__('Button Margin','gutensee')}
                                        inputProps={{ min: -300 }}
                                        values={buttonmarginsmob}
                                        sides={['top', 'bottom','left','right']}
                                        allowReset={false}
                                        units={[]}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonmarginsmob,
                                                buttonmarginsmob: {
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

                            <RadioGroup label="Width" onChange={ setPreviewbuttonpaddings } checked={ previewbuttonpaddings } className={"preview-icon"}>
                                <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                            </RadioGroup>

                            { previewbuttonpaddings === 'Desktop' && (
                                <>                                  
                                    <BoxControl
                                        values={buttonpaddings}
                                        label={__('Button Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonpaddings,
                                                buttonpaddings: {
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

                            { previewbuttonpaddings === 'Tablet' && (
                                <>                                  
                                    <BoxControl
                                        values={buttonpaddingstab}
                                        label={__('Button Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonpaddingstab,
                                                buttonpaddingstab: {
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

                            { previewbuttonpaddings === 'Mobile' && (
                                <>                                  
                                    <BoxControl
                                        values={buttonpaddingsmob}
                                        label={__('Button Padding','gutensee')}
                                        units={[]}
                                        allowReset={false}
                                        onChange={(newValue) =>
                                            setAttributes({
                                                ...buttonpaddingsmob,
                                                buttonpaddingsmob: {
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
                                colors={ colors }
                                label={ __( 'Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ border: newtext })}
                                value={ border }
                            />

                            <BoxControl
                                label={__('Border Radius','gutensee')}
                                values={borderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...borderradius,
                                        borderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
                                        },
                                    })
                                }
                            />

                            {enableslider === true && (
                                <>
                                    <BorderBoxControl
                                        colors={ colors }
                                        label={ __( 'Nav Border' ,'gutensee') }
                                        onChange={(newtext) => setAttributes({ navborder: newtext })}
                                        value={ navborder }
                                    />

                                    <BoxControl
                                        label={__('Nav Border Radius','gutensee')}
                                        values={navborderradius}
                                        onChange={(newtext) => 
                                            setAttributes({
                                                 ...navborderradius,
                                                navborderradius: {
                                                    top: newtext.top,
                                                    left: newtext.left,
                                                    right: newtext.right,
                                                    bottom: newtext.bottom,
                                                },
                                            })
                                        }
                                    />

                                    <BorderBoxControl
                                        colors={ colors }
                                        label={ __( 'Dots Border' ,'gutensee') }
                                        onChange={(newtext) => setAttributes({ dotsborder: newtext })}
                                        value={ dotsborder }
                                    />

                                    <BoxControl
                                        label={__('Dots Border Radius','gutensee')}
                                        values={dotsborderradius}
                                        onChange={(newtext) => 
                                            setAttributes({
                                                 ...dotsborderradius,
                                                dotsborderradius: {
                                                    top: newtext.top,
                                                    left: newtext.left,
                                                    right: newtext.right,
                                                    bottom: newtext.bottom,
                                                },
                                            })
                                        }
                                    />
                                </>
                            )}

                            <BorderBoxControl
                                colors={ colors }
                                label={ __( 'Featured Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ featuredborder: newtext })}
                                value={ featuredborder }
                            />

                            <BoxControl
                                label={__('Featured Border Radius','gutensee')}
                                values={featuredborderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...featuredborderradius,
                                        featuredborderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
                                        },
                                    })
                                }
                            />

                             <BorderBoxControl
                                colors={ colors }
                                label={ __( 'Meta Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ metaborder: newtext })}
                                value={ metaborder }
                            />

                            <BoxControl
                                label={__('Meta Border Radius','gutensee')}
                                values={metaborderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...metaborderradius,
                                        metaborderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
                                        },
                                    })
                                }
                            />

                             <BorderBoxControl
                                colors={ colors }
                                label={ __( 'Heading Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ headingborder: newtext })}
                                value={ headingborder }
                            />

                            <BoxControl
                                label={__('Heading Border Radius','gutensee')}
                                values={headingborderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...headingborderradius,
                                        headingborderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
                                        },
                                    })
                                }
                            />

                            <BorderBoxControl
                                colors={ colors }
                                label={ __( 'Content Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ contentborder: newtext })}
                                value={ contentborder }
                            />

                            <BoxControl
                                label={__('Content Border Radius','gutensee')}
                                values={contentborderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...contentborderradius,
                                        contentborderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
                                        },
                                    })
                                }
                            />

                            <BorderBoxControl
                                colors={ colors }
                                label={ __( 'Button Border' ,'gutensee') }
                                onChange={(newtext) => setAttributes({ buttonborder: newtext })}
                                value={ buttonborder }
                            />

                            <BoxControl
                                label={__('Button Border Radius','gutensee')}
                                values={buttonborderradius}
                                onChange={(newtext) => 
                                    setAttributes({
                                         ...buttonborderradius,
                                        buttonborderradius: {
                                            top: newtext.top,
                                            left: newtext.left,
                                            right: newtext.right,
                                            bottom: newtext.bottom,
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

                {/* Typography Contol */}
                {controlType === 'typo' && (
                    <>
                        <div className="gutensee_block_content_section gutensee-typo">

                            <PanelBody initialOpen={false} title={__('Meta','gutensee')} className={'gutensee-panel-edit'}>
                                <SelectControl
                                    label={__(' Font Family','gutensee')}
                                    value={ metafontfamily }
                                    options={fontfamilylist}
                                    onChange={ (newtext) => setAttributes({ metafontfamily: newtext }) }
                                />  

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewmetafontsize } checked={ previewmetafontsize } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewmetafontsize === 'Desktop' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ metafontSize }
                                                onChange={(userVal) => setAttributes({
                                                            metafontSize: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewmetafontsize === 'Tablet' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ metafontSizetab }
                                                onChange={(userVal) => setAttributes({
                                                            metafontSizetab: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewmetafontsize === 'Mobile' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ metafontSizemob }
                                                onChange={(userVal) => setAttributes({
                                                            metafontSizemob: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Font Weight','gutensee')}
                                    value={ metaFontWeight }
                                    options={ [
                                        { label: __('Thin','gutensee'), value: '100' },
                                        { label: __('Extra Light','gutensee'), value: '200' },
                                        { label: __('Light','gutensee'), value: '300' },
                                        { label: __('Regular','gutensee'), value: '400' },
                                        { label: __('Medium','gutensee'), value: '500' },
                                        { label: __('Semi Bold','gutensee'), value: '600' },
                                        { label: __('Bold','gutensee'), value: '700' },
                                        { label: __('Extra Bold','gutensee'), value: '800' },
                                        { label: __('Black','gutensee'), value: '900' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ metaFontWeight: newtext }) }                      
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewmetalineheight } checked={ previewmetalineheight } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewmetalineheight === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ metaLineHeight}
                                                onChange={(newtext) => setAttributes({ metaLineHeight: newtext })}                 
                                            />
                                        </>
                                    )}
                                    { previewmetalineheight === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ metaLineHeighttab}
                                                onChange={(newtext) => setAttributes({ metaLineHeighttab: newtext })}                  
                                            />
                                        </>
                                    )}
                                    { previewmetalineheight === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ metaLineHeightmob}
                                                onChange={(newtext) => setAttributes({ metaLineHeightmob: newtext })}                  
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Transform','gutensee')}
                                    value={ metaTransform }
                                    options={ [
                                        { label: __('Default','gutensee'), value: '' },
                                        { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                        { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                        { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ metaTransform: newtext }) }                   
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewmetaltrspaceing } checked={ previewmetaltrspaceing } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewmetaltrspaceing === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ metaLetterSpacing}
                                                onChange={(newtext) => setAttributes({ metaLetterSpacing: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewmetaltrspaceing === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ metaLetterSpacingtab}
                                                onChange={(newtext) => setAttributes({ metaLetterSpacingtab: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewmetaltrspaceing === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ metaLetterSpacingmob}
                                                onChange={(newtext) => setAttributes({ metaLetterSpacingmob: newtext })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Decoration ','gutensee')}
                                    value={ metaDecoration }
                                    options={ [
                                        { label: __('Default','gutensee'), value: 'none' },
                                        { label: __('Underline','gutensee'), value: 'underline' },
                                        { label: __('Overline','gutensee'), value: 'overline' },
                                        { label: __('Line Through','gutensee'), value: 'line-through' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ metaDecoration: newtext }) }                      
                                />
                                    
                            </PanelBody>

                            <PanelBody initialOpen={false} title={__('Title','gutensee')} className={'gutensee-panel-edit'}>
                                
                                <SelectControl
                                    label={__(' Font Family','gutensee')}
                                    value={ titlefontfamily }
                                    options={fontfamilylist}
                                    onChange={ (newtext) => setAttributes({ titlefontfamily: newtext }) }
                                />  

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewfontsize } checked={ previewfontsize } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewfontsize === 'Desktop' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ titlefontSize }
                                                onChange={(userVal) => setAttributes({
                                                            titlefontSize: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewfontsize === 'Tablet' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ titlefontSizetab }
                                                onChange={(userVal) => setAttributes({
                                                            titlefontSizetab: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewfontsize === 'Mobile' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ titlefontSizemob }
                                                onChange={(userVal) => setAttributes({
                                                            titlefontSizemob: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Font Weight','gutensee')}
                                    value={ titleFontWeight }
                                    options={ [
                                        { label: __('Thin','gutensee'), value: '100' },
                                        { label: __('Extra Light','gutensee'), value: '200' },
                                        { label: __('Light','gutensee'), value: '300' },
                                        { label: __('Regular','gutensee'), value: '400' },
                                        { label: __('Medium','gutensee'), value: '500' },
                                        { label: __('Semi Bold','gutensee'), value: '600' },
                                        { label: __('Bold','gutensee'), value: '700' },
                                        { label: __('Extra Bold','gutensee'), value: '800' },
                                        { label: __('Black','gutensee'), value: '900' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ titleFontWeight: newtext }) }                     
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewlineheight } checked={ previewlineheight } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewlineheight === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ titleLineHeight}
                                                onChange={(newtext) => setAttributes({ titleLineHeight: newtext })}                 
                                            />
                                        </>
                                    )}
                                    { previewlineheight === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ titleLineHeighttab}
                                                onChange={(newtext) => setAttributes({ titleLineHeighttab: newtext })}                  
                                            />
                                        </>
                                    )}
                                    { previewlineheight === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ titleLineHeightmob}
                                                onChange={(newtext) => setAttributes({ titleLineHeightmob: newtext })}                  
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Transform','gutensee')}
                                    value={ titleTransform }
                                    options={ [
                                        { label: __('Default','gutensee'), value: '' },
                                        { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                        { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                        { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ titleTransform: newtext }) }                      
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewltrspaceing } checked={ previewltrspaceing } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewltrspaceing === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ titleLetterSpacing}
                                                onChange={(newtext) => setAttributes({ titleLetterSpacing: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewltrspaceing === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ titleLetterSpacingtab}
                                                onChange={(newtext) => setAttributes({ titleLetterSpacingtab: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewltrspaceing === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ titleLetterSpacingmob}
                                                onChange={(newtext) => setAttributes({ titleLetterSpacingmob: newtext })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Decoration ','gutensee')}
                                    value={ titleDecoration }
                                    options={ [
                                        { label: __('Default','gutensee'), value: 'none' },
                                        { label: __('Underline','gutensee'), value: 'underline' },
                                        { label: __('Overline','gutensee'), value: 'overline' },
                                        { label: __('Line Through','gutensee'), value: 'line-through' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ titleDecoration: newtext }) }                     
                                />     

                            </PanelBody>

                            <PanelBody initialOpen={false} title={__('Content','gutensee')} className={'gutensee-panel-edit'}>
                                
                                <SelectControl
                                    label={__(' Font Family','gutensee')}
                                    value={ contentfontfamily }
                                    options={fontfamilylist}
                                    onChange={ (newtext) => setAttributes({ contentfontfamily: newtext }) }
                                />  

                                <FontSizePicker 
                                    __nextHasNoMarginBottom
                                    value={ contentfontSize }
                                    onChange={(userVal) => setAttributes({
                                                contentfontSize: userVal
                                            })}
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewcontentfontsize } checked={ previewcontentfontsize } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewcontentfontsize === 'Desktop' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ contentfontSize }
                                                onChange={(userVal) => setAttributes({
                                                            contentfontSize: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewcontentfontsize === 'Tablet' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ contentfontSizetab }
                                                onChange={(userVal) => setAttributes({
                                                            contentfontSizetab: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewcontentfontsize === 'Mobile' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ contentfontSizemob }
                                                onChange={(userVal) => setAttributes({
                                                            contentfontSizemob: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Font Weight','gutensee')}
                                    value={ contentFontWeight }
                                    options={ [
                                        { label: __('Thin','gutensee'), value: '100' },
                                        { label: __('Extra Light','gutensee'), value: '200' },
                                        { label: __('Light','gutensee'), value: '300' },
                                        { label: __('Regular','gutensee'), value: '400' },
                                        { label: __('Medium','gutensee'), value: '500' },
                                        { label: __('Semi Bold','gutensee'), value: '600' },
                                        { label: __('Bold','gutensee'), value: '700' },
                                        { label: __('Extra Bold','gutensee'), value: '800' },
                                        { label: __('Black','gutensee'), value: '900' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ contentFontWeight: newtext }) }                   
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewcontentlineheight } checked={ previewcontentlineheight } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewcontentlineheight === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ contentLineHeight}
                                                onChange={(newtext) => setAttributes({ contentLineHeight: newtext })}                 
                                            />
                                        </>
                                    )}
                                    { previewcontentlineheight === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ contentLineHeighttab}
                                                onChange={(newtext) => setAttributes({ contentLineHeighttab: newtext })}                  
                                            />
                                        </>
                                    )}
                                    { previewcontentlineheight === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ contentLineHeightmob}contentLineHeight
                                                onChange={(newtext) => setAttributes({ contentLineHeightmob: newtext })}                  
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Transform','gutensee')}
                                    value={ contentTransform }
                                    options={ [
                                        { label: __('Default','gutensee'), value: '' },
                                        { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                        { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                        { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ contentTransform: newtext }) }                    
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewcontentltrspaceing } checked={ previewcontentltrspaceing } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewcontentltrspaceing === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ contentLetterSpacing}
                                                onChange={(newtext) => setAttributes({ contentLetterSpacing: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewcontentltrspaceing === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ contentLetterSpacingtab}
                                                onChange={(newtext) => setAttributes({ contentLetterSpacingtab: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewcontentltrspaceing === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ contentLetterSpacingmob}
                                                onChange={(newtext) => setAttributes({ contentLetterSpacingmob: newtext })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Decoration ','gutensee')}
                                    value={ contentDecoration }
                                    options={ [
                                        { label: __('Default','gutensee'), value: 'none' },
                                        { label: __('Underline','gutensee'), value: 'underline' },
                                        { label: __('Overline','gutensee'), value: 'overline' },
                                        { label: __('Line Through','gutensee'), value: 'line-through' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ contentDecoration: newtext }) }                   
                                />
                                
                            </PanelBody>

                            <PanelBody initialOpen={false} title={__('Button','gutensee')}  className={'gutensee-panel-edit'}>
                                <SelectControl
                                    label={__(' Font Family','gutensee')}
                                    value={ readmorefontfamily }
                                    options={fontfamilylist}
                                    onChange={ (newtext) => setAttributes({ readmorefontfamily: newtext }) }
                                /> 

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewreadmorefontsize } checked={ previewreadmorefontsize } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewreadmorefontsize === 'Desktop' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ readmorefontSize }
                                                onChange={(userVal) => setAttributes({
                                                            readmorefontSize: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewreadmorefontsize === 'Tablet' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ readmorefontSizetab }
                                                onChange={(userVal) => setAttributes({
                                                            readmorefontSizetab: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                    { previewreadmorefontsize === 'Mobile' && (
                                        <>  
                                            <UnitControl 
                                                label={__(' Font Size','gutensee')}
                                                className={'gutensee-singl'}
                                                value={ readmorefontSizemob }
                                                onChange={(userVal) => setAttributes({
                                                            readmorefontSizemob: userVal
                                                        })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Font Weight','gutensee')}
                                    value={ readmoreFontWeight }
                                    options={ [
                                        { label: __('Thin','gutensee'), value: '100' },
                                        { label: __('Extra Light','gutensee'), value: '200' },
                                        { label: __('Light','gutensee'), value: '300' },
                                        { label: __('Regular','gutensee'), value: '400' },
                                        { label: __('Medium','gutensee'), value: '500' },
                                        { label: __('Semi Bold','gutensee'), value: '600' },
                                        { label: __('Bold','gutensee'), value: '700' },
                                        { label: __('Extra Bold','gutensee'), value: '800' },
                                        { label: __('Black','gutensee'), value: '900' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ readmoreFontWeight: newtext }) }                      
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewreadmorelineheight } checked={ previewreadmorelineheight } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewreadmorelineheight === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ readmoreLineHeight}
                                                onChange={(newtext) => setAttributes({ readmoreLineHeight: newtext })}                 
                                            />
                                        </>
                                    )}
                                    { previewreadmorelineheight === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ readmoreLineHeighttab}
                                                onChange={(newtext) => setAttributes({ readmoreLineHeighttab: newtext })}                  
                                            />
                                        </>
                                    )}
                                    { previewreadmorelineheight === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('line Height(px)','gutensee')}   
                                                className={'gutensee-singl'}           
                                                value={ readmoreLineHeightmob}
                                                onChange={(newtext) => setAttributes({ readmoreLineHeightmob: newtext })}                  
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Transform','gutensee')}
                                    value={ readmoreTransform }
                                    options={ [
                                        { label: __('Default','gutensee'), value: '' },
                                        { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                        { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                        { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ readmoreTransform: newtext }) }                   
                                />

                                <div class="gutensee-preview-control">
                                    <RadioGroup label="Width" onChange={ setPreviewreadmoreltrspaceing } checked={ previewreadmoreltrspaceing } className={"preview-icon"}>
                                        <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                        <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                        <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                    </RadioGroup>
                                    { previewreadmoreltrspaceing === 'Desktop' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ readmoreLetterSpacing}
                                                onChange={(newtext) => setAttributes({ readmoreLetterSpacing: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewreadmoreltrspaceing === 'Tablet' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ readmoreLetterSpacingtab}
                                                onChange={(newtext) => setAttributes({ readmoreLetterSpacingtab: newtext })}
                                            />
                                        </>
                                    )}
                                    { previewreadmoreltrspaceing === 'Mobile' && (
                                        <>
                                            <UnitControl 
                                                label={__('Letter Spacing','gutensee')}
                                                className={'gutensee-singl'}               
                                                value={ readmoreLetterSpacingmob}
                                                onChange={(newtext) => setAttributes({ readmoreLetterSpacingmob: newtext })}
                                            />
                                        </>
                                    )}
                                </div>

                                <SelectControl
                                    label={__('Decoration ','gutensee')}
                                    value={ readmoreDecoration }
                                    options={ [
                                        { label: __('Default','gutensee'), value: 'none' },
                                        { label: __('Underline','gutensee'), value: 'underline' },
                                        { label: __('Overline','gutensee'), value: 'overline' },
                                        { label: __('Line Through','gutensee'), value: 'line-through' },
                                    ] }
                                    onChange={ (newtext) => setAttributes({ readmoreDecoration: newtext }) }                      
                                />

                            </PanelBody>                        

                        </div>
                    </>
                )}
            </InspectorControls>
            <div id={advid}>
                <div {...blockProps}  id={uniqueid}>
                    <div className={`${"post-query-loop"} ${Rowclass} ${"single-item"}`} id={sliderid}>
                        {posts.length === 0 ? (
                            <Spinner />
                        ) : (
                            posts.map((post) => (
                                <div className={ColumnClass} id={`${addid}`}>
                                    {poststyle=='grid-layout' &&(
                                        <div class="post grid-layout">
                                                {reorder.map((field, index) => {
                                                    switch (field) {
                                                        case 'Featured Image':
                                                            return <div class="featured-image post-thumbnail">
                                                                        { bgImageOverlay && (
                                                                            <div className={"overlay"} style={{
                                                                                    backgroundColor: bgImageOverlay
                                                                                        ? bgOverlayColor
                                                                                        : '',
                                                                                    opacity: bgImageOverlay ? bgOverlayOpacity : '',
                                                                                }}>
                                                                            </div>
                                                                        )}
                                                                        { displayFeaturedImage && post._embedded['wp:featuredmedia'] && (                                    
                                                                            <figure class="post-thumbnails">
                                                                                <>
                                                                                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                                                                </>                                                                      
                                                                            </figure>
                                                                        )}
                                                                    </div>;                                                       

                                                        case 'Meta':
                                                            return <div class="post-meta">
                                                                    {displayAuthor && (
                                                                        <span class="author">
                                                                            { (authortype === 'image') ? (
                                                                                <>
                                                                                    <img width="1060" height="766"  class="img-fluid" src={post._embedded.author[0].avatar_urls['96']} alt={`${post._embedded.author[0].name}'s avatar`} />
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <i class="fa-regular fa-user"></i>
                                                                                </>
                                                                            )}
                                                                            <a rel="noopener noreferrer" >{post._embedded.author[0].name}</a>                                      
                                                                        </span>
                                                                    )}
                                                                    {displayDate && (
                                                                        <span class="date">
                                                                            <i class="far fa-calendar-alt"></i>
                                                                            <a href="#" rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                <time class="entry-date">
                                                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                                                        day: 'numeric',
                                                                                        month: 'long',
                                                                                        year: 'numeric',
                                                                                    })}
                                                                                </time>
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayTags && (
                                                                        <span class="tag-links"><i class="fas fa-tags"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][1].map(tag => tag.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayCat && (
                                                                        <span class="tag-links"><i class="far fa-folder"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    { (displayComment ==true) &&(
                                                                        <>
                                                                                                                                    
                                                                            <span class="comments-link"><i class="far fa-comment"></i><a  rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>Comments({findOcc(commentsCount,post.id)})</a></span>
                                                                        
                                                                        </>
                                                                    )}
                                                                </div>;
                                                        
                                                        case 'Title':
                                                            return <header class="post-entry-header">
                                                                        {displayTitle &&(
                                                                            <h3 class="post-entry-title">
                                                                                <a
                                                                                    
                                                                                >
                                                                                {post.title.rendered}
                                                                                </a>
                                                                            </h3>
                                                                        )}
                                                                    </header>;

                                                        case 'Content':
                                                            return <div class="post-entry-content">
                                                                {displayPostContent &&(
                                                                <>
                                                                    {displayContent ? (
                                                                        <p
                                                                            className="post-full-content wp-block-latest-posts__post-full-content"
                                                                            dangerouslySetInnerHTML={ {
                                                                                __html: post.content.rendered,
                                                                            } }
                                                                        />
                                                                    ) : (
                                                                        <div class="post-entry-content">
                                                                            <p
                                                                                className="post-excerpt-content wp-block-latest-posts__post-full-excerpt"
                                                                                dangerouslySetInnerHTML={ {
                                                                                    __html: post.excerpt.rendered,
                                                                                } }
                                                                            />
                                                                            {post.excerpt.rendered.split(' ').length > excerptLimit && (
                                                                                <>
                                                                                    <a  href={ post.link } class="post-button more-link" target={(opennewtab)? '_blank':'_self'} rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                        { buttonlabel }
                                                                                        <i class="fas fa-arrow-right"></i>
                                                                                    </a>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </>
                                                                )}
                                                                </div>;

                                                        default:
                                                            return null;
                                                    }
                                                })}
                                        </div>
                                    )}

                                    {poststyle=='list-layout' &&(
                                        <div class="post list-layout">
                                            <div class="featured-image post-thumbnail">
                                                { bgImageOverlay && (
                                                    <div className={"overlay"} style={{
                                                            backgroundColor: bgImageOverlay
                                                                ? bgOverlayColor
                                                                : '',
                                                            opacity: bgImageOverlay ? bgOverlayOpacity : '',
                                                        }}>
                                                    </div>
                                                )}
                                                { displayFeaturedImage && post._embedded['wp:featuredmedia'] && (                                    
                                                    <figure class="post-thumbnails">
                                                        <>
                                                        <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                                        </>                                                                      
                                                    </figure>
                                                )}
                                            </div>
                                            <div class="post-list-layout">                                    
                                                {reorder.map((field, index) => {
                                                    switch (field) {                                                     

                                                        case 'Meta':
                                                            return <div class="post-meta">
                                                                    {displayAuth && (
                                                                        <span class="author">
                                                                            { (authortype === 'image') ? (
                                                                                <>
                                                                                    <img width="1060" height="766"  class="img-fluid" src={post._embedded.author[0].avatar_urls['96']} alt={`${post._embedded.author[0].name}'s avatar`} />
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <i class="fa-regular fa-user"></i>
                                                                                </>
                                                                            )}
                                                                            <a rel="noopener noreferrer" >{post._embedded.author[0].name}</a>                                      
                                                                        </span>
                                                                    )}
                                                                    {displayDate && (
                                                                        <span class="date">
                                                                            <i class="far fa-calendar-alt"></i>
                                                                            <a href="#" rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                <time class="entry-date">
                                                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                                                        day: 'numeric',
                                                                                        month: 'long',
                                                                                        year: 'numeric',
                                                                                    })}
                                                                                </time>
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayTags && (
                                                                        <span class="tag-links"><i class="fas fa-tags"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][1].map(tag => tag.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayCat && (
                                                                        <span class="tag-links"><i class="far fa-folder"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                </div>;
                                                        
                                                        case 'Title':
                                                            return <header class="post-entry-header">
                                                                        {displayTitle &&(
                                                                            <h3 class="post-entry-title">
                                                                                <a
                                                                                    
                                                                                >
                                                                                {post.title.rendered}
                                                                                </a>
                                                                            </h3>
                                                                        )}
                                                                </header>;

                                                        case 'Content':
                                                            return <div class="post-entry-content">
                                                                    {displayPostContent &&(
                                                                        <>
                                                                            {displayContent ? (
                                                                                <p
                                                                                    className="post-full-content wp-block-latest-posts__post-full-content"
                                                                                    dangerouslySetInnerHTML={ {
                                                                                        __html: post.content.rendered,
                                                                                    } }
                                                                                />
                                                                            ) : (
                                                                                <div class="post-entry-content">
                                                                                    <p
                                                                                        className="post-excerpt-content wp-block-latest-posts__post-full-excerpt"
                                                                                        dangerouslySetInnerHTML={ {
                                                                                            __html: post.excerpt.rendered,
                                                                                        } }
                                                                                    />
                                                                                    {post.excerpt.rendered.split(' ').length > excerptLimit && (
                                                                                        <>
                                                                                            <a  href={ post.link } class="post-button more-link" target={(opennewtab)? '_blank':'_self'} rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                                { buttonlabel }
                                                                                                <i class="fas fa-arrow-right"></i>
                                                                                            </a>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>;

                                                        default:
                                                            return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {poststyle=='masonry-layout' &&(
                                        <div class="post masonry-layout">
                                                {reorder.map((field, index) => {
                                                    switch (field) {
                                                        case 'Featured Image':
                                                            return <div class="featured-image post-thumbnail">
                                                                        { bgImageOverlay && (
                                                                            <div className={"overlay"} style={{
                                                                                    backgroundColor: bgImageOverlay
                                                                                        ? bgOverlayColor
                                                                                        : '',
                                                                                    opacity: bgImageOverlay ? bgOverlayOpacity : '',
                                                                                }}>
                                                                            </div>
                                                                        )}
                                                                        { displayFeaturedImage && post._embedded['wp:featuredmedia'] && (                                    
                                                                            <figure class="post-thumbnails">
                                                                                <>
                                                                                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                                                                </>                                                                      
                                                                            </figure>
                                                                        )}
                                                                    </div>;                                                       

                                                        case 'Meta':
                                                            return <div class="post-meta">
                                                                    {displayAuth && (
                                                                        <span class="author">
                                                                            { (authortype === 'image') ? (
                                                                                <>
                                                                                    <img width="1060" height="766"  class="img-fluid" src={post._embedded.author[0].avatar_urls['96']} alt={`${post._embedded.author[0].name}'s avatar`} />
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <i class="fa-regular fa-user"></i>
                                                                                </>
                                                                            )}
                                                                            <a rel="noopener noreferrer" >{post._embedded.author[0].name}</a>                                      
                                                                        </span>
                                                                    )}
                                                                    {displayDate && (
                                                                        <span class="date">
                                                                            <i class="far fa-calendar-alt"></i>
                                                                            <a href="#" rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                <time class="entry-date">
                                                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                                                        day: 'numeric',
                                                                                        month: 'long',
                                                                                        year: 'numeric',
                                                                                    })}
                                                                                </time>
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayTags && (
                                                                        <span class="tag-links"><i class="fas fa-tags"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][1].map(tag => tag.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayCat && (
                                                                        <span class="tag-links"><i class="far fa-folder"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                </div>;
                                                        
                                                        case 'Title':
                                                            return <header class="post-entry-header">
                                                                        {displayTitle &&(
                                                                            <h3 class="post-entry-title">
                                                                                <a
                                                                                    
                                                                                >
                                                                                {post.title.rendered}
                                                                                </a>
                                                                            </h3>
                                                                        )}
                                                                </header>;

                                                        case 'Content':
                                                            return <div class="post-entry-content">
                                                                        {displayPostContent &&(
                                                                            <>
                                                                                {displayContent ? (
                                                                                    <p
                                                                                        className="post-full-content wp-block-latest-posts__post-full-content"
                                                                                        dangerouslySetInnerHTML={ {
                                                                                            __html: post.content.rendered,
                                                                                        } }
                                                                                    />
                                                                                ) : (
                                                                                    <div class="post-entry-content">
                                                                                        <p
                                                                                            className="post-excerpt-content wp-block-latest-posts__post-full-excerpt"
                                                                                            dangerouslySetInnerHTML={ {
                                                                                                __html: post.excerpt.rendered,
                                                                                            } }
                                                                                        />
                                                                                        {post.excerpt.rendered.split(' ').length > excerptLimit && (
                                                                                            <>
                                                                                                <a  href={ post.link } class="post-button more-link" target={(opennewtab)? '_blank':'_self'} rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                                    { buttonlabel }
                                                                                                    <i class="fas fa-arrow-right"></i>
                                                                                                </a>
                                                                                            </>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                </div>;

                                                        default:
                                                            return null;
                                                    }
                                                })}
                                        </div>
                                    )}

                                    {poststyle=='cover-layout' &&(
                                        <div class="post cover-layout">
                                            <div class="featured-image post-thumbnail">
                                                { bgImageOverlay && (
                                                    <div className={"overlay"} style={{
                                                            backgroundColor: bgImageOverlay
                                                                ? bgOverlayColor
                                                                : '',
                                                            opacity: bgImageOverlay ? bgOverlayOpacity : '',
                                                        }}>
                                                    </div>
                                                )}
                                                { displayFeaturedImage && post._embedded['wp:featuredmedia'] && (                                    
                                                    <figure class="post-thumbnails">
                                                        <>
                                                        <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                                        </>                                                                      
                                                    </figure>
                                                )}
                                            </div>                                                       
                                            <div class="post-cover-layout">
                                                {reorder.map((field, index) => {
                                                    switch (field) {
                                                        case 'Meta':
                                                            return <div class="post-meta">
                                                                    {displayAuthor && (
                                                                        <span class="author">
                                                                            { (authortype === 'image') ? (
                                                                                <>
                                                                                    <img width="1060" height="766"  class="img-fluid" src={post._embedded.author[0].avatar_urls['96']} alt={`${post._embedded.author[0].name}'s avatar`} />
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <i class="fa-regular fa-user"></i>
                                                                                </>
                                                                            )}
                                                                            <a rel="noopener noreferrer" >{post._embedded.author[0].name}</a>                                      
                                                                        </span>
                                                                    )}
                                                                    {displayDate && (
                                                                        <span class="date">
                                                                            <i class="far fa-calendar-alt"></i>
                                                                            <a href="#" rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                <time class="entry-date">
                                                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                                                        day: 'numeric',
                                                                                        month: 'long',
                                                                                        year: 'numeric',
                                                                                    })}
                                                                                </time>
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayTags && (
                                                                        <span class="tag-links"><i class="fas fa-tags"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][1].map(tag => tag.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                    {displayCat && (
                                                                        <span class="tag-links"><i class="far fa-folder"></i>
                                                                            <a rel="noopener noreferrer" >
                                                                                {post._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
                                                                            </a>
                                                                        </span>
                                                                    )}
                                                                </div>;
                                                        
                                                        case 'Title':
                                                            return <header class="post-entry-header">
                                                                        {displayTitle &&(
                                                                            <h3 class="post-entry-title">
                                                                                <a
                                                                                    
                                                                                >
                                                                                {post.title.rendered}
                                                                                </a>
                                                                            </h3>
                                                                        )}
                                                                </header>;

                                                        case 'Content':
                                                            return <div class="post-entry-content">
                                                                    {displayPostContent &&(
                                                                        <>    
                                                                            {displayContent ? (
                                                                                <p
                                                                                    className="post-full-content wp-block-latest-posts__post-full-content"
                                                                                    dangerouslySetInnerHTML={ {
                                                                                        __html: post.content.rendered,
                                                                                    } }
                                                                                />
                                                                            ) : (
                                                                                <div class="post-entry-content">
                                                                                    <p
                                                                                        className="post-excerpt-content wp-block-latest-posts__post-full-excerpt"
                                                                                        dangerouslySetInnerHTML={ {
                                                                                            __html: post.excerpt.rendered,
                                                                                        } }
                                                                                    />
                                                                                    {post.excerpt.rendered.split(' ').length > excerptLimit && (
                                                                                        <>
                                                                                            <a  href={ post.link } class="post-button more-link" target={(opennewtab)? '_blank':'_self'} rel="noopener noreferrer" onClick={ showRedirectionPreventedNotice }>
                                                                                                { buttonlabel }
                                                                                                <i class="fas fa-arrow-right"></i>
                                                                                            </a>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>;

                                                        default:
                                                            return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))

                            
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    );
};
registerBlockType('gutensee/gutensee-post-query',{
    title:__('Post Query','gutensee'),
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 115.753627)" fill="#099"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 65.753627)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 145.386962)" fill="#099"/><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 172.588865)" fill="#5483cc"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 95.386962)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 122.588865)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><rect width="46" height="46" rx="0" ry="0" transform="matrix(2.014621 0 0 3.098807 11.6751 83.02069)" fill="none" stroke="#099" stroke-width="6"/><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 115.753627)" fill="#099"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 65.753627)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 145.386962)" fill="#099"/><circle r="27.5" transform="matrix(.192257 0 0 0.187447 35.79068 172.588865)" fill="#099"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 95.386962)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.557292 0 0 1 41.108193 122.588865)" fill="none" stroke="#099" stroke-width="7" stroke-linecap="round" stroke-miterlimit="10"/><circle r="27.5" transform="matrix(.997471 0 0 1 206.727733 145.386962)" fill="none" stroke="#099" stroke-width="15"/><circle r="27.5" transform="matrix(.997471 0 0 1 261.588637 146.020058)" fill="none" stroke="#099" stroke-width="15"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(.399738 0 0 0.974137 119.152204 96.047022)" fill="none" stroke="#099" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10"/><polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(.028651 0.496061-.408249 0.023579 175.595339 118.771858)" fill="#099" stroke-width="3"/></svg>,
    category:'gutensee',
    example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
    keywords:['Gutensee Latest Posts','posts', 'latest posts','recent posts'],
    attributes: {
        hidepagination:{
            type:'boolean',
            default:false
        },
        sortOrder: {
            type: 'string',
            default: 'desc',
        },
        selectedCategories: {
            type: 'array',
            default: [],
        },
        postCount: {
            type: 'number',
            default: 5,
        },
        displayContent: {
            type: 'boolean',
            default: false,
        },
        excerptLimit: {
            type: 'number',
            default: 55,
        },
        readMoreText: {
            type: 'string',
            default: 'Read More',
        },
        uniqueid:{
            type:'string',
        },
        enableslider:{
            type:'boolean',
            default:false,
        },
        reorder: { type: 'array', default: ['Featured Image', 'Meta', 'Title', 'Content'] },
        controlType:{
            type:'string',
            default:'basic',
        },
        colorType:{
            type:'string',
            default:'normal',
        },
        def:{
            type:'string',
        },
        infiniteloop:{
            type:'boolean',
            default:true,
        },
        enableautoplay:{
            type:'boolean',
            default:true,
        },
        displaynav:{
            type:'boolean',
            default:true,
        },
        displaydots:{
            type:'boolean',
            default:true,
        },
        poststyle:{
            type:'string',
            default:'grid-layout',
        },
        noitems:{
            type:'number',
            default:2,
        },
        noscrollitems:{
            type:'number',
            default:1,
        },
        navicon:{
            type:'string',
            default:'angle',
        },
        dotssize:{
            type:'number',
            default:15
        },
        metagap:{
            type:'string',
        },
        columnNumber:{
            type:'string',
            default:'4',
        },
        postgap:{
            type:'string',
            default:'20',
        },
        authortype:{
            type:'string',
            default:'image',
        },
        authorimgwidth:{
            type:'number',
            default:36,
        },
        authorimgbr:{
            type:'string',
            default:'50%',
        },
        textalign:{
            type:'string',
            default:'center',
        },
        commentsCount:{
            type:'number',
            default:0,
        },
        disablebtn:{
            type:'boolean',
            default:true,
        },
        opennewtab:{
            type:'boolean',
            default:true,
        },
        buttonlabel:{
            type:'string',
            default:'Read More'
        },
        shadowColor:{
            type:'string',
            default:'#e7e7e7'
        },
        btnshadowColor:{
            type:'string',
        },
        boxshadow:{
            type:'boolean',
            default:false,
        },
        previewfeaturedmargins:{
            type:'string',
            default:'Desktop',
        },
        previewnavmargins: {
            type:'string',
            default:'Desktop',
        },
        navmargins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        navmarginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        navmarginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        previewnavpaddings: {
            type:'string',
            default:'Desktop',
        },
        navpaddings: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        navpaddingstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        navpaddingsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        previewdotsmargins: {
            type:'string',
            default:'Desktop',
        },
        dotsmargins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        dotsmarginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        dotsmarginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        previewdotspaddings: {
            type:'string',
            default:'Desktop',
        },
        dotspaddings: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        dotspaddingstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        dotspaddingsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        featuredmargins: {
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px'
            }
        },
        featuredmarginstab: {
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px'
            }
        },
        featuredmarginsmob: {
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px'
            }
        },
         previewmargins:{
            type:'string',
            default:'Desktop',
        },
        margins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '20px'
            }
        },
        marginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '20px'
            }
        },
        marginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '20px'
            }
        },
        previewmetamargins:{
            type:'string',
            default:'Desktop',
        },
        metamargins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        metamarginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        metamarginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        previewheadingmargins:{
            type:'string',
            default:'Desktop',
        },
        headingmargins: {
            default: {
                 top: '5px',
                left: '0px',
                right: '0px',
                bottom: '16px'
            }
        },
        headingmarginstab: {
            default: {
                 top: '5px',
                left: '0px',
                right: '0px',
                bottom: '16px'
            }
        },
        headingmarginsmob: {
            default: {
                 top: '5px',
                left: '0px',
                right: '0px',
                bottom: '16px'
            }
        },
        previewcontentmargins:{
            type:'string',
            default:'Desktop',
        },
        contentmargins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        contentmarginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        contentmarginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        previewbuttonmargins:{
            type:'string',
            default:'Desktop',
        },
        buttonmargins: {
            default: {
                top: '10px',
                left: '0px',
                right: '0px',
                bottom: '10px',
            },
        },
        buttonmarginstab: {
            default: {
                top: '10px',
                left: '0px',
                right: '0px',
                bottom: '10px',
            },
        },
        buttonmarginsmob: {
            default: {
                top: '10px',
                left: '0px',
                right: '0px',
                bottom: '10px',
            },
        },
        previewpaddings:{
            type:'string',
            default:'Desktop',
        },
        paddings:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        paddingstab:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        paddingsmob:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        },
        previewfeaturedpaddings:{
            type:'string',
            default:'Desktop',
        },
        featuredpaddings:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        }, 
        featuredpaddingstab:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        }, 
        featuredpaddingsmob:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },
        previewmetapaddings:{
            type:'string',
            default:'Desktop',
        },
        metapaddings:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        metapaddingstab:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        metapaddingsmob:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
              },
        }, 
        previewheadingpaddings:{
            type:'string',
            default:'Desktop',
        },
        headingpaddings:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        }, 
        headingpaddingstab:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        }, 
        headingpaddingsmob:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        },
        previewcontentpaddings:{
            type:'string',
            default:'Desktop',
        },
        contentpaddings:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        }, 
        contentpaddingstab:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        }, 
        contentpaddingsmob:{
            type: 'object',
            default: {
                top: '0px',
                left: '10px',
                right: '10px',
                bottom: '0px',
              },
        },
        previewbuttonpaddings:{
            type:'string',
            default:'Desktop',
        },
        buttonpaddings:{
            type: 'object',
            default: {
                top: '6px',
                left: '12px',
                right: '12px',
                bottom: '6px',
              },
        }, 
        buttonpaddingstab:{
            type: 'object',
            default: {
                top: '6px',
                left: '12px',
                right: '12px',
                bottom: '6px',
              },
        }, 
        buttonpaddingsmob:{
            type: 'object',
            default: {
                top: '6px',
                left: '12px',
                right: '12px',
                bottom: '6px',
              },
        }, 
        navborder: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        navborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        dotsborder: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        dotsborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        borderradius:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        },        
        border: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        featuredborderradius:{
            type: 'object',
            default: {
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
            },
        },        
        featuredborder: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        metaborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        metaborder:{
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        headingborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        headingborder:{
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        contentborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        contentborder:{
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        buttonborderradius:{
            type: 'object',
            default: {
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
            },
        },        
        buttonborder: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        hshadow: {
            type: 'number',
            default: 0
        },
        vshadow: {
            type: 'number',
            default: 0
        },
        blurshadow: {
            type: 'number',
            default: 15
        },
        btnhshadow: {
            type: 'number',
            default: 0
        },
        btnvshadow: {
            type: 'number',
            default: 0
        },
        btnblurshadow: {
            type: 'number',
        },
        hidedesktop:{
            type: 'boolean',
            default: true
        },
        hidetablet:{
            type: 'boolean',
            default: true
        },
        hidemobile:{
            type: 'boolean',
            default: true
        },
        animation:{
            type:'string',
            default:''
        },
        durations:{
            type:'string',
        },
        delay:{
            type:'string',
        }, 
        categories: {
            type: "array",
            items: {
                type: "object"
            }
        },
        selectedAuthor: {
            type: "number"
        },
        postsToShow: {
            type: "number",
            default: 3
        },
        displayPostContent: {
            type: "boolean",
            default: true
        },
        displayPostContentRadio: {
            type: "string",
            default: "excerpt"
        },
        excerptLength: {
            type: "number",
            default: 55
        },
        displayAuthor: {
            type: "boolean",
            default: true
        },
        displayComment: {
            type: "boolean",
            default: true
        },
        displayCat: {
            type: "boolean",
            default: true
        },
        displayComment:{
            type:'boolean',
            default:true,
        },
        displayTag: {
            type: "boolean",
            default: true
        },
        displayDate: {
            type: "boolean",
            default: true
        },
        autoplay: {
            type: "boolean",
            default: false
        },
        bgImageOverlay: {
            type: 'boolean',
            default: true
        },
        bgOverlayColor: {
            type: 'string',
            default: '#000'
        },
        bgOverlayOpacity: {
            type: "number",
            default: 0.2
        },
        postLayout: {
            type: "string",
            default: "list"
        },
        columns: {
            type: "number",
            default: 3
        },
        order: {
            type: "string",
            default: "desc"
        },
        orderBy: {
            type: "string",
            default: "date"
        },
        displayFeaturedImage: {
            type: "boolean",
            default: true
        },
        displayTitle: {
            type: "boolean",
            default: true
        },
        featuredImageAlign: {
            type: "string",
            enum: [ "left", "center", "right" ]
        },
        featuredImageSizeSlug: {
            type: "string",
            default: "large"
        },
        featuredImageSizeWidth: {
            type: "number",
            default: null
        },
        featuredImageSizeHeight: {
            type: "number",
            default: null
        },
        addLinkToFeaturedImage: {
            type: "boolean",
            default: true
        },
        titleColor:{
            type:'string',
            default:'#000000',
        },
        titlehColor:{
            type:'string',
        },
        bgColor:{
            type:'string',
        },
        bggradientValue:{
            type:'string',
        },
        bghColor:{
            type:'string',
        },
        bggradienthValue:{
            type:'string',
        },
        navColor:{
            type:'string',
        },
        navbgColor:{
            type:'string',
        },
        dotsbgColor:{
            type:'string',
        },
        activedotsbgColor:{
            type:'string',
        },
        navbggradientValue:{
            type:'string',
        },
        navhColor:{
            type:'string',
        },
        navbghColor:{
            type:'string',
        },
        navbggradienthValue:{
            type:'string',
        },
        contentColor:{
            type:'string',
            default:'#3c3c3c',
        },
        btnColor:{
            type:'string',
            default:'#ffffff',
        },
        btnbgColor:{
            type:'string',
            default:'#ff6900',
        },
        btnbggradientValue:{
            type:'string',
        },
        btnbggradienthValue:{
            type:'string',
        },
        metaColor:{
            type:'string',
            default:'#000000',
        },       
        btnhColor:{
            type:'string',
            default:'#fff'
        },
        btnbghColor:{
            type:'string',
            default:'#0D6B68'
        },        
        metahColor:{
            type:'string',
            default:'#0D6B68'
        }, 
        bgImageOverlay: {
            "type": "boolean",
            "default": false
        },
        bgOverlayColor: {
            "type": "string",
            "default": "#000000"
        },
        bgOverlayPopup: {
            "type": "boolean",
            "default": false
        },
        bgOverlayOpacity: {
            "type": "number",
            "default": 0.6
        },     
        titlefontfamily:{
            type:'string',
            default:'Poppins',
        }, 
        previewfontsize:{
            type:'string',
            default:'Desktop',
        },
        titlefontSize:{
            type:'string',
            default:'24px'
        },
        titlefontSizetab:{
            type:'string',
            default:'24px'
        },
        titlefontSizemob:{
            type:'string',
            default:'24px'
        }, 
        titleFontWeight:{
            type:'string',
            default:'600',
        }, 
        previewlineheight:{
            type:'string',
            default:'Desktop',
        },
        titleLineHeight:{
            type:'number',
            default:'34px'
        }, 
        titleLineHeighttab:{
            type:'number',
            default:'34px'
        }, 
        titleLineHeightmob:{
            type:'number',
            default:'34px'
        }, 
        titleTransform:{
            type:'string',
        }, 
        titleDecoration:{
            type:'string',
            default:'none',
        },
        previewltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        titleLetterSpacing:{
            type:'number',
        }, 
        titleLetterSpacingtab:{
            type:'number',
        }, 
        titleLetterSpacingmob:{
            type:'number',
        }, 
        contentfontfamily:{
            type:'string',
            default:'Poppins',
        }, 
        previewcontentfontsize:{
            type:'string',
            default:'Desktop',
        },
        contentfontSize:{
            type:'string',
            default:'15px'
        }, 
        contentFontWeight:{
            type:'string',
            default:'400'
        }, 
        previewcontentlineheight:{
            type:'string',
            default:'Desktop',
        },
        contentLineHeight:{
            type:'number',
            default:'25px'
        },
        contentLineHeighttab:{
            type:'number',
            default:'25px'
        },
        contentLineHeightmob:{
            type:'number',
            default:'25px'
        }, 
        contentTransform:{
            type:'string',
        }, 
        contentDecoration:{
            type:'string',
            default:'none',
        }, 
        previewcontentltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        contentLetterSpacing:{
            type:'number',
        }, 
        contentLetterSpacingtab:{
            type:'number',
        }, 
        contentLetterSpacingmob:{
            type:'number',
        },  
        metafontfamily:{
            type:'string',
            default:'Poppins',
        },
        previewmetafontsize:{
            type:'string',
            default:'Desktop',
        },
        metafontSize:{
            type:'string',
            default:'14px'
        },
        metafontSizetab:{
            type:'string',
            default:'14px'
        },
        metafontSizemob:{
            type:'string',
            default:'14px'
        }, 
        metaFontWeight:{
            type:'string',
            default:'500'
        },
        previewmetalineheight:{
            type:'string',
            default:'Desktop',
        }, 
        metaLineHeight:{
            type:'number',
            default:'26px'
        },
        metaLineHeighttab:{
            type:'number',
            default:'26px'
        },
        metaLineHeightmob:{
            type:'number',
            default:'26px'
        }, 
        metaTransform:{
            type:'string',
        }, 
        metaDecoration:{
            type:'string',
            default:'none',
        }, 
        previewmetaltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        metaLetterSpacing:{
            type:'number',
        },
        metaLetterSpacingtab:{
            type:'number',
        },
        metaLetterSpacingmob:{
            type:'number',
        }, 
        readmorefontfamily:{
            type:'string',
            default:'Poppins',
        }, 
        previewreadmorefontsize:{
            type:'string',
            default:'Desktop',
        },
        readmorefontSize:{
            type:'string',
            default:'14px'
        }, 
        readmorefontSizetab:{
            type:'string',
            default:'14px'
        }, 
        readmorefontSizemob:{
            type:'string',
            default:'14px'
        }, 
        readmoreFontWeight:{
            type:'string',
            default:'500'
        }, 
        readmoreLineHeight:{
            type:'number',
            default:'25px'
        }, 
        readmoreLineHeighttab:{
            type:'number',
            default:'25px'
        }, 
        previewreadmorelineheight:{
            type:'string',
            default:'Desktop',
        },
        readmoreLineHeightmob:{
            type:'number',
            default:'25px'
        }, 
        readmoreTransform:{
            type:'string',
        }, 
        readmoreDecoration:{
            type:'string',
            default:'none',
        }, 
        previewreadmoreltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        readmoreLetterSpacing:{
            type:'number',
        },
        readmoreLetterSpacingtab:{
            type:'number',
        },
        readmoreLetterSpacingmob:{
            type:'number',
        },
        addid:{
          type:'string',
        },
        addclass:{
          type:'string',
        },
        customcss:{
          type:'string',
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
    supports: {
        align: true,
        html: false,        
    },
    edit:BlockEdit,

        migrate: ( oldAttributes ) => {
            // This needs the full category object, not just the ID.
            return {
                ...oldAttributes,
                categories: [ { id: Number( oldAttributes.categories ) } ],
            };
        },
        isEligible: ( { categories } ) =>
            categories && 'string' === typeof categories,
        save: () => null,
})