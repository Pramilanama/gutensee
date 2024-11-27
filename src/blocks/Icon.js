const { registerBlockType } = wp.blocks;
const { InspectorControls, PanelColorSettings,  BlockControls,  AlignmentToolbar, useBlockProps } = wp.blockEditor;
const { PanelBody, Popover, ButtonGroup, RangeControl, ToggleControl, SelectControl, TextControl, TextareaControl } = wp.components; 
import { __experimentalBorderBoxControl as BorderBoxControl, __experimentalInputControl as InputControl,  __experimentalBoxControl as BoxControl, TabPanel, __experimentalUnitControl as UnitControl, BaseControl, Button, ColorPalette, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup  } from '@wordpress/components';
const { Fragment, useState,RawHTML } = wp.element;
const { __ } = wp.i18n;
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import {icons} from './lib/icons';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontAwesomeIcons} from './lib/fontAwesomeIcons';
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	const { attributes, setAttributes,clientId } = props;
	const{ uniqueid, controlType, colorType, icontype,  iconv, svgicon, iconWidth, iconWidthtab, iconWidthmob, iconbg, iconhbg, iconbggradient, iconbghgradient, border, borderradius, previewwidth, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, iconColor, iconhColor, shadowColor, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, advid, advclass, advcss }=attributes;
	setAttributes({ uniqueid: 'gutenseeblocksicon' +clientId.slice(0,8) });
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
        setAttributes({ iconv: icon });
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

    const blockclass='gutensee-icon';
	const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
	const animationclass='animated '+attributes.durations+' '+attributes.animation;
	const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
	const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
	const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
	const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewwidth(value) {
		setAttributes({previewwidth:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	const blockProps = useBlockProps();
	
	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
	
	if(svgicon){
    //console.log('#'+uniqueid+' svg');
    // Change the viewBox to zoom into a specific portion of the SVG
    jQuery('#'+uniqueid+' svg').attr('viewBox', '0 0 24 24');
	}
	
	// Reset search and pagination when opening the popover
    const openDropdown = () => {
        setSearchTerm('');       // Clear search term
        setCurrentPage(1);       // Reset to the first page
        setIsDropdownOpen(true); // Open popover
    };
    
	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `.gutensee-icon#${uniqueid} i{
						color: ${iconColor};
						background-color:${iconbg};
						font-size: ${iconWidth}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};	
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						color: iconColor;
						background-color:iconbg;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-image:${iconbggradient};
					}
					.gutensee-icon#${uniqueid} .gutensee-svg-icon{
						color: ${iconColor};
						background-color:${iconbg};
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};	
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						color: iconColor;
						background-color:iconbg;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-image:${iconbggradient};
					}
					.gutensee-icon#${uniqueid} .gutensee-svg-icon svg{
						width: ${iconWidth}px;
						height:auto;
					}
					.gutensee-icon#${uniqueid} i:hover,
					.gutensee-icon#${uniqueid} .gutensee-svg-icon svg:hover{
						color: ${iconhColor};
						background-color:${iconhbg};
						background-image:${iconbghgradient};
					}
					.gutensee-icon#${uniqueid}{
						animation-delay: ${delay}ms;
					}`					
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
						<SelectControl
                            label={__('Font Weight','gutensee')}
                            value={ icontype }
                            options={ [
                                { label: __('Icon','gutensee'), value: 'icon' },
                                { label: __('SVG','gutensee'), value: 'svg' },
                            ] }
                            onChange={ (newtext) => setAttributes({ icontype: newtext }) }                     
                        />
                        {(icontype ==='icon') ? (
                        	<>
						        <ButtonGroup className={'gutensee-button-group'}>
		                            <p>{__('Select Icon','gutensee')}</p>
		                            {iconv && (
		                                <>
		                                    <div className={"gutensee-icon-picker"}><i className={`fa ${iconv}`}></i></div>
		                                </>
		                            )}
			                        <Button
			                            isPrimary
			                            onClick={openDropdown}
			                        >
			                            {iconv ? (
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
		                    </>
		                ):(
		                	<>
		                        <TextareaControl
						            label={__('SVG','gutensee')}			    
						            value={svgicon}
			        				onChange={(newtext) => setAttributes({ svgicon: newtext })}
							    />
							</>
						)}
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
						<PanelBody initialOpen={false}	title={__('Color','gutensee')} className={'gutensee-panel-edit'}>
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
								{(icontype ==='icon') && (
									<>
										<div className="gutensee_block_section_flex_panel">
											<p className="gutensee_block_section_panel_label">
												{ __('Icon','gutensee')}
											</p>
											<div className="gutensee_block_section_panel">						
												<ColorPalette
													className={'gutensee-color'}
										            title={ __('Icon','gutensee')}
										            value={ iconColor }
										            onChange={ (newtext) => setAttributes({ iconColor: newtext }) }
										        />
											</div>
										</div>
									</>
								)}
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">
										{ __('Background','gutensee')}
									</p>
									<div className="gutensee_block_section_panel gutensee-color-gradient">						
										<PanelColorGradientSettings className="gutensee-color-gradient"
											settings={ [
												{
													colorValue: attributes.iconbg,
													gradientValue: attributes.iconbggradient,
													colors:dualcolors,
													gradients:gradcolors,
													label:__("Background"),
													onColorChange:(newValue) => setAttributes({iconbg: newValue }),
													onGradientChange:(newValue) => setAttributes({iconbggradient: newValue }),
												},
											] }
								        />
									</div>
								</div>							
								</>
							)}

							{/* Basic Cont*/}
							{colorType === 'hover' && (
								<>
								{(icontype ==='icon') && (
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
										            onChange={ (newtext) => setAttributes({ iconhColor: newtext }) }
										        />
											</div>
										</div>
									</>
								)}
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">
										{ __('Background','gutensee')}
									</p>
									<div className="gutensee_block_section_panel gutensee-color-gradient">						
										<PanelColorGradientSettings className="gutensee-color-gradient"
											settings={ [
												{
													colorValue: attributes.iconhbg,
													gradientValue: attributes.iconbghgradient,
													colors:dualcolors,
													gradients:gradcolors,
													label:__("Background"),
													onColorChange:(newValue) => setAttributes({iconhbg: newValue }),
													onGradientChange:(newValue) => setAttributes({iconbghgradient: newValue }),
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
					value={attributes.textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>			
			</BlockControls>
			<div id={advid}>
				<div id={uniqueid} className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${advclass}`}>
					{(icontype ==='icon') ? (
						<>
							<i className={iconv}></i>
						</>
					):(
						<>
							<div className={"gutensee-svg-icon"} dangerouslySetInnerHTML={{ __html: attributes.svgicon }} />
						</>
					)}				
				</div>
			</div>
		</Fragment>
	);
}
 
registerBlockType('gutensee/gutensee-icon', {
	title: __('Icon','gutensee'),
	category: 'gutensee',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="Layer_1"><title>Layer 1</title><rect stroke="#009999" id="svg_1" height="23.05801" width="23.00885" y="0.47132" x="0.46829" fill="#fff"/><text transform="matrix(1 0 0 0.653797 0.0983284 8.59945)" stroke="#009999" text-anchor="start" font-family="Noto Sans JP" font-size="30" stroke-width="0" id="svg_2" y="15.43232" x="7.89208" fill="#009999">i</text></g></svg>,
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords: ['Gutensee Icon', 'icon', 'Icon', 'SVG'],
	attributes: {
		uniqueid:{
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
		icontype:{
			type:'string',
			default:'icon',
		},
		iconv:{
			type:'string',
			default:'fa fa-home',
		},
		svgicon:{
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
		boxshadow:{
			type:'boolean',
			default: false,
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
			default: 0
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
	    	default:' '
	    },
	    delay:{
	    	type:'string',
	    },
	    iconColor:{
	    	type:'string',
	    	default:'#009999',
	    },
	    iconhColor:{
	    	type:'string',
	    },
	    iconhbg:{
	    	type:'string',
	    },
	    iconbg:{
	    	type:'string',
	    },
	    iconbggradient:{
	    	type: "string",
	    },
	    iconbghgradient:{
	    	type: "string",
	    },
	    shadowColor:{
	    	type:'string',
	    	default:'#000'
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
		align: ['wide', 'full']
	},
	edit: BlockEdit,
	save: (props) => { 
		const { attributes } = props;
		const{uniqueid, icontype, iconv, svgicon, iconWidth, previewwidth, iconWidthtab, iconWidthmob, iconbg, iconhbg, iconbggradient, iconbghgradient, border, borderradius, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, iconColor, iconhColor, shadowColor, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, advid, advclass, advcss}=attributes;

		const blockclass='gutensee-icon';
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
		
		return (
			<>
				<style dangerouslySetInnerHTML={{
				  __html: [
				     `.gutensee-icon#${uniqueid} i{
						color: ${iconColor};
						background-color:${iconbg};
						font-size: ${iconWidth}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};	
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						color: iconColor;
						background-color:iconbg;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-image:${iconbggradient};
					}
					.gutensee-icon#${uniqueid} .gutensee-svg-icon{
						color: ${iconColor};
						background-color:${iconbg};
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};	
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						color: iconColor;
						background-color:iconbg;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-image:${iconbggradient};
					}
					.gutensee-icon#${uniqueid} .gutensee-svg-icon svg{
						width: ${iconWidth}px;
						height:auto;
					}
					.gutensee-icon#${uniqueid} i:hover,
					.gutensee-icon#${uniqueid} .gutensee-svg-icon svg:hover{
						color: ${iconhColor};
						background-color:${iconhbg};
						background-image:${iconbghgradient};
					}
					.gutensee-icon#${uniqueid}{
						animation-delay: ${delay}ms;
					}`					
				    ].join('\n')
				  }}>
				</style>
				<script dangerouslySetInnerHTML={{
				  __html: [`
					if(${icontype}==='svg'){
				    	jQuery('#'+uniqueid+' svg').attr('viewBox', '0 0 24 24');
					}`
					].join('\n')
				  }}>
				</script>
				<div id={advid}>
					<div id={uniqueid} className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${props.attributes.className}`}>
						{(icontype ==='icon') ? (
							<>
								<i className={iconv}></i>
							</>
						):(
							<>
								<div className={"gutensee-svg-icon"} dangerouslySetInnerHTML={{ __html: attributes.svgicon }} />
							</>
						)}						
					</div>
				</div>
			</>
		);
	}
});