const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
import { InspectorControls, PanelColorSettings, ColorPalette,  InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar, AlignmentToolbar, useBlockProps, useSetting, useInnerBlocksProps, store as blockEditorStore, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl, TextControl, Button,  __experimentalInputControl as InputControl, __experimentalUseCustomUnits as useCustomUnits,  __experimentalUnitControl as UnitControl , GradientPicker, FormToggle, FocalPointPicker, __experimentalBorderBoxControl as BorderBoxControl, TabPanel, __experimentalBoxControl as BoxControl, BaseControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import classnames from 'classnames';
import deprecated from './lib/coldeprecated';
import { column as icon } from '@wordpress/icons';
import { get } from 'lodash';
import {colors} from './lib/colors';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import MonacoEditor from '@monaco-editor/react';

const BlockEdit = (props) => {
	const { attributes, setAttributes, clientId } = props;	
	const { uniqueid, overflow, justifycontent, alignitems, minHeight, flexdirection, flexwrap, controlType, colorType, verticalAlignment, textAlignment, width, templateLock, allowedBlocks, margins, paddings, border, borderradius, overlayopacity, shadowColor, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, zindex, colBgType, colBgHType, colBgColor, colBgHColor, colBgGradient, colBgHGradient, colBgImage, colBgHImage, colBgImageParallax, colBgImageSize, colBgImageRepeat, colBgImageOverlay, colBgImagePosition, colBgOverlayColor, colBgOverlayOpacity, colBgVideo, bordertopradius, borderrightradius, borderbottomradius, borderleftradius,previewmargins, previewpaddings, marginstab, marginsmob, paddingstab, paddingsmob, previewwidth, widthmob, widthtab, customcss, customjs, advid, advclass, advcss }=attributes;

	 // set unique ID
	 setAttributes({ uniqueid: clientId.slice(0, 8),}); 

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewWidth(value) {
		setAttributes({previewwidth:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	const classes = classnames( 'block-core-columns', {
			[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
			[ `has-text-align-${ textAlignment}`]: textAlignment,
			[ `hide-desktop` ]:  hidedesktop==false,
			[ `hide-tablet` ]:  hidetablet==false,
			[ `hide-mobile` ]:  hidemobile==false,
			[ `animated ${durations}`]: durations,
			[ `animated ${animation}` ]: animation,
			[ `${advclass}` ]:  advclass,
		} );

	// Normal Bg
	let containerBg = '';
	if (colBgType !== 'none' && colBgType === 'image') {
		containerBg = `url(${colBgImage})`;
	}else if (colBgType !== 'none' && colBgType === 'gradient') {
		containerBg = colBgGradient;
	}else {
		containerBg = 'none';
	}	

	// Hover Bg
	let containerHBg = '';
	if (colBgHType !== 'none' && colBgHType === 'image') {
		containerHBg = `url(${colBgHImage})`;
	} else if (colBgType !== 'none' && colBgType === 'gradient') {
		containerBg = colBgHGradient;
	}else {
		containerHBg = 'none';
	}	

	// Background Position
	let backgroundPosition = '';
	if(colBgType === 'image' && colBgImage)
	{
		backgroundPosition =`${colBgImagePosition.x * 100}% ${ colBgImagePosition.y * 100 }%`
	}
	else
	{
		backgroundPosition = '';
	}

	// Background Size
	let backgroundSize = '';
	if(colBgType === 'image' && colBgImage)
	{
		backgroundSize = colBgImageSize;
	}
	else
	{
		backgroundSize = '';
	}

	//Image Background Attachment
	let backgroundAttachment = '';
	if(colBgType === 'image' && colBgImage && colBgImageParallax)
	{
		backgroundAttachment='fixed';
	}
	else
	{
		backgroundAttachment='scroll';
	}	
	
	//Background Image Repeat
	let backgroundRepeat = '';
	if(colBgType === 'image' && colBgImage)
	{
		backgroundRepeat = colBgImageRepeat;
	}
	else
	{
		backgroundRepeat = '';
	}
 
	const units = useCustomUnits( {
		availableUnits: useSetting( 'spacing.units' ) || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	} );


	const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
		( select ) => {
			const { getBlockOrder, getBlockRootClientId } =
				select( blockEditorStore );

			const rootId = getBlockRootClientId( clientId );

			return {
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
				rootClientId: rootId,
				columnsIds: getBlockOrder( rootId ),
			};
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const updateAlignment = ( value ) => {
		// Update own alignment.
		setAttributes( { verticalAlignment: value } );
		// Reset parent Columns block.
		updateBlockAttributes( rootClientId, {
			verticalAlignment: null,
		} );
	};

	const widthWithUnit = Number.isFinite( width ) ? width + '%' : width;
	const blockProps = useBlockProps( {
		className: classes,
		style: widthWithUnit ? { flexBasis: widthWithUnit } : undefined,
	} );

	const columnsCount = columnsIds.length;
	const currentColumnPosition = columnsIds.indexOf( clientId ) + 1;

	const label = sprintf(
		/* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
		__( '%1$s (%2$d of %3$d)','gutensee' ),
		blockProps[ 'aria-label' ],
		currentColumnPosition,
		columnsCount
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps, 'aria-label': label },
		{
			templateLock,
			allowedBlocks,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

	return (
		<>
			<style dangerouslySetInnerHTML={{
		  		__html: [
			     `#block-${clientId}{
						background-color:${colBgColor};
						background-image:${containerBg};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						opacity: ${overlayopacity};
						animation-delay: ${delay}ms;
						background-position: ${backgroundPosition}; 
						background-repeat: ${colBgImageRepeat};
						background-size:${backgroundSize};
						background-attachment: ${backgroundAttachment};
						background-repeat: ${backgroundRepeat};
						z-index: ${zindex};
						overflow: ${overflow};
						position: relative;
						justify-content:${justifycontent};
		     			align-items:${alignitems};
		     			flex-direction:${flexdirection};
						flex-wrap:${flexwrap};
						min-height:${minHeight};
					}
				#block-${clientId}:hover{
						background-color:${colBgHColor};
						background-image:${containerHBg};
					}
				#block-${clientId}:hover .gutensee-overlay{
						opacity: 1 ;
						background-color:${colBgHColor} ;
						background-image:${containerHBg} ;
					}
				@media (max-width:1024px){
					.gutensee-block-col-${uniqueid}{	
						width:widthtab;		
					}
				    
				}

				@media (max-width:767px){
					.gutensee-block-col-${uniqueid}{	
						width:widthmob;		
					}
				}
					${advcss}`					
			    ].join('\n')
			  }}>
			</style>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={ updateAlignment }
					value={ verticalAlignment }
				/>
				<AlignmentToolbar
					value={attributes.textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>
			</BlockControls>
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
	                        label={__('Animation','gutensee-block')}
	                        value={ animation }
	                        options={ animationslist }
	                        onChange={ (userVal) => setAttributes({ animation: userVal }) }					  
	                    />  
	                    <RadioGroup label="Width" onChange={ setPreviewWidth } checked={ previewwidth } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
				       
				        { previewwidth === 'Desktop' && (
			        		<>
			                    <UnitControl
									label={ __( 'Width','gutensee' ) }				
									value={ width || '' }
									onChange={ ( nextWidth ) => {
										nextWidth =
											0 > parseFloat( nextWidth ) ? '0' : nextWidth;
										setAttributes( { width: nextWidth } );
									} }
									units={ units }
								/>		
							</>
						)}	
						{ previewwidth === 'Tablet' && (
			        		<>
			                    <UnitControl
									label={ __( 'Width','gutensee' ) }
									value={ widthtab || '' }
									onChange={ ( nextWidth ) => {
										nextWidth =
											0 > parseFloat( nextWidth ) ? '0' : nextWidth;
										setAttributes( { widthtab: nextWidth } );
									} }
									units={ units }
								/>		
							</>
						)}	
						{ previewwidth === 'Mobile' && (
			        		<>
			                    <UnitControl
									label={ __( 'Width','gutensee' ) }
									value={ widthmob || '' }
									onChange={ ( nextWidth ) => {
										nextWidth =
											0 > parseFloat( nextWidth ) ? '0' : nextWidth;
										setAttributes( { widthmob: nextWidth } );
									} }
									units={ units }
								/>		
							</>
						)}	
						<UnitControl
		                    label={__('Min Height','gutensee')}
		                    units={ units }
		                    value={ minHeight }
		                    onChange={ (userVal)=> setAttributes({minHeight:userVal}) }
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
					<div className="gutensee_block_content_section all-types">					
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
								<div className="gutensee_block_section_flex_panel">
									<div className="gutensee_block_col_flex_panel">
										<p className="gutensee_block_col_panel_label"> {__('Background', 'gutensee')}</p>
										<div className="gutensee_block_col_panel">

											<Button isSmall={true} isPressed={colBgType === 'color'} onClick={() => setAttributes({colBgType: 'color',})}>
												<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="15px" viewBox="0 0 16 16"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>
											</Button>

											<Button isSmall={true} isPressed={colBgType === 'gradient'} onClick={() => setAttributes({colBgType: 'gradient',})}>
												<svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="15px" viewBox="0 0 128 128"><path d="M116 4H12c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8V12c0-4.42-3.58-8-8-8z" fill="#8e24aa"/><path d="M109.7 4H11.5A7.555 7.555 0 0 0 4 11.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H109.6c4.14.01 7.49-3.34 7.5-7.48V11.5c.09-4.05-3.13-7.41-7.18-7.5h-.22z" fill="#ab47bc"/><path d="M39.7 12.9c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z" fill="#ce93d8"/></svg>
											</Button>

											<Button isSmall={true} isPressed={colBgType === 'image'} onClick={() => setAttributes({colBgType: 'image',})}>
												<svg width="18" height="15" viewBox="0 0 18 15">
													<path d="M16.083.263h-14.446c-.798 0-1.445.648-1.445 1.447v11.579c0 .8.646 1.447 1.445 1.447h14.446c.798 0 1.445-.648 1.445-1.447v-11.579c0-.8-.646-1.447-1.445-1.447zm-4.334 2.171c2.389 0 2.386 3.618 0 3.618-2.385 0-2.39-3.618 0-3.618zm-9.39 10.855l4.334-5.789 2.965 3.961 2.091-2.514 3.611 4.342h-13.001z"className="svg-fill" fillRule="nonzero">
													</path>
												</svg>
											</Button>
											
											<Button isSmall={true} onClick={() => setAttributes({colBgType: 'none',})}>
												<span className="dashicons dashicons-image-rotate"></span>
											</Button>
										</div>
									</div>

									{/* Color Background */}
									{colBgType === 'color' && (
										<Fragment>
											<div className="gutensee_block_section_flex_panel">
												<p className="gutensee_block_section_panel_label">
													{ __('Background','gutensee')}
												</p>
												<div className="gutensee_block_section_panel">						
													<ColorPalette
														className={'gutensee-color'}
											            title={ __('Background','gutensee')}
											            value={ colBgColor }
											            onChange={ (newtext) => setAttributes({ colBgColor: newtext }) }
											        />
												</div>
											</div>
										</Fragment>
									)}

									{/* Gradient Background */}
									{colBgType === 'gradient' && (
										<Fragment>
											<GradientPicker
												__nextHasNoMargin
												value={colBgGradient}
												onChange={(currentGradient) =>
													setAttributes({
														colBgGradient: currentGradient,
													})
												}
												gradients={[
													{
														name: 'JShine',
														gradient:
															'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
														slug: 'jshine',
													},
													{
														name: 'Moonlit Asteroid',
														gradient:
															'linear-gradient(135deg, rgb(15, 32, 39) 0%, rgb(32, 58, 67) 0%, rgb(0, 178, 254) 100%)',
														slug: 'moonlit-asteroid',
													},
													{
														name: 'Rastafarie',
														gradient:
															'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
														slug: 'rastafari',
													},
													{
														name: 'Blulish',
														gradient:
															'linear-gradient(90deg, rgb(18, 194, 233) 0%, rgb(93, 8, 136) 50%, rgb(156, 79, 79) 100%)',
														slug: 'blulish',
													},
													{
														name: 'Redish',
														gradient:
															'linear-gradient(90deg, rgb(30, 150, 0) 0%, rgb(255, 0, 70) 0%, rgb(255, 0, 0) 100%)',
														slug: 'redish',
													},
												]}
											/>
										</Fragment>
									)}

									{/* Image Background */}
									{colBgType === 'image' && (
										<Fragment>
											{colBgImage ? (
												<Fragment>
													<div className="gutensee_block_col_preview_container">
														<div className="gutensee_block_col_preview_image">
															<FocalPointPicker
																url={colBgImage}
																value={colBgImagePosition}
																onChange={(focalPoint) => setAttributes({colBgImagePosition: focalPoint,})}
															/>
														</div>
														<div className="gutensee_block_col_preview_actions">
															<button onClick={() => setAttributes({ colBgImage: '',})}>
																<span className="dashicons dashicons-trash"></span>
															</button>
														</div>
													</div>
												</Fragment>
											) : (
												<MediaUpload
													onSelect={(media) => setAttributes({colBgImage: media.url,})}
													type="image"
													value={colBgImage}
													render={({ open }) => (
														<button className="gutensee_block_col_custom_upload" onClick={open}>
															<span className="dashicons dashicons-insert"></span>
															<span className="gutensee_block_col_upload_label">
																{__('Add Image', 'gutensee')}
															</span>
														</button>
													)}
												/>
											)}
											<div className="gutensee_block_col_flex_panel">
												<p className="gutensee_block_col_panel_label">
													{__('Enable/Disable Parallax','gutensee')}
												</p>
												<FormToggle
													checked={colBgImageParallax}
													onChange={() => setAttributes({ colBgImageParallax: !colBgImageParallax,})}
												/>
											</div>
											<SelectControl
												label={__(
													'Background Size',
													'gutensee'
												)}
												options={[
													{
														label: __('Default','gutensee'),
														value: 'initial',
													},
													{
														label: __('Cover','gutensee'),
														value: 'cover',
													},
													{
														label: __('Contain','gutensee'),
														value: 'contain',
													},
													{
														label: __( 'Auto','gutensee'),
														value: 'auto',
													},
												]}
												onChange={(size) => {
													setAttributes({ colBgImageSize: size });
												}}
												value={colBgImageSize}
											/>
											<SelectControl
												label={__('Background Repeat','gutensee')}
												options={[
													{
														label: __('No Repeat','gutensee'),
														value: 'no-repeat',
													},
													{
														label: __('Repeat','gutensee'),
														value: 'repeat',
													},
													{
														label: __('Repeat X','gutensee' ),
														value: 'repeat-x',
													},
													{
														label: __('Repeat Y','gutensee'),
														value: 'repeat-y',
													},
												]}
												onChange={(value) => {setAttributes({ colBgImageRepeat: value });}}
												value={colBgImageRepeat}
											/>
										</Fragment>
									)}											
								</div>
								</>
							)}

							{/* Basic Cont*/}
							{colorType === 'hover' && (
								<>
								<div className="gutensee_block_section_flex_panel">
									<div className="gutensee_block_col_flex_panel">
										<p className="gutensee_block_col_panel_label"> {__('Background', 'gutensee')}</p>
										<div className="gutensee_block_col_panel">

											<Button isSmall={true} isPressed={colBgType === 'color'} onClick={() => setAttributes({colBgType: 'color',})}>
												<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="15px" viewBox="0 0 16 16"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>
											</Button>

											<Button isSmall={true} isPressed={colBgType === 'gradient'} onClick={() => setAttributes({colBgType: 'gradient',})}>
												<svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="15px" viewBox="0 0 128 128"><path d="M116 4H12c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8V12c0-4.42-3.58-8-8-8z" fill="#8e24aa"/><path d="M109.7 4H11.5A7.555 7.555 0 0 0 4 11.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H109.6c4.14.01 7.49-3.34 7.5-7.48V11.5c.09-4.05-3.13-7.41-7.18-7.5h-.22z" fill="#ab47bc"/><path d="M39.7 12.9c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z" fill="#ce93d8"/></svg>
											</Button>
											
											<Button isSmall={true} onClick={() => setAttributes({colBgType: 'none',})}>
												<span className="dashicons dashicons-image-rotate"></span>
											</Button>
										</div>
									</div>

									{/* Color Background */}
									{colBgType === 'color' && (
										<Fragment>
											<div className="gutensee_block_section_flex_panel">
												<p className="gutensee_block_section_panel_label">
													{ __('Background','gutensee')}
												</p>
												<div className="gutensee_block_section_panel">						
													<ColorPalette
														className={'gutensee-color'}
											            title={ __('Background','gutensee')}
											            value={ colBgHColor }
											            onChange={ (newtext) => setAttributes({ colBgHColor: newtext }) }
											        />
												</div>
											</div>
										</Fragment>
									)}

									{/* Gradient Background */}
									{colBgType === 'gradient' && (
										<Fragment>
											<GradientPicker
												__nextHasNoMargin
												value={colBgHGradient}
												onChange={(currentGradient) =>
													setAttributes({
														colBgHGradient: currentGradient,
													})
												}
												gradients={[
													{
														name: 'JShine',
														gradient:
															'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
														slug: 'jshine',
													},
													{
														name: 'Moonlit Asteroid',
														gradient:
															'linear-gradient(135deg, rgb(15, 32, 39) 0%, rgb(32, 58, 67) 0%, rgb(0, 178, 254) 100%)',
														slug: 'moonlit-asteroid',
													},
													{
														name: 'Rastafarie',
														gradient:
															'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
														slug: 'rastafari',
													},
													{
														name: 'Blulish',
														gradient:
															'linear-gradient(90deg, rgb(18, 194, 233) 0%, rgb(93, 8, 136) 50%, rgb(156, 79, 79) 100%)',
														slug: 'blulish',
													},
													{
														name: 'Redish',
														gradient:
															'linear-gradient(90deg, rgb(30, 150, 0) 0%, rgb(255, 0, 70) 0%, rgb(255, 0, 0) 100%)',
														slug: 'redish',
													},
												]}
											/>
										</Fragment>
									)}

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
								values={ {
									top: '0px',
									left: '0px',
									right: '0px',
									bottom: '0px',
									} }
								onChange={(newtext) => setAttributes({ borderradius: newtext })}
							/>
						</PanelBody>

						<TextControl
				            label={__('z-index','gutensee')}			    
				            value={zindex}
	        				onChange={(newtext) => setAttributes({ zindex: newtext })}
					    />

					    <SelectControl
				            label={__('Overflow','gutensee')}
				            value={ overflow }
				            options={ [
				            	{ label: __('Auto','gutensee'), value: 'auto' },
				                { label: __('Hidden','gutensee'), value: 'hidden' },
				                { label: __('Overlay','gutensee'), value: 'overlay' },
				                { label: __('Scroll','gutensee'), value: 'scroll' },
				                { label: __('Visible','gutensee'), value: 'visible' },
				                { label: __('Unset','gutensee'), value: 'unset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ overflow: newtext }) }					  
				        />

				        <SelectControl
				            label={__('Justify Content','gutensee')}
				            value={ justifycontent }
				            options={ [
				            	{ label: __('Center','gutensee'), value: 'center' },
				                { label: __('End','gutensee'), value: 'end' },
				                { label: __('Start','gutensee'), value: 'start' },
				                { label: __('Left','gutensee'), value: 'left' },
				                { label: __('Normal','gutensee'), value: 'normal' },
				                { label: __('Stretch','gutensee'), value: 'stretch' },
				                { label: __('Flex End','gutensee'), value: 'flex-end' },
				                { label: __('Flex Start','gutensee'), value: 'flex-start' },
				                { label: __('Space Around','gutensee'), value: 'space-around' },
				                { label: __('Space Between','gutensee'), value: 'space-between' },
				                { label: __('Space Evenly','gutensee'), value: 'space-evenly' },
				                { label: __('Unset','gutensee'), value: 'unset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ justifycontent: newtext }) }					  
				        /> 

				        <SelectControl
				            label={__('Align Items','gutensee')}
				            value={ alignitems }
				            options={ [
				            	{ label: __('Center','gutensee'), value: 'center' },
				                { label: __('End','gutensee'), value: 'end' },
				                { label: __('Start','gutensee'), value: 'start' },
				                { label: __('Left','gutensee'), value: 'left' },
				                { label: __('Normal','gutensee'), value: 'normal' },
				                { label: __('Stretch','gutensee'), value: 'stretch' },
				                { label: __('Flex End','gutensee'), value: 'flex-end' },
				                { label: __('Flex Start','gutensee'), value: 'flex-start' },
				                { label: __('Base Line','gutensee'), value: 'baseline' },
				                { label: __('Self Start','gutensee'), value: 'self-start' },
				                { label: __('Self End','gutensee'), value: 'self-end' },
				                { label: __('Unset','gutensee'), value: 'unset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ alignitems: newtext }) }					  
				        />

				        <SelectControl
				            label={__('Flex Direction','gutensee')}
				            value={ flexdirection }
				            options={ [
				            	{ label: __('Row','gutensee'), value: 'row' },
				                { label: __('Column','gutensee'), value: 'column' },
				                { label: __('Row Reverse','gutensee'), value: 'row-reverse' },
				                { label: __('Column Reverse','gutensee'), value: 'column-reverse' },			               
				                { label: __('Unset','gutensee'), value: 'unset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ flexdirection: newtext }) }					  
				        />

				        <SelectControl
				            label={__('Flex Wrap','gutensee')}
				            value={ flexwrap }
				            options={ [
				            	{ label: __('Wrap','gutensee'), value: 'rap' },
				                { label: __('No Wrap','gutensee'), value: 'nowrap' },		               
				                { label: __('Unset','gutensee'), value: 'unset' },
				            ] }
				            onChange={ (newtext) => setAttributes({ flexwrap: newtext }) }					  
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
				<div { ...innerBlocksProps } >  
													
					{(colBgType === 'image' ) &&
						colBgType !== 'none' &&
						colBgImageOverlay && (
							<div className={"gutensee-overlay"} style={{
									backgroundColor: colBgImageOverlay
										? colBgOverlayColor
										: '',
									opacity: colBgImageOverlay ? colBgOverlayOpacity : '',
								}}>
							</div>
					)}
					<div className={"gutensee-column-wrapper"}>
						{ innerBlocksProps.children }
					</div>
				</div>
		</>
	);
}
 
registerBlockType('gutensee/gutensee-column', {
 apiVersion: 2,
 title: __('Column','gutensee'),
 category: 'gutensee',
 parent:['gutensee/gutensee-section'],
 icon:<svg xmlns="http://www.w3.org/2000/svg" width="24.000000000000004" height="24.000000000000004"><g id="Layer_1"><title>Layer 1</title><rect stroke="#000" stroke-width="3" id="svg_1" height="21.32847" width="0.14267" y="1.46655" x="3.13085" fill-opacity="0" fill="#c99f9f"/><rect stroke="#000" stroke-width="3" id="svg_5" height="21.32847" width="0.14267" y="1.25255" x="8.9088" fill-opacity="0" fill="#c99f9f"/><rect stroke="#000" stroke-width="3" id="svg_6" height="21.32847" width="0.14267" y="1.18122" x="15.04341" fill-opacity="0" fill="#c99f9f"/><rect stroke="#000" stroke-width="3" id="svg_7" height="21.32847" width="0.14267" y="1.46655" x="20.75002" fill-opacity="0" fill="#c99f9f"/></g></svg>,
	example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
	keywords: ['gutensee Column', 'column'],
	"attributes": {
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
		mediaId: {
			type: 'number',
			default: 0
		},
		mediaUrl: {
			type: 'string',
			default: ''
		},
		textAlignment: {
			type: 'string',
			default:''
		},
		verticalAlignment: {
			type: 'string'
		},
		previewwidth:{
			type:'string',
			default:'Desktop',
		},
		width: {
			type: 'string'
		},
		widthtab: {
			type: 'string'
		},
		widthmob: {
			type: 'string'
		},
		allowedBlocks: {
			type: 'array'
		},
		templateLock: {
			type: [ "string", "boolean" ],
			enum: [ "all", "insert", "contentOnly", false ]
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

        overlayopacity:{
			type:'number',
		},
		zindex:{
			type:'string'
		},
		overflow:{
			type:'string',
			default:'auto',
		},
		justifycontent:{
			type:'string',
			default:'unset',
		},
		alignitems:{
			type:'string',
			default:'unset',
		},
		minHeight:{
			type:'string',
		},
		flexwrap:{
			type:'string',
			default:'unset',
		},
		flexdirection:{
			type:'string',
			default:'unset',
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
		colBgType: {
			"type": "string",
			"default": "none"
		},
		colBgHType: {
			"type": "string",
			"default": "none"
		},
		colBgColor:{
			type:'string',
		},
		colBgHColor:{
			type:'string',
		},
		colBgGradient: {
			"type": "string",
			"default": "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)"
		},
		colBgHGradient: {
			"type": "string",
			"default": "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)"
		},
		colBgImage: {
			"type": "string"
		},
		colBgHImage: {
			"type": "string"
		},
		colBgImageParallax: {
			"type": "boolean",
			"default": false
		},
		colBgImageSize: {
			"type": "string",
			"default": "cover"
		},
		colBgImageRepeat: {
			"type": "string",
			"default": "no-repeat"
		},
		colBgImageOverlay: {
			"type": "boolean",
			"default": false
		},
		colBgOverlayColor: {
			"type": "string",
			"default": "#000000"
		},
		colBgOverlayOpacity: {
			"type": "number",
			"default": 0.6
		},
		colBgVideo: {
			"type": "string"
		},
		colBgImagePosition: {
			"type": "object",
			"default": {
				"x": 0.5,
				"y": 0.5
			}
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
	
	edit: BlockEdit,
	save: (props) => { 
		const { attributes, setAttributes,clientId } = props;
		const { uniqueid, overflow, justifycontent, alignitems, minHeight, flexdirection, flexwrap, verticalAlignment, textAlignment, width, margins, paddings, border, borderradius, overlayopacity, shadowColor, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, zindex, colBgType, colBgHType, colBgColor, colBgHColor, colBgGradient, colBgHGradient, colBgImage, colBgHImage,  colBgImageParallax, colBgImageSize, colBgImageRepeat, colBgImageOverlay, colBgImagePosition, colBgOverlayColor, colBgOverlayOpacity, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, previewmargins, previewpaddings, marginstab, marginsmob, paddingstab, paddingsmob, previewwidth, widthmob, widthtab, customcss, customjs, advid, advclass, advcss } = attributes;
		
		// Normal Bg for save method
		let containerBg = '';
		if (colBgType !== 'none' && colBgType === 'image') {
			containerBg = `url(${colBgImage})`;
		}else if (colBgType !== 'none' && colBgType === 'gradient') {
			containerBg = colBgGradient;
		} else {
			containerBg = 'none';
		}	

		// Hover Bg for save method
		let containerHBg = '';
		if (colBgHType !== 'none' && colBgHType === 'image') {
			containerHBg = `url(${colBgHImage})`;
		}else if (colBgType !== 'none' && colBgType === 'gradient') {
			containerBg = colBgHGradient;
		} else {
			containerHBg = 'none';
		}	
		
		// Background Position for save method	
		let backgroundPosition = '';
		if(colBgType === 'image' && colBgImage)
		{
			backgroundPosition =`${colBgImagePosition.x * 100}% ${ colBgImagePosition.y * 100 }%`
		}
		else
		{
			backgroundPosition = '';
		}
	
		// Background Size for save method
		let backgroundSize = '';
		if(colBgType === 'image' && colBgImage)
		{
			backgroundSize = colBgImageSize;
		}
		else
		{
			backgroundSize = '';
		}
	
		//Image Background Attachment
		let backgroundAttachment = '';
		if(colBgType === 'image' && colBgImage && colBgImageParallax)
		{
			backgroundAttachment='fixed';
		}
		else
		{
			backgroundAttachment='scroll';
		}	
		
		//Background Image Repeat
		let backgroundRepeat = '';
		if(colBgType === 'image' && colBgImage)
		{
			backgroundRepeat = colBgImageRepeat;
		}
		else
		{
			backgroundRepeat = '';
		}	

		const wrapperClasses = classnames( {
			[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
			[ `has-text-align-${ textAlignment}`]: textAlignment,
			[ `hide-desktop` ]:  hidedesktop==false,
			[ `hide-tablet` ]:  hidetablet==false,
			[ `hide-mobile` ]:  hidemobile==false,
			[ `animated ${durations}`]: durations,
			[ `animated ${animation}` ]: animation,
			[ `gutensee-block-col-${uniqueid}` ]:  'uniqueid',
			[ `${advclass}` ]:  advclass,
		} );

	
		let style;

		if ( width && /\d/.test( width ) ) {
			// Numbers are handled for backward compatibility as they can be still provided with templates.
			let flexBasis = Number.isFinite( width ) ? width + '%' : width;
			// In some cases we need to round the width to a shorter float.
			if ( ! Number.isFinite( width ) && width?.endsWith( '%' ) ) {
				const multiplier = 1000000000000;
				// Shrink the number back to a reasonable float.
				flexBasis =
					Math.round( Number.parseFloat( width ) * multiplier ) /
						multiplier +
					'%';
			}
			style = { flexBasis };
		}

		const blockProps = useBlockProps.save( {
			className: wrapperClasses,
			style,
		} );
		const innerBlocksProps = useInnerBlocksProps.save( blockProps );
		const widthWithUnit = Number.isFinite( width ) ? width + '%' : width;

		const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
		const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
		const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
		const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

		return(	
			<>
				<style dangerouslySetInnerHTML={{
				__html: [
					`.gutensee-block-col-${uniqueid}{
						background-color:${colBgColor};
						background-image:${containerBg};
						margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
						padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
						border: ${border.width} ${border.style} ${border.color};
						border-top:${bordertop};
						border-right:${borderright};
						border-bottom:${borderbottom};
						border-left:${borderleft};
						border-radius: ${bordertopradius} ${borderrightradius} ${borderbottomradius} ${borderleftradius};
						box-shadow: ${hshadow}px ${vshadow}px ${blurshadow}px ${shadowColor};
						opacity: ${overlayopacity};
						animation-delay: ${delay}ms;
						z-index: ${zindex};
						flex-basis:${widthWithUnit};
						background-position: ${backgroundPosition};
						background-repeat:${colBgImageRepeat};
						background-size:${backgroundSize};
						background-attachment:${backgroundAttachment};
						overflow: ${overflow};
						position: relative;
						justify-content:${justifycontent};
		     			align-items:${alignitems};
		     			flex-direction:${flexdirection};
						flex-wrap:${flexwrap};
						min-height:${minHeight};
					}
					.gutensee-block-col-${uniqueid}:hover{
							background-color:${colBgHColor};
							background-image:${containerHBg} ;
						}
					.gutensee-block-col-${uniqueid}:hover .gutensee-overlay{
							opacity: 1 ;
							background-color:${colBgHColor} ;
							background-image:${containerHBg} ;
						}	
					@media (max-width:1024px){
						.gutensee-block-col-${uniqueid}{	
							width:widthtab;		
						}
					    
					}

					@media (max-width:767px){
						.gutensee-block-col-${uniqueid}{	
							width:widthmob;		
						}
					}
						${advcss}`					
					].join('\n')
				}}>
				</style>
					<div { ...innerBlocksProps }>
						{colBgType !== 'none' && colBgType === 'video' && colBgVideo && (
							<video autoPlay={true} muted={true} loop={true} id="gutensee_blocks_video">
								<source src={colBgVideo} type="video/mp4" />
							</video>
						)}									
						{(colBgType === 'image' || colBgType === 'video') &&
							colBgType !== 'none' &&
							colBgImageOverlay && (
								<div className={"gutensee-overlay"} style={{
										backgroundColor: colBgImageOverlay
											? colBgOverlayColor
											: '',
										opacity: colBgImageOverlay ? colBgOverlayOpacity : '',
									}} >
								</div>
						)}
						<div className={"gutensee-column-wrapper"}>
							{ innerBlocksProps.children }
						</div>
					</div>
			</>
			);
		},
	deprecated,
});