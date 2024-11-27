import {registerBlockType} from "@wordpress/blocks";
const { RichText,  ColorPalette,  InspectorControls,  BlockControls,  AlignmentToolbar,  withColors,  FontSizePicker, getColorClassName, PanelColorSettings} = wp.blockEditor;
import { PanelBody, Popover, Button, ButtonGroup, ResponsiveWrapper, RangeControl, ToggleControl,  __experimentalInputControl as InputControl, SelectControl, TextControl, __experimentalBoxControl as BoxControl, BaseControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import {icons} from './lib/icons';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import {fontAwesomeIcons} from './lib/fontAwesomeIcons';
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	
	const { attributes, setAttributes, clientId } = props;
	const{ uniqueid, topbartypes, dateFormat, topbaricon, previewwidth, iconWidth,iconWidthtab, iconWidthmob, timeFormat, topbartarget, text, textlink, textAlignment, title, border, colorType, borderradius, textborder, textborderradius, iconborder, iconborderradius, previewmargins, previewpaddings, previewtextmargins, previewtextpaddings, previewiconmargins, previewiconpaddings, controlType, Contenttag, titleColor, titlehColor, bgColor, iconColor, iconhColor, iconbgColor, iconbghColor, bggradientValue, bghColor, bggradienthValue, shadowColor, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, textmargins, textmarginstab, textmarginsmob, textpaddings, textpaddingstab, textpaddingsmob, iconmargins, iconmarginstab, iconmarginsmob, iconpaddings, iconpaddingstab, iconpaddingsmob, previewfontsize, previewlineheight, previewltrspaceing, fontfamily, titlefontSize, titlefontSizetab, titlefontSizemob, TitleLineHeight, TitleLineHeighttab, TitleLineHeightmob, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, TitleLetterSpacingtab, TitleLetterSpacingmob, textshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, addcss, addjs, advid, advclass, advcss }=attributes;	
	setAttributes({ uniqueid: 'gutenseetopbar' +clientId.slice(0,8) });
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const [searchTerm, setSearchTerm] = useState('');
	// Filter the icons based on search term
        const filteredIcons = searchTerm
            ? fontAwesomeIcons.filter(icon =>
                icon.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : fontAwesomeIcons;

	// Number of icons per page
	const iconsPerPage = 40;

   // Calculate total pages based on filtered icons
    const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

    // Get icons for current page
    const currentIcons = filteredIcons.slice(
        (currentPage - 1) * iconsPerPage,
        currentPage * iconsPerPage
    );

    const selectIcon = (icon) => {
        setAttributes({ topbaricon: icon });
        setIsDropdownOpen(false);
    };

    // Function to go to next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to go to previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

	const blockclass='gutensee-topbar';
	const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
	const animationclass='animated '+attributes.durations+' '+attributes.animation;
	const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
	const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
	const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
	const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

	const iconbordertop=(iconborder.top != undefined) ? `${iconborder.top.width} ${iconborder.top.style} ${iconborder.top.color}` : null;
	const iconborderright=(iconborder.right != undefined) ? `${iconborder.right.width} ${iconborder.right.style} ${iconborder.right.color}` : null;
	const iconborderbottom=(iconborder.bottom != undefined) ? `${iconborder.bottom.width} ${iconborder.bottom.style} ${iconborder.bottom.color}` : null;
	const iconborderleft=(iconborder.left != undefined) ? `${iconborder.left.width} ${iconborder.left.style} ${iconborder.left.color}` : null;

	const textbordertop=(textborder.top != undefined) ? `${textborder.top.width} ${textborder.top.style} ${textborder.top.color}` : null;
	const textborderright=(textborder.right != undefined) ? `${textborder.right.width} ${textborder.right.style} ${textborder.right.color}` : null;
	const textborderbottom=(textborder.bottom != undefined) ? `${textborder.bottom.width} ${textborder.bottom.style} ${textborder.bottom.color}` : null;
	const textborderleft=(textborder.left != undefined) ? `${textborder.left.width} ${textborder.left.style} ${textborder.left.color}` : null;

	const topbarlinktarget=(topbartarget == true) ? '_blank' : '_self';

	function setPreviewwidth(value) {
		setAttributes({previewwidth:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewtextmargins(value) {
		setAttributes({previewtextmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewtextpaddings(value) {
		setAttributes({previewtextpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewiconmargins(value) {
		setAttributes({previewiconmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewiconpaddings(value) {
		setAttributes({previewiconpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewfontsize(value) {
		setAttributes({previewfontsize:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewlineheight(value) {
		setAttributes({previewlineheight:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewltrspaceing(value) {
		setAttributes({previewltrspaceing:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}
	
	if(fontfamily !=null){
		let url = 'https://fonts.googleapis.com/css2?family='+fontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link = document.createElement('link')
          link.href = url;
          link.rel = "stylesheet";
          link.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link);
      }
      else{
      	document.head.appendChild(link);
      }
    }  	
	const devid=setTimeout(()=>{
            	jQuery('.'+uniqueid).not('.slick-initialized').slick({
			    	vertical: true,
			        verticalSwiping: true,
			        autoplay: true,
			        autoplaySpeed: 3000,
			        arrows: false,
			        dots: false,
			        infinite: true,
			        speed: 500,
			        slidesToShow: 1,
			        slidesToScroll: 1,
			    });
		    },100);

    const [posts, setPosts] = useState([]);const now = new Date();

    useEffect(() => {
    	apiFetch({ path: `/wp/v2/posts?page=${1}&_embed` }).then((posts) => {
            setPosts(posts);
        });         
    	    
    }, [topbartypes]);

   if(topbartypes==='post'){
    jQuery('.'+uniqueid).slick('unslick');
   
         {devid}         
    }else if(topbartypes==='date'){
			jQuery('.'+uniqueid).slick('unslick');clearTimeout(devid);

	}
	else if(topbartypes==='time'){
			jQuery('.'+uniqueid).slick('unslick');clearTimeout(devid);

	}
	else if(topbartypes==='custom'){
			jQuery('.'+uniqueid).slick('unslick');clearTimeout(devid);

	}
    
	// Reset search and pagination when opening the popover
    const openDropdown = () => {
        setSearchTerm('');       // Clear search term
        setCurrentPage(1);       // Reset to the first page
        setIsDropdownOpen(true); // Open popover
    };
    

	
    let displayValue = '';

    // Format the date based on selected format
	 switch (dateFormat) {
	        case 'MM/DD/YYYY':
	            displayValue = now.toLocaleDateString('en-US');
	            break;
	        case 'DD/MM/YYYY':
	            displayValue = now.toLocaleDateString('en-GB');
	            break;
	        case 'YYYY/MM/DD':
	            displayValue = now.toISOString().split('T')[0].replace(/-/g, '/');
	            break;
	        case 'D MMMM YYYY':
	            displayValue = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
	            break;
	        case 'D MM YYYY':
	            displayValue = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	            break;
	        default:
	            displayValue = now.toLocaleDateString();
	            break;
	    }

	// Format the time based on selected format
	let displayTimeValue = '';
    switch (timeFormat) {
        case 'HH:mm:ss':
            displayTimeValue = now.toLocaleTimeString('en-US', { hour12: false });
            break;
        case 'hh:mm:ss A':
            displayTimeValue = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            break;
        case 'HH:mm':
            displayTimeValue = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            break;
        case 'hh:mm A':
            displayTimeValue = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            break;
        default:
            displayTimeValue = now.toLocaleTimeString();
            break;
    }

    let content;

    switch (topbartypes) {
        case 'date':
            content = (
                <div>
                    <span className="date"><i className={topbaricon}></i>{displayValue}</span>
                </div>
            );
            break;
        case 'time':
            content = (
                <div>
                    <span className="time"><i className={topbaricon}></i>{displayTimeValue}</span>
                </div>
            );
            break;
        case 'post':
            content = (
                <div className={uniqueid} id="Dev">
                    {posts.map((post) => (
                        <div className="slide" key={post.id}>
                            <span className="slide-heading">
                                    <i className={topbaricon}></i>{post.title.rendered}
                            </span>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'custom':
            content = (
                <div>
                	<span>
	                    <a href={textlink} target={topbarlinktarget}><i className={topbaricon}></i>{text}</a>
                    </span>
                </div>
            );
            break;
        default:
            content = null;
            break;
    }
	
	setAttributes({'addcss':`<style>.gutensee-topbar#${uniqueid}{
						background-color:${bgColor};															
						background-image:${bggradientValue};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						animation-delay: ${delay}ms;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
					}
				    .gutensee-heading.${uniqueid}:hover{
						background-color:${bghColor};															
						background-image:${bggradienthValue};
					}
					.gutensee-topbar#${uniqueid} div i{
						font-size:${iconWidth};
						color:${iconColor};
						background-color:${iconbgColor};
						margin: ${iconmargins.top} ${iconmargins.right} ${iconmargins.bottom} ${iconmargins.left};
						padding: ${iconpaddings.top} ${iconpaddings.right} ${iconpaddings.bottom} ${iconpaddings.left};
						border: ${iconborder.width} ${iconborder.style} ${iconborder.color};
						border-top:${iconbordertop};
						border-right:${iconborderright};
						border-bottom:${iconborderbottom};
						border-left:${iconborderleft};
						border-radius: ${iconborderradius.top} ${iconborderradius.right} ${iconborderradius.bottom} ${iconborderradius.left};
					}
					.gutensee-topbar#${uniqueid} div i:hover{
						color:${iconhColor};
						background-color:${iconbghColor};						
					}
					.gutensee-topbar#${uniqueid} div span{
						color:${titleColor};
						margin: ${textmargins.top} ${textmargins.right} ${textmargins.bottom} ${textmargins.left};
						padding: ${textpaddings.top} ${textpaddings.right} ${textpaddings.bottom} ${textpaddings.left};
						border: ${textborder.width} ${textborder.style} ${textborder.color};
						border-top:${textbordertop};
						border-right:${textborderright};
						border-bottom:${textborderbottom};
						border-left:${textborderleft};
						border-radius: ${textborderradius.top} ${textborderradius.right} ${textborderradius.bottom} ${textborderradius.left};
						font-family:${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};

					}
					.gutensee-topbar#${uniqueid} div span a{
						color:${titleColor};
						font-family:${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};
						
					}
					.gutensee-topbar#${uniqueid} div span:hover,
					.gutensee-topbar#${uniqueid} div span a:hover{
						color:${titlehColor};
					}

					@media (max-width:1024px){
						.gutensee-topbar#${uniqueid} div span a,
						.gutensee-topbar#${uniqueid} div span a{
							letter-spacing:${TitleLetterSpacingtab}px;
							font-size: ${titlefontSizetab};
							line-height: ${TitleLineHeighttab};							
						}
						.gutensee-topbar#${uniqueid}{						
							margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
							padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};
						}
						.gutensee-topbar#${uniqueid} div span i{
							margin: ${iconmarginstab.top} ${iconmarginstab.right} ${iconmarginstab.bottom} ${iconmarginstab.left};
							padding: ${iconpaddingstab.top} ${iconpaddingstab.right} ${iconpaddingstab.bottom} ${iconpaddingstab.left};
						}
						.gutensee-topbar#${uniqueid} div span i{
							font-size:${iconWidthtab};
						}
						.gutensee-topbar#${uniqueid} div span{
							margin: ${textmarginstab.top} ${textmarginstab.right} ${textmarginstab.bottom} ${textmarginstab.left};
							padding: ${textpaddingstab.top} ${textpaddingstab.right} ${textpaddingstab.bottom} ${textpaddingstab.left};
						}					    
					}

					@media (max-width:767px){
						.gutensee-topbar#${uniqueid} div span a,
						.gutensee-topbar#${uniqueid} div span a{
							letter-spacing:${TitleLetterSpacingmob}px;
							font-size: ${titlefontSizemob};
							line-height: ${TitleLineHeightmob};							
						}
						.gutensee-topbar#${uniqueid}{						
							margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
							padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};
						}
						.gutensee-topbar#${uniqueid} div  i{
							margin: ${iconmarginsmob.top} ${iconmarginsmob.right} ${iconmarginsmob.bottom} ${iconmarginsmob.left};
							padding: ${iconpaddingsmob.top} ${iconpaddingsmob.right} ${iconpaddingsmob.bottom} ${iconpaddingsmob.left};
						}
						.gutensee-topbar#${uniqueid} div  i{
							font-size:${iconWidthmob};
						}
						.gutensee-topbar#${uniqueid} div span{
							margin: ${textmarginsmob.top} ${textmarginsmob.right} ${textmarginsmob.bottom} ${textmarginsmob.left};
							padding: ${textpaddingsmob.top} ${textpaddingsmob.right} ${textpaddingsmob.bottom} ${textpaddingsmob.left};
						}	
					}</style>`});  
	
	setAttributes({'addjs':`<script>
	                            var url2 = "https://fonts.googleapis.com/css2?family=${fontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
	                            var link2 = document.createElement("link");
	                            link2.href = url2;
	                            link2.rel = "stylesheet";
	                            link2.type =  "text/css";             
	                            document.head.appendChild(link2);

	                            jQuery(document).ready(function() {
		                            jQuery(".slick-slider.${uniqueid}").not(".slick-initialized").slick({
		                                vertical: true,
		                                verticalSwiping: true,
		                                autoplay: true,
		                                autoplaySpeed: 3000,
		                                arrows: false,
		                                dots: false,
		                                infinite: true,
		                                speed: 500,
		                                slidesToShow: 1,
		                                slidesToScroll: 1,
		                            });
		                        });

		                        document.addEventListener('DOMContentLoaded', function() {
							    const timeElements = document.querySelectorAll('#${uniqueid} .display-time');

							    timeElements.forEach(function(timeElement) {
							        const timeFormat = timeElement.getAttribute('data-time-format');

							        // Function to update the time
							        function updateTime() {
							            const now = new Date();
							            let timeString = '';

							            switch (timeFormat) {
							                case 'HH:mm:ss':
							                    timeString = now.toLocaleTimeString('en-US', { hour12: false });
							                    break;
							                case 'hh:mm:ss A':
							                    timeString = now.toLocaleTimeString('en-US', { hour12: true });
							                    break;
							                case 'HH:mm':
							                    timeString = now.toLocaleTimeString('en-US', { hour12: false, minute: '2-digit' });
							                    break;
							                case 'hh:mm A':
							                    timeString = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
							                    break;
							                default:
							                    timeString = now.toLocaleTimeString('en-US', { hour12: false });
							            }

							            timeElement.textContent = timeString;
							        }

							        // Update the time immediately
							        updateTime();

							        // Update the time every second
							        setInterval(updateTime, 1000);
							    });
							});

                 			</script>`
                });

	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `${addcss}	`					
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

				{/* Basic Control*/}
				{controlType === 'basic' && (
					<>
					<div className="gutensee_block_content_section">
						<SelectControl
				            label={__('Types','gutensee')}
				            value={ topbartypes }
				            options={ [
			                  { label: __('Date','gutensee'), value: 'date' },
			                  { label: __('Time','gutensee'), value: 'time' },
			                  { label: __('Post','gutensee'), value: 'post' },
			                  { label: __('Custom','gutensee'), value: 'custom' },
				            ]}
		            		onChange={ (value) => setAttributes({ topbartypes: value })}					  
		        		/>
		        		{topbartypes==='date' &&(
			        		<SelectControl
	                            label="Select Date Format"
	                            value={dateFormat}
	                            options={[
	                                { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
	                                { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
	                                { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
	                                { label: 'D MMMM YYYY', value: 'D MMMM YYYY' },
	                                { label: 'D MM YYYY', value: 'D MM YYYY' },                                
	                            ]}
	                            onChange={(value) => setAttributes({ dateFormat: value })}
	                        />
	                     )}
	                    {topbartypes==='time' && (
	                        <SelectControl
	                            label="Select Time Format"
	                            value={timeFormat}
	                            options={[
	                                { label: 'HH:mm:ss', value: 'HH:mm:ss' },
	                                { label: 'hh:mm:ss A', value: 'hh:mm:ss A' },
	                                { label: 'HH:mm', value: 'HH:mm' },
	                                { label: 'hh:mm A', value: 'hh:mm A' }
	                            ]}
	                            onChange={(value) => setAttributes({ timeFormat: value })}
	                        />
	                    )}
	                    {((topbartypes=='custom') || (topbartypes=='post')) &&(
		                    <ToggleControl
					            label={ __('Open in new Tab','gutensee') }
					            checked={topbartarget}
					            onChange={(newtext) => setAttributes({ topbartarget: newtext })}
					        />
				        )}
				        {topbartypes==='custom' && (
					        <>
			                    <TextControl
						            label={__('Text','gutensee')}			    
						            value={text}
			        				onChange={(newtext) => setAttributes({ text: newtext })}
							    />
							    <TextControl
						            label={__('Text Link','gutensee')}			    
						            value={textlink}
			        				onChange={(newtext) => setAttributes({ textlink: newtext })}
							    />
							</>
						)}
                        <ButtonGroup className={'gutensee-button-group'}>
                            <p>{__('Select Icon','gutensee')}</p>
                            {topbaricon && (
                                <>
                                    <div className={"gutensee-icon-picker"}><i className={`fa ${topbaricon}`}></i></div>
                                </>
                            )}
	                        <Button
	                            isPrimary
	                            onClick={openDropdown}
	                        >
	                            {topbaricon ? (
	                                    <>
	                                        {__('Change Icon')}
	                                    </>
	                                ) : __('Select an Icon')
	                            }   
	                        </Button>

	                        {isDropdownOpen && (
	                            <Popover onClose={() => setIsDropdownOpen(false)}>
	                            	{/* Search Box */}
	                                <TextControl
	                                    placeholder={__('Search Icons')}
	                                    value={searchTerm}
	                                    autocomplete={'off'}
	                                    onChange={(value) => {
	                                        setSearchTerm(value);
	                                        setCurrentPage(1); // Reset to first page on search
	                                    }}
	                                />	
	                                <div className="gutensee-icon-picker-grid">
	                                    {currentIcons.map((icon) => (
	                                        <Button
	                                            key={icon.value}
	                                            onClick={() => selectIcon(icon.value)}
	                                            className="gutensee-icon-picker-icon"
	                                        >
	                                            <i className={icon.icon}></i>
	                                        </Button>
	                                    ))}
	                                </div>
	                                {/* Pagination Controls */}
	                                <div className="gutensee-pagination-controls">
	                                    <Button
	                                        onClick={prevPage}
	                                        disabled={currentPage === 1}
	                                    >
	                                        {__('Previous')}
	                                    </Button>
	                                    <span>{__('Page')} {currentPage} {__('of')} {totalPages}</span>
	                                    <Button
	                                        onClick={nextPage}
	                                        disabled={currentPage === totalPages}
	                                    >
	                                        {__('Next')}
	                                    </Button>
	                                </div>
	                            </Popover>
	                        )}
                        </ButtonGroup>
				        <RadioGroup label="Width" onChange={ setPreviewwidth } checked={ previewwidth } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
				        { previewwidth === 'Desktop' && (
			        		<> 
						        <RangeControl 
						            label={__('Width(px)','gutensee')}
						           	value={iconWidth}
						            onChange={(newtext) => setAttributes({ iconWidth: newtext })}
						            min={0}
									max={500}

						        />
						    </>
						)}
						{ previewwidth === 'Tablet' && (
			        		<> 
						        <RangeControl 
						            label={__('Width(px)','gutensee')}
						           	value={iconWidthtab}
						            onChange={(newtext) => setAttributes({ iconWidthtab: newtext })}
						            min={0}
									max={500}

						        />
						    </>
						)}
						{ previewwidth === 'Mobile' && (
			        		<> 
						        <RangeControl 
						            label={__('Width(px)','gutensee')}
						           	value={iconWidthmob}
						            onChange={(newtext) => setAttributes({ iconWidthmob: newtext })}
						            min={0}
									max={500}

						        />
						    </>
						)}
						<SelectControl
				            label={__('Animation','gutensee')}
				            value={ animation }
				            options={ animationslist}
		            		onChange={ (newtext) => setAttributes({ animation: newtext }) }					  
		        		/>  
				      	{ animation != '' && (
				        	<>
						        <SelectControl
						            label={__('Durations','gutensee')}
						            value={ durations }
						            options={ animationsdurations}
						            onChange={ (newtext) => setAttributes({ durations: newtext }) }					  
						        />  
					        	<TextControl
						            label={__('Delay(ms)','gutensee')}			    
						            value={delay}
						            type={"number"}
			        				onChange={(newtext) => setAttributes({ delay: newtext })}
							    />
							</>
							)
						}

						<PanelBody initialOpen={false}	title={__('Visiblity','gutensee')} className={'gutensee-panel-edit gutensee-visible'}>
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

						<PanelBody initialOpen={false}	title={__('Color','gutensee')} className={'gutensee-panel-edit gutensee-button-dual-color'}>
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
	
							{/* Color Normal*/}
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
																	enableAlpha:true,
																	gradients:gradcolors,
																	label:__("Background"),
																	onColorChange:(newValue) => setAttributes({bgColor: newValue }),
																	onGradientChange:(newValue) => setAttributes({bggradientValue: newValue }),
																},
													] }
									        />
										</div>
									</div>

									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Text','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Text','gutensee')}
									            enableAlpha={true}
									            value={ titleColor }
									            onChange={ (newtext) => setAttributes({ titleColor: newtext }) }
									        />
										</div>
									</div>

									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Icon','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon','gutensee')}
									            enableAlpha={true}
									            value={ iconColor }
									            onChange={ (newtext) => setAttributes({ iconColor: newtext }) }
									        />
										</div>
									</div>

									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Icon Background ','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon Background','gutensee')}
									            enableAlpha={true}
									            value={ iconbgColor }
									            onChange={ (newtext) => setAttributes({ iconbgColor: newtext }) }
									        />
										</div>
									</div>
								
								</>
							)}

							{/* Color Hover*/}
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
																	enableAlpha:true,
																	gradients:gradcolors,
																	label:__("Background"),
																	onColorChange:(newValue) => setAttributes({bghColor: newValue }),
																	onGradientChange:(newValue) => setAttributes({bggradienthValue: newValue }),
																},
													] }
									        />
										</div>
									</div>
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Text','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Text','gutensee')}
									            enableAlpha={true}
									            value={ titlehColor }
									            onChange={ (newtext) => setAttributes({ titlehColor: newtext }) }
									        />
										</div>
									</div>
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Icon','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon','gutensee')}
									            enableAlpha={true}
									            value={ iconhColor }
									            onChange={ (newtext) => setAttributes({ iconhColor: newtext }) }
									        />
										</div>
									</div>
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Icon Background','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon Background','gutensee')}
									            enableAlpha={true}
									            value={ iconhColor }
									            onChange={ (newtext) => setAttributes({ iconhColor: newtext }) }
									        />
										</div>
									</div>
								
								</>
							)}

						</PanelBody>

						<PanelBody initialOpen={false}	title={__('Spacing','gutensee')} className={'gutensee-panel-edit'}>

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
							<RadioGroup label="Width" onChange={ setPreviewtextmargins } checked={ previewtextmargins } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewtextmargins === 'Desktop' && (
				        		<>
									<BoxControl 
										label={__('Text Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={textmargins}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...textmargins,
												textmargins: {
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

							{ previewtextmargins === 'Tablet' && (
				        		<>
									<BoxControl 
										label={__('Text Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={textmarginstab}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...textmarginstab,
												textmarginstab: {
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

							{ previewtextmargins === 'Mobile' && (
				        		<>
									<BoxControl 
										label={__('Text Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={textmarginsmob}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...textmarginsmob,
												textmarginsmob: {
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

							<RadioGroup label="Width" onChange={ setPreviewtextpaddings } checked={ previewtextpaddings } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewtextpaddings === 'Desktop' && (
				        		<>									
					      			<BoxControl
										values={textpaddings}
										label={__('Text Padding','gutensee')}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...textpaddings,
												textpaddings: {
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

							{ previewtextpaddings === 'Tablet' && (
				        		<>									
					      			<BoxControl
										values={textpaddingstab}
										label={__('Text Padding','gutensee')}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...textpaddingstab,
												textpaddingstab: {
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

							{ previewtextpaddings === 'Mobile' && (
				        		<>									
					      			<BoxControl
										values={textpaddingsmob}
										label={__('Text Padding','gutensee')}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...textpaddingsmob,
												textpaddingsmob: {
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
										label={__('Icon Margin','gutensee')}
										inputProps={{ min: -300 }}
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
										label={__('Icon Margin','gutensee')}
										inputProps={{ min: -300 }}
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
										label={__('Icon Margin','gutensee')}
										inputProps={{ min: -300 }}
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

							<RadioGroup label="Width" onChange={ setPreviewiconpaddings } checked={ previewiconpaddings } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewiconpaddings === 'Desktop' && (
				        		<>									
					      			<BoxControl
										values={iconpaddings}
										label={__('Icon Padding','gutensee')}
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
										label={__('Icon Padding','gutensee')}
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
										label={__('Icon Padding','gutensee')}
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

						<PanelBody initialOpen={false}	title={__('Border','gutensee')} className={'gutensee-panel-edit'}>
							<BorderBoxControl
								colors={ colors }
					            label={ __( 'Border' ,'gutensee') }
					            onChange={(newtext) => setAttributes({ border: newtext })}
					            value={ border }
					        />
							<BoxControl
								label={__('Border Radius','gutensee')}
								values={ {
									top: '0px',
									left: '0px',
									right: '0px',
									bottom: '0px',
									} }
								onChange={(newtext) => setAttributes({ borderradius: newtext })}
							/>
							<BorderBoxControl
								colors={ colors }
					            label={ __( 'Text Border' ,'gutensee') }
					            onChange={(newtext) => setAttributes({ textborder: newtext })}
					            value={ textborder }
					        />
							<BoxControl
								label={__('Text Border Radius','gutensee')}
								values={ {
									top: '0px',
									left: '0px',
									right: '0px',
									bottom: '0px',
									} }
								onChange={(newtext) => setAttributes({ textborderradius: newtext })}
							/>
							<BorderBoxControl
								colors={ colors }
					            label={ __( 'Icon Border' ,'gutensee') }
					            onChange={(newtext) => setAttributes({ iconborder: newtext })}
					            value={ iconborder }
					        />
							<BoxControl
								label={__('Icon Border Radius','gutensee')}
								values={ {
									top: '0px',
									left: '0px',
									right: '0px',
									bottom: '0px',
									} }
								onChange={(newtext) => setAttributes({ iconborderradius: newtext })}
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
						<SelectControl
				            label={__(' Font Family','gutensee')}
				            value={ fontfamily }
				            options={fontfamilylist}
				            onChange={ (newtext) => setAttributes({ fontfamily: newtext }) }
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
				            className={'gutensee-single'}
				            value={ TitleFontWeight }
				            options={ fontweightslist }
				            onChange={ (newtext) => setAttributes({ TitleFontWeight: newtext }) }					  
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
									    value={ TitleLineHeight}
							        	onChange={(newtext) => setAttributes({ TitleLineHeight: newtext })}					
									/>
								</>
							)}
							{ previewlineheight === 'Tablet' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}	
										className={'gutensee-singl'}		    
									    value={ TitleLineHeighttab}
							        	onChange={(newtext) => setAttributes({ TitleLineHeighttab: newtext })}					
									/>
								</>
							)}
							{ previewlineheight === 'Mobile' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}	
										className={'gutensee-singl'}		    
									    value={ TitleLineHeightmob}
							        	onChange={(newtext) => setAttributes({ TitleLineHeightmob: newtext })}					
									/>
								</>
							)}
						</div>

						<SelectControl
				            label={__('Transform','gutensee')}
				            className={'gutensee-single'}
				            value={ TitleTransform }
				            options={ transformslist}
				            onChange={ (newtext) => setAttributes({ TitleTransform: newtext }) }					  
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
									    value={ TitleLetterSpacing}
							        	onChange={(newtext) => setAttributes({ TitleLetterSpacing: newtext })}
									/>
								</>
							)}
							{ previewltrspaceing === 'Tablet' && (
				        		<>
						        	<UnitControl 
										label={__('Letter Spacing','gutensee')}
										className={'gutensee-singl'}			    
									    value={ TitleLetterSpacingtab}
							        	onChange={(newtext) => setAttributes({ TitleLetterSpacingtab: newtext })}
									/>
								</>
							)}
							{ previewltrspaceing === 'Mobile' && (
				        		<>
						        	<UnitControl 
										label={__('Letter Spacing','gutensee')}
										className={'gutensee-singl'}			    
									    value={ TitleLetterSpacingmob}
							        	onChange={(newtext) => setAttributes({ TitleLetterSpacingmob: newtext })}
									/>
								</>
							)}
						</div>

				        <SelectControl
				            label={__('Decoration ','gutensee')}
				            className={'gutensee-single'}
				            value={ TitleDecoration }
				            options={ decorationslist }
				            onChange={ (newtext) => setAttributes({ TitleDecoration: newtext }) }					  
				        />
				        
				    </div>
				    </>
				)}
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={attributes.textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>			
			</BlockControls>
			<div id={advid}>
				<div className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${advclass}`}  id={`${uniqueid}`} >
					{content}
				</div>
			</div>
		</Fragment>
	);
};
 

registerBlockType('gutensee/gutensee-topbar',{
	title:__('Top Bar','gutensee'),
	icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" ><rect width="280.074315" height="275.197399" rx="0" ry="0" transform="translate(9.962843 17.417558)" fill="#fff" stroke="#099" stroke-width="8"/><path d="M30.16718,83.60427v-32.0483h239.66565v32.04831L30.16718,83.60427Z" transform="matrix(1 0 0 0.956522 0.000004-4.725476)" fill="#099" stroke-width="0"/><line x1="-0.000002" y1="-73.502086" x2="0.000002" y2="73.502086" transform="matrix(-1 0 0 0.616878 150 205.583365)" fill="#099" stroke="#099" stroke-width="24"/><polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(3.078957 0 0 1.281411-3.947841 61.76511)" fill="#099"/></svg>,
	category:'gutensee',
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords:['Gutensee Top','Topbar','Top Header','Header'],
	supports: {
		html: false,
		anchor: true,
		spacing: {
		    margin: true,
		    padding: true,
    	}
	},
	attributes:{
		uniqueid:{
			type:'string'
		},
		topbartypes:{
			type:'string',
			default:'date',
		},
		topbaricon:{
			type:'string',
		},
		previewwidth:{
			type:'string',
			default:'Desktop',
		},
		iconWidth: {
			type: 'number',
		},
		iconWidthtab: {
			type: 'number',
		},
		iconWidthmob: {
			type: 'number',
		},
		dateFormat:{
			type:'string',
			default:'D MMMM YYYY',
		},
		timeFormat:{
			type:'string',
			default:'HH:mm:ss',
		},
		text:{
			type:'string',
			default:'example@abc.com',
		},
		topbartarget:{
			type:'string',
		},
		textlink:{
			type:'string',
		},
		title:{
			type:'string',
		},
		controlType:{
			type:'string',
			default:'basic',
		},
		colorType:{
			type:'string',
			default:'normal',
		},
		textAlignment: {
			type: 'string',
			default:'left'
		},
		titleColor:{
			type:'string',
		},
		bgColor:{
	    	type:'string',
	    },
	    iconColor:{
			type:'string',
		},
		iconhColor:{
			type:'string',
		},
		iconbgColor:{
			type:'string',
		},
		iconbghColor:{
			type:'string',
		},
	    bggradientValue:{
	    	type: "string",
	    },
	    titlehColor:{
			type:'string',
		},
		bghColor:{
	    	type:'string',
	    },
	    bggradienthValue:{
	    	type: "string",
	    },
	    shadowColor:{
	    	type:'string',
	    	default:'#ADACAC'
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
	            bottom: '0px'
	        }
    	},
    	marginstab: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	marginsmob: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	previewiconmargins:{
			type:'string',
			default:'Desktop',
		},
		iconmargins: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	iconmarginstab: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	iconmarginsmob: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	previewtextmargins:{
			type:'string',
			default:'Desktop',
		},
		textmargins: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	textmarginstab: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	textmarginsmob: {
	        default: {
	            top: '0px',
	            left: '0px',
	            right: '0px',
	            bottom: '0px'
	        }
    	},
    	previewpaddings:{
			type:'string',
			default:'Desktop',
		},
		paddings:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		paddingstab:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		paddingsmob:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		previewtextpaddings:{
			type:'string',
			default:'Desktop',
		},
		textpaddings:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		textpaddingstab:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		textpaddingsmob:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		previewiconpaddings:{
			type:'string',
			default:'Desktop',
		},
		iconpaddings:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		iconpaddingstab:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		iconpaddingsmob:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		previewfontsize:{
			type:'string',
			default:'Desktop',
		},
		previewlineheight:{
			type:'string',
			default:'Desktop',
		},
		previewltrspaceing:{
			type:'string',
			default:'Desktop',
		},		
		border: {
            type: 'object',
            default: {
                color: '',
                style: '',
                width: '',        
            },
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
		textborder: {
            type: 'object',
            default: {
                color: '',
                style: '',
                width: '',        
            },
        },
        textborderradius:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		iconborder: {
            type: 'object',
            default: {
                color: '',
                style: '',
                width: '',        
            },
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
	    fontfamily:{
	    	type:'string',
	    	default:'Open Sans',
	    },
		previewfontsize:{
			type:'string',
			default:'Desktop',
		},
	    titlefontSize:{
			type:'string',
		},
		titlefontSizetab:{
			type:'string',
		},
		titlefontSizemob:{
			type:'string',
		},
		TitleFontWeight:{
			type:'string',
			default:'600',
		},
		previewlineheight:{
			type:'string',
			default:'Desktop',
		},
    	TitleLineHeight:{
	    	type:'number',
	    },
	    TitleLineHeighttab:{
	    	type:'number',
	    },
	    TitleLineHeightmob:{
	    	type:'number',
	    },
	    TitleTransform:{
	    	type:'string'
	    },
	    TitleDecoration:{
	    	type:'string'
	    },
	    previewltrspaceing:{
			type:'string',
			default:'Desktop',
		},
	    TitleLetterSpacing:{
	    	type:'number'
	    },
	    TitleLetterSpacingtab:{
	    	type:'number'
	    },
	    TitleLetterSpacingmob:{
	    	type:'number'
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

	edit: BlockEdit,

	
})