import { registerBlockType } from '@wordpress/blocks'; 
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls, AlignmentToolbar, PanelColorSettings, ColorPalette, BlockControls, useBlockProps, __experimentalLinkControl as LinkControl, InnerBlocks } from '@wordpress/block-editor';
import {  PanelBody, Button, Popover, ButtonGroup, SelectControl, RangeControl,  TabPanel,  __experimentalBoxControl as BoxControl, ToggleControl, TextControl,  __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, BaseControl, __experimentalInputControl as InputControl, TextareaControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from "@wordpress/components";

import FontIconPicker from '@fonticonpicker/react-fonticonpicker';

import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
const ALLOWED_BLOCKS= ['gutensee/gutensee-social-icon'];
import {socialIcons} from './lib/socialicons';
import MonacoEditor from '@monaco-editor/react';

const IconBlock = (props) => {

    const { attributes, setAttributes,clientId } = props;

    setAttributes({ uniqueid: 'socialicon' +clientId.slice(0,8) });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	// Filter the icons based on search term
        const filteredIcons = searchTerm
            ? socialIcons.filter(icon =>
                icon.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : socialIcons;

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
        setAttributes({ icon: icon });
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

    const { addid, uniqueid, controlType, colorType, link, icon, hideIcon, previewmargins, margins, marginstab, marginsmob, previewpaddings, paddings, paddingstab, paddingsmob, iconColor,  iconWidth,  shadowColor, bggradientValue, bggradienthValue, boxshadow, iconhColor, borderradius, hshadow, vshadow, blurshadow, hidedesktop, hidemobile, hidetablet, animation, durations,  delay, border, iconBg, iconhBg, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, linktarget, textAlignment, addclass, customcss, advid, advclass, advcss} = attributes;

    const blockProps = useBlockProps();

    const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
		
	const animationclass='wow animated '+attributes.durations+' '+attributes.animation;

	const displaydesktop=(hidedesktop != true) ? 'hide-desktop' : '';
	const displaytablet=(hidetablet != true) ?   'hide-tablet' : '';
	const displaymobile=(hidemobile != true) ?   'hide-mobile' : '';
	const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

    const IconSocial = 'icon-socials';

    function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}
	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	} 
	function setIconColor(value){
        setAttributes({iconColor :value})
    }	
    function setIconBgColor(value){
        setAttributes({iconBg :value})
    }	
    function setShadowColor(value){
        setAttributes({shadowColor :value})
    }	
    function seticonhColor(value){
        setAttributes({iconhColor :value})
    }	
    function setIconhBgColor(value){
        setAttributes({iconhBg :value})
    }	

	var urlfontawesome=gutensee_plugin.gutensee_pluginpath+'assets/js/fontawesome.js';
     let linkfontawesome = document.createElement('script');
     linkfontawesome.src=urlfontawesome;
     jQuery('iframe').contents().find('head').append(linkfontawesome);
   	
   	// Reset search and pagination when opening the popover
    const openDropdown = () => {
        setSearchTerm('');       // Clear search term
        setCurrentPage(1);       // Reset to the first page
        setIsDropdownOpen(true); // Open popover
    };
    
    return (
        <Fragment>
            <style dangerouslySetInnerHTML={{
				__html: [
				`.icon-socials#${uniqueid} a i{
				    font-size: ${iconWidth + 'px'};
				    color: ${iconColor};
				    border: ${border.width} ${border.style} ${border.color};
				    border-top:${bordertop};
					border-right:${borderright};
					border-bottom:${borderbottom};
					border-left:${borderleft};
					border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};		
				    box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
				    padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
				    background-color:${iconBg};
				}
				.icon-socials#${uniqueid} a i:hover{
				    color: ${iconhColor};
				    background-color:${iconhBg};
				}
				.icon-socials#${uniqueid} a{
				   margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
				}
				.icon-socials#${uniqueid}{
					justify-content: ${textAlignment};
				}
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

					</div>
				</div>

				{/* Basic Cont*/}
				{controlType === 'basic' && (
					<>
						<div className="gutensee_block_content_section">
							<ButtonGroup className={'gutensee-button-group'}>
	                            <p>{__('Select Icon','gutensee')}</p>
	                            {icon && (
	                                <>
	                                    <div className={"gutensee-icon-picker"}><i className={`fa ${icon}`}></i></div>
	                                </>
	                            )}
		                        <Button
		                            isPrimary
		                            onClick={openDropdown}
		                        >
		                            {icon ? (
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
							<RangeControl 
							    label={__('Width(PX)','gutensee')}
							    value={iconWidth}
							    onChange={(newtext) => setAttributes({ iconWidth: newtext })}
							    min={0}
							    max={100}

							/>
							<TextControl
	                            id={attributes.uniqueid}
	                            label={__('Link','gutensee')}			    
	                            value={ attributes.link}
	                            onChange={(newtext) => setAttributes({ link: newtext })}
	                        />
	                        <ToggleControl
								label={__('Open in new Tab','gutensee')}
								checked={linktarget}
								onChange={(newtext) => setAttributes({ linktarget: newtext })}
							/>
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

				{/* Basic Cont*/}
				{controlType === 'style' && (
					<>
						<div className="gutensee_block_content_section">
							<PanelBody initialOpen={false}	title={__('Color','gutensee')} className={'gutensee-panel-edit gutensee-button-dual-color'}>
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
											{ __('Title','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon','gutensee')}
									            value={ iconColor }
									            enableAlpha={'true'}
									            onChange={ (newtext) => setAttributes({ iconColor: newtext }) }
									        />
										</div>
									</div>
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Background','gutensee')}
										</p>
										<div className="gutensee_block_section_panel gutensee-color-gradient">						
											<PanelColorGradientSettings className="gutensee-color-gradient"
												settings={ [
													{
														colorValue: attributes.iconBg,
														gradientValue: attributes.bggradientValue,
														colors:dualcolors,
														gradients:gradcolors,
														enableAlpha:'true',
														label:__("Background"),
														onColorChange:(newValue) => setAttributes({iconBg: newValue }),
														onGradientChange:(newValue) => setAttributes({bggradientValue: newValue }),
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
											{ __('Icon','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Icon','gutensee')}
									            value={ iconhColor }
									            enableAlpha={'true'}
									            onChange={ (newtext) => setAttributes({ iconhColor: newtext }) }
									        />
										</div>
									</div>
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Background','gutensee')}
										</p>
										<div className="gutensee_block_section_panel gutensee-color-gradient">						
											<PanelColorGradientSettings className="gutensee-color-gradient"
												settings={ [
														{
												colorValue: attributes.iconhBg,
												gradientValue: attributes.bggradienthValue,
												colors:dualcolors,
												enableAlpha:'true',
												gradients:gradcolors,
												label:__("Background"),
												onColorChange:(newValue) => setAttributes({iconhBg: newValue }),
												onGradientChange:(newValue) => setAttributes({bggradienthValue: newValue }),
											},
													] }
									        />
										</div>
									</div>							
									</>
								)}
							</PanelBody>

							<PanelBody initialOpen={false}	title={__('Box Shadow','gutensee')} className={'gutensee-panel-edit'}>					
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
									values={ borderradius }
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
            </InspectorControls>

            <BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>			
			</BlockControls>
            
			<div className={`${IconSocial} ${animationclass} ${advclass}`} id={uniqueid} 
				style={{ animationDelay: delay+ 'ms'}}>
				<a className={displayclass} id={`${advid}`}>
                    <i className={icon} ></i>
                </a> 
			</div>            
			
        </Fragment>
    )
}

registerBlockType('gutensee/gutensee-social',{
    title:__('Social Icon','gutensee'),
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="280.074315" height="275.197399" rx="0" ry="0" transform="matrix(1.0398 0 0 1.061772 4.389368 3.901554)" fill="#fff" stroke="#099" stroke-width="8"/><circle r="27.57697" transform="matrix(1.627273 0 0 1.668871 194.875265 78.767429)" fill="#099" stroke-width="5"/><circle r="27.260847" transform="matrix(1.627273 0 0 1.715157 199.612299 221.146226)" fill="#099" stroke-width="5"/><circle r="27.576813" transform="matrix(1.627273 0 0 1.715157 70.86201 157.564769)" fill="#099" stroke-width="5"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(1.69607-1.06148 0.54286 0.867401 17.628474 119.970181)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(1.632699 0.802868-.47879 0.973659 71.879515 101.106853)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/></svg>,
    category:'gutensee',
    parent:['gutensee/gutensee-socials'],
    example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
    keywords:['Social Icon','Gutensee', 'Icon'],
    supports: {
    html: false,
    anchor: true,
    align: ['wide', 'full']
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
		icon:{
            type:'string',
            default:'fa-brands fa-x-twitter'
        },
        iconWidth:{
            type:'number',
            default:20
        },
        bggradientValue:{
        	type:'string',
        },
        iconColor:{
            type:'string',
            default:'#fff'
        },
        iconhColor:{
            type:'string'
        },
        iconBg:{
            type:'string',
        	default:'#009999'
        },
        iconhBg:{
            type:'string'
        },
        previewmargins:{
            type:'string',
        	default:'Desktop',
        },
        margins:{
            default: {
                top: '0px',
                left: '8px',
                right: '8px',
                bottom: '0px'
            }
        },
        marginstab:{
            default: {
                top: '0px',
                left: '8px',
                right: '8px',
                bottom: '0px'
            }
        },
        marginsmob:{
            default: {
                top: '0px',
                left: '8px',
                right: '8px',
                bottom: '0px'
            }
        },
        link:{
            type:'string',
            default:''
        },
        linktarget:{
        	type:'boolean',
        	default:true,
        },
		textAlignment: {
			type: 'string',
			default:'left'
		},
        bordertopradius:{
	    	type: 'string',
	    	default: '0px'
	    },
	    borderrightradius:{
	    	type: 'string', 
	    	default: '0px' 
	    },
	    borderbottomradius:{
	    	type: 'string',
	    	default: '0px'
	    },
	    borderleftradius:{
	    	type: 'string',
	    	default: '0px'
	    },
        border: {
            type: 'object',
            default: {
                color: '',
                style: '',
                width: '',        
            },
        },
        borderradius: {
            type: 'object',
            default: {
		        top: '10px',
		        left: '10px',
		        right: '10px',
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
    	hshadow: {
			type: 'number',
			default:0
		},
		vshadow: {
			type: 'number',
			default:0
		},
		blurshadow: {
			type: 'number',
			default:0
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
	    boxshadow:{
	    	type:'boolean',
	    	default:false,
	    },
	    shadowColor:{
	    	type:'string',
	    	default:'#000'
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
    edit: IconBlock,
    save: (props) => {
        const { attributes } = props;

        const { addid, uniqueid, controlType, colorType, link, icon, hideIcon, previewmargins, margins, marginstab, marginsmob, previewpaddings, paddings, paddingstab, paddingsmob, iconColor,  iconWidth,  shadowColor, bggradientValue, bggradienthValue, iconhColor, borderradius, hshadow, vshadow, blurshadow, hidedesktop, hidemobile, hidetablet, animation, durations,  delay, border, iconBg, iconhBg, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, linktarget, textAlignment, addclass, customcss, advid, advclass, advcss} = attributes;

        const animationclass='wow animated '+attributes.durations+' '+attributes.animation;

        const displaydesktop=(hidedesktop != true) ? 'hide-desktop' : '';
        const displaytablet=(hidetablet != true) ? 'hide-tablet' : '';
        const displaymobile=(hidemobile != true) ? 'hide-mobile' : '';
        const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

        const IconSocial = 'icon-socials';

        const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
		const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
		const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
		const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
		
		const openinnew=(linktarget == true)?'_blank':'_self';
		
        return (
            <>
                <style dangerouslySetInnerHTML={{
					__html: [
					`.icon-socials#${uniqueid} a i{
					    font-size: ${iconWidth + 'px'};
					    color: ${iconColor};
					    background-color:${iconBg};
					    border: ${border.width} ${border.style} ${border.color};
					    border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};		
				   		box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
					    padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
					}
					.icon-socials#${uniqueid} a i:hover{
					    color: ${iconhColor};
					    background-color:${iconhBg};
					}
					.icon-socials#${uniqueid} a{
					    margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
					}
					.icon-socials#${uniqueid}{
						justify-content: ${textAlignment};
					}
					${advcss}`
					].join('\n')
            	}}>
                </style>

                <div className={`${IconSocial} ${animationclass} ${displayclass} ${props.attributes.className} ${advclass}`} id={uniqueid}
					style={{ animationDelay: delay+ 'ms',}}>                
                    <a  href={link} target={openinnew} rel="noopener noreferrer" id={`${advid}`}>
                        <i className={icon} ></i>
                    </a> 
                </div>            	
            </>
        )
    }    
});