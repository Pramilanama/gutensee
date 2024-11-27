const { registerBlockType } = wp.blocks;
const {InspectorControls, PanelColorSettings, ColorPalette,  BlockControls,  AlignmentToolbar} = wp.blockEditor;
import { ResizableBox, PanelBody, Button, RangeControl, ToggleControl, SelectControl, TextControl, __experimentalInputControl as InputControl} from '@wordpress/components'; 
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import {__experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
import {__experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontweightslist, decorationslist, transformslist} from "./lib/typography.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const{ uniqueid, controlType, diviWidth, diviWidthtab, diviWidthmob, diviHeight, diviHeighttab, diviHeightmob, borderstyle, borderradius, previewwidth, previewheight, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, diviColor, shadowColor, colorType, divihColor, divihbggradientValue, divibggradientValue, advid, advclass, advcss }=attributes;
	setAttributes({ uniqueid: 'gutenseeblocksicon' +clientId.slice(0,8) });    
    const blockclass='gutensee-divider';
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

	function setPreviewheight(value) {
		setAttributes({previewheight:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

    const dividerclass='gutensee-divider-line';
	const diviStyles = {
		borderWidth: diviHeight,
		width: diviWidth,
		borderStyle:borderstyle,
		borderRadius: borderradius + 'px',
		boxShadow: `${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor}`,
		borderColor:diviColor,
	};

	return(
		<Fragment>
			<style dangerouslySetInnerHTML={{
					  __html: [
				    `#${uniqueid}{
				    	animation-delay: ${delay}ms;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};								
				    }
				    #${uniqueid} .gutensee-divider-line{
				    	border-width: ${diviHeight};
						width: ${diviWidth};
						border-style:${borderstyle};
						borderRadius: ${borderradius}px;
						box-shadow:${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						border-color:${diviColor};
				    }
				    #${uniqueid}:hover .gutensee-divider-line{
				    	border-color:${divihColor};
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
						<SelectControl
				            label={__('Divider','gutensee')}
				            value={ borderstyle }
				            options={ [
				                { label: __('Solid','gutensee'), value: 'solid' },
				                { label: __('Dashed','gutensee'), value: 'dashed' },
				                { label: __('Double','gutensee'), value: 'double' },
				                { label: __('Groove','gutensee'), value: 'groove' },
				                { label: __('Ridge','gutensee'), value: 'ridge' },
				                { label: __('Dotted','gutensee'), value: 'dotted' },
				                { label: __('Inset','gutensee'), value: 'inset' },
				                { label: __('Outset','gutensee'), value: 'outset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ borderstyle: newtext }) }					  
				        />
				        <RadioGroup label="Width" onChange={ setPreviewwidth } checked={ previewwidth } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
				        { previewwidth === 'Desktop' && (
			        		<>
								<UnitControl 
						            label={__('Width','gutensee')}		
						           	value={diviWidth}
						            onChange={(newtext) => setAttributes({ diviWidth: newtext })}
						        />
						    </>
						)}
						{ previewwidth === 'Tablet' && (
			        		<>
								<UnitControl 
						            label={__('Width','gutensee')}		
						           	value={diviWidthtab}
						            onChange={(newtext) => setAttributes({ diviWidthtab: newtext })}
						        />
						    </>
						)}
						{ previewwidth === 'Mobile' && (
			        		<>
								<UnitControl 
						            label={__('Width','gutensee')}		
						           	value={diviWidthmob}
						            onChange={(newtext) => setAttributes({ diviWidthmob: newtext })}
						        />
						    </>
						)}
						<RadioGroup label="Width" onChange={ setPreviewheight } checked={ previewheight } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
				        { previewheight === 'Desktop' && (
			        		<>
								<UnitControl 
						            label={__('Height','gutensee')}
						           	value={diviHeight}
						            onChange={(newtext) => setAttributes({ diviHeight: newtext })}
						        />	
						    </>
						)}
						{ previewheight === 'Tablet' && (
			        		<>
								<UnitControl 
						            label={__('Height','gutensee')}
						           	value={diviHeighttab}
						            onChange={(newtext) => setAttributes({ diviHeighttab: newtext })}
						        />	
						    </>
						)}
						{ previewheight === 'Mobile' && (
			        		<>
								<UnitControl 
						            label={__('Height','gutensee')}
						           	value={diviHeightmob}
						            onChange={(newtext) => setAttributes({ diviHeightmob: newtext })}
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
										{ __('Divider','gutensee')}
									</p>
									<div className="gutensee_block_section_panel gutensee-color-gradient">	
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Divider','gutensee')}
								            enableAlpha={true}
								            value={ diviColor }
								            onChange={ (newtext) => setAttributes({ diviColor: newtext }) }
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
										{ __('Divider','gutensee')}
									</p>
									<div className="gutensee_block_section_panel gutensee-color-gradient">						
										<ColorPalette
											className={'gutensee-color'}
								            title={ __('Divider','gutensee')}
								            enableAlpha={true}
								            value={ divihColor }
								            onChange={ (newtext) => setAttributes({ divihColor: newtext }) }
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

			<BlockControls>
				<AlignmentToolbar
					value={attributes.textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>			
			</BlockControls>
			<div id={advid}>
				<div id={uniqueid} className={`${alignmentClass} ${animationclass} ${displayclass} ${advclass}`} >
					<div className={dividerclass} ></div>
				</div>
			</div>
			
		</Fragment>
	);
}
 
registerBlockType('gutensee/gutensee-divider', {
	title: __('Divider','gutensee'),
	category: 'gutensee',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="Layer_1"><title>Divider</title><rect stroke="#009999" id="svg_1" height="23.13535" width="22.98042" y="0.42263" x="0.50695" fill="none"/><line stroke="#009999" id="svg_3" y2="11.84508" x2="20.46477" y1="11.84508" x1="3.1923" fill="none"/><path stroke="#009999" id="svg_16" d="m10.95556,6.652l0.99402,-1.652l0.99402,1.652l-1.98805,0z" fill="none"/><path transform="rotate(180 12.2078 17.826)" stroke="#009999" id="svg_20" d="m11.21377,18.652l0.99402,-1.652l0.99403,1.652l-1.98805,0z" fill="none"/><polyline stroke-linecap="round" id="svg_29" points="11.816414896548611,5.896616192008452 11.816414896548611,5.896616192008452 " stroke="#009999" fill="none"/><polyline stroke-linecap="round" id="svg_30" points="12.3328289553498,17.36100829739484 12.3328289553498,17.36100829739484 " stroke="#009999" fill="none"/></g></svg>,
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
		borderstyle:{
			type:'string',
			default:'solid'
		},
		controlType:{
			type:'string',
			default:'basic',
		},
		colorType:{
			type:'string',
			default:'normal',
		},
		diviWidth: {
			type: 'string',
			default:'50%',
		},
		textAlignment: {
			type: 'string',
			default:'center'
		},
		diviHeight: {
			type: 'string',
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
		previewmargins:{
			type:'string',
			default:'Desktop',
		},
		previewwidth:{
			type:'string',
			default:'Desktop',
		},
		previewheight:{
			type:'string',
			default:'Desktop',
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
	    diviColor:{
	    	type:'string',
	    },
	    divihColor:{
	    	type:'string',
	    },
	    divibggradientValue:{
	    	type: "string",
	    },
	    divihbggradientValue:{
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
		const{uniqueid, diviWidth, diviWidthtab, diviWidthmob, diviHeight, diviHeighttab, diviHeightmob, borderstyle, borderradius, previewwidth, previewheight, previewmargins, previewpaddings, margins, marginstab, marginsmob, paddings, paddingstab, paddingsmob, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, diviColor, shadowColor, colorType, divihColor, divihbggradientValue, divibggradientValue, advid, advclass, advcss}=attributes;

		const blockclass='gutensee-divider';
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		const animationclass='animated '+attributes.durations+' '+attributes.animation;
		const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
		const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
		const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
		const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

	    const dividerclass='gutensee-divider-line';
		const diviStyles = {
			borderWidth: diviHeight,
			width: diviWidth ,
			borderStyle:borderstyle,
			borderRadius: borderradius + 'px',			
			boxShadow: `${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor}`,
			borderColor:diviColor,
		};
 	
		return (
			<>
				<style dangerouslySetInnerHTML={{
					  __html: [
				    `#${uniqueid}{
				    	animation-delay: ${delay}ms;
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};								
				    }
				    #${uniqueid} .gutensee-divider-line{
				    	border-width: ${diviHeight};
						width: ${diviWidth};
						border-style:${borderstyle};
						borderRadius: ${borderradius}px;
						box-shadow:${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						border-color:${diviColor};
				    }
				    #${uniqueid}:hover .gutensee-divider-line{
				    	border-color:${divihColor};
				    }
				    ${advcss}`					
				    ].join('\n')
				  }}>
				</style>
				<div id={advid}>
					<div id={uniqueid} className={`${alignmentClass} ${animationclass} ${displayclass} ${advclass}`}>
						<div className={dividerclass} ></div>
					</div>
				</div>
			</>
		);
	}
});