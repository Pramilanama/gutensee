import {registerBlockType} from "@wordpress/blocks"
import { RichText, InspectorControls,  BlockControls,  AlignmentToolbar, FontSizePicker, PanelColorSettings, useBlockProps
, __experimentalLinkControl as LinkControl,  ColorPalette} from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl, ToggleControl, SelectControl, TextControl,  __experimentalInputControl as InputControl, TabPanel, __experimentalBoxControl as BoxControl, __experimentalBorderBoxControl as BorderBoxControl, ToolbarButton, Popover, __experimentalUnitControl as UnitControl, BaseControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
const { Fragment, useState, useRef } = wp.element;
const { __ } = wp.i18n;
import {fontfamilylist} from "./lib/fontfamilylist.js";
import classnames from 'classnames';
import { displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	
	const { attributes, setAttributes, clientId, className,	isSelected,	onReplace, mergeBlocks} = props;
	const { linkTarget, placeholder, rel, style, text, url, width } = attributes;
	setAttributes({ uniqueid: 'gutenseeblocksbutton' +clientId.slice(0,8) });
	const{ uniqueid, colorType, controlType, title, buttontype, titleColor, bgColor, bggradientValue, bggradienthValue, titlehColor, bghColor, shadowColor, border, borderradius, margins, buttonpaddings, fontfamily, titlefontSize, TitleLineHeight, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, previewmargins,previewbtnpaddings,previewfontsize, previewlineheight, previewltrspaceing, marginstab, marginsmob, buttonpaddingstab, buttonpaddingsmob, titlefontSizetab, titlefontSizemob, TitleLineHeighttab, TitleLineHeightmob, TitleLetterSpacingtab, TitleLetterSpacingmob, customcss, customjs, advid, advclass, advcss }=attributes;	
	const blockclass='gutensee-button-wrapper';
	const buttonclass='gutensee-button';
	const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
	const animationclass='animated '+attributes.durations+' '+attributes.animation;
	const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
	const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
	const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
	const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;
	const NEW_TAB_REL = 'noreferrer noopener'; 

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewbtnpaddings(value) {
		setAttributes({previewbtnpaddings:value});
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

	function unlink() {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingURL( false );
	}

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	}
	const blockProps = useBlockProps();

	if(fontfamily !=null){
		let urlf = 'https://fonts.googleapis.com/css2?family='+fontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
         let link = document.createElement('link')
          link.href = urlf;
          link.rel = "stylesheet";
          link.type =  "text/css";
          
          if ( jQuery("body").hasClass("site-editor-php") ) { 
          jQuery('iframe').contents().find("head").append(link);
      }else{
      	document.head.appendChild(link);
      }
    }  
    const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const ref = useRef();
	const richTextRef = useRef();

	const isURLSet = !! url;
	const opensInNewTab = linkTarget === '_blank';
	const [ isEditingURL, setIsEditingURL ] = useState( false );

	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
	
	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `.gutensee-button-wrapper#${uniqueid} .wp-block-gutensee-gutensee-button{
						color: ${titleColor};
						background-color:${bgColor};
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};						
						border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
						padding: ${buttonpaddings.top} ${buttonpaddings.right} ${buttonpaddings.bottom} ${buttonpaddings.left};	
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};
						animation-delay: ${delay}ms;
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						font-family:${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						background-image:${bggradientValue};
					}
					.gutensee-button-wrapper#${uniqueid} .wp-block-gutensee-gutensee-button:hover{
						color: ${titlehColor};
						background-color:${bghColor};
						background-image:${bggradienthValue};
					}
					.gutensee-button-wrapper#${uniqueid}{
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						animation-delay: ${delay}ms;		

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

						<Button isSmall={true} isPressed={controlType === 'typo'} onClick={() => setAttributes({controlType: 'typo',})}>
							Typo
						</Button>

					</div>
				</div>

				{/* Basic Cont*/}
				{controlType === 'basic' && (
					<>
					<div className="gutensee_block_content_section">
						<SelectControl
				            label={__('Button','gutensee')}
				            value={ buttontype }
				            options={ [
				                { label: __('Link','gutensee'), value: 'link' },
				                { label: __('Submit','gutensee'), value: 'submit' },
				            ] }
				            onChange={ (newtext) => setAttributes({ buttontype: newtext }) }					  
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
								            title={ __('Title','gutensee')}
								            value={ titleColor }
								            onChange={ (newtext) => setAttributes({ titleColor: newtext }) }
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
								</>
							)}

							{/* Hover Color*/}
							{colorType === 'hover' && (
								<>
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
							<RadioGroup label="Width" onChange={ setPreviewbtnpaddings } checked={ previewbtnpaddings } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewbtnpaddings === 'Desktop' && (
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
							{ previewbtnpaddings === 'Tablet' && (
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
							{ previewbtnpaddings === 'Mobile' && (
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
				            options={ transformslist }
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
		<div className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${advclass}`} id={uniqueid}>
			{buttontype == 'link' && 
				<a className={buttonclass} id={advid}> 
					<RichText
						ref={ richTextRef }
						tagName={"span"}
						aria-label={ __( 'Button text' ) }
						placeholder={ placeholder || __( 'Add text…','gutensee' ) }
						value={ title }
						onChange={ (newtext) => setAttributes({ title: newtext })}
						withoutInteractiveFormatting
						className={ classnames(
							className,
							'wp-block-button__link',
							
						) }			
					/>
				</a>
			}
			{buttontype == 'submit' && 
				<button className={`${buttonclass} ${alignmentClass}`} id={advid}>
					<RichText
						ref={ richTextRef }
						tagName={"span"}
						aria-label={ __( 'Button text' ) }
						placeholder={ placeholder || __( 'Add text…','gutensee' ) }
						value={ title }
						onChange={ (newtext) => setAttributes({ title: newtext })}
						withoutInteractiveFormatting
						className={ classnames(
							className,
							'wp-block-button__link',
							
						) }			
					/>
				</button>
			}
		</div>
		{ buttontype == 'link' &&
			<BlockControls group="block">
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ startEditing }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>
		}
		{ isSelected && ( isEditingURL || isURLSet ) && (
			<Popover
				position="bottom center"
				onClose={ () => {
					setIsEditingURL( false );
					richTextRef.current?.focus();
				} }
				anchor={ popoverAnchor }
				focusOnMount={ isEditingURL ? 'firstElement' : false }
				__unstableSlotName={ '__unstable-block-tools-after' }
				shift
			>
				<LinkControl
					className="wp-block-navigation-link__inline-link-input"
					value={ { url, opensInNewTab } }
					onChange={ ( {
						url: newURL = '',
						opensInNewTab: newOpensInNewTab,
					} ) => {
						setAttributes( { url: newURL } );

						if ( opensInNewTab !== newOpensInNewTab ) {
							onToggleOpenInNewTab( newOpensInNewTab );
						}
					} }
					onRemove={ () => {
						unlink();
						richTextRef.current?.focus();
					} }
					forceIsEditingLink={ isEditingURL }
				/>
			</Popover>
		) }
	</Fragment>
	);
};
 

