/**
 * WordPress dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const MAXIMUM_SELECTED_BLOCKS = 6;

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ '*' ],
			__experimentalConvert: ( blocks ) => {
				const columnWidth = +( 100 / blocks.length ).toFixed( 2 );
				const innerBlocksTemplate = blocks.map(
					( { name, attributes, innerBlocks } ) => [
						'gutensee/gutensee-column',
						{ width: `${ columnWidth }%` },
						[ [ name, { ...attributes }, innerBlocks ] ],
					]
				);
				return createBlock(
					'gutensee/gutensee-section',
					{},
					createBlocksFromInnerBlocksTemplate( innerBlocksTemplate )
				);
			},
			isMatch: ( { length: selectedBlocksLength }, blocks ) => {
				// If a user is trying to transform a single Columns block, skip
				// the transformation. Enabling this functiontionality creates
				// nested Columns blocks resulting in an unintuitive user experience.
				// Multiple Columns blocks can still be transformed.
				if (
					blocks.length === 1 &&
					blocks[ 0 ].name === 'gutensee/gutensee-section'
				) {
					return false;
				}

				return (
					selectedBlocksLength &&
					selectedBlocksLength <= MAXIMUM_SELECTED_BLOCKS
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'core/media-text' ],
			priority: 1,
			transform: ( attributes, innerBlocks ) => {
				const {
					align,
					backgroundColor,
					textColor,
					style,
					mediaAlt: alt,
					mediaId: id,
					mediaPosition,
					mediaSizeSlug: sizeSlug,
					mediaType,
					mediaUrl: url,
					mediaWidth,
					verticalAlignment,
				} = attributes;
				let media;
				if ( mediaType === 'image' || ! mediaType ) {
					const imageAttrs = { id, alt, url, sizeSlug };
					const linkAttrs = {
						href: attributes.href,
						linkClass: attributes.linkClass,
						linkDestination: attributes.linkDestination,
						linkTarget: attributes.linkTarget,
						rel: attributes.rel,
					};
					media = [ 'core/image', { ...imageAttrs, ...linkAttrs } ];
				} else {
					media = [ 'core/video', { id, src: url } ];
				}
				const innerBlocksTemplate = [
					[ 'gutensee/gutensee-column', { width: `${ mediaWidth }%` }, [ media ] ],
					[
						'gutensee/gutensee-column',
						{ width: `${ 100 - mediaWidth }%` },
						innerBlocks,
					],
				];
				if ( mediaPosition === 'right' ) {
					innerBlocksTemplate.reverse();
				}
				return createBlock(
					'gutensee/gutensee-section',
					{
						align,
						backgroundColor,
						textColor,
						style,
						verticalAlignment,
					},
					createBlocksFromInnerBlocksTemplate( innerBlocksTemplate )
				);
			},
		},
	],
};
export default transforms;