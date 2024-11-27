import {registerBlockType} from "@wordpress/blocks";
const { RichText,  ColorPalette,  InspectorControls,  BlockControls,  AlignmentToolbar,  withColors,  FontSizePicker, getColorClassName, PanelColorSettings} = wp.blockEditor;
import { PanelBody, Button, ButtonGroup, ResponsiveWrapper, RangeControl, __experimentalInputControl as InputControl, ToggleControl, SelectControl, TextControl, __experimentalBoxControl as BoxControl, BaseControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	
	const { attributes, setAttributes, clientId } = props;
	const{ uniqueid, title, border, colorType, borderradius, previewmargins, previewpaddings, controlType, Contenttag, titleColor, titlehColor, bgColor, bggradientValue, bghColor, bggradienthValue, shadowColor, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, previewfontsize, previewlineheight, previewltrspaceing, fontfamily, titlefontSize, titlefontSizetab, titlefontSizemob, TitleLineHeight, TitleLineHeighttab, TitleLineHeightmob, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, TitleLetterSpacingtab, TitleLetterSpacingmob, textshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, advid, advclass, advcss }=attributes;	
	setAttributes({ uniqueid: 'gutenseeblocksbutton' +clientId.slice(0,8) });
	const blockclass='gutensee-heading';
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

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
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
	    
	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `	.gutensee-heading.${uniqueid}{
						color: ${titleColor};
						background-color:${bgColor};															
						background-image:${bggradientValue};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};								
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};
						animation-delay: ${delay}ms;
						text-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						font-family:${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
					}
				    .gutensee-heading.${uniqueid}:hover{
							color: ${titlehColor};
							background-color:${bghColor};															
							background-image:${bggradienthValue};
					}

					@media (max-width:1024px){
						.gutensee-heading.${uniqueid}{							
							margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
							padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};								
							font-size: ${titlefontSizetab};							
							line-height: ${TitleLineHeighttab};							
							letter-spacing:${TitleLetterSpacingtab}px;							
						}
					    
					}

					@media (max-width:767px){
						.gutensee-heading.${uniqueid}{							
							margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
							padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};								
							font-size: ${titlefontSizemob};							
							line-height: ${TitleLineHeightmob};						
							letter-spacing:${TitleLetterSpacingmob}px;
						}
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

				{/* Basic Control*/}
				{controlType === 'basic' && (
					<>
					<div className="gutensee_block_content_section">
						<ButtonGroup className={'gutensee-button-group'}>
							<p>{__('Tag','gutensee')}</p>
							<Button	isSecondary	isPrimary={Contenttag == 'h1'} onClick={() => setAttributes({ Contenttag: 'h1' })}>{__('H1','gutensee')}</Button>
							<Button	isSecondary	isPrimary={Contenttag == 'h2'} onClick={() => setAttributes({ Contenttag: 'h2' })}>{__('H2','gutensee')}</Button>
							<Button	isSecondary	isPrimary={Contenttag == 'h3'} onClick={() => setAttributes({ Contenttag: 'h3' })}>{__('H3','gutensee')}</Button>
							<Button	isSecondary	isPrimary={Contenttag == 'h4'} onClick={() => setAttributes({ Contenttag: 'h4' })}>{__('H4','gutensee')}</Button>
							<Button	isSecondary	isPrimary={Contenttag == 'h5'} onClick={() => setAttributes({ Contenttag: 'h5' })}>{__('H5','gutensee')}</Button>							
							<Button	isSecondary	isPrimary={Contenttag == 'h6'} onClick={() => setAttributes({ Contenttag: 'h6' })}>{__('H6','gutensee')}</Button>
						</ButtonGroup>
				        
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
										{ __('Heading','gutensee')}
									</p>
									<div className="gutensee_block_section_panel">						
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Heading','gutensee')}
								            enableAlpha={true}
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
								</>
							)}

							{/* Color Hover*/}
							{colorType === 'hover' && (
								<>
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">
										{ __('Heading','gutensee')}
									</p>
									<div className="gutensee_block_section_panel">						
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Heading','gutensee')}
								            enableAlpha={true}
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
								</>
							)}

						</PanelBody>

						<PanelBody initialOpen={false}	title={__('Text Shadow','gutensee')} className={'gutensee-panel-edit'}>
							<ToggleControl
								label={__('Add Text Shadow','gutensee')}
								checked={textshadow}
								onChange={(newval) => setAttributes({ textshadow: newval })}
							/>
							{ textshadow != '' && (	
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
											{__('Text Shadow', 'gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
												enableAlpha={true}
									            title={ __('Text Shadow','gutensee')}
									            value={ shadowColor }
									            onChange={ (newtext) => setAttributes({ shadowColor: newtext }) }
									        />
										</div>
									</div>
								</>
								)
							}
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
				<RichText
					key="editable"
					tagName={ Contenttag }
					className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${uniqueid} ${advclass}`}
					placeholder={__('Gutensee Heading Here...','gutensee')}
					value={title}
					onChange={ (newtext) => setAttributes({ title: newtext }) }
				/>
			</div>
		</Fragment>
	);
};
 

registerBlockType('gutensee/gutensee-heading',{
	title:__('Heading','gutensee'),
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g><title>Heading</title><text transform="matrix(1 0 0 1.94281 0 -8.84511)" stroke="#000" font-weight="bold" text-anchor="start" font-family="Noto Sans JP" font-size="11" stroke-width="0" id="svg_3" y="14.43629" x="-0.04104" fill="#009999">&lt;H/&gt;</text></g></svg>,
	category:'gutensee',
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords:['Gutensee Heading','Heading','Title'],
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
		Contenttag:{
			type:'string',
			default:'h3'
		},
		textAlignment: {
			type: 'string',
			default:'left'
		},
		mediaId: {
			type: 'number',
			default: 0
		},
		mediaUrl: {
			type: 'string',
			default: ''
		},
		titleColor:{
			type:'string',
		},
		bgColor:{
	    	type:'string',
	    	default:'#009999'
	    },
	    bggradientValue:{
	    	type: "string",
	    },
	    titlehColor:{
			type:'string',
		},
		bghColor:{
	    	type:'string',
	    	default:'#009999'
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
    	previewpaddings:{
			type:'string',
			default:'Desktop',
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
		textshadow:{
	    	type: 'boolean',
			default: false
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

	save:(props)=>{
		const { attributes } = props;
		const{ uniqueid, title, border, colorType, borderradius, previewmargins, previewpaddings, controlType, Contenttag, titleColor, titlehColor, bgColor, bggradientValue, bghColor, bggradienthValue, shadowColor, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, previewfontsize, previewlineheight, previewltrspaceing, fontfamily, titlefontSize, titlefontSizetab, titlefontSizemob, TitleLineHeight, TitleLineHeighttab, TitleLineHeightmob, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, TitleLetterSpacingtab, TitleLetterSpacingmob, textshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, advid, advclass, advcss }=attributes;
		const blockclass='gutensee-heading';
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
	
		return(
			<>	
				<style dangerouslySetInnerHTML={{
				  __html: [
			    `	.gutensee-heading.${uniqueid}{
						color: ${titleColor};
						background-color:${bgColor};															
						background-image:${bggradientValue};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};								
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};
						animation-delay: ${delay}ms;
						text-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						font-family:${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
					}
				    .gutensee-heading.${uniqueid}:hover{
						color: ${titlehColor};
						background-color:${bghColor};															
						background-image:${bggradienthValue};
					}
					@media (max-width:1024px){
						.gutensee-heading.${uniqueid}{							
							margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
							padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};								
							font-size: ${titlefontSizetab};							
							line-height: ${TitleLineHeighttab};							
							letter-spacing:${TitleLetterSpacingtab}px;							
						}
					    
					}
					@media (max-width:767px){
						.gutensee-heading.${uniqueid}{							
							margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
							padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};								
							font-size: ${titlefontSizemob};							
							line-height: ${TitleLineHeightmob};						
							letter-spacing:${TitleLetterSpacingmob}px;
						}
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
				<div id={advid}>				
					<RichText.Content 
						tagName={ Contenttag }
						className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${props.attributes.className} ${uniqueid} ${advclass}`}
						value={attributes.title}
					/>
				</div>
			</>
		)
	}
})