registerBlockType('gutensee/gutensee-button',{
	title:__('Button','gutensee'),
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="Layer_1"><title>Button</title><rect stroke="#000" rx="3" id="svg_3" height="15.66112" width="23.8516" y="4.85889" x="0.0742" stroke-width="0" fill="#009999"/><rect id="svg_4" height="0" width="0.85952" y="14.92236" x="15.72458" stroke-width="0" stroke="#000" fill="#000000"/><text transform="matrix(3.66914 0 0 5.18275 -10.3222 -50.7942)" stroke="#000"  text-anchor="start" font-family="Noto Sans JP" font-size="2" id="svg_5" y="12.93439" x="3.39902" stroke-width="0" fill="#ffffff">Button</text></g></svg>,
	category:'gutensee',
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords:['Gutensee Button','Button','Link'],
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
		url: {
			"type": "string",
			"source": "attribute",
			"selector": "a",
			"attribute": "href"
		},
		linkTarget: {
			"type": "string",
			"source": "attribute",
			"selector": "a",
			"attribute": "target"
		},
		rel: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "rel"
		},
		placeholder: {
			type: "string"
		},
		title:{
			type:'string',
			default:'Button',
		},
		buttontype:{
			type:'string',
			default:'link'
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
	    	default:'#009999',
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
	    	default:'#000'
	    },
	    border: {
            type: 'object',
            default: {
                color: '#000',
                style: '0px',
                width: '',        
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
		previewbtnpaddings:{
			type:'string',
			default:'Desktop',
		},
		buttonpaddings:{
			type: 'object',
		    default: {
		        top: '',
		        left: '',
		        bottom: '',
		        right: '',
		        
		      },
		},
		buttonpaddingstab:{
			type: 'object',
		    default: {
		        top: '',
		        left: '',
		        bottom: '',
		        right: '',
		        
		      },
		},
		buttonpaddingsmob:{
			type: 'object',
		    default: {
		        top: '',
		        left: '',
		        bottom: '',
		        right: '',
		        
		      },
		},
		boxshadow:{
			type:'boolean',
			default:false,
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
		previewlineheight:{
			type:'string',
			default:'Desktop',
		},
		TitleFontWeight:{
			type:'string',
			default:'600'
		},
    	TitleLineHeight:{
	    	type:'string',
	    	default:'15px'
	    },
	    TitleLineHeighttab:{
	    	type:'string',
	    	default:'15px'
	    },
	    TitleLineHeightmob:{
	    	type:'string',
	    	default:'15px'
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
	    customcss:{
            type:'string',
        },
        customjs:{
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

	edit:BlockEdit,

	save:(props)=>{
		const { attributes } = props;
		const{uniqueid, fontfamily, title, buttontype, titleColor, bgColor, bggradientValue, bggradienthValue, titlehColor, bghColor, shadowColor, border, borderradius, margins, buttonpaddings, titlefontSize, TitleLineHeight, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, previewmargins,previewbtnpaddings,previewfontsize, previewlineheight, previewltrspaceing, marginstab, marginsmob, buttonpaddingstab, buttonpaddingsmob, titlefontSizetab, titlefontSizemob, TitleLineHeighttab, TitleLineHeightmob, TitleLetterSpacingtab, TitleLetterSpacingmob, customcss, customjs, advid, advclass, advcss}=attributes;
		const { linkTarget, placeholder, rel, style, text, url, width } =
		attributes;
		const blockclass='gutensee-button-wrapper';
		const buttonclass='gutensee-button';
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		const animationclass='animated '+attributes.durations+' '+attributes.animation;
		const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
		const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
		const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
		const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;
		
		const buttonClasses = classnames(
			'wp-block-gutensee-gutensee-button'
		);

		const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
		const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
		const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
		const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
		
		return(
			<>	
				<style dangerouslySetInnerHTML={{
				  __html: [
				     `.gutensee-button-wrapper#${uniqueid} .wp-block-gutensee-gutensee-button{
							color: ${titleColor};
							background-color:${bgColor};							
							border: ${border.width} ${border.style} ${border.color};
							border-top:${bordertop};
							border-right:${borderright};
							border-bottom:${borderbottom};
							border-left:${borderleft};
							border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
							padding: ${buttonpaddings.top} ${buttonpaddings.right} ${buttonpaddings.bottom} ${buttonpaddings.left};	
							font-size: ${titlefontSize};
							font-weight: ${TitleFontWeight};
							line-height: ${TitleLineHeight};							
							box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
							font-family:${fontfamily};
							text-transform:${TitleTransform};
							text-decoration:${TitleDecoration};
							letter-spacing:${TitleLetterSpacing}px;
							background-image:${bggradientValue};
						}						
						.gutensee-button-wrapper#${uniqueid} .wp-block-gutensee-gutensee-button:hover{
							color: ${titlehColor};
							background-color:${bghColor};
							background-image:${bggradienthValue};
						}
						.gutensee-button-wrapper#${uniqueid}{
							margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
							animation-delay: ${delay}ms;
						}
						${advcss}`					
				    ].join('\n')
				  }}>
				</style>
				<script> 
					var fontfamily2=`{fontfamily}`;
					var url2 = 'https://fonts.googleapis.com/css2?family='+fontfamily2+':wght@100;200;300;400;500;600;700;800;900&display=swap';
					var link2 = document.createElement('link');
					link2.href = url2;
					link2.rel = "stylesheet";
					link2.type =  "text/css";	          
					document.head.appendChild(link2);
				</script>
				<div className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${props.attributes.className} ${advclass}`} id={uniqueid}>
					{buttontype == 'link' && 
						<a className={buttonclass} href={ url } target={ linkTarget } rel={ rel } id={advid}>
							<RichText.Content
								tagName={"span"}
								className={ buttonClasses }
								title={ title }
								value={ title }
							/>
						</a>
					}
					{buttontype == 'submit' && 
						<button className={`${buttonclass} ${alignmentClass}`} id={advid}>
							<RichText.Content
								tagName={"span"}
								className={ buttonClasses }
								title={ title }
								value={ title }	
							/>
						</button>
					}
				</div>

			</>
		)
	}
})