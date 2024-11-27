const { registerBlockType } = wp.blocks;
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Notice,ColorPalette, ButtonGroup, PanelBody, Button, RangeControl, ToggleControl, SelectControl, TextControl, __experimentalBorderBoxControl as BorderBoxControl, __experimentalBoxControl as BoxControl, GradientPicker, FormToggle, FocalPointPicker,__experimentalInputControl as InputControl, __experimentalUnitControl as UnitControl, BaseControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup } from '@wordpress/components';
import { InspectorControls,	useInnerBlocksProps, BlockControls, BlockVerticalAlignmentToolbar, AlignmentToolbar,	__experimentalBlockVariationPicker, useBlockProps, store as blockEditorStore, PanelColorSettings, MediaUpload } from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect} from '@wordpress/data';
import { createBlock, createBlocksFromInnerBlocksTemplate, store as blocksStore} from '@wordpress/blocks';
import { hasExplicitPercentColumnWidths, getMappedColumnWidths,	getRedistributedColumnWidths, toWidthPrecision } from './lib/utils';
import { columns as icon } from '@wordpress/icons';
import deprecated from './lib/deprecated';
import variations from './lib/variations';
import transforms from './lib/transforms';
import { get } from 'lodash';
import {colors} from './lib/colors';
const ALLOWED_BLOCKS = [ 'gutensee/gutensee-column' ];
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import MonacoEditor from '@monaco-editor/react';

// WordPress dependencies
function ColumnsEditContainer( { attributes, setAttributes, updateAlignment, updateColumns, clientId} ) {
	const { verticalAlignment, overflow, justifycontent, alignitems, controlType, minHeight, flexdirection, flexwrap, textAlignment, contentwidth, contenterwidth, margins, marginstab, previewmargins, previewpaddings, marginsmob, paddings, paddingstab, paddingsmob, border, borderradius,  bgColor, shadowColor, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, zindex, bgType, bgGradient, bgImage, bgImageParallax, bgImageSize, bgImageRepeat, bgImageOverlay, bgOverlayColor, bgOverlayPopup, bgOverlayOpacity, bgVideo, bgImagePosition, columngap, previewcolumngap, previewcontainerwidth, columngapmob, columngaptab, contenterwidthmob, contenterwidthtab, bgHColor, bgHGradient, advid, advclass, advcss } = attributes;

	const { count } = useSelect(
		( select ) => {
			return {
				count: select( blockEditorStore ).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	setAttributes({ uniqueid: 'gutenseesection' +clientId.slice(0,8) });
	const classes = classnames( {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `has-text-align-${ textAlignment}`]: textAlignment,
		[ `gutensee-block-container-fluid` ]:  'gutensee-block-container-fluid',
		[ `hide-desktop` ]:  hidedesktop==false,
		[ `hide-tablet` ]:  hidetablet==false,
		[ `hide-mobile` ]:  hidemobile==false,
		[ `animated ${attributes.durations}`]: durations,
		[ `animated ${attributes.animation}` ]: animation,
		[ `${attributes.advclass}`]:advclass,
	} );

	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewColumngap(value) {
		setAttributes({previewcolumngap:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewContainerwidth(value) {
		setAttributes({previewcontainerwidth:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	const blockProps = useBlockProps( {
		className: classes,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: false,
	} );	

	return (
		<>	
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

					<ButtonGroup>
					<p>{__('Container Width','gutensee')}</p>
						<Button
							isSecondary
							isPrimary={contentwidth == 'gutensee-block-container'}
							onClick={() => setAttributes({ contentwidth: 'gutensee-block-container' })}
						>{__('Container','gutensee')}</Button>
						<Button
							isSecondary
							isPrimary={contentwidth == 'gutensee-block-container-fluid'}
							onClick={() => setAttributes({ contentwidth: 'gutensee-block-container-fluid' })}
						>{__('Container Fluid','gutensee')}</Button>
			        </ButtonGroup>

					{ contentwidth === 'gutensee-block-container' && (
					<>
						<RadioGroup label="Width" onChange={ setPreviewContainerwidth } checked={ previewcontainerwidth } className={"preview-icon"}>
				            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
				            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
				            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
				        </RadioGroup>
				       
				        { previewcontainerwidth === 'Desktop' && (
			        		<>
						        <InputControl
									label={ __( 'Container Width','gutensee' ) }
									value={ contenterwidth }
									type={'number'}
									onChange={(newtext) => setAttributes({ contenterwidth: newtext })}
								/>
							</>
						)}
						{ previewcontainerwidth === 'Tablet' && (
			        		<>
						        <InputControl
									label={ __( 'Container Width','gutensee' ) }
									value={ contenterwidthtab }
									type={'number'}
									onChange={(newtext) => setAttributes({ contenterwidthtab: newtext })}
								/>
							</>
						)}
						{ previewcontainerwidth === 'Mobile' && (
			        		<>
						        <InputControl
									label={ __( 'Container Width','gutensee' ) }
									value={ contenterwidthmob }
									type={'number'}
									onChange={(newtext) => setAttributes({ contenterwidthmob: newtext })}
								/>
							</>
						)}
						</>

					)}
					<InputControl
						className={'gutensee-section-columns'}
						label={ __( 'Columns','gutensee' ) }
						value={ count }
						type={'number'}
						onChange={ ( value ) => updateColumns( count, value ) }					
					/>					
			        <UnitControl
	                    label={__('Min Height','gutensee')}
	                    units={ [] }
	                    value={ minHeight }
	                    onChange={ (userVal)=> setAttributes({minHeight:userVal}) }
	                />
					<RadioGroup label="Width" onChange={ setPreviewColumngap } checked={ previewcolumngap } className={"preview-icon"}>
			            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
			            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
			            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
			        </RadioGroup>
			        { previewcolumngap === 'Desktop' && (
		        		<>
							<InputControl
								label={ __( 'Columns Gap','gutensee' ) }
								value={ columngap }
								onChange={(newtext) => setAttributes({ columngap: newtext })}
								type={'number'}
							/>
						</>
					)}
					{ previewcolumngap === 'Tablet' && (
		        		<>
							<InputControl
								label={ __( 'Columns Gap','gutensee' ) }
								value={ columngaptab }
								onChange={(newtext) => setAttributes({ columngaptab: newtext })}
								type={'number'}
							/>
						</>
					)}
					{ previewcolumngap === 'Mobile' && (
		        		<>
							<InputControl
								label={ __( 'Columns Gap','gutensee' ) }
								value={ columngapmob }
								onChange={(newtext) => setAttributes({ columngapmob: newtext })}
								type={'number'}
							/>
						</>
					)}
					{ count > 6 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'This column count exceeds the recommended amount and may cause visual breakage.','gutensee'
							) }
						</Notice>
					) }
					
					<SelectControl
                        label={__('Animation','gutensee-block')}
                        value={ animation }
                        options={ animationslist }
                        onChange={ (userVal) => setAttributes({ animation: userVal }) }					  
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
			</InspectorControls>
			<div { ...innerBlocksProps } >
				{bgType !== 'none' && bgType === 'video' && bgVideo && (
					<video autoPlay={true} muted={true} loop={true} id="gutensee_blocks_video">
						<source src={bgVideo} type="video/mp4" />
					</video>
				)}

				{(bgType === 'image' || bgType === 'video') &&
					bgType !== 'none' &&
					bgImageOverlay && (
						<div className={"gutensee-overlay"} style={{
								backgroundColor: bgImageOverlay
									? bgOverlayColor
									: '',
								opacity: bgImageOverlay ? bgOverlayOpacity : '',
							}} >
						</div>
				)}
							
				<div className={`gutensee-block ${contentwidth}`}>
				{ innerBlocksProps.children }
				</div>
			</div>
		</>
	);
}

const ColumnsEditContainerWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		/**
		 * Update all child Column blocks with a new vertical alignment setting
		 * based on whatever alignment is passed in. This allows change to parent
		 * to overide anything set on a individual column basis.
		 *
		 * @param {string} verticalAlignment the vertical alignment setting
		 */
		updateAlignment( verticalAlignment ) {
			const { clientId, setAttributes } = ownProps;
			const { updateBlockAttributes } = dispatch( blockEditorStore );
			const { getBlockOrder } = registry.select( blockEditorStore );

			// Update own alignment.
			setAttributes( { verticalAlignment } );

			// Update all child Column Blocks to match.
			const innerBlockClientIds = getBlockOrder( clientId );
			innerBlockClientIds.forEach( ( innerBlockClientId ) => {
				updateBlockAttributes( innerBlockClientId, {
					verticalAlignment,
				} );
			} );
		},

		/**
		 * Updates the column count, including necessary revisions to child Column
		 * blocks to grant required or redistribute available space.
		 *
		 * @param {number} previousColumns Previous column count.
		 * @param {number} newColumns      New column count.
		 */
		updateColumns( previousColumns, newColumns ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );
			const { getBlocks } = registry.select( blockEditorStore );

			let innerBlocks = getBlocks( clientId );
			const hasExplicitWidths =
				hasExplicitPercentColumnWidths( innerBlocks );

			// Redistribute available width for existing inner blocks.
			const isAddingColumn = newColumns > previousColumns;

			if ( isAddingColumn && hasExplicitWidths ) {
				// If adding a new column, assign width to the new column equal to
				// as if it were `1 / columns` of the total available space.
				const newColumnWidth = toWidthPrecision( 100 / newColumns );

				// Redistribute in consideration of pending block insertion as
				// constraining the available working width.
				const widths = getRedistributedColumnWidths(
					innerBlocks,
					100 - newColumnWidth
				);

				innerBlocks = [
					...getMappedColumnWidths( innerBlocks, widths ),
					...Array.from( {
						length: newColumns - previousColumns,
					} ).map( () => {
						return createBlock( 'gutensee/gutensee-column', {
							width: `${ newColumnWidth }%`,
						} );
					} ),
				];
			} else if ( isAddingColumn ) {
				innerBlocks = [
					...innerBlocks,
					...Array.from( {
						length: newColumns - previousColumns,
					} ).map( () => {
						return createBlock( 'gutensee/gutensee-column' );
					} ),
				];
			} else {
				// The removed column will be the last of the inner blocks.
				innerBlocks = innerBlocks.slice(
					0,
					-( previousColumns - newColumns )
				);

				if ( hasExplicitWidths ) {
					// Redistribute as if block is already removed.
					const widths = getRedistributedColumnWidths(
						innerBlocks,
						100
					);

					innerBlocks = getMappedColumnWidths( innerBlocks, widths );
				}
			}

			replaceInnerBlocks( clientId, innerBlocks );
		},
	} )
)( ColumnsEditContainer );

function Placeholder( { clientId, name, setAttributes } ) {
	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ name ]
	);
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<__experimentalBlockVariationPicker
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				variations={ variations }
				onSelect={ ( nextVariation = defaultVariation ) => {
					if ( nextVariation.attributes ) {
						setAttributes( nextVariation.attributes );
					}
					if ( nextVariation.innerBlocks ) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							true
						);
					}
				} }
				allowSkip
			/>
		</div>
	);
}


const BlockEdit = (props) => {

	const { attributes, setAttributes, clientId } = props;
	const { verticalAlignment, overflow, justifycontent, alignitems, minHeight, flexdirection, flexwrap, controlType, colorType, contentwidth, contenterwidth, margins, marginstab, previewmargins, previewpaddings, marginsmob, paddings, paddingstab, paddingsmob, border, borderradius, bgColor, bgHColor, shadowColor, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, zindex, 	bgType, bgGradient, bgImage, bgImageParallax, bgImageSize, bgImageRepeat, bgImageOverlay, bgOverlayColor, bgOverlayPopup, bgOverlayOpacity, bgVideo, bgImagePosition, bordertopradius, borderrightradius, borderbottomradius, borderleftradius,columngap, bgHGradient, advid, advclass, advcss  } = attributes;
	
	// Section Background
	let containerBg = '';
	if (bgType !== 'none' && bgType === 'image') {
		containerBg = `url(${bgImage})`;
	} else if (bgType !== 'none' && bgType === 'gradient') {
		containerBg = bgGradient;
	} else {
		containerBg = 'none';
	}

	// Section Background Position
	let backgroundPosition = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundPosition =`${bgImagePosition.x * 100}% ${ bgImagePosition.y * 100 }%`
	}
	else
	{
		backgroundPosition = '';
	}

	// Section Background Size
	let backgroundSize = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundSize = bgImageSize;
	}
	else
	{
		backgroundSize = '';
	}

	// Section Image Background Attachment
	let backgroundAttachment = '';
	if(bgType === 'image' && bgImage && bgImageParallax)
	{
		backgroundAttachment='fixed';
	}
	else
	{
		backgroundAttachment='scroll';
	}	
	
	// Section Background Image Repeat
	let backgroundRepeat = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundRepeat = bgImageRepeat;
	}
	else
	{
		backgroundRepeat = '';
	}
	
	function setPreviewmargins(value) {
		setAttributes({previewmargins:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}

	function setPreviewpaddings(value) {
		setAttributes({previewpaddings:value});
		wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
	}						

	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);
	const Component = hasInnerBlocks
		? ColumnsEditContainerWrapper
		: Placeholder;

	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;
	
	return (
	<>
		<style dangerouslySetInnerHTML={{
		  __html: [
		     `#block-${clientId}{
					background-color:${bgColor};
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
					animation-delay: ${delay}ms;
					background-position: ${backgroundPosition}; 
					background-repeat: ${bgImageRepeat};
					background-size:${backgroundSize};
					background-attachment: ${backgroundAttachment};
					background-repeat: ${backgroundRepeat};
				    z-index: ${zindex};
					overflow: ${overflow};
					position: relative;
				}
				#block-${clientId} .gutensee-block.gutensee-block-container{
					max-width:${contenterwidth}px;
					gap:${columngap}px;
					justify-content:${justifycontent};
					align-items:${alignitems};	
					flex-direction:${flexdirection};
					flex-wrap:${flexwrap};
					min-height:${minHeight};	     	
		     	}
		     	#block-${clientId} .gutensee-block.gutensee-block-container-fluid{
					gap:${columngap}px;
					justify-content:${justifycontent};
					align-items:${alignitems};
					flex-direction:${flexdirection};
					flex-wrap:${flexwrap};
					min-height:${minHeight};
		     	}`					
		    ].join('\n')
		  }}>
		</style>
		
		<Component { ...props } />
		<InspectorControls>	
			{/* Style Cont*/}
			{controlType === 'style' && (		
			<>
				<div className="gutensee_block_content_section  all-types">
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
										<Button isSmall={true} isPressed={bgType === 'color'} onClick={() => setAttributes({bgType: 'color'})}>
											<svg  fill="#000000" width="18px" height="15px" viewBox="0 0 16 16"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>
										</Button>

										<Button isSmall={true} isPressed={bgType === 'gradient'} onClick={() => setAttributes({bgType: 'gradient',})}>
											<svg width="18px" height="15px" viewBox="0 0 128 128"><path d="M116 4H12c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8V12c0-4.42-3.58-8-8-8z" fill="#8e24aa"/><path d="M109.7 4H11.5A7.555 7.555 0 0 0 4 11.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H109.6c4.14.01 7.49-3.34 7.5-7.48V11.5c.09-4.05-3.13-7.41-7.18-7.5h-.22z" fill="#ab47bc"/><path d="M39.7 12.9c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z" fill="#ce93d8"/></svg>
										</Button>

										<Button isSmall={true} isPressed={bgType === 'image'} onClick={() => setAttributes({bgType: 'image',})}>
											<svg width="18" height="15" viewBox="0 0 18 15">
												<path d="M16.083.263h-14.446c-.798 0-1.445.648-1.445 1.447v11.579c0 .8.646 1.447 1.445 1.447h14.446c.798 0 1.445-.648 1.445-1.447v-11.579c0-.8-.646-1.447-1.445-1.447zm-4.334 2.171c2.389 0 2.386 3.618 0 3.618-2.385 0-2.39-3.618 0-3.618zm-9.39 10.855l4.334-5.789 2.965 3.961 2.091-2.514 3.611 4.342h-13.001z"className="svg-fill" fillRule="nonzero">
												</path>
											</svg>
										</Button>
										
										<Button isSmall={true} onClick={() => setAttributes({bgType: 'none',})}>
											<span className="dashicons dashicons-image-rotate"></span>
										</Button>
									</div>
								</div>

								{/* Color Background */}
								{bgType === 'color' && (
									<Fragment>
										<div className="gutensee_block_section_flex_panel">
											<p className="gutensee_block_section_panel_label">
												{ __('Background','gutensee')}
											</p>
											<div className="gutensee_block_section_panel">						
												<ColorPalette
													className={'gutensee-color'}
										            title={ __('Background','gutensee')}
										            value={ bgColor }
										            onChange={ (newtext) => setAttributes({ bgColor: newtext }) }
										        />
											</div>
										</div>
									</Fragment>
								)}

								{/* Gradient Background */}
								{bgType === 'gradient' && (
									<Fragment>
										<GradientPicker
											__nextHasNoMargin
											value={bgGradient}
											onChange={(currentGradient) =>
												setAttributes({
													bgGradient: currentGradient,
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
								{bgType === 'image' && (
									<Fragment>
										{bgImage ? (
											<Fragment>
												<div className="gutensee_block_col_preview_container">
													<div className="gutensee_block_col_preview_image">
														<FocalPointPicker
															url={bgImage}
															value={bgImagePosition}
															onChange={(focalPoint) => setAttributes({bgImagePosition: focalPoint,})}
														/>
													</div>
													<div className="gutensee_block_col_preview_actions">
														<button onClick={() => setAttributes({ bgImage: '',})}>
															<span className="dashicons dashicons-trash"></span>
														</button>
													</div>
												</div>
											</Fragment>
										) : (
											<MediaUpload
												onSelect={(media) => setAttributes({bgImage: media.url,})}
												type="image"
												value={bgImage}
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
												checked={bgImageParallax}
												onChange={() => setAttributes({ bgImageParallax: !bgImageParallax,})}
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
												setAttributes({ bgImageSize: size });
											}}
											value={bgImageSize}
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
											onChange={(value) => {setAttributes({ bgImageRepeat: value });}}
											value={bgImageRepeat}
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

										<Button isSmall={true} isPressed={bgType === 'color'} onClick={() => setAttributes({bgType: 'color',})}>
											<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="15px" viewBox="0 0 16 16"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>
										</Button>

										<Button isSmall={true} isPressed={bgType === 'gradient'} onClick={() => setAttributes({bgType: 'gradient',})}>
											<svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="15px" viewBox="0 0 128 128"><path d="M116 4H12c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8V12c0-4.42-3.58-8-8-8z" fill="#8e24aa"/><path d="M109.7 4H11.5A7.555 7.555 0 0 0 4 11.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H109.6c4.14.01 7.49-3.34 7.5-7.48V11.5c.09-4.05-3.13-7.41-7.18-7.5h-.22z" fill="#ab47bc"/><path d="M39.7 12.9c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z" fill="#ce93d8"/></svg>
										</Button>
										
										<Button isSmall={true} onClick={() => setAttributes({bgType: 'none',})}>
											<span className="dashicons dashicons-image-rotate"></span>
										</Button>
									</div>
								</div>

								{/* Color Background */}
								{bgType === 'color' && (
									<Fragment>
										<div className="gutensee_block_section_flex_panel">
											<p className="gutensee_block_section_panel_label">
												{ __('Background','gutensee')}
											</p>
											<div className="gutensee_block_section_panel">						
												<ColorPalette
													className={'gutensee-color'}
										            title={ __('Background','gutensee')}
										            value={ bgHColor }
										            onChange={ (newtext) => setAttributes({ bgHColor: newtext }) }
										        />
											</div>
										</div>
									</Fragment>
								)}

								{/* Gradient Background */}
								{bgType === 'gradient' && (
									<Fragment>
										<GradientPicker
											__nextHasNoMargin
											value={bgHGradient}
											onChange={(currentGradient) =>
												setAttributes({
													bgHGradient: currentGradient,
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

					{(bgType === 'image') && (
						<Fragment>
							<PanelBody title={__('Background Overlay','gutensee')} initialOpen={false} className={'gutensee-panel-edit'}>
								<div className="gutensee_block_section_flex_panel">
									<p className="gutensee_block_section_panel_label">{__('Enable/Disable Overlay','gutensee')}</p>
									<FormToggle
										checked={bgImageOverlay}
										onChange={() =>
													setAttributes({
																bgImageOverlay: !bgImageOverlay,
																})
												}
									/>
								</div>
								{bgImageOverlay && (
									<Fragment>								
									<PanelColorSettings  
										initialOpen={open}
										className='gutensee-block-section-bg-overlay'
										title={ __('Overlay Color','gutensee') }
										colorSettings={[
											{
												value: bgOverlayColor,
												onChange: setOverlayColor,
												label: __('Overlay Color:','gutensee')
											},
										]}
									/>
																
									<RangeControl
										label={__('Overlay Opacity','gutensee')}
										value={bgOverlayOpacity}
										onChange={(value) =>
											setAttributes({
													bgOverlayOpacity: value,
											})
										}
										min={0.1}
										max={1}
										step={0.01}
									/>
									</Fragment>
								)}
							</PanelBody>
						</Fragment>
					)}	

					<PanelBody initialOpen={false} title={__('Spacing','gutensee')}  className={'gutensee-panel-edit'} >
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

					<PanelBody initialOpen={false} title={__('Border','gutensee')}  className={'gutensee-panel-edit'} >
						<BorderBoxControl
							colors={colors}
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
					<TextControl
			            label={ __('Z Index','gutensee') }			    
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
	</>
	);

}

registerBlockType('gutensee/gutensee-section', {
	apiVersion: 2,
	title: __('Section','gutensee'),
	category: 'gutensee',
	icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><g stroke="null" id="Layer_1"><title stroke="null">Layer 1</title><rect stroke="#009999" id="svg_1" height="23.11782" width="22.99285" y="0.41281" x="0.53137" fill-opacity="0" stroke-width="1" fill="none"/><rect stroke="#009999" id="svg_3" height="9.55953" width="2.68667" y="6.78583" x="3.90533" fill-opacity="0" stroke-width="1" fill="none"/><rect stroke="#009999" id="svg_4" height="9.62201" width="2.37426" y="6.72335" x="17.77602" fill-opacity="0" stroke-width="1" fill="none"/><rect stroke="#009999" id="svg_5" height="9.62201" width="2.81163" y="6.66087" x="11.15307" fill-opacity="0" stroke-width="1" fill="none"/></g></svg>,
	example: {
	    'attributes' : {
	        'mode' : 'preview',
	    }
	},
	keywords: ['gutensee Section', 'Section'],
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
		textAlignment: {
			type: 'string',
			default:''
		},
		verticalAlignment: {
			type: 'string'
		},
		contentwidth:{
			type:'string',
			default:'gutensee-block-container'
		},
		previewcontainerwidth:{
			type:'string',
			default:'Desktop',
		},
		contenterwidth:{
			type:'number',
			default:1140
		},
		contenterwidthtab:{
			type:'number',
			default:1140
		},
		contenterwidthmob:{
			type:'number',
			default:1140
		},
		previewcolumngap:{
			type:'string',
			default:'Desktop',
		},
		columngap:{
			type:'number',
			default:30
		},
		columngaptab:{
			type:'number',
			default:30
		},
		columngapmob:{
			type:'number',
			default:30
		},
		bgColor:{
	    	type:'string',
	    },
	    bgHColor:{
	    	type:'string',
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
        borderradius:{
			type: 'object',
		    default: {
		        top: '0px',
		        left: '0px',
		        right: '0px',
		        bottom: '0px',
		      },
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
		bgType: {
			"type": "string",
			"default": "none"
		},
		bgGradient: {
			"type": "string",
			"default": "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)"
		},
		bgHGradient:{
			"type": "string",
		},
		bgImage: {
			"type": "string"
		},
		bgImageParallax: {
			"type": "boolean",
			"default": false
		},
		bgImageSize: {
			"type": "string",
			"default": "cover"
		},
		bgImageRepeat: {
			"type": "string",
			"default": "no-repeat"
		},
		bgImageOverlay: {
			"type": "boolean",
			"default": false
		},
		bgOverlayColor: {
			"type": "string",
			"default": "#000000"
		},
		bgOverlayPopup: {
			"type": "boolean",
			"default": false
		},
		bgOverlayOpacity: {
			"type": "number",
			"default": 0.6
		},
		bgVideo: {
			"type": "string"
		},
		bgImagePosition: {
			"type": "object",
			"default": {
				"x": 0.5,
				"y": 0.5
			}
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
	"supports": {
		"anchor": true,
		"align": [ "wide", "full" ],
		"html": false,
		"spacing": {
			"blockGap": {
				"__experimentalDefault": "2em",
				"sides": [ "horizontal", "vertical" ]
			},
			"margin": [ "top", "bottom" ],
			"padding": true,
			"__experimentalDefaultControls": {
				"padding": true
			}
		},
		"__experimentalLayout": {
			"allowSwitching": false,
			"allowInheriting": false,
			"allowEditing": false,
			"default": {
				"type": "flex",
				"flexWrap": "nowrap"
			}
		},
		"__experimentalBorder": {
			"color": true,
			"radius": true,
			"style": true,
			"width": true,
			"__experimentalDefaultControls": {
				"color": true,
				"radius": true,
				"style": true,
				"width": true
			}
		},
		
	},
	variations,
	deprecated,
	edit:BlockEdit,
	save: (props) => { 
		const { attributes, setAttributes, clientId } = props;
		const { uniqueid, verticalAlignment, overflow, justifycontent, alignitems, minHeight, flexdirection, flexwrap, textAlignment, contentwidth, contenterwidth, margins, paddings, border, borderradius, overlayopacity, bgColor, bgHColor, shadowColor, boxshadow, hshadow, vshadow, blurshadow, hidedesktop, hidetablet, hidemobile, animation, durations, delay, zindex, bgType, bgGradient, bgImage, bgImageParallax, bgImageSize, bgImageRepeat, bgImageOverlay, bgOverlayColor, bgOverlayPopup, bgOverlayOpacity, bgVideo, bgImagePosition, bordertopradius, borderrightradius, borderbottomradius, borderleftradius, columngap, previewcolumngap, previewcontainerwidth, columngapmob, columngaptab, contenterwidthmob, contenterwidthtab, bgHGradient, advid, advclass, advcss } = attributes;

	const className = classnames( {
		[`${uniqueid}`]:uniqueid,
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `has-text-align-${ textAlignment}`]: textAlignment,
		[ `gutensee-block-container-fluid` ]:  `gutensee-block-container-fluid`,
		[ `hide-desktop` ]:  hidedesktop==false,
		[ `hide-tablet` ]:  hidetablet==false,
		[ `hide-mobile` ]:  hidemobile==false,
		[ `animated ${attributes.durations}`]: durations,
		[ `animated ${attributes.animation}` ]: animation,
		[`${advclass}`]:advclass,
	} );
	
	const blockProps = useBlockProps.save( { className } );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	// Section Background
	let containerBg = '';
	if (bgType !== 'none' && bgType === 'image') {
		containerBg = `url(${bgImage})`;
	}
	else if (bgType !== 'none' && bgType === 'gradient') {
		containerBg = bgGradient;
	} else {
		containerBg = 'none';
	}

	// Section Background Position
	let backgroundPosition = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundPosition =`${bgImagePosition.x * 100}% ${ bgImagePosition.y * 100 }%`
	}
	else
	{
		backgroundPosition = '';
	}

	// Section Background Size
	let backgroundSize = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundSize = bgImageSize;
	}
	else
	{
		backgroundSize = '';
	}

	//Image Background Attachment
	let backgroundAttachment = '';
	if(bgType === 'image' && bgImage && bgImageParallax)
	{
		backgroundAttachment='fixed';
	}
	else
	{
		backgroundAttachment='scroll';
	}	
	
	//Background Image Repeat
	let backgroundRepeat = '';
	if(bgType === 'image' && bgImage)
	{
		backgroundRepeat = bgImageRepeat;
	}
	else
	{
		backgroundRepeat = '';
	}
	
	const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
	const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
	const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
	const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

	return( 
	<>
		<style dangerouslySetInnerHTML={{
		  __html: [
		     	`.wp-block-gutensee-gutensee-section.${uniqueid}{
					background-color:${bgColor};
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
					animation-delay: ${delay}ms;
					background-position: ${backgroundPosition}; 
					background-repeat: ${bgImageRepeat};
					background-size:${backgroundSize};
					background-attachment: ${backgroundAttachment};
					background-repeat: ${backgroundRepeat};
				    z-index: ${zindex};
					overflow: ${overflow};
					position: relative;
				}
				.wp-block-gutensee-gutensee-section.${uniqueid} .gutensee-block.gutensee-block-container{
			     		max-width:${contenterwidth}px;
			     		gap:${columngap}px;
			     		justify-content:${justifycontent};
		     			align-items:${alignitems};
		     			flex-direction:${flexdirection};
		     			flex-wrap:${flexwrap};
		     			min-height:${minHeight};
			     }
			    .wp-block-gutensee-gutensee-section.${uniqueid} .gutensee-block.gutensee-block-container-fluid{
						gap:${columngap}px;
						justify-content:${justifycontent};
						align-items:${alignitems};
						flex-direction:${flexdirection};
						flex-wrap:${flexwrap};
						min-height:${minHeight};
		     	}`					
		    ].join('\n')
		  }}>
		</style>
		<div { ...innerBlocksProps }>
			
			{(bgType === 'image' ) && bgType !== 'none' && bgImageOverlay && (
				<div className={"gutensee-overlay"} style={{
					backgroundColor: bgImageOverlay ? bgOverlayColor : '',
					opacity: bgImageOverlay ? bgOverlayOpacity : '',
					}}>	
				</div>
			)}
			<div className={`gutensee-block ${contentwidth}`} >
				{ innerBlocksProps.children }
			</div>
		</div>
	</>
	);
	},
	transforms,
});