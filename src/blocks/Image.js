const { registerBlockType } = wp.blocks;
import { RichText, BlockControls,  AlignmentToolbar, ColorPalette, FontSizePicker, PanelColorSettings, InspectorControls, MediaUpload } from '@wordpress/block-editor'
import { Fragment, useState } from '@wordpress/element'
import { PanelBody, Button, RangeControl, ToggleControl, SelectControl, TextControl, ToolbarGroup, __experimentalInputControl as InputControl,  ToolbarButton, __experimentalBoxControl as BoxControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, BaseControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
import { edit } from '@wordpress/icons';
const ALLOWED_MEDIA_TYPES = [ 'audio','image' ];
const { __ } = wp.i18n;
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	const { className, attributes, setAttributes, clientId } = props;
	setAttributes({ uniqueid: 'gutenseeblocksimage' +clientId.slice(0,8) });
	const{uniqueid, controlType, title, imgfit, toggle, imgwidth, imgheight ,imgopacity, imgbrightness, imgcontrast, imgsaturate, imgblur,	imghue_rotate,  bgColor, bggradientValue, captionColor, shadowColor, previewcaptionpaddings, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, captionpaddings, captionpaddingstab, captionpaddingsmob, border, borderradius, fontfamily, titlefontSize, TitleLineHeight, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, previewfontsize, previewlineheight, previewltrspaceing, titlefontSizetab, titlefontSizemob, TitleLineHeighttab, TitleLineHeightmob, TitleLetterSpacingtab, TitleLetterSpacingmob, bghColor, bggradienthValue, captionhColor, colorType, advid, advclass, advcss }=attributes;

	const blockclass='image-upload-wrapper gutensee-image';
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

	function setPreviewcaptionpaddings(value) {
		setAttributes({previewcaptionpaddings:value});
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

 	const onFileSelect=(img)=>{
	  	props.setAttributes({
	  		imageUrl:img.url,
	  		imageID:img.id,
	  		imageAlt:img.alt,
	  	})
  	}
  	const onRemoveImg=()=>{
	  	setAttributes({
	  		imageUrl:null,
	  		imageID:null,
	  		imageAlt:null,
	  	});
	 }

  	const gutensee_blockStyle = gutensee_plugin.gutensee_pluginpath + 'assets/images/dummy-image.png';

  	
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
    const colorSettingsarray =(toggle!=false) ? (
			[
				{
					value: bgColor,
					clearable: true,
					onChange: (newtext) => setAttributes({ bgColor: newtext }),
					label: __('Background Color:','gutensee')
				},				
				{
					value: captionColor,
					clearable: true,
					onChange: (newtext) => setAttributes({ captionColor: newtext }),
					label: __('Caption Text Color:','gutensee')
				},
			]):
    		([
				{
					value: bgColor,
					clearable: true,
					onChange: (newtext) => setAttributes({ bgColor: newtext }),
					label: __('Background Color:','gutensee')
				},
			]);

  	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

  return (
  	<Fragment>
  		<style dangerouslySetInnerHTML={{
		  __html: [
		     `.gutensee-image#${uniqueid}{
					background-color:${bgColor};
					margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
					padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};				
					background-image:${bggradientValue};		
					animation-delay: ${delay}ms;					
					
				}
				.gutensee-image#${uniqueid} img{
					box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};						
				}

				.gutensee-image#${uniqueid} img{
					border: ${border.width} ${border.style} ${border.color};
					border-top:${bordertop};
					border-right:${borderright};
					border-bottom:${borderbottom};
					border-left:${borderleft};
					border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						
					width: ${imgwidth}px;
  					height: ${imgheight}px;
  					opacity: ${imgopacity};
					object-fit: ${imgfit};
					filter: brightness( ${imgbrightness}% ) contrast( ${imgcontrast}% ) saturate( ${imgsaturate}% ) blur( ${imgblur}px ) hue-rotate( ${imghue_rotate}deg );
				}
				.gutensee-image#${uniqueid} span{
					display: flex;
					font-size: ${titlefontSize};
					font-weight: ${TitleFontWeight};
					line-height: ${TitleLineHeight};
					font-family: ${fontfamily};
					text-transform:${TitleTransform};
					text-decoration:${TitleDecoration};
					letter-spacing:${TitleLetterSpacing}px;
					color:${captionColor};
					padding: ${captionpaddings.top} ${captionpaddings.right} ${captionpaddings.bottom} ${captionpaddings.left};
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

					<Button isSmall={true} isPressed={controlType === 'typo'} onClick={() => setAttributes({controlType: 'typo',})}>
						Typo
					</Button>

				</div>
			</div>

			{/* Basic Cont*/}
			{controlType === 'basic' && (
				<>
				<div className="gutensee_block_content_section">
					<ToggleControl
						label={__('Add Text Caption','gutensee')}
						checked={attributes.toggle}
						onChange={(newval) => setAttributes({ toggle: newval })}
					/>				
					<SelectControl
			            label={__('Image Fit','gutensee')}
			            value={ imgfit }
			            options={ [
			                { label: __('Default','gutensee'), value: 'initial' },
			                { label: __('Fill','gutensee'), value: 'fill' },
			                { label: __('Cover','gutensee'), value: 'cover' },
			                { label: __('Contain','gutensee'), value: 'contain' },
			            ] }
			            onChange={ (newtext) => setAttributes({ imgfit: newtext }) }					  
			        />	
			        <RangeControl 
						label={__('Width','gutensee')}			    
			      		value={ imgwidth}
	        			onChange={(newtext) => setAttributes({ imgwidth: newtext })}
						min={0}
						max={2000}
					/>
					<RangeControl 
						label={__('height','gutensee')}			    
			      		value={ imgheight}
	        			onChange={(newtext) => setAttributes({ imgheight: newtext })}
						min={0}
						max={2000}
					/>
					<RangeControl 
						label={__('Brightness','gutensee')}			    
					    value={ imgbrightness}
			        	onChange={(newtext) => setAttributes({ imgbrightness: newtext })}
						min={0}
						max={200}
					/>
					<RangeControl 
						label={__('Contrast','gutensee')}			    
					    value={ imgcontrast }
			        	onChange={(newtext) => setAttributes({ imgcontrast : newtext })}
						min={0}
						max={200}
					/>
					<RangeControl 
						label={__('Saturate','gutensee')}			    
					    value={ imgsaturate }
			        	onChange={(newtext) => setAttributes({ imgsaturate : newtext })}
						min={0}
						max={200}
					/>
					<RangeControl 
						label={__('Blur','gutensee')}			    
					    value={ imgblur}
			        	onChange={(newtext) => setAttributes({ imgblur: newtext })}
						min={0}
						step={0.1}
						max={10}
					/>
					<RangeControl 
						label={__('Hue-Rotate','gutensee')}			    
					    value={ imghue_rotate}
			        	onChange={(newtext) => setAttributes({ imghue_rotate: newtext })}
						min={0}
						max={360}
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
									
									<Button isSmall={true} isPressed={controlType === 'hover'} onClick={() => setAttributes({colorType: 'hover',})}>
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
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">
										{ __('Text Caption','gutensee')}
									</p>
									<div className="gutensee_block_section_panel">						
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Text Caption','gutensee')}
								            value={ captionColor }
								            onChange={ (newtext) => setAttributes({ captionColor: newtext }) }
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
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">
										{ __('Text Caption','gutensee')}
									</p>
									<div className="gutensee_block_section_panel">						
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Text Caption','gutensee')}
								            value={ captionhColor }
								            onChange={ (newtext) => setAttributes({ captionhColor: newtext }) }
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
						{ toggle == true && 
							[<>
								<RadioGroup label="Width" onChange={ setPreviewcaptionpaddings } checked={ previewcaptionpaddings } className={"preview-icon"}>
						            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
						            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
						            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
						        </RadioGroup>
						        { previewcaptionpaddings === 'Desktop' && (
					        		<>	
										<BoxControl
											values={captionpaddings}
											label={__('Caption Padding','gutensee')}
											units={[]}
											allowReset={false}
											onChange={(newValue) =>
												setAttributes({
													...captionpaddings,
													captionpaddings: {
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
								{ previewcaptionpaddings === 'Tablet' && (
					        		<>	
										<BoxControl
											values={captionpaddingstab}
											label={__('Caption text Padding','gutensee')}
											units={[]}
											allowReset={false}
											onChange={(newValue) =>
												setAttributes({
													...captionpaddingstab,
													captionpaddingstab: {
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
								{ previewcaptionpaddings === 'Mobile' && (
					        		<>	
										<BoxControl
											values={captionpaddingsmob}
											label={__('Caption text Padding','gutensee')}
											units={[]}
											allowReset={false}
											onChange={(newValue) =>
												setAttributes({
													...captionpaddingsmob,
													captionpaddingsmob: {
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
						 	</>]
						}
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

	  	<div  className="media-wrapper" id={advid}>
	  		{
	  		(props.attributes.imageUrl)?(
	  			<div id={uniqueid}
	  				className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${advclass}`} >
	  				<div class="gutensee-img">
		  				<img
			  				src={props.attributes.imageUrl}
			  				alt={props.attributes.imageAlt}
		  				/>

		  				{(props.isSelected) ? (
		  					<BlockControls>
					            <ToolbarGroup>
							        <MediaUpload
						  				onSelect={onFileSelect}
						  				allowedTypes={ ALLOWED_MEDIA_TYPES }
						  				value={props.attributes.imageID}
						  				render={
						  					({open})=>
							  				<ToolbarButton
							                    icon={ edit }
							                    label={__('Edit','gutensee')}
							                    onClick={ open } 
							                />
							            }
									/>			                
					            </ToolbarGroup>
		        			</BlockControls>) : null }

		        		{(toggle!=false) ? (
							<RichText
								key="editable"
								tagName="span"
								className="gutensee-img-caption"
								placeholder={__('Enter Caption Here','gutensee')}
								value={title}
								onChange={(newtext) => setAttributes({ title: newtext })}
							/>	):null 
						}
					</div>
				</div>
				):
				(					
					<MediaUpload
		  				onSelect={onFileSelect}
		  				allowedTypes={ ALLOWED_MEDIA_TYPES }
		  				value={props.attributes.imageID}
		  				render={
		  					({open})=>
			  				<Button
			  					className="gutensee-image-button"
			  					type="image"
				  				onClick={open}
			  				>
			  				<img src={gutensee_blockStyle} width="50%" />
			  				</Button>
	  					}
					/>
				)
			}			 
		</div>
	</Fragment>
  );
};
 
registerBlockType('gutensee/gutensee-image', {
	title: __('Image','gutensee'),
	category: 'gutensee',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="Layer_1"><title>Layer 1</title>  <rect filter="url(#svg_1_blur)" stroke="#009999" id="svg_1" height="23.05801" width="23.00885" y="0.42216" x="0.51745" fill="#fff"/><path stroke="#009999" id="svg_3" d="m-1.01996,15.19704l3.86693,-4.84357l3.86693,4.84357l-7.73385,0z" fill="#fff"/>  <path id="svg_4" d="m9.34976,13.20057l5.21141,-6.09636l5.21141,6.09636l-10.42281,0z" stroke="#009999" fill="#fff"/><path stroke="#009999" id="svg_5" d="m14.53216,14.93107l6.53884,-9.78368l6.53884,9.78368l-13.07768,0z" fill="#fff"/>  <path stroke="#009999" id="svg_7" d="m4.32001,14.50604l3.69485,-3.76196l4.67814,3.76196l-8.37299,0z" fill="#fff"/>  <path id="svg_9" d="m5.5322,5.92855" opacity="NaN" stroke="#009999" fill="#fff"/>  <path d="m2.09071,12.61488c0.04916,0.09833 0.16794,0.23407 0.24582,0.39331c0.13661,0.27932 0.13745,0.44696 0.29499,0.78663c0.09251,0.19946 0.19261,0.31401 0.24582,0.44248c0.05644,0.13626 0.07172,0.18158 0.09833,0.24582c0.01881,0.04542 0.06356,0.08393 0.09833,0.04916c0.03476,-0.03476 -0.02259,-0.10096 0,-0.19666c0.02526,-0.10699 0.04916,-0.14749 0.09833,-0.24582c0.04916,-0.09833 0.01154,-0.20414 0.04916,-0.29499c0.02661,-0.06424 0.04916,-0.09833 0.04916,-0.19666c0,-0.09833 -0.01575,-0.14876 0,-0.24582c0.0249,-0.15346 0.04916,-0.24582 0.04916,-0.29498c0,-0.04916 0,-0.04916 0,-0.09833c0,-0.04916 0,-0.14749 0,-0.19666c0,-0.09833 -0.02023,-0.16736 -0.19666,-0.39331c-0.08558,-0.10961 -0.19511,-0.21692 -0.29499,-0.39331c-0.06851,-0.12101 -0.14749,-0.14749 -0.14749,-0.14749c0,-0.04916 -0.08393,-0.06356 -0.04916,-0.09833c0.03476,-0.03476 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.14749,0c0.09833,0 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.09833,-0.04916c0,-0.04916 -0.0144,-0.06356 -0.04916,-0.09833c-0.03476,-0.03476 -0.04916,-0.04916 -0.09833,-0.04916c-0.04916,0 -0.06356,-0.0144 -0.09833,-0.04916c-0.03476,-0.03476 -0.09833,0 -0.14749,-0.04916c0,0 -0.04916,0 -0.04916,0c-0.04916,0 -0.09833,0 -0.09833,0c-0.04916,0 -0.06428,0.05831 0,0.14749c0.08131,0.11281 0.09833,0.19666 0.09833,0.24582c0,0 0,0.04916 -0.04916,0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c0,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c0,0 -0.02256,0.08326 -0.04916,0.14749c-0.03763,0.09084 0,0.19666 0,0.24582c0,0.09833 -0.0113,0.19797 0,0.24582c0.02526,0.10699 0.04916,0.09833 0.09833,0.09833c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.10207,-0.01881 0.14749,0c0.06424,0.02661 0.03409,0.07172 0.09833,0.09833c0.04542,0.01881 0.09109,0.00851 0.14749,0.04916c0.08918,0.06428 0.14749,0.04916 0.19666,0.04916c0,0 0,0.04916 0,0.09833c0,0.04916 0,0.09833 0,0.09833c-0.04916,0 -0.25324,-0.0278 -0.34415,0.09833c-0.02875,0.03988 -0.14749,0.04916 -0.29499,0.04916c-0.04916,0 -0.14749,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.14749,0 -0.19666,0c-0.04916,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.11273,-0.03476 -0.14749,0c-0.03476,0.03476 0.01881,0.10207 0,0.14749c-0.02661,0.06424 -0.04916,0.09833 -0.04916,0.09833c0,0 -0.04916,0.04916 -0.04916,0.09833c0,0.04916 -0.00374,0.07951 -0.04916,0.09833c-0.06424,0.02661 -0.0144,0.11273 -0.04916,0.14749c-0.03476,0.03476 -0.09833,0.04916 -0.14749,0.04916c0,0 -0.00374,0.03035 -0.04916,0.04916c-0.06424,0.02661 -0.05291,0.03035 -0.09833,0.04916c-0.06424,0.02661 -0.04916,0.09833 -0.09833,0.09833c-0.04916,0 -0.06356,0.0144 -0.09833,0.04916c-0.03476,0.03476 -0.03035,0.05291 -0.04916,0.09833c-0.02661,0.06424 -0.06356,0.0144 -0.09833,0.04916c-0.03476,0.03476 0,0.04916 0,0.09833c0,0.04916 -0.07172,0.03409 -0.09833,0.09833c-0.01881,0.04542 0.0144,0.06356 0.04916,0.09833c0.03476,0.03476 0.0144,0.06356 0.04916,0.09833c0.03476,0.03476 0.09833,0 0.19666,0c0.09833,0 0.14749,0 0.19666,0c0.14749,0 0.19666,0 0.34415,0c0.14749,0 0.19666,0 0.29499,0c0.09833,0 0.14749,0 0.19666,0c0.04916,0 0.15124,0.01881 0.19666,0c0.06424,-0.02661 0.09833,-0.04916 0.14749,-0.04916c0,0 0.04916,0 0.09833,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0c0,0 0.04916,0 0.04916,-0.04916c0,-0.09833 0.03476,-0.16189 0,-0.19666c-0.03476,-0.03476 -0.04916,-0.04916 -0.04916,-0.09833c0,0 -0.06356,-0.0144 -0.09833,-0.04916c-0.03476,-0.03476 -0.0144,-0.06356 -0.04916,-0.09833c-0.03476,-0.03476 -0.06356,-0.06356 -0.09833,-0.09833c-0.03476,-0.03476 -0.10207,-0.03035 -0.14749,-0.04916c-0.06424,-0.02661 -0.08326,-0.07172 -0.14749,-0.09833c-0.04542,-0.01881 -0.06798,-0.00374 -0.04916,-0.04916c0.02661,-0.06424 0.19342,-0.10542 0.29499,-0.14749c0.28727,-0.11899 0.49164,-0.09833 0.63913,-0.09833c0.04916,0 0.08966,-0.02391 0.19666,-0.04916c0.04785,-0.0113 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.04916,0 0.09833,0c0,0 0,-0.04916 0.04916,-0.04916c0.04916,0 0.05291,-0.03035 0.09833,-0.04916c0.06424,-0.02661 0.05048,-0.08703 0.09833,-0.09833c0.10699,-0.02526 0.10207,-0.12868 0.14749,-0.14749c0.06424,-0.02661 0.06356,-0.0144 0.09833,-0.04916c0.03476,-0.03476 0,-0.09833 0,-0.14749c0,-0.04916 0,-0.09833 0,-0.14749c0,-0.04916 0,-0.09833 0.04916,-0.09833c0.09833,0 0.15124,-0.01881 0.19666,0c0.06424,0.02661 0.04916,0.04916 0.09833,0.09833c0.04916,0.04916 0.11273,0.06356 0.14749,0.09833c0.03476,0.03476 0.06356,0.06356 0.09833,0.09833c0.03476,0.03476 0.04916,0.09833 0.09833,0.09833c0,0 0,0.04916 0.04916,0.09833c0.04916,0.04916 0.06356,0.06356 0.09833,0.09833c0.03476,0.03476 0.0144,0.06356 0.04916,0.09833c0.03476,0.03476 0.04916,0.04916 0.04916,0.09833c0,0 -0.08326,0.02256 -0.14749,0.04916c-0.04542,0.01881 -0.09833,0 -0.14749,0.04916c-0.04916,0.04916 -0.15664,0.03405 -0.24582,0.09833c-0.11281,0.08131 -0.14426,0.15459 -0.24582,0.19666c-0.14364,0.0595 -0.24582,0.09833 -0.34415,0.14749c-0.09833,0.04916 -0.14749,0.09833 -0.19666,0.09833c-0.04916,0 -0.09833,0 -0.09833,0.04916c0,0.04916 0.00374,0.07951 0.04916,0.09833c0.06424,0.02661 0.13242,0.12089 0.19666,0.14749c0.04542,0.01881 0.09833,0.04916 0.14749,0.04916c0,0 0.04916,0 0.09833,0c0.04916,0 0.09833,0 0.19666,0c0.04916,0 0.09833,0 0.14749,-0.04916c0.04916,-0.04916 0.15123,-0.07951 0.19666,-0.09833c0.06424,-0.02661 0.12089,-0.03409 0.14749,-0.09833c0.01881,-0.04542 0.00734,-0.07248 0.04916,-0.09833c0.09352,-0.0578 0.09109,-0.156 0.14749,-0.19666c0.08918,-0.06428 0.18668,-0.11094 0.24582,-0.14749c0.13225,-0.08174 0.2004,-0.07951 0.24582,-0.09833c0.06424,-0.02661 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.12713,0.02036 0.19666,-0.04916c0.03476,-0.03476 0.09833,-0.04916 0.14749,-0.09833c0,0 0.04916,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.09833,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.19666,0c0.04916,0 0.05048,0.0113 0.09833,0c0.10699,-0.02526 0.2004,-0.03035 0.24582,-0.04916c0.06424,-0.02661 0.08326,-0.12088 0.14749,-0.14749c0.13627,-0.05644 0.23075,-0.12088 0.29499,-0.14749c0.04542,-0.01881 0.04916,-0.04916 0.09833,-0.04916c0.04916,0 0.08321,-0.00914 0.14749,-0.09833c0.04065,-0.05641 0.16011,-0.21725 0.39331,-0.29499c0.13992,-0.04664 0.21588,-0.087 0.39331,-0.19666c0.13225,-0.08174 0.2058,-0.08321 0.29499,-0.14749c0.0564,-0.04065 0.10207,-0.03035 0.14749,-0.04916c0.12847,-0.05322 0.14749,-0.14749 0.19666,-0.14749c0.04916,0 0.13242,-0.07172 0.19666,-0.09833c0.09084,-0.03763 0.14749,-0.09833 0.14749,-0.09833c0,-0.04916 -0.04916,-0.04916 -0.14749,-0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.06356,-0.0144 -0.09833,-0.04916c-0.03476,-0.03476 -0.09833,-0.04916 -0.14749,-0.04916c-0.04916,0 -0.09833,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.06356,0.0144 -0.09833,0.04916c-0.03476,0.03476 0.03476,0.06356 0,0.09833c-0.03476,0.03476 -0.06818,0.04511 -0.19666,0.09833c-0.04542,0.01881 -0.10314,0.0897 -0.19666,0.14749c-0.04182,0.02585 -0.10207,0.03035 -0.14749,0.04916c-0.06424,0.02661 -0.09833,0.04916 -0.14749,0.04916c-0.04916,0 -0.07172,0.03409 -0.09833,0.09833c-0.01881,0.04542 -0.03035,0.05291 -0.04916,0.09833c-0.02661,0.06424 -0.08326,0.17005 -0.14749,0.19666c-0.04542,0.01881 -0.01659,0.06441 -0.09833,0.19666c-0.03655,0.05914 -0.09833,0.14749 -0.09833,0.19666c0,0 -0.03035,0.00374 -0.04916,0.04916c-0.02661,0.06424 -0.09833,0.09833 -0.14749,0.09833c-0.04916,0 -0.06356,0.0144 -0.09833,0.04916c-0.03476,0.03476 -0.0144,0.06356 -0.04916,0.09833c-0.03476,0.03476 0,0.09833 -0.04916,0.09833c0,0 -0.00851,0.04192 -0.04916,0.09833c-0.06428,0.08918 -0.10207,0.12868 -0.14749,0.14749c-0.06424,0.02661 -0.11273,0.06356 -0.14749,0.09833c-0.03476,0.03476 -0.04916,0.04916 -0.04916,0.04916c-0.04916,0 -0.04916,0 0,0c0.04916,0 0.24582,0.04916 0.39331,0.04916c0.24582,0 0.44248,0.04916 0.73746,0.04916c0.04916,0 0.19666,0 0.34415,0c0.04916,0 0.14749,0 0.19666,0c0.04916,0 0.14749,0 0.29498,0c0.09833,0 0.19666,0 0.29499,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.19666,0c0.04916,0 0.14749,-0.04916 0.14749,-0.04916c0.09833,-0.04916 0.14749,-0.04916 0.19666,-0.04916c0.04916,0 0.14749,-0.04916 0.19666,-0.04916c0,0 0.04916,0 0.19666,0c0.09833,0 0.19666,-0.04916 0.39331,-0.04916c0.09833,0 0.12713,0.02036 0.19666,-0.04916c0.03476,-0.03476 0.03409,-0.07172 0.09833,-0.09833c0.04542,-0.01881 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0c0.29499,0 0.34415,0 0.39331,0c0,0 0.06356,0.0144 0.09833,0.04916c0.03476,0.03476 0.09833,0.09833 0.09833,0.04916c0,-0.04916 -0.09833,0 -0.19666,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.10581,0.03763 -0.19666,0c-0.12847,-0.05322 -0.17005,-0.08326 -0.19666,-0.14749c-0.01881,-0.04542 -0.0144,-0.06356 -0.04916,-0.09833c-0.03476,-0.03476 -0.09833,-0.04916 -0.14749,-0.09833c-0.04916,-0.04916 -0.03409,-0.12088 -0.09833,-0.14749c-0.04542,-0.01881 -0.04916,-0.04916 -0.09833,-0.09833c-0.04916,-0.04916 -0.10207,-0.03035 -0.14749,-0.04916c-0.06424,-0.02661 -0.09833,-0.09833 -0.14749,-0.14749c-0.04916,-0.04916 -0.06356,-0.06356 -0.09833,-0.09833c-0.03476,-0.03476 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.10207,-0.01881 -0.14749,0c-0.06424,0.02661 -0.08326,0.07172 -0.14749,0.09833c-0.04542,0.01881 -0.04916,0 -0.09833,0c-0.04916,0 -0.10207,0.03035 -0.14749,0.04916c-0.06424,0.02661 -0.08326,0.07172 -0.14749,0.09833c-0.04542,0.01882 -0.05291,0.03035 -0.09833,0.04916c-0.06424,0.02661 -0.04916,0.09833 -0.09833,0.09833c-0.04916,0 -0.05291,0.03035 -0.09833,0.04916c-0.06424,0.02661 -0.04916,0.09833 -0.09833,0.09833c-0.04916,0 -0.08326,0.07172 -0.14749,0.09833c-0.04542,0.01881 -0.19069,-0.10429 -0.29499,0c-0.03476,0.03476 -0.09109,0.05767 -0.14749,0.09833c-0.08918,0.06428 -0.10747,0.08321 -0.19666,0.14749c-0.0564,0.04065 -0.09236,0.12259 -0.24582,0.14749c-0.04853,0.00788 -0.10207,-0.01881 -0.14749,0c-0.06424,0.02661 -0.09833,0.04916 -0.14749,0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.09833,0 -0.14749,0 -0.24582,0c-0.04916,0 -0.13962,-0.04853 -0.14749,0c-0.0249,0.15346 0.19666,0.04916 0.34415,0.04916c0.29499,0 0.63913,0.04916 0.83579,0.04916c0.24582,0 0.49164,0 0.58997,0c0.04916,0 0.14749,0 0.24582,0c0.04916,0 0.13883,-0.07307 0.24582,-0.09833c0.0957,-0.02259 0.09833,-0.04916 0.24582,-0.04916c0.04916,0 0.14167,-0.10768 0.29499,-0.19666c0.09508,-0.05518 0.18942,-0.10684 0.24582,-0.14749c0.08918,-0.06428 0.14749,-0.04916 0.19666,-0.04916c0.04916,0 0.04916,0 0.09833,0c0.04916,0 0.04916,-0.04916 0.09833,-0.04916c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.04916,0 0.14749,0c0.04916,0 0.11273,-0.03476 0.14749,0c0.03476,0.03476 0.04916,0.04916 0.09833,0.04916c0.04916,0 0.05291,-0.01881 0.09833,0c0.06424,0.02661 0.08326,0.07172 0.14749,0.09833c0.04542,0.01881 0.11735,0.09428 0.24582,0.14749c0.18169,0.07526 0.25497,0.03405 0.34415,0.09833c0.0564,0.04065 0.10581,0.01154 0.19666,0.04916c0.06424,0.02661 0.15123,0.07951 0.19666,0.09833c0.06424,0.02661 0.09833,0.09833 0.14749,0.09833c0.04916,0 0.09833,0 0.14749,0l0,0.04916l0.04916,0l0.04916,0" id="svg_10" stroke="#009999" fill="none"/><path d="m13.79179,11.43494c0,-0.04916 -0.01802,-0.1486 0,-0.29498c0.02477,-0.20119 0.10341,-0.48704 0.14749,-0.54081c0.11238,-0.13709 0.30007,-0.33954 0.34415,-0.39331c0.11238,-0.13709 0.16218,-0.19413 0.24582,-0.24582c0.09352,-0.0578 0.14749,-0.09833 0.14749,-0.09833c0,0 0.06356,0.03476 0.09833,0c0.03476,-0.03476 0,-0.09833 0,-0.14749c0,-0.04916 0,-0.09833 0,-0.14749c0,-0.09833 0,-0.14749 0,-0.29499c0,-0.24582 0,-0.58997 0,-0.83579c0,-0.29499 0,-0.54081 0,-0.63914c0,-0.14749 0,-0.24582 0,-0.29498c0,0 0.01511,0.00914 -0.04916,0.09833c-0.04065,0.0564 -0.07513,0.15331 -0.09833,0.19666c-0.08364,0.15629 -0.24053,0.15308 -0.34415,0.24582c-0.23457,0.20995 -0.35711,0.3867 -0.63913,0.58997c-0.08918,0.06428 -0.13344,0.1579 -0.24582,0.29499c-0.04408,0.05377 -0.11273,0.06356 -0.14749,0.09833c-0.03476,0.03476 -0.00374,0.07951 -0.04916,0.09833c-0.06424,0.02661 -0.06356,0.06356 -0.09833,0.09833c-0.03476,0.03476 0.01881,0.10207 0,0.14749c-0.02661,0.06424 -0.04916,0.09833 -0.04916,0.09833c0,0.04916 0.04916,0.04916 0.04916,0.04916c0.19666,0 0.39331,0 0.49164,0c0.14749,0 0.23716,-0.02391 0.34415,-0.04916c0.04785,-0.0113 0.17629,0.06953 0.24582,0c0.03476,-0.03476 0.09833,-0.09833 0.09833,-0.09833c0.09833,-0.04916 0.08966,-0.12224 0.19666,-0.14749c0.04785,-0.0113 0.11273,-0.0144 0.14749,-0.04916c0.03476,-0.03476 0.04916,-0.04916 0.04916,-0.09833c0,0 0.09833,0 0.14749,0c0.09833,0 0.14749,0 0.24582,0c0,0 0,0 0.04916,0c0.04916,0 0.09833,0.04916 0.14749,0.09833c0.04916,0.04916 0.05767,0.09109 0.09833,0.14749c0.06428,0.08918 0.09833,0.14749 0.09833,0.19666c0,0.04916 0.07796,0.12713 0.14749,0.19666c0.03476,0.03476 0.04916,0.09833 0.09833,0.14749c0.04916,0.04916 0.0897,0.05398 0.14749,0.14749c0.02585,0.04182 -0.01507,0.12088 0.04916,0.14749c0.04542,0.01882 0.08326,0.07172 0.14749,0.09833c0.04542,0.01881 0.04916,0.04916 0.09833,0.09833c0.04916,0.04916 0.07952,0.10207 0.09833,0.14749c0.02661,0.06424 0.09833,0.14749 0.09833,0.14749c0.09833,0.04916 0.12868,0.10207 0.14749,0.14749c0.02661,0.06424 0.07951,0.10207 0.09833,0.14749c0.02661,0.06424 0.03409,0.07172 0.09833,0.09833c0.04542,0.01882 0.09833,0.04916 0.14749,0.09833c0.04916,0.04916 0.09769,0.04129 0.04916,0.04916c-0.15346,0.0249 -0.29885,0.08229 -0.73746,0.19666c-0.49668,0.12951 -0.73149,0.31925 -0.88496,0.34415c-0.14559,0.02363 -0.24714,0.03787 -0.29498,0.04916c-0.10699,0.02526 -0.19666,0.04916 -0.24582,0.04916c-0.04916,0 -0.04916,0.04916 -0.04916,0.04916c-0.04916,0 -0.08326,0.02256 -0.14749,0.04916c-0.04542,0.01881 -0.09833,0.04916 -0.19666,0.04916c-0.04916,0 -0.04916,0.04916 -0.04916,0.04916c-0.04916,0 -0.09833,0 -0.19666,0c-0.04916,0 -0.09833,0 -0.19666,0c0,0 -0.04916,-0.04916 -0.04916,-0.09833c0,-0.04916 0.04916,-0.09833 0.04916,-0.09833c0.14749,-0.09833 0.33691,-0.25433 0.39331,-0.29499c0.08918,-0.06428 0.13242,-0.12088 0.19666,-0.14749c0.04542,-0.01881 0.06356,-0.0144 0.09833,-0.04916c0.03476,-0.03476 0.07951,-0.10207 0.09833,-0.14749c0.02661,-0.06424 0.13242,-0.12088 0.19666,-0.14749c0.04542,-0.01881 0.10314,-0.04053 0.19666,-0.09833c0.04182,-0.02585 0.09833,-0.04916 0.19666,-0.09833c0.09833,-0.04916 0.16189,-0.0144 0.19666,-0.04916c0.03476,-0.03476 0.03409,-0.07172 0.09833,-0.09833c0.09084,-0.03763 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.09833,0c0.04916,0.04916 0.03035,0.10207 0.04916,0.14749c0.02661,0.06424 0.09833,0.14749 0.09833,0.19666c0,0 0,0.04916 0,0.09833c0,0.04916 0,0.09833 0,0.14749c0,0.09833 -0.01089,0.13861 -0.04916,0.19666c-0.14575,0.22103 -0.19666,0.39331 -0.29499,0.58997c-0.04916,0.09833 -0.13886,0.10314 -0.19666,0.19666c-0.02585,0.04182 -0.04916,0.09833 -0.14749,0.14749c-0.09833,0.04916 -0.15124,0.07951 -0.19666,0.09833c-0.06424,0.02661 -0.08326,0.07172 -0.14749,0.09833c-0.04542,0.01881 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c0,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.14749,0 -0.24582,0c0,0 -0.04916,0 -0.14749,0c-0.09833,0 -0.14749,0 -0.19666,0c-0.14749,0 -0.24582,0 -0.29498,0c-0.09833,0 -0.14749,0 -0.14749,0c-0.09833,0 -0.19666,0 -0.29498,0c-0.09833,0 -0.19666,0 -0.39331,0c-0.09833,0 -0.34415,0 -0.73746,0c-0.14749,0 -0.4407,-0.05486 -0.58997,-0.09833c-0.19463,-0.05667 -0.29762,-0.02657 -0.39331,-0.04916c-0.10699,-0.02526 -0.14749,-0.04916 -0.19666,-0.04916c-0.04916,0 -0.04916,-0.04916 -0.09833,-0.04916c-0.04916,0 -0.04916,-0.04916 0,-0.04916c0.04916,0 0.13883,-0.07307 0.24582,-0.09833c0.04785,-0.0113 0.13504,-0.01826 0.34415,-0.14749c0.09352,-0.0578 0.14025,-0.156 0.19666,-0.19666c0.08918,-0.06428 0.09479,-0.07921 0.19666,-0.19666c0.07203,-0.08305 0.15483,-0.17081 0.19666,-0.19666c0.09352,-0.0578 0.10986,-0.15498 0.14749,-0.24582c0.05322,-0.12847 0.156,-0.18942 0.19666,-0.24582c0.06428,-0.08918 0.09833,-0.19666 0.14749,-0.24582c0.04916,-0.04916 0.04916,-0.09833 0.09833,-0.09833c0.04916,0 0.12224,-0.0405 0.14749,-0.14749c0.0113,-0.04785 0.09833,-0.14749 0.19666,-0.24582c0.09833,-0.09833 0.18745,-0.15766 0.29498,-0.24582c0.13709,-0.11238 0.15872,-0.09105 0.29498,-0.14749c0.06424,-0.02661 0.10581,-0.01153 0.19666,-0.04916c0.06424,-0.02661 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.04916,0 0.09833,0c0.09833,0 0.14749,0 0.24582,0c0.09833,0 0.10747,-0.01512 0.19666,0.04916c0.0564,0.04065 0.14749,0.04916 0.14749,0.04916c0.04916,0 0.06356,0.0144 0.09833,0.04916c0.03476,0.03476 0,0.09833 0,0.14749c0,0.04916 -0.01881,0.10207 0,0.14749c0.02661,0.06424 0.01154,0.05665 0.04916,0.14749c0.02661,0.06424 0.05767,0.14025 0.09833,0.19666c0.06428,0.08918 0.07951,0.15123 0.09833,0.19666c0.02661,0.06424 0.08393,0.11273 0.04916,0.14749c-0.03476,0.03476 -0.14749,0 -0.24582,0c-0.19666,0 -0.44248,0 -0.6883,0c-0.04916,0 -0.09833,0 -0.24582,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,-0.04916 -0.14749,-0.04916c-0.04916,0 -0.14881,-0.03787 -0.19666,-0.04916c-0.10699,-0.02526 -0.14749,-0.04916 -0.14749,-0.04916c-0.04916,0 -0.14749,0 -0.19666,0c-0.04916,0 -0.09833,0.04916 -0.14749,0.04916c-0.04916,0 -0.04916,0.04916 -0.04916,0.09833c0,0.04916 0,0.09833 0,0.14749c0,0.14749 0,0.39331 0,0.39331c0,0.24582 0.04916,0.34415 0.04916,0.39331c0,0 0.03476,0.06356 0,0.09833c-0.03476,0.03476 -0.04916,0 -0.14749,0c-0.04916,0 -0.04916,0.04916 -0.04916,0.04916c0.04916,0 0.14749,0 0.19666,0c0.19666,0 0.39331,0 0.73746,0c0,0 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.09833,-0.04916c0,-0.04916 0,-0.09833 -0.04916,-0.09833c-0.04916,0 -0.11273,-0.0144 -0.14749,-0.04916c-0.03476,-0.03476 -0.04916,-0.09833 -0.09833,-0.09833c0,0 0,-0.04916 -0.04916,-0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.11273,0.03476 -0.14749,0c-0.03476,-0.03476 -0.04916,-0.04916 -0.04916,-0.04916c-0.04916,0 -0.04916,0.04916 -0.04916,0.14749c0,0.09833 0.02426,0.09236 0.04916,0.24582c0.01575,0.09706 0.04916,0.14749 0.14749,0.24582c0.04916,0.04916 0.14749,0.19666 0.14749,0.24582c0,0.09833 0.06356,0.11273 0.09833,0.14749c0.03476,0.03476 0,0.09833 0,0.14749c0,0.09833 0,0.14749 0,0.19666c0,0.04916 0.00529,0.10392 -0.09833,0.19666c-0.23457,0.20995 -0.43327,0.35432 -0.54081,0.44248c-0.13709,0.11238 -0.19666,0.14749 -0.29498,0.19666c0,0 -0.06356,-0.03476 -0.09833,0c-0.03476,0.03476 -0.09833,0 -0.09833,0.04916c0,0.04916 0.14749,0 0.29499,0c0.24582,0 0.39331,0 0.63913,0c0.24582,0 0.44248,0 0.6883,0c0.24582,0 0.34415,0 0.44248,0c0.04916,0 0.14749,0 0.19666,0c0.04916,0 0.04916,0 0.14749,0c0.04916,0 0.14749,0.04916 0.14749,0c0,-0.09833 -0.19666,0 -0.24582,0c-0.09833,0 -0.24582,0 -0.34415,0c-0.04916,0 -0.08966,0.02391 -0.19666,0.04916c-0.0957,0.02259 -0.14749,0 -0.24582,0c0,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.14749,0 -0.24582,0c-0.04916,0 -0.09833,0 -0.19666,0c-0.19666,0 -0.24582,0 -0.49164,0c-0.14749,0 -0.29499,0 -0.34415,0c-0.09833,0 -0.18226,0.0144 -0.14749,0.04916c0.06953,0.06953 0.14749,0 0.39331,0.04916l0.14749,0l0.24582,0" id="svg_18" stroke="#009999" fill="none"/>  <path d="m14.03761,14.38479c0,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.06356,-0.03476 -0.09833,0c-0.03476,0.03476 -0.04916,0.04916 -0.09833,0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.09833,0.04916c0,0.04916 0.08393,0.06356 0.04916,0.09833c-0.03476,0.03476 -0.09833,0 -0.14749,0c-0.19666,0 -0.29499,0 -0.49164,0c-0.14749,0 -0.29499,0 -0.49164,0c-0.04916,0 -0.14749,0 -0.34415,0c-0.09833,0 -0.14749,0 -0.24582,0c-0.19666,0 -0.24582,0 -0.44248,0c-0.14749,0 -0.24582,0 -0.39331,0c-0.19666,0 -0.34415,0 -0.49164,0c-0.14749,0 -0.39331,0 -0.49164,0c-0.14749,0 -0.29498,0 -0.34415,0c-0.09833,0 -0.14749,0 -0.19666,0c-0.04916,0 -0.14749,0 -0.19666,0c-0.04916,0 -0.09833,0 -0.09833,0c-0.09833,0 -0.19666,0 -0.34415,0c-0.09833,0 -0.19666,0 -0.39331,0c-0.04916,0 -0.14152,0.02426 -0.29498,0.04916c-0.04853,0.00788 -0.14749,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.19666,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.04916,0.04916 -0.04916,0.09833c0,0.04916 0.04916,0.04916 0.09833,0.04916c0.04916,0 0.09833,0 0.14749,0c0,0 0.04916,0 0.09833,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0c0,0 0.09833,0 0.19666,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.04916,0 0.14749,0c0.09833,0 0.24582,0 0.29498,0c0.14749,0 0.34427,-0.04568 0.39331,-0.04916c0.34677,-0.02464 0.54228,-0.02514 0.73746,-0.04916c0.20119,-0.02477 0.44248,-0.09833 0.58997,-0.09833c0.29499,0 0.58632,-0.07363 0.83579,-0.09833c0.09785,-0.00969 0.24785,0.00751 0.44248,-0.04916c0.14927,-0.04347 0.29499,-0.04916 0.49164,-0.04916c0.09833,0 0.24582,0 0.44248,0c0.19666,0 0.24693,0.01802 0.39331,0c0.20119,-0.02477 0.29499,-0.04916 0.44248,-0.04916c0.14749,0 0.34415,0 0.39331,0c0.09833,0 0.19666,0 0.24582,0l0.04916,0l0.04916,0l0,0" id="svg_19" stroke="#009999" fill="none"/>  <path d="m15.46337,9.86168c0,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0.04916c-0.04916,0.04916 -0.12089,0.08326 -0.14749,0.14749c-0.01881,0.04542 0,0.09833 0,0.14749c0,0.04916 0,0.04916 0,0.09833c0,0.04916 -0.02256,0.08326 -0.04916,0.14749c-0.05644,0.13627 -0.01659,0.2119 -0.09833,0.34415c-0.18277,0.29572 -0.47155,0.60749 -0.6883,0.83579c-0.40761,0.42934 -0.83937,0.73166 -1.08161,0.88496c-0.29958,0.18958 -0.4955,0.43215 -0.63914,0.49164c-0.20313,0.08414 -0.38749,0.25518 -0.54081,0.34415c-0.19017,0.11036 -0.46727,0.10007 -0.6883,0.24582c-0.11609,0.07655 -0.39331,0.19666 -0.54081,0.19666c-0.14749,0 -0.29499,0 -0.34415,0l-0.04916,0l0,0l-0.04916,0" id="svg_20" stroke="#009999" fill="none"/><path id="svg_29" d="m5.5322,4.74861" opacity="NaN" stroke="#009999" fill="#fff"/>  <path d="m20.87144,6.07604c0,0.04916 0.0144,0.06356 0.04916,0.09833c0.03476,0.03476 -0.03477,0.11273 0,0.14749c0.03476,0.03476 -0.02036,0.07796 0.04916,0.14749c0.03476,0.03476 0.14749,0.19666 0.19666,0.24582c0.04916,0.04916 0.07951,0.10207 0.09833,0.14749c0.02661,0.06424 0.09833,0.04916 0.09833,0.09833c0,0.04916 0.06356,0.0144 0.09833,0.04916c0.03477,0.03476 0,0.09833 0.04916,0.09833c0.04917,0 0.06357,0.0144 0.09833,0.04916c0.03477,0.03476 0,0.09833 0,0.14749c0,0.04916 0.03035,0.05291 0.04916,0.09833c0.02661,0.06424 0.04916,0.09833 0.04916,0.14749c0,0.04916 0.04916,0.04916 0.04916,0.09833c0,0.04916 0,0.09833 0,0.14749c0,0.04916 -0.04916,0.04916 -0.14749,0.04916c-0.04916,0 -0.09833,0 -0.24582,0c-0.04916,0 -0.09965,0.0113 -0.14749,0c-0.10699,-0.02526 -0.15123,-0.03035 -0.19666,-0.04916c-0.06424,-0.02661 -0.04916,-0.09833 -0.04916,-0.09833c-0.04916,0 -0.04916,-0.04916 -0.09833,-0.09833c-0.04916,-0.04916 -0.09833,-0.09833 -0.14749,-0.09833c-0.04916,0 -0.03409,-0.07172 -0.09833,-0.09833c-0.04542,-0.01881 -0.04916,-0.04916 -0.04916,-0.04916c0,-0.04916 0,-0.09833 0,-0.04916c0,0.04916 0,0.09833 0,0.14749c0,0.04916 0.01881,0.05291 0,0.09833c-0.02661,0.06424 -0.07248,0.10567 -0.09833,0.14749c-0.05779,0.09352 -0.11273,0.16189 -0.14749,0.19666c-0.06953,0.06953 -0.09833,0 -0.14749,0.04916c0,0 -0.04916,0 -0.09833,0.04916c-0.04917,0.04916 -0.11273,0.08393 -0.14749,0.04916c-0.03476,-0.03476 0.0144,-0.11273 0.04916,-0.14749c0.03477,-0.03476 0.05291,-0.07951 0.09833,-0.09833c0.06424,-0.02661 0.09833,-0.09833 0.09833,-0.09833c0,-0.04916 0,-0.09833 0.04916,-0.14749c0.04916,-0.04916 0.09833,-0.04916 0.09833,-0.09833c0,-0.04916 0.06356,-0.06356 0.09833,-0.09833c0.03477,-0.03476 0,-0.09833 0.04916,-0.14749c0.04916,-0.04916 0.04916,-0.09833 0.09833,-0.09833c0,0 0.00374,-0.06798 0.04916,-0.04916c0.06424,0.02661 0.06575,0.06441 0.14749,0.19666c0.03655,0.05914 0.07952,0.10207 0.09833,0.14749c0.05322,0.12847 0.10873,0.08427 0.24582,0.19666c0.10754,0.08816 0.23716,0.26973 0.34415,0.29499c0.0957,0.02259 0.2004,0.03035 0.24582,0.04916c0.06424,0.02661 0.10207,0.07951 0.14749,0.09833c0.06424,0.02661 0.13242,0.07172 0.19666,0.09833c0.04542,0.01881 0.09833,0.04916 0.09833,0.09833c0,0 0.10207,-0.01881 0.14749,0c0.06424,0.02661 0.06356,0.0144 0.09833,0.04916c0.03477,0.03476 0.0144,0.11273 0.04916,0.14749c0.03477,0.03477 0.07172,0.13242 0.09833,0.19666c0.01881,0.04542 0.0144,0.0144 0.04916,0.04916c0.03476,0.03476 0.02256,0.08326 0.04916,0.14749c0.01881,0.04542 0.00734,0.07248 0.04916,0.09833c0.09352,0.0578 0.09833,0.14749 0.09833,0.14749c0.04916,0.04916 0.04916,0.09833 0.09833,0.14749c0.04916,0.04916 0.03035,0.10207 0.04916,0.14749c0.02661,0.06424 0.04917,0.09833 0.09833,0.09833c0,0 -0.03476,0.06356 0,0.09833c0.03476,0.03476 0.06356,0.0144 0.09833,0.04916c0.03477,0.03476 0.00374,0.07951 0.04916,0.09833c0.06424,0.02661 0.09833,0.09833 0,0.09833c-0.09833,0 -0.16189,-0.0144 -0.19666,-0.04916c-0.03477,-0.03477 -0.13883,-0.07307 -0.24582,-0.09833c-0.04785,-0.0113 -0.09833,0 -0.14749,0c-0.04916,0 -0.0405,-0.07307 -0.14749,-0.09833c-0.0957,-0.02259 -0.1523,-0.04053 -0.24582,-0.09833c-0.04182,-0.02585 -0.14025,-0.00851 -0.19666,-0.04916c-0.08918,-0.06428 -0.22701,-0.10207 -0.24582,-0.14749c-0.02661,-0.06424 -0.14025,-0.10684 -0.19666,-0.14749c-0.08918,-0.06428 -0.14749,-0.04916 -0.19666,-0.09833c0,0 -0.0897,-0.00481 -0.14749,-0.09833c-0.02585,-0.04182 -0.04916,-0.04916 -0.09833,-0.09833c-0.04916,-0.04916 -0.12089,-0.03409 -0.14749,-0.09833c-0.01881,-0.04542 0,-0.04916 -0.04916,-0.04916c-0.04916,0 -0.03409,-0.07172 -0.09833,-0.09833c-0.04542,-0.01882 -0.07172,-0.03409 -0.09833,-0.09833c-0.01881,-0.04542 -0.04916,-0.04916 -0.09833,-0.09833c-0.04916,-0.04916 -0.09833,-0.04916 -0.24582,-0.09833c-0.14749,-0.04916 -0.19069,-0.07342 -0.34415,-0.09833c-0.09706,-0.01575 -0.14749,0 -0.24582,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.06357,0.0144 -0.09833,0.04916c-0.03476,0.03476 -0.09833,0.04916 -0.09833,0.04916c-0.04916,0.04916 -0.00481,0.0897 -0.09833,0.14749c-0.04182,0.02585 -0.00481,0.0897 -0.09833,0.14749c-0.04182,0.02585 -0.09833,0.04916 -0.14749,0.09833c0,0 -0.08408,0.05127 -0.09833,0.09833c-0.05137,0.16966 -0.09833,0.19666 -0.14749,0.24582c-0.04916,0.04916 -0.04916,0.09833 -0.09833,0.19666c-0.04916,0.09833 -0.07172,0.18159 -0.09833,0.24582c-0.05644,0.13626 -0.04917,0.29499 -0.04917,0.34415c0,0.09833 0,0.14749 0,0.19666c0,0 -0.00374,0.03035 -0.04916,0.04916c-0.06424,0.02661 -0.04916,0.09833 -0.09833,0.09833c-0.04916,0 -0.08326,0.02256 -0.14749,0.04916c-0.04542,0.01881 -0.04916,0.04916 -0.09833,0.04916c0,0 0,0 0.04916,0c0.09833,0 0.14749,0 0.29498,0c0.09833,0 0.29762,0.02259 0.39331,0c0.10699,-0.02526 0.28901,-0.12259 0.44248,-0.14749c0.04853,-0.00788 0.25231,-0.03713 0.44248,-0.14749c0.15332,-0.08897 0.34415,-0.09833 0.58997,-0.19666c0.24582,-0.09833 0.29134,-0.17196 0.54081,-0.19666c0.14678,-0.01453 0.34415,-0.04916 0.44248,-0.04916c0.19666,0 0.34463,0.00969 0.44248,0c0.24947,-0.0247 0.29498,-0.04916 0.49164,-0.04916c0.14749,0 0.19666,0 0.29498,0c0.09833,0 0.19666,0 0.24582,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.04916,0c-0.04916,0 -0.16189,-0.03476 -0.19666,0c-0.03477,0.03476 -0.16578,0.0681 -0.34415,0.19666c-0.0564,0.04065 -0.19069,0.17175 -0.34415,0.19666c-0.04853,0.00788 -0.14296,0.0244 -0.34415,0.04916c-0.0488,0.00601 -0.14749,0 -0.34415,0c-0.14749,0 -0.19666,0 -0.34415,0c-0.14749,0 -0.19666,0 -0.34415,0c-0.09833,0 -0.14749,0 -0.24582,0c-0.09833,0 -0.19666,0 -0.24582,0c-0.09833,0 -0.13242,-0.07172 -0.19666,-0.09833c-0.04542,-0.01881 -0.13886,-0.10314 -0.19666,-0.19666c-0.02585,-0.04182 -0.0897,-0.05398 -0.14749,-0.14749c-0.02585,-0.04182 -0.0144,-0.06356 -0.04916,-0.09833c-0.03476,-0.03476 -0.0144,-0.06356 -0.04916,-0.09833c-0.03476,-0.03476 -0.03035,-0.05291 -0.04916,-0.09833c-0.02661,-0.06424 -0.04916,-0.09833 -0.04916,-0.09833c-0.04917,0 -0.04917,-0.04916 -0.04917,-0.09833c0,-0.04916 -0.01448,-0.16451 0.09833,-0.24582c0.08918,-0.06428 0.20536,-0.1153 0.44248,-0.19666c0.10398,-0.03568 0.29321,-0.15319 0.44248,-0.19666c0.19463,-0.05667 0.24582,-0.04916 0.44248,-0.04916c0.14749,0 0.24582,0 0.29498,0c0.09833,0 0.10207,0.03035 0.14749,0.04916c0.06424,0.02661 0.04916,0.09833 0.04916,0.14749c0,0.04916 0.03014,0.14344 -0.09833,0.19666c-0.09085,0.03763 -0.19666,0 -0.39331,0.04916c-0.19666,0.04916 -0.24129,0.07356 -0.44248,0.09833c-0.09759,0.01201 -0.14749,0 -0.19666,0c-0.04917,0 -0.09833,0 -0.14749,0c0,0 -0.04916,0 -0.09833,0c-0.04917,0 0.00422,0.02849 0.09833,0c0.16966,-0.05137 0.29222,-0.10759 0.44248,-0.14749c0.24229,-0.06434 0.34415,-0.04916 0.39331,-0.04916c0.14749,0 0.19666,0 0.24582,0c0.04917,0 0.07952,0.00374 0.09833,0.04916c0.02661,0.06424 0.15268,0.15787 0.19666,0.24582c0.10993,0.21987 0.45288,0.33009 0.58997,0.44248c0.16131,0.13224 0.32967,0.31201 0.44248,0.39331c0.08918,0.06428 0.19666,0.09833 0.24582,0.09833c0.04916,0 0.11273,0.0144 0.14749,0.04916c0.03476,0.03476 0.05665,0.01153 0.14749,0.04916c0.06424,0.02661 0.09833,0.09833 0.14749,0.09833c0.04916,0 0.0144,0.0144 0.04916,0.04916c0.03476,0.03476 0.14749,0.04916 0.19666,0.09833c0.04916,0.04916 0.04916,0.04916 0.09833,0.04916c0.04916,0 0.0144,0.06356 0.04916,0.09833c0.03477,0.03477 0.04917,0.04916 0.04917,0.09833c0,0.04916 0.02849,0.10255 0,0.19666c-0.05137,0.16966 -0.21822,0.38435 -0.39331,0.83579c-0.11244,0.2899 -0.26269,0.68221 -0.34415,0.93412c-0.06237,0.19288 -0.07307,0.23716 -0.09833,0.34415c-0.0113,0.04785 -0.02857,-0.06976 0.04916,-0.14749c0.07774,-0.07774 0.21725,-0.31558 0.29499,-0.39331c0.07774,-0.07773 0.12868,-0.15123 0.14749,-0.19666c0.02661,-0.06424 0.06357,-0.06356 0.09833,-0.09833c0.03476,-0.03476 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.09833,0.04916c0,0.04916 0.06356,0.08393 0.09833,0.04916c0.03476,-0.03476 0,-0.09833 0,-0.14749c0,-0.04916 0,-0.04916 0,-0.09833c0,-0.04916 0,-0.09833 0,-0.14749c0,-0.04916 0,0 0,0.14749c0,0.04916 0,0.14749 0,0.29499c0,0.04916 0,0.09833 0,0.14749c0,0 0,0.04916 0,-0.09833c0,-0.19666 0,-0.29498 0,-0.29498c0,0.09833 0,0.14749 0,0.19666c0,0.04916 0.04785,0.1362 0,0.14749c-0.10699,0.02526 -0.07172,-0.18159 -0.09833,-0.24582c-0.03763,-0.09084 0.01881,-0.10207 0,-0.14749c-0.02661,-0.06424 -0.04917,-0.09833 -0.04917,-0.14749c0,-0.04916 0,-0.09833 0,-0.14749c0,-0.04916 0,-0.04916 0,-0.09833c0,-0.04916 -0.00851,-0.00724 -0.04916,0.04916c-0.06428,0.08918 -0.09833,0.19666 -0.09833,0.29499l0,0.04916l0,0.04916l0,0" id="svg_22" stroke="#009999" fill="none"/>  <path d="m22.64135,11.6316c0,0 -0.04916,0 -0.09833,0c0,0 -0.09833,0 -0.24582,0c-0.09833,0 -0.14749,0 -0.14749,0c-0.09833,0 -0.14749,0 -0.19666,0c-0.04916,0 -0.11273,0.03476 -0.14749,0c-0.03476,-0.03476 -0.08393,-0.11273 -0.04917,-0.14749c0.03477,-0.03477 0.19666,-0.04916 0.29499,-0.04916c0.14749,0 0.28901,-0.07342 0.44248,-0.09833c0.14559,-0.02363 0.34415,0 0.39331,0c0.09833,0 0.14749,0 0.19666,0c0.04916,0 0.06356,-0.0144 0.09833,-0.04916c0.03477,-0.03477 0.04917,-0.04916 0.04917,-0.09833c0,-0.04916 0.01881,-0.10207 0,-0.14749c-0.05322,-0.12847 -0.12577,-0.17302 -0.29499,-0.29498c-0.17837,-0.12856 -0.34415,-0.09833 -0.58997,-0.19666c-0.24582,-0.09833 -0.44331,-0.14274 -0.73746,-0.19666c-0.24658,-0.04519 -0.39331,-0.04916 -0.49164,-0.04916c-0.14749,0 -0.29626,-0.01575 -0.39331,0c-0.15346,0.0249 -0.25705,0.09105 -0.39331,0.14749c-0.12847,0.05322 -0.25236,0.12633 -0.44248,0.19666c-0.10311,0.03814 -0.29884,0.13716 -0.44248,0.19666c-0.10157,0.04207 -0.22849,0.14614 -0.44248,0.19666c-0.0957,0.02259 -0.19666,0 -0.29498,0.04916c-0.09833,0.04916 -0.09109,0.05767 -0.14749,0.09833c-0.08918,0.06428 -0.14749,0.09833 -0.19666,0.09833c-0.04916,0 -0.11273,0.03476 -0.14749,0c-0.03476,-0.03476 -0.03763,-0.10581 0,-0.19666c0.02661,-0.06424 0.04916,-0.04916 0.09833,-0.09833c0.14749,-0.14749 0.19666,-0.24582 0.29498,-0.34415c0.04917,-0.04916 0.09373,-0.10341 0.14749,-0.14749c0.13709,-0.11238 0.19666,-0.19666 0.24582,-0.24582c0,0 0.06356,-0.06356 0.09833,-0.09833c0.03477,-0.03477 0.06357,-0.06356 0.09833,-0.09833c0.03476,-0.03476 0.07951,-0.05291 0.09833,-0.09833c0.02661,-0.06424 0.09833,-0.09833 0.09833,-0.14749c0,-0.04916 0.06356,-0.0144 0.09833,-0.04916c0.03477,-0.03476 0.08393,-0.06356 0.04916,-0.09833c-0.03476,-0.03476 -0.09833,0 -0.19666,0c-0.09833,0 -0.15123,-0.01881 -0.19666,0c-0.06424,0.02661 -0.07796,0.07796 -0.14749,0.14749c-0.03476,0.03476 -0.20408,-0.0278 -0.29498,0.09833c-0.02875,0.03988 -0.02065,0.18603 -0.14749,0.34415c-0.13758,0.17151 -0.24582,0.19666 -0.34415,0.39331c-0.14749,0.29499 -0.21794,0.3836 -0.34415,0.6883c-0.0595,0.14364 -0.09833,0.29498 -0.14749,0.49164c-0.04916,0.19666 -0.07307,0.28632 -0.09833,0.39331c-0.0113,0.04785 -0.04916,0.09833 -0.04916,0.14749c0,0.04916 0,0.09833 0,0.14749c0,0.04916 -0.04916,0.04916 -0.14749,0.09833c0,0 0.05796,0.11301 -0.09833,0.19666c-0.04335,0.0232 -0.19666,0.14749 -0.24582,0.19666c-0.04916,0.04916 -0.0897,0.00481 -0.14749,0.09833c-0.02585,0.04182 -0.09833,0.04916 -0.14749,0.09833c-0.09833,0.09833 -0.15124,0.07951 -0.19666,0.09833c-0.06424,0.02661 -0.14749,0.09833 -0.19666,0.09833c-0.04916,0 -0.04916,-0.04916 -0.04916,-0.09833c0,-0.04916 0,-0.09833 0.14749,-0.24582c0.04916,-0.04916 0.14749,-0.14749 0.24582,-0.29498c0.09833,-0.14749 0.29498,-0.29499 0.39331,-0.49164c0.09833,-0.19666 0.21516,-0.24977 0.29499,-0.44248c0.03763,-0.09084 0.03713,-0.25231 0.14749,-0.44248c0.08897,-0.15332 0.19666,-0.29498 0.14749,-0.29498c-0.04916,0 -0.06787,0.13584 -0.24582,0.44248c-0.33108,0.5705 -0.41447,0.99892 -0.83579,1.72075c-0.32314,0.55361 -0.46079,0.85072 -0.63913,1.17994c-0.08443,0.15587 -0.19261,0.26484 -0.24582,0.39331c-0.03763,0.09084 -0.03409,0.1741 -0.09833,0.14749c-0.04542,-0.01881 0.00851,-0.09109 0.04916,-0.14749c0.06428,-0.08918 0.04563,-0.12837 0.14749,-0.24582c0.07203,-0.08305 0.08385,-0.16451 0.19666,-0.24582c0.08918,-0.06428 0.1634,-0.1239 0.24582,-0.19666c0.13289,-0.11731 0.24793,-0.28074 0.29498,-0.29499c0.16966,-0.05137 0.26785,-0.11911 0.39331,-0.19666c0.09352,-0.0578 0.19666,-0.19666 0.24582,-0.19666c0.09833,0 0.14749,-0.04916 0.19666,-0.04916c0,0 0.09833,0 0.14749,0c0.04916,0 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.14881,0.0113 0.19666,0c0.10699,-0.02526 0.14749,-0.04916 0.24582,-0.04916c0.04917,0 0.11273,-0.03476 0.14749,0c0.03477,0.03476 -0.0144,0.0144 -0.04916,0.04916c-0.03476,0.03476 -0.04319,0.12259 -0.19666,0.14749c-0.04853,0.00788 -0.08658,0.06961 -0.24582,0.14749c-0.13966,0.06831 -0.19869,0.09082 -0.39331,0.14749c-0.14927,0.04347 -0.19729,0.09045 -0.24582,0.09833c-0.15346,0.0249 -0.19666,0.09833 -0.24582,0.09833c-0.04916,0 -0.09833,0.04916 -0.09833,0.04916c0,0.04916 0,0.04916 0.04916,0.04916c0.24582,0 0.34415,0 0.73746,0c0.39331,0 0.44248,0 0.78663,0c0.19666,0 0.39331,-0.04916 0.6883,-0.09833c0.29499,-0.04916 0.5887,-0.15433 0.83579,-0.19666c0.34265,-0.05869 0.63913,-0.04916 0.78663,-0.04916c0.19666,0 0.44248,0 0.49164,0c0.19666,0 0.39331,0 0.54081,0c0.04917,0 0.19666,0 0.34415,0c0.09833,0 0.24582,0 0.39331,0c0.14749,0 0.24582,0 0.39331,0c0.09833,0 0.14749,0 0.19666,0c0.09833,0 0.14749,0 0.19666,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.09833,0c0,0.04916 0.06356,0.0144 0.09833,0.04916c0.03477,0.03476 0.06356,0.06356 0.09833,0.09833c0.03477,0.03476 0.08393,0.06356 0.04917,0.09833c-0.03477,0.03477 -0.13883,0.02391 -0.24582,0.04916c-0.1914,0.04518 -0.39442,0.03114 -0.54081,0.04916c-0.20119,0.02477 -0.29498,0.04916 -0.39331,0.04916c-0.09833,0 -0.19666,0 -0.29498,0c-0.04917,0 -0.15664,-0.03405 -0.24582,-0.09833c-0.05641,-0.04066 -0.08205,-0.07966 -0.24582,-0.14749c-0.23161,-0.09594 -0.29045,-0.07356 -0.49164,-0.09833c-0.14639,-0.01802 -0.29498,0 -0.44248,0c-0.14749,0 -0.29499,0 -0.49164,0c-0.09833,0 -0.19666,0 -0.34415,0c-0.09833,0 -0.30247,-0.03763 -0.39331,0c-0.06424,0.02661 -0.09833,0.04916 -0.14749,0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c0,0 0,0.04916 0,0.09833c0,0.04916 0.03183,0.14614 0.24582,0.19666c0.04785,0.0113 0.15664,-0.01512 0.24582,0.04916c0.0564,0.04065 0.14749,0.04916 0.19666,0.04916c0.04916,0 0.09833,0.04916 0.19666,0.04916c0.04917,0 0.09833,0 0.14749,0c0.09833,0 0.14749,0 0.14749,0c0.04916,-0.04916 0.10096,-0.07574 0.19666,-0.09833c0.10699,-0.02526 0.10207,-0.03035 0.14749,-0.04916c0.06424,-0.02661 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.09833,0 0.19666,0c0.04916,0 0.09833,0 0.19666,0c0,0 0.04917,0 0.09833,0c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.10207,0.01881 0.14749,0c0.06424,-0.02661 0.14881,-0.08703 0.19666,-0.09833c0.10699,-0.02526 0.16189,-0.11273 0.19666,-0.14749c0.06953,-0.06953 0.16218,-0.04663 0.24582,-0.09833c0.09352,-0.0578 0.12088,-0.13242 0.14749,-0.19666c0.03763,-0.09084 0.05768,-0.14025 0.09833,-0.19666c0.06428,-0.08918 0.09833,-0.14749 0.14749,-0.24582c0.04917,-0.09833 0.09833,-0.09833 0.09833,-0.19666c0,-0.04916 0.04916,-0.04916 0.04916,-0.04916c0,-0.04916 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.09833,0c0.04916,0 0.06356,0.0144 0.09833,0.04916c0.03476,0.03476 0,0.09833 0,0.14749c0,0.04916 0.0113,0.09964 0,0.14749c-0.02526,0.10699 -0.07172,0.13242 -0.09833,0.19666c-0.01881,0.04542 0,0.09833 0,0.09833c0,0 -0.06357,0.0144 -0.09833,0.04916c-0.03477,0.03476 -0.03409,0.07172 -0.09833,0.09833c-0.04542,0.01881 -0.09833,0 -0.14749,0c-0.04916,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.03409,-0.07172 -0.09833,-0.09833c-0.04542,-0.01881 -0.09833,0 -0.09833,-0.04916c0,0 -0.05291,0.01881 -0.09833,0c-0.06424,-0.02661 -0.06356,-0.11273 -0.09833,-0.14749c-0.06953,-0.06953 -0.17005,0.01507 -0.19666,-0.04916c-0.01881,-0.04542 0,-0.04916 -0.04916,-0.04916c-0.04917,0 -0.09833,0 -0.14749,-0.04916c-0.04916,-0.04916 -0.14749,-0.04916 -0.19666,-0.09833c0,0 -0.04053,-0.00481 -0.09833,-0.09833c-0.02585,-0.04182 -0.03787,-0.05048 -0.04916,-0.09833c-0.02526,-0.10699 -0.04917,-0.19666 -0.04917,-0.19666c0,-0.04916 0,-0.09833 0,-0.19666c0,-0.04916 0,-0.09833 0,-0.14749c0,-0.04916 -0.02259,-0.10096 0,-0.19666c0.02526,-0.10699 0.10748,-0.18154 0.19666,-0.24582c0.0564,-0.04065 0.14881,-0.18536 0.19666,-0.19666c0.10699,-0.02526 0.19666,-0.04916 0.19666,-0.04916c0.04916,0 0.09833,0 0.09833,0.04916c0,0.04916 0,0.14749 0,0.19666c0,0.09833 0,0.24582 0,0.29498c0,0.09833 -0.02256,0.18159 -0.04916,0.24582c-0.01881,0.04542 0,0.09833 0,0.14749c0,0.04916 -0.0144,0.06356 -0.04916,0.09833c-0.03476,0.03476 -0.09833,0 -0.14749,0c-0.04916,0 -0.12088,-0.03409 -0.14749,-0.09833c-0.01881,-0.04542 -0.07307,-0.08966 -0.09833,-0.19666c-0.02259,-0.0957 -0.07172,-0.13242 -0.09833,-0.19666c-0.01881,-0.04542 0.0278,-0.20408 -0.09833,-0.29498c-0.03988,-0.02875 -0.07307,-0.08966 -0.09833,-0.19666c-0.0113,-0.04785 -0.07307,-0.0405 -0.09833,-0.14749c-0.0113,-0.04785 0.01507,-0.07172 -0.04916,-0.09833c-0.04542,-0.01881 -0.13242,-0.07172 -0.19666,-0.09833c-0.09084,-0.03763 -0.13883,-0.07307 -0.24582,-0.09833c-0.0957,-0.02259 -0.19666,0 -0.29498,0c0,0 -0.10207,0.01881 -0.14749,0c-0.06424,-0.02661 -0.14749,-0.04916 -0.19666,-0.04916c-0.04916,0 -0.07796,0.02037 -0.14749,-0.04916c-0.03477,-0.03476 -0.04916,-0.04916 -0.09833,-0.04916c-0.04916,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.04916,0 -0.09833,0c-0.04916,0 -0.05665,0.01154 -0.14749,0.04916c-0.06424,0.02661 -0.16189,0.06356 -0.19666,0.09833c-0.03477,0.03476 -0.03409,0.12089 -0.09833,0.14749c-0.09084,0.03763 -0.11273,0.0144 -0.14749,0.04916c-0.06953,0.06953 -0.14749,0.04916 -0.14749,0.04916c-0.04917,0 -0.12164,0.00734 -0.14749,0.04916c-0.0578,0.09352 -0.20517,0.04192 -0.24582,0.09833c-0.06428,0.08918 -0.15664,0.08321 -0.24582,0.14749c-0.11281,0.08131 -0.18799,0.12224 -0.29498,0.14749c-0.04785,0.0113 -0.13242,0.02256 -0.19666,0.04916c-0.04542,0.01881 -0.06356,-0.03476 -0.09833,0c-0.03476,0.03476 0,0.09833 0,0.14749c0,0.04916 0,0.09833 0,0.14749c0,0 0.04916,0 0.04916,0.04916c0,0.04916 0,0.04916 0,0.09833c0,0.04916 0,0.09833 0,0.14749c0,0.04916 0.0144,0.06356 0.04916,0.09833c0.03477,0.03476 -0.03477,0.11273 0,0.14749c0.03476,0.03476 0.04916,0.04916 0.09833,0.04916c0.04917,0 0.09965,0.03787 0.14749,0.04916c0.10699,0.02526 0.09833,0.04916 0.14749,0.04916c0.04916,0 0.15123,-0.01881 0.19666,0c0.06424,0.02661 0.10207,0.03035 0.14749,0.04916c0.06424,0.02661 0.14749,0.04916 0.24582,0.04916c0.09833,0 0.14749,0 0.29498,0c0.04917,0 0.14749,0 0.24582,0c0,0 0.09833,0 0.14749,0c0.09833,0 0.14749,0 0.24582,0c0.04916,0 0.09833,0 0.19666,0c0.09833,0 0.14749,0 0.19666,0c0.09833,0 0.19666,0 0.24582,0c0.04916,0 0.14749,0 0.19666,0c0.04917,0 0.14749,0 0.24582,0c0.04917,0 0.08966,-0.02391 0.19666,-0.04916c0.04785,-0.0113 0.05398,-0.04053 0.14749,-0.09833c0.04182,-0.02585 0.06356,-0.0144 0.09833,-0.04916c0.03476,-0.03476 0.04916,-0.04916 0.04916,-0.04916c0,-0.04916 0.04917,-0.04916 0.04917,-0.09833c0,-0.04916 0.03763,-0.05665 0,-0.14749c-0.02661,-0.06424 -0.04917,-0.09833 -0.19666,-0.19666c-0.14749,-0.09833 -0.39656,-0.19064 -0.49164,-0.24582c-0.15332,-0.08897 -0.27991,-0.21921 -0.34415,-0.24582c-0.09084,-0.03763 -0.18158,-0.07172 -0.24582,-0.09833c-0.04542,-0.01881 -0.13886,0.04435 -0.19666,-0.04916c-0.02585,-0.04182 -0.04917,-0.04916 -0.14749,-0.04916c0,0 -0.04916,0 -0.09833,0c-0.04917,0 -0.09833,0 -0.14749,0c-0.04916,0 -0.09833,0 -0.14749,0c0,0 -0.06356,-0.03476 -0.09833,0c-0.03476,0.03476 -0.07172,0.08326 -0.09833,0.14749c-0.01881,0.04542 -0.06357,0.0144 -0.09833,0.04916c-0.03476,0.03476 -0.07172,0.03409 -0.09833,0.09833c-0.01881,0.04542 -0.0144,0.06356 -0.04917,0.09833c-0.03477,0.03476 -0.0144,0.06356 -0.04916,0.09833c-0.03477,0.03476 -0.0144,0.06356 -0.04916,0.09833c-0.03476,0.03476 0,0.09833 0.04916,0.09833c0.04916,0 0.14749,0 0.19666,0c0.14749,0 0.29498,0 0.29498,0c0.14749,0 0.29499,0 0.39331,0c0,0 0.03409,-0.02256 0.09833,-0.04916c0.13627,-0.05644 0.2004,0.01881 0.24582,0c0.06424,-0.02661 0.09833,-0.04916 0.14749,-0.04916c0.04916,0 0.09833,0 0.14749,0c0.04916,0 0.09833,0 0.14749,0l0,0" id="svg_23" stroke="#009999" fill="none"/>  <path d="m14.28343,14.13897c0,0.04916 0,0.04916 0,0.09833c0,0 -0.0144,0.06356 -0.04916,0.09833c-0.03476,0.03476 -0.06356,0.0144 -0.09833,0.04916c-0.03476,0.03476 -0.09833,0.04916 -0.14749,0.04916l-0.04916,0l0,0.04916l-0.04916,0" id="svg_30" stroke="#009999" fill="none"/>  <polyline stroke="#009999" stroke-linecap="round" id="svg_31" points="3.516469476417683,11.975745173634563 3.516469476417683,11.975745173634563 " fill="none"/><ellipse ry="0.19666" rx="0.2704" id="svg_44" cy="4.84694" cx="7.57252" stroke="#009999" fill="#ffffff"/>  <polyline stroke-linecap="round" id="svg_47" points="7.498770301828305,4.7977708463512165 7.498770301828305,4.7977708463512165 " stroke="#009999" fill="none"/></g></svg>,
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords: ['image','Gutensee Image','Image','gutensee-image'],
	attributes: {
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
		imageUrl: {
	      type: 'string',
	    },
	    imageID:{
	    	type:'number',
	    },
	    imageAlt:{
	      type: 'string',
	      source:'attributes',
	      attributes:'alt',
	      selector: 'img',
	    },
	    title:{
			type:'string',
		},
		imgfit:{
			type:'string',
			default:'initial'
		},
		toggle:{
			type: 'boolean',
			default: false
		},
		imgwidth:{
			type:'number'
		},
		imgheight:{
			type:'number'
		},
		imgopacity:{
			type:'number'
		},
		textAlignment: {
			type: 'string',
			default:'left'
		},
		imgbrightness:{
			type:'number',
			default:100
		},
		imgcontrast:{
			type:'number',
			default:100
		},
		imgsaturate:{
			type:'number',
			default:100
		}, 
		imgblur:{
			type:'number',
			default:0

		},
		imghue_rotate:{
			type:'number',
			default:0
		},
		bgColor:{
	    	type:'string',
	    },
	    bggradientValue:{
	    	type: "string",
	    },
	    captionColor:{
	    	type:'string',
	    	default:'#000',
	    },
	    bghColor:{
	    	type:'string',
	    },
	    bggradienthValue:{
	    	type: "string",
	    },
	    captionhColor:{
	    	type:'string',
	    	default:'#000',
	    },
	    shadowColor:{
	    	type:'string',
	    	default:'#000'
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
		previewcaptionpaddings:{
			type:'string',
			default:'Desktop',
		},
		captionpaddings:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		captionpaddingstab:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
		},
		captionpaddingsmob:{
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
			default: 0
		},
		blurshadow: {
			type: 'number',
			default: 0
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
			default:'600'
		},
    	TitleLineHeight:{
	    	type:'number',
	    	default:58
	    },
	    TitleLineHeighttab:{
	    	type:'number',
	    },
	    TitleLineHeightmob:{
	    	type:'number',
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
	    TitleTransform:{
	    	type:'string'
	    },
	    TitleDecoration:{
	    	type:'string'
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
	save: (props) => { 
		const { attributes } = props;
 		const{uniqueid, title, imgfit, toggle, imgwidth, imgheight, imgopacity, imgbrightness, imgcontrast, imgsaturate, imgblur, imghue_rotate, bgColor, bggradientValue, captionColor, shadowColor, previewcaptionpaddings, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, captionpaddings, captionpaddingstab, captionpaddingsmob, border, borderradius, fontfamily, titlefontSize, TitleLineHeight, TitleFontWeight, TitleTransform, TitleDecoration, TitleLetterSpacing, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, previewfontsize, previewlineheight, previewltrspaceing, titlefontSizetab, titlefontSizemob, TitleLineHeighttab, TitleLineHeightmob, TitleLetterSpacingtab, TitleLetterSpacingmob, bghColor, bggradienthValue, captionhColor, colorType, advid, advclass, advcss }=attributes;

	  	const blockclass = 'image-upload-wrapper gutensee-image';
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		const animationclass = 'animated '+attributes.durations+' '+attributes.animation;
		const displaydesktop = (hidedesktop == false) ? 'hide-desktop' : '';
		const displaytablet = (hidetablet == false) ? 'hide-tablet' : '';
		const displaymobile = (hidemobile == false) ? 'hide-mobile' : '';
		const displayclass = displaydesktop+' '+displaytablet+' '+displaymobile;

		const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
		const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
		const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
		const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

		return(
		<>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `.gutensee-image#${uniqueid}{
						background-color:${bgColor};						
						animation-delay: ${delay}ms;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};		
						background-image:${bggradientValue};						
					}
					.gutensee-image#${uniqueid} img{
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};						
					}
					.gutensee-image#${uniqueid} img{
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						width: ${imgwidth}px;
	  					height: ${imgheight}px;
	  					opacity: ${imgopacity};
						object-fit: ${imgfit};
						filter: brightness( ${imgbrightness}% ) contrast( ${imgcontrast}% ) saturate( ${imgsaturate}% ) blur( ${imgblur}px ) hue-rotate( ${imghue_rotate}deg );
					}
					.gutensee-image#${uniqueid} span{						
						display: flex;
						font-size: ${titlefontSize};
						font-weight: ${TitleFontWeight};
						line-height: ${TitleLineHeight};
						font-family: ${fontfamily};
						text-transform:${TitleTransform};
						text-decoration:${TitleDecoration};
						letter-spacing:${TitleLetterSpacing}px;
						color:${captionColor};
						padding: ${captionpaddings.top} ${captionpaddings.right} ${captionpaddings.bottom} ${captionpaddings.left};
					}`					
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
				<div id={uniqueid} className = {`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${props.attributes.className} ${advclass}`}>
					<div class="gutensee-img">
						<img
			  				src={props.attributes.imageUrl}
			  				alt={props.attributes.imageAlt}
			  			/>
			  			{(toggle!=false) ? (
				  			<RichText.Content 
								tagName="span"
								className="gutensee-img-caption"
								value={attributes.title}
							/>
							):null 
						}
					</div>
				</div>
			</div>
		</>
		);		
	}
});