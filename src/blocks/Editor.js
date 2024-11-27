import {registerBlockType} from "@wordpress/blocks"
const { RichText,  ColorPalette,  InspectorControls,  BlockControls,  AlignmentToolbar,  withColors,  FontSizePicker, getColorClassName, PanelColorSettings
} = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, RangeControl, ToggleControl, SelectControl, TextControl} = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { withSelect } = wp.data;
import {__experimentalBoxControl as BoxControl, BaseControl, __experimentalInputControl as InputControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {colors, dualcolors, gradcolors} from './lib/colors';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	
	const { attributes, setAttributes, clientId } = props;
	const{uniqueid, controlType, content, dropCap, contentColor, bgColor, bggradientValue, dropbggradientValue, previewmargins, previewpaddings,previewdropmargins, previewdroppaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, dropcapmargins, dropcapmarginstab, dropcapmarginsmob, dropcappaddings, dropcappaddingstab, dropcappaddingsmob, dropcapborder, dropcapborderradius, border, borderradius, fontfamily, contentfontSize, contentfontSizetab, contentfontSizemob, ContentLineHeight, ContentLineHeighttab, ContentLineHeightmob, ContentFontWeight, ContentTransform, ContentDecoration, ContentLetterSpacing, ContentLetterSpacingtab, ContentLetterSpacingmob, dropcapfontfamily, dropcapfontSize, dropcapfontSizetab, dropcapfontSizemob, dropcapLineHeight, dropcapLineHeighttab, dropcapLineHeightmob, dropcapFontWeight, dropcapTransform, dropcapDecoration, dropcapLetterSpacing, dropcapLetterSpacingtab, dropcapLetterSpacingmob, dropColor, dropbgColor, hidedesktop, hidetablet, hidemobile, animation, durations, delay, previewfontsize, previewlineheight, previewltrspaceing, previewdropfontsize, previewdroplineheight, previewdropltrspaceing, contenthColor, bghColor, bggradienthValue, drophColor, dropbghColor, dropbggradienthValue, colorType, advid, advclass, advcss }=attributes;	
	const blockclass='gutensee-text-editor';
	const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
	const animationclass='animated '+attributes.durations+' '+attributes.animation;
	const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
	const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
	const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
	const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;
	const dropcapclass=(dropCap != false) ? 'has-dropcap':'';

	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

	const dropcapbordertop=(dropcapborder.top != undefined) ? `${dropcapborder.top.width} ${dropcapborder.top.style} ${dropcapborder.top.color}` : null;
	const dropcapborderright=(dropcapborder.right != undefined) ? `${dropcapborder.right.width} ${dropcapborder.right.style} ${dropcapborder.right.color}` : null;
	const dropcapborderbottom=(dropcapborder.bottom != undefined) ? `${dropcapborder.bottom.width} ${dropcapborder.bottom.style} ${dropcapborder.bottom.color}` : null;
	const dropcapborderleft=(dropcapborder.left != undefined) ? `${dropcapborder.left.width} ${dropcapborder.left.style} ${dropcapborder.left.color}` : null;

	setAttributes({ uniqueid: 'gutenseeEditor' +clientId.slice(0,8) });
	
	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewdropmargins(value) {
		setAttributes({previewdropmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewdroppaddings(value) {
		setAttributes({previewdroppaddings:value});
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

	function setPreviewdropfontsize(value) {
		setAttributes({previewdropfontsize:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewdroplineheight(value) {
		setAttributes({previewdroplineheight:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewdropltrspaceing(value) {
		setAttributes({previewdropltrspaceing:value});
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
      }else{
      	document.head.appendChild(link);
      }
    }
    if(dropcapfontfamily !=null){
		let url = 'https://fonts.googleapis.com/css2?family='+dropcapfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
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
   
	return(
		<Fragment>
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
							label={__('Add Dropcap','gutensee')}
							checked={dropCap}
							onChange={(newval) => setAttributes({ dropCap: newval })}
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
											{ __('Title','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Text','gutensee')}
									            value={ contentColor }
									            onChange={ (newtext) => setAttributes({ contentColor: newtext }) }
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
								
							
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Dropcap','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Dropcap','gutensee')}
									            value={ dropColor }
									            onChange={ (newtext) => setAttributes({ dropColor: newtext }) }
									        />
										</div>
									</div>

									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Dropcap Background','gutensee')}
										</p>
										<div className="gutensee_block_section_panel gutensee-color-gradient">						
											<PanelColorGradientSettings className="gutensee-color-gradient"
												settings={ [
														{
												colorValue: attributes.bgColor,
												gradientValue: attributes.dropbggradientValue,
												colors:dualcolors,
												gradients:gradcolors,
												label:__("Background"),
												onColorChange:(newValue) => setAttributes({dropbgColor: newValue }),
												onGradientChange:(newValue) => setAttributes({dropbggradientValue: newValue }),
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
									            title={ __('Text','gutensee')}
									            value={ contenthColor }
									            onChange={ (newtext) => setAttributes({ contenthColor: newtext }) }
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
								
							
									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Dropcap','gutensee')}
										</p>
										<div className="gutensee_block_section_panel">						
											<ColorPalette
												className={'gutensee-color'}
									            title={ __('Dropcap','gutensee')}
									            value={ drophColor }
									            onChange={ (newtext) => setAttributes({ drophColor: newtext }) }
									        />
										</div>
									</div>

									<div className="gutensee_block_section_flex_panel">
										<p className="gutensee_block_section_panel_label">
											{ __('Dropcap Background','gutensee')}
										</p>
										<div className="gutensee_block_section_panel gutensee-color-gradient">						
											<PanelColorGradientSettings className="gutensee-color-gradient"
												settings={ [
														{
												colorValue: attributes.bghColor,
												gradientValue: attributes.dropbggradienthValue,
												colors:dualcolors,
												gradients:gradcolors,
												label:__("Background"),
												onColorChange:(newValue) => setAttributes({dropbghColor: newValue }),
												onGradientChange:(newValue) => setAttributes({dropbggradienthValue: newValue }),
											},
													] }
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
										label={__('Padding','gutensee')}
										values={paddings}
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
										label={__('Padding','gutensee')}
										values={paddingstab}
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
										label={__('Padding','gutensee')}
										values={paddingsmob}
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

							<RadioGroup label="Width" onChange={ setPreviewdropmargins } checked={ previewdropmargins } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewdropmargins === 'Desktop' && (
				        		<>
									<BoxControl 
										label={__('Dropcap Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={dropcapmargins}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...dropcapmargins,
												dropcapmargins: {
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
							{ previewdropmargins === 'Tablet' && (
				        		<>
									<BoxControl 
										label={__('Dropcap Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={dropcapmarginstab}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...dropcapmarginstab,
												dropcapmarginstab: {
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
							{ previewdropmargins === 'Mobile' && (
				        		<>
									<BoxControl 
										label={__('Dropcap Margin','gutensee')}
										inputProps={{ min: -300 }}
										values={dropcapmarginsmob}
										sides={['top', 'bottom','left','right']}
										allowReset={false}
										units={[]}
										onChange={(newValue) =>
											setAttributes({
												...dropcapmarginsmob,
												dropcapmarginsmob: {
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

							<RadioGroup label="Width" onChange={ setPreviewdroppaddings } checked={ previewdroppaddings } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewdroppaddings === 'Desktop' && (
				        		<>
				          			<BoxControl							
										label={__('Dropcap Padding','gutensee')}
										values={dropcappaddings}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...dropcappaddings,
												dropcappaddings: {
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
							{ previewdroppaddings === 'Tablet' && (
				        		<>
				          			<BoxControl							
										label={__('Dropcap Padding','gutensee')}
										values={dropcappaddingstab}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...dropcappaddingstab,
												dropcappaddingstab: {
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
							{ previewdroppaddings === 'Mobile' && (
				        		<>
				          			<BoxControl							
										label={__('Dropcap Padding','gutensee')}
										values={dropcappaddingsmob}
										units={[]}
										allowReset={false}
										onChange={(newValue) =>
											setAttributes({
												...dropcappaddingsmob,
												dropcappaddingsmob: {
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
					            label={ __( 'Dropcap Border' ,'gutensee') }
					            onChange={(newtext) => setAttributes({ dropcapborder: newtext })}
					            value={ dropcapborder }
					        />
							<BoxControl
								label={__('Dropcap Border Radius','gutensee')}
								values={ {
									top: '0px',
									left: '0px',
									right: '0px',
									bottom: '0px',
									} }
								onChange={(newtext) => setAttributes({ dropcapborderradius: newtext })}
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
					<PanelBody initialOpen={false}	title={__('Content','gutensee')} className={'gutensee-panel-edit'}>
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
							            value={ contentfontSize }
							            onChange={(userVal) => setAttributes({
													contentfontSize: userVal
												})}
							        />
							    </>
							)}
							{ previewfontsize === 'Tablet' && (
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
							{ previewfontsize === 'Mobile' && (
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
				            className={'gutensee-single'}
				            value={ ContentFontWeight }
				            options={ fontweightslist }
				            onChange={ (newtext) => setAttributes({ ContentFontWeight: newtext }) }					  
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
									    value={ ContentLineHeight}
							        	onChange={(newtext) => setAttributes({ ContentLineHeight: newtext })}
									/>
								</>
							)}
							{ previewlineheight === 'Desktop' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}
										className={'gutensee-singl'}			    
									    value={ ContentLineHeighttab}
							        	onChange={(newtext) => setAttributes({ ContentLineHeighttab: newtext })}
									/>
								</>
							)}
							{ previewlineheight === 'Desktop' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}
										className={'gutensee-singl'}			    
									    value={ ContentLineHeightmob}
							        	onChange={(newtext) => setAttributes({ ContentLineHeightmob: newtext })}
									/>
								</>
							)}
						</div>

						<SelectControl
				            label={__('Transform','gutensee')}
				            className={'gutensee-single'}
				            value={ ContentTransform }
				            options={ transformslist }
				            onChange={ (newtext) => setAttributes({ ContentTransform: newtext }) }					  
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
									    value={ ContentLetterSpacing}
							        	onChange={(newtext) => setAttributes({ ContentLetterSpacing: newtext })}
									/>
								</>
							)}
							{ previewltrspaceing === 'Tablet' && (
				        		<>			        
							        <UnitControl 
										label={__('Letter Spacing','gutensee')}
										className={'gutensee-singl'}			    
									    value={ ContentLetterSpacingtab}
							        	onChange={(newtext) => setAttributes({ ContentLetterSpacingtab: newtext })}
									/>
								</>
							)}
							{ previewltrspaceing === 'Mobile' && (
				        		<>			        
							        <UnitControl 
										label={__('Letter Spacing','gutensee')}
										className={'gutensee-single'}			    
									    value={ ContentLetterSpacingmob}
							        	onChange={(newtext) => setAttributes({ ContentLetterSpacingmob: newtext })}
									/>
								</>
							)}
						</div>

						<SelectControl
				            label={__('Decoration ','gutensee')}
				            className={'gutensee-single'}
				            value={ ContentDecoration }
				            options={ decorationslist }
				            onChange={ (newtext) => setAttributes({ ContentDecoration: newtext }) }					  
				        />
					</PanelBody>

					<PanelBody initialOpen={false}	title={__('Dropcap','gutensee')} className={'gutensee-panel-edit'}>
						<SelectControl
				            label={__(' Font Family','gutensee')}
				            value={ dropcapfontfamily }
				            options={fontfamilylist}
				            onChange={ (newtext) => setAttributes({ dropcapfontfamily: newtext }) }
				        />	
				        <div class="gutensee-preview-control">
					        <RadioGroup label="Width" onChange={ setPreviewdropfontsize } checked={ previewdropfontsize } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewdropfontsize === 'Desktop' && (
				        		<>	
							        <UnitControl
							        	label={__('Font Size','gutensee')}
							        	className={'gutensee-singl'}
							            value={ dropcapfontSize }
							            onChange={(userVal) => setAttributes({
													dropcapfontSize: userVal
												})}
							        />
							    </>
							)}
							{ previewdropfontsize === 'Tablet' && (
				        		<>	
							        <UnitControl
							        	label={__('Font Size','gutensee')}
							        	className={'gutensee-singl'}
							            value={ dropcapfontSizetab }
							            onChange={(userVal) => setAttributes({
													dropcapfontSizetab: userVal
												})}
							        />
							    </>
							)}
							{ previewdropfontsize === 'Mobile' && (
				        		<>	
							        <UnitControl
							        	label={__('Font Size','gutensee')}
							        	className={'gutensee-singl'}
							            value={ dropcapfontSizemob }
							            onChange={(userVal) => setAttributes({
													dropcapfontSizemob: userVal
												})}
							        />
							    </>
							)}
						</div>
				        <SelectControl
				            label={__('Font Weight','gutensee')}
				            className={'gutensee-single'}
				            value={ dropcapFontWeight }
				            options={ fontweightslist }
				            onChange={ (newtext) => setAttributes({ dropcapFontWeight: newtext }) }					  
				        />
				        <div class="gutensee-preview-control">
					        <RadioGroup label="Width" onChange={ setPreviewdroplineheight } checked={ previewdroplineheight } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewdroplineheight === 'Desktop' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}
										className={'gutensee-singl'}			    
									    value={ dropcapLineHeight}
							        	onChange={(newtext) => setAttributes({ dropcapLineHeight: newtext })}
									/>
								</>
							)}
							{ previewdroplineheight === 'Tablet' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}
										className={'gutensee-singl'}			    
									    value={ dropcapLineHeighttab}
							        	onChange={(newtext) => setAttributes({ dropcapLineHeighttab: newtext })}
									/>
								</>
							)}
							{ previewdroplineheight === 'Mobile' && (
				        		<>
							        <UnitControl 
										label={__('line Height(px)','gutensee')}
										className={'gutensee-singl'}			    
									    value={ dropcapLineHeightmob}
							        	onChange={(newtext) => setAttributes({ dropcapLineHeightmob: newtext })}
									/>
								</>
							)}
						</div>
						<SelectControl
				            label={__('Transform','gutensee')}
				            className={'gutensee-single'}
				            value={ dropcapTransform }
				            options={ transformslist }
				            onChange={ (newtext) => setAttributes({ dropcapTransform: newtext }) }					  
			        	/>
			        	<div class="gutensee-preview-control">
				        	<RadioGroup label="Width" onChange={ setPreviewdropltrspaceing } checked={ previewdropltrspaceing } className={"preview-icon"}>
					            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
					            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
					            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
					        </RadioGroup>
					        { previewdropltrspaceing === 'Desktop' && (
				        		<>
							        <UnitControl 
										label={__('Letter Spacing','gutensee')}	
										className={'gutensee-singl'}		    
									    value={ dropcapLetterSpacing}
							        	onChange={(newtext) => setAttributes({ dropcapLetterSpacing: newtext })}			
									/>
								</>
							)}
							{ previewdropltrspaceing === 'Tablet' && (
				        		<>
							        <UnitControl 
										label={__('Letter Spacing','gutensee')}	
										className={'gutensee-singl'}		    
									    value={ dropcapLetterSpacingtab}
							        	onChange={(newtext) => setAttributes({ dropcapLetterSpacingtab: newtext })}			
									/>
								</>
							)}
							{ previewdropltrspaceing === 'Mobile' && (
				        		<>
							        <UnitControl 
										label={__('Letter Spacing','gutensee')}	
										className={'gutensee-singl'}		    
									    value={ dropcapLetterSpacingmob}
							        	onChange={(newtext) => setAttributes({ dropcapLetterSpacingmob: newtext })}			
									/>
								</>
							)}
						</div>
						<SelectControl
				            label={__('Decoration ','gutensee')}
				            className={'gutensee-single'}
				            value={ dropcapDecoration }
				            options={ decorationslist }
				            onChange={ (newtext) => setAttributes({ dropcapDecoration: newtext }) }				  
				        />

					</PanelBody>
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
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `.text-editor-inner p.${uniqueid}.has-dropcap:first-child:first-letter {
					color: ${dropColor};
					background-color:${dropbgColor};
					float: left;
					font-family: ${dropcapfontfamily};
					font-size: ${dropcapfontSize};
					text-transform:${dropcapTransform};
					text-decoration:${dropcapDecoration};
					font-weight: ${dropcapFontWeight};
					line-height: ${dropcapLineHeight};
					letter-spacing: ${dropcapLetterSpacing}px;
					margin: ${dropcapmargins.top} ${dropcapmargins.right} ${dropcapmargins.bottom} ${dropcapmargins.left};
					padding: ${dropcappaddings.top} ${dropcappaddings.right} ${dropcappaddings.bottom} ${dropcappaddings.left};
					border: ${dropcapborder.width} ${dropcapborder.style} ${dropcapborder.color};
					border-top:dropcapbordertop;
					border-right:dropcapborderright;
					border-bottom:dropcapborderbottom;
					border-left:dropcapborderleft;
					border-radius:${dropcapborderradius.top} ${dropcapborderradius.right} ${dropcapborderradius.bottom} ${dropcapborderradius.left};
					background-image:${dropbggradientValue};
				}
				${advcss}`
			    ].join('\n')
			  }}>
			</style>
			<div id={advid}>
				<div class="text-editor-inner">
					<RichText
						key="editable"
						tagName="p"
						className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${dropcapclass} ${uniqueid} ${advclass}`}
						placeholder={__('Gutensee Text Here','gutensee')}
						value={content}
						onChange={(newtext) => setAttributes({ content: newtext })}
						style={{
							color:contentColor,
							backgroundColor:bgColor,
							margin: `${margins.top} ${margins.right} ${margins.bottom} ${margins.left}`,
							padding: `${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left}`,
							fontSize: contentfontSize,
							fontWeight: ContentFontWeight,
							lineHeight: `${ContentLineHeight}px`,
							animationDelay: delay+ 'ms',
							fontFamily:fontfamily,
							textTransform:ContentTransform,
							textDecoration:ContentDecoration,
							letterSpacing:ContentLetterSpacing,
							backgroundImage:bggradientValue,
						}}
					/>
				</div>
			</div>
		</Fragment>
	);
};
 

registerBlockType('gutensee/gutensee-text-editor',{

	title:__('Text Editor','gutensee'),
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g><title>Para</title><text transform="matrix(1 0 0 1.94281 0 -8.84511)" stroke="#000" font-weight="bold" text-anchor="start" font-family="Noto Sans JP" font-size="11" stroke-width="0" id="svg_3" y="14.43629" x="-0.04104" fill="#009999">&lt;P/&gt;</text></g></svg>,
	category:'gutensee',
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords:['Gutensee Text Editor','Text Editor','Editor'],
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
		controlType:{
			type:'string',
			default:'basic',
		},
		colorType:{
			type:'string',
			default:'normal',
		},
		content:{
			type:'string',
		},
		dropCap:{
			type: 'boolean',
			default: false
		},
		textAlignment: {
			type: 'string',
			default:'left'
		},
		contentColor:{
			type:'string',
		},
		bgColor:{
	    	type:'string',
	    },
	    bggradientValue:{
	    	type: "string",
	    },
	    dropColor:{
	    	type:'string',
	    },
	    dropbgColor:{
	    	type:'string',
	    },
	    dropbggradientValue:{
	    	type: "string",
	    },
	    contenthColor:{
			type:'string',
		},
		bghColor:{
	    	type:'string',
	    },
	    bggradienthValue:{
	    	type: "string",
	    },
	    drophColor:{
	    	type:'string',
	    },
	    dropbghColor:{
	    	type:'string',
	    },
	    dropbggradienthValue:{
	    	type: "string",
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
		previewdropmargins:{
			type:'string',
			default:'Desktop',
		},
		dropcapmargins: {
	        default: {
	            top: '10px',
	            left: '10px',
	            right: '10px',
	            bottom: '10px'
	        }
    	},
    	dropcapmarginstab: {
	        default: {
	            top: '10px',
	            left: '10px',
	            right: '10px',
	            bottom: '10px'
	        }
    	},
    	dropcapmarginsmob: {
	        default: {
	            top: '10px',
	            left: '10px',
	            right: '10px',
	            bottom: '10px'
	        }
    	},
    	previewdroppaddings:{
			type:'string',
			default:'Desktop',
		},
		dropcappaddings:{
			type: 'object',
	      	default: {
		        top: '8px',
		        left: '12px',
		        right: '12px',
		        bottom: '8px',
	      	},
		},
		dropcappaddingstab:{
			type: 'object',
	      	default: {
		        top: '8px',
		        left: '12px',
		        right: '12px',
		        bottom: '8px',
	      	},
		},
		dropcappaddingsmob:{
			type: 'object',
	      	default: {
		        top: '8px',
		        left: '12px',
		        right: '12px',
		        bottom: '8px',
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
		dropcapborder: {
            type: 'object',
            default: {
                color: '',
                style: '',
                width: '',        
            },
        },
        dropcapborderradius:{
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
	    	default:' '
	    },
	    delay:{
	    	type:'string',
	    },
	    fontfamily:{
	    	type:'string',
	    	default:'Open Sans',
	    },
		ContentFontWeight:{
			type:'string',
			default:400
		},
		previewlineheight:{
			type:'string',
			default:'Desktop',
		},
   		ContentLineHeight:{
	    	type:'number',
	    	default:28
    	},
    	ContentLineHeighttab:{
	    	type:'number',
	    	default:28
    	},
    	ContentLineHeightmob:{
	    	type:'number',
	    	default:28
    	}, 	    
	    ContentTransform:{
	    	type:'string'
	    },
	    ContentDecoration:{
	    	type:'string'
	    },
	    previewltrspaceing:{
			type:'string',
			default:'Desktop',
		},
	    ContentLetterSpacing:{
	    	type:'number'
	    },
	    ContentLetterSpacingtab:{
	    	type:'number'
	    },
	    ContentLetterSpacingmob:{
	    	type:'number'
	    },
	    previewfontsize:{
			type:'string',
			default:'Desktop',
		},
	    contentfontSize:{
	    	type:'string',
	    	default:'18px'
	    },
	    contentfontSizetab:{
	    	type:'string',
	    	default:'18px'
	    },
	    contentfontSizemob:{
	    	type:'string',
	    	default:'18px'
	    },
	    dropcapfontfamily:{
	    	type:'string',
	    	default:'Open Sans',
	    },
		dropcapFontWeight:{
			type:'string',
			default:600
		},
   		dropcapLineHeight:{
	    	type:'number',
	    	default:60
    	},
    	previewdroplineheight:{
			type:'string',
			default:'Desktop',
		},
    	dropcapLineHeighttab:{
	    	type:'number',
	    	default:60
    	},
    	dropcapLineHeightmob:{
	    	type:'number',
	    	default:60
    	},	    
	    dropcapTransform:{
	    	type:'string',
	    	default:'uppercase'
	    },
	    dropcapDecoration:{
	    	type:'string'
	    },
	    previewdropltrspaceing:{
			type:'string',
			default:'Desktop',
		},
	    dropcapLetterSpacing:{
	    	type:'number'
	    },
	    dropcapLetterSpacingtab:{
	    	type:'number'
	    },
	    dropcapLetterSpacingmob:{
	    	type:'number'
	    },
	    previewdropfontsize:{
			type:'string',
			default:'Desktop',
		},
	    dropcapfontSize:{
	    	type:'string',
	    	default:'72px'
	    },
	    dropcapfontSizetab:{
	    	type:'string',
	    	default:'72px'
	    },
	    dropcapfontSizemob:{
	    	type:'string',
	    	default:'72px'
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
		const{uniqueid, fontfamily, content, dropCap, contentColor, bgColor, bggradientValue, dropbggradientValue, previewmargins, previewpaddings,previewdropmargins, previewdroppaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, dropcapmargins, dropcapmarginstab, dropcapmarginsmob, dropcappaddings, dropcappaddingstab, dropcappaddingsmob, dropcapborder, dropcapborderradius, border, borderradius, contentfontSize, ContentLineHeight, ContentLineHeighttab, ContentLineHeightmob, ContentFontWeight, ContentTransform, ContentDecoration, ContentLetterSpacing, ContentLetterSpacingtab, ContentLetterSpacingmob, dropcapfontfamily, dropcapfontSize, dropcapfontSizetab, dropcapfontSizemob, dropcapLineHeight, dropcapFontWeight, dropcapTransform, dropcapDecoration, dropcapLetterSpacing, dropColor, dropbgColor, hidedesktop, hidetablet, hidemobile, animation, durations, delay, previewfontsize, previewlineheight, previewltrspaceing, previewdropfontsize, previewdroplineheight, previewdropltrspaceing, contenthColor, bghColor, bggradienthValue, drophColor, dropbghColor, dropbggradienthValue, advid, advclass, advcss}=attributes;
		const blockclass='gutensee-text-editor';
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		const animationclass='animated '+attributes.durations+' '+attributes.animation;
		const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
		const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
		const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
		const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;
		const dropcapclass=(dropCap != false) ? 'has-dropcap':'';

		const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
		const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
		const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
		const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

		const dropcapbordertop=(dropcapborder.top != undefined) ? `${dropcapborder.top.width} ${dropcapborder.top.style} ${dropcapborder.top.color}` : null;
		const dropcapborderright=(dropcapborder.right != undefined) ? `${dropcapborder.right.width} ${dropcapborder.right.style} ${dropcapborder.right.color}` : null;
		const dropcapborderbottom=(dropcapborder.bottom != undefined) ? `${dropcapborder.bottom.width} ${dropcapborder.bottom.style} ${dropcapborder.bottom.color}` : null;
		const dropcapborderleft=(dropcapborder.left != undefined) ? `${dropcapborder.left.width} ${dropcapborder.left.style} ${dropcapborder.left.color}` : null;

		return(
			<>	
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `.text-editor-inner p.${uniqueid}.has-dropcap:first-child:first-letter {
						color: ${dropColor};
						background-color:${dropbgColor};
						float: left;
						font-family: ${dropcapfontfamily};
						font-size: ${dropcapfontSize};
						font-weight: ${dropcapFontWeight};
						text-transform:${dropcapTransform};
						text-decoration:${dropcapDecoration};
						line-height: ${dropcapLineHeight};
						letter-spacing: ${dropcapLetterSpacing}px;
						margin: ${dropcapmargins.top} ${dropcapmargins.right} ${dropcapmargins.bottom} ${dropcapmargins.left};
						padding: ${dropcappaddings.top} ${dropcappaddings.right} ${dropcappaddings.bottom} ${dropcappaddings.left};
						border: ${dropcapborder.width} ${dropcapborder.style} ${dropcapborder.color};
						border-top:dropcapbordertop;
						border-right:dropcapborderright;
						border-bottom:dropcapborderbottom;
						border-left:dropcapborderleft;
						border-radius:${dropcapborderradius.top} ${dropcapborderradius.right} ${dropcapborderradius.bottom} ${dropcapborderradius.left};
						background-image:dropbggradientValue,
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
				
				var dropcapfontfamily2=`{dropcapfontfamily}`;				
				var dropcapfontfamilyurl2 = 'https://fonts.googleapis.com/css2?family='+dropcapfontfamily2+':wght@100;200;300;400;500;600;700;800;900&display=swap';
				var dropcapfontfamilylink2 = document.createElement('link');
				dropcapfontfamilylink2.href = dropcapfontfamilyurl2;
				dropcapfontfamilylink2.rel = "stylesheet";
				dropcapfontfamilylink2.type =  "text/css";	          
				document.head.appendChild(dropcapfontfamilylink2);
			</script>
			<div id={advid}>
				<div className='text-editor-inner'>					
					<RichText.Content 
						tagName="p"
						className={`${blockclass} ${alignmentClass} ${animationclass} ${displayclass} ${dropcapclass} ${uniqueid} ${props.attributes.className} ${advclass}`}
						value={attributes.content}
						style={{
							color:contentColor,
							backgroundColor:bgColor,
							margin: `${margins.top} ${margins.right} ${margins.bottom} ${margins.left}`,
							padding: `${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left}`,		
							fontSize: contentfontSize,
							fontWeight: ContentFontWeight,
							lineHeight: `${ContentLineHeight}px`,
							animationDelay: delay+ 'ms',
							fontFamily:fontfamily,
							textTransform:ContentTransform,
							textDecoration:ContentDecoration,
							letterSpacing:ContentLetterSpacing,
							border: `${border.width} ${border.style} ${border.color}`,
							borderTop:bordertop,
							borderRight:borderright,
							borderBottom:borderbottom,
							borderLeft:borderleft,
							borderRadius:`${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left}`,
							backgroundImage:bggradientValue,
						}}
					/>
				</div>
			</div>
			</>
		)
	}
})