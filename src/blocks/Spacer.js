const { registerBlockType } = wp.blocks;
const {InspectorControls, PanelColorSettings, ColorPalette} = wp.blockEditor;
import { ResizableBox, PanelBody, Button, RangeControl, ToggleControl, SelectControl, TextControl, __experimentalInputControl as InputControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalBoxControl as BoxControl, __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl, BaseControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import {colors, dualcolors, gradcolors} from './lib/colors';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const{ uniqueid, colorType, bghColor,bggradienthValue, controlType, previewboxheight, boxHeight, boxHeighttab, boxHeightmob, border, borderradius, previewmargins, margins, marginstab, marginsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bgColor, bggradientValue, shadowColor, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, advid, advclass, advcss }=attributes;
	setAttributes({ uniqueid: 'gutenseeblocksspacer' +clientId.slice(0,8) });
    const blockclass='gutensee-spacer';
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

	function setPreviewboxheight(value) {
		setAttributes({previewboxheight:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	//console.log(border.width);
	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
			  __html: [
			     `#${uniqueid}{
						height: ${boxHeight}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						animation-delay: ${delay}ms;
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-color:${bgColor};						
						background-image:${bggradientValue};
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
						<RadioGroup label="Width" onChange={ setPreviewboxheight } checked={ previewboxheight } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
					    { previewboxheight === 'Desktop' && (
				        	<> 
								<RangeControl 
						            label={__('Height(px)','gutensee')}
						           	value={boxHeight}
						           	units={[]}
						            onChange={(newtext) => setAttributes({ boxHeight: newtext })}
						            min={1}
									max={2000}
						           
						        />
						    </>
						)}
						{ previewboxheight === 'Tablet' && (
				        	<> 
								<RangeControl 
						            label={__('Height(px)','gutensee')}
						           	value={boxHeighttab}
						           	units={[]}
						            onChange={(newtext) => setAttributes({ boxHeighttab: newtext })}
						            min={1}
									max={2000}
						           
						        />
						    </>
						)}
						{ previewboxheight === 'Mobile' && (
				        	<> 
								<RangeControl 
						            label={__('Height(px)','gutensee')}
						           	value={boxHeightmob}
						           	units={[]}
						            onChange={(newtext) => setAttributes({ boxHeightmob: newtext })}
						            min={1}
									max={2000}
						           
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
						            options={animationsdurations}
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

				{/* Style Cont*/}
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

			</InspectorControls>
			<div id={advid}>
				<div className={`${blockclass} ${animationclass} ${displayclass} ${advclass}`} id={uniqueid}>
					<ResizableBox
						className={'gutensee-spacer-wrapper'}
						size={{ height: boxHeight }}
						showHandle={props.isSslected}
						onResizeStop={(event, direction, resize_element, delta) => 
						props.setAttributes({ 
						boxHeight: parseInt(boxHeight + delta.height)
						})}
						enable={{
						top: false,
						left: false,
						right: false,
						topLeft: false,
						topRight: false,
						bottom: true,
						bottomLeft: false,
						bottomRight: false
						}}
					></ResizableBox>				
				</div>
			</div>		
		</Fragment>
	);
};
 
registerBlockType('gutensee/gutensee-spacer', {
	title: __('Spacer','gutensee'),
	icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="Layer_1"><title>Spacer</title><rect stroke="#009999" id="svg_1" height="23.13535" width="22.98042" y="0.42263" x="0.50695" fill="none"/><line stroke="#009999" id="svg_3" y2="5.44154" x2="20.56806" y1="5.44154" x1="3.29558" fill="none"/><line stroke="#009999" id="svg_15" y2="18.55846" x2="20.41313" y1="18.55846" x1="3.14066" fill="none"/><path stroke="#009999" id="svg_16" d="m10.18094,9.89072l0.99402,-1.652l0.99402,1.652l-1.98805,0z" fill="none"/><path transform="rotate(180 11.3299 14.7969)" stroke="#009999" id="svg_20" d="m10.33587,15.62292l0.99402,-1.652l0.99403,1.652l-1.98805,0z" fill="none"/><polyline stroke-linecap="round" id="svg_24" points="11.145076620107066,9.356590385976416 11.145076620107066,9.356590385976416 " stroke="#009999" fill="none"/><polyline stroke-linecap="round" id="svg_25" points="11.196718025987185,14.314165350467828 11.196718025987185,14.314165350467828 " stroke="#009999" fill="none"/>
 </g>
</svg>,
	category:'gutensee',
	example: {
	    'attributes' : {
	        'mode' : 'preview',
	    }
	},
	keywords: ['Gutensee Spacer', 'Spacer'],
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
		previewboxheight:{
			type:'string',
			default:'Desktop',
		},
		boxHeight: {
			type: 'number',
			default:165
		},
		boxHeighttab: {
			type: 'number',
			default:165
		},
		boxHeightmob: {
			type: 'number',
			default:165
		},
		border: {
	        type: 'object',
	        default: {
	            color: '',
	            style: '',
	            width: '',        
	        },
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
	    bgColor:{
	    	type:'string',
	    },
	    bggradientValue:{
	    	type: "string",
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
		const{uniqueid, colorType, bghColor,bggradienthValue, previewboxheight, boxHeight, boxHeighttab, boxHeightmob,border, borderradius, previewmargins, margins, marginstab, marginsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bgColor, bggradientValue,  shadowColor, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, advid, advclass, advcss }=attributes;
		const blockclass='gutensee-spacer';
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
			     `#${uniqueid}{
						height: ${boxHeight}px;
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						animation-delay: ${delay}ms;
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						background-color:${bgColor};						
						background-image:${bggradientValue};
					}
					${advcss}`					
			    ].join('\n')
			  }}>
			</style>
			<div id={advid}>
				<div id={uniqueid} className={`${blockclass} ${animationclass} ${displayclass} ${props.attributes.className} ${advclass}`} >
				</div>
			</div>
		</>
		);
	}
});