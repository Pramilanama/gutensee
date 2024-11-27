import { registerBlockType } from "@wordpress/blocks";
import {__} from "@wordpress/i18n";
import { InnerBlocks, BlockControls, AlignmentToolbar } from "@wordpress/block-editor";

const ALLOWED_BLOCKS=['gutensee/gutensee-social'];

const socialIconsBlock = (props) => {

    const { attributes, setAttributes} = props;

    const {textAlignment} = attributes;
    const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={textAlignment}
                    onChange={(newalign) => setAttributes({ textAlignment: newalign })}
                />          
            </BlockControls>
            <div className={`${"gutensee-block"} ${alignmentClass}`}>
                <InnerBlocks 
                    template={[
                        ['gutensee/gutensee-social' ]
                    ]}
                allowedBlocks={ALLOWED_BLOCKS} />
            </div>
        </>
    )
}

registerBlockType('gutensee/gutensee-socials',{
    title:__('Social Icons','gutensee'),
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="280.074315" height="275.197399" rx="0" ry="0" transform="matrix(1.0398 0 0 1.061772 4.389368 3.901554)" fill="#fff" stroke="#099" stroke-width="8"/><circle r="27.57697" transform="matrix(1.627273 0 0 1.668871 194.875265 78.767429)" fill="#099" stroke-width="5"/><circle r="27.260847" transform="matrix(1.627273 0 0 1.715157 199.612299 221.146226)" fill="#099" stroke-width="5"/><circle r="27.576813" transform="matrix(1.627273 0 0 1.715157 70.86201 157.564769)" fill="#099" stroke-width="5"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(1.69607-1.06148 0.54286 0.867401 17.628474 119.970181)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="matrix(1.632699 0.802868-.47879 0.973659 71.879515 101.106853)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/></svg>,
    category:'gutensee',
    example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
    keywords:['Socials','Gutensee'],
    supports: {
    html: false,
    anchor: true,
    align: ['wide', 'full']
    },
    attributes:{
        textAlignment: {
            type: 'string',
            default:'left'
        },
    },
    edit: socialIconsBlock,
    save:(props) => {
        const { attributes } = props;

        const {textAlignment} = attributes;
        const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';    
        return (
            <div className={`${"gutensee-block"} ${alignmentClass}`}>
                <InnerBlocks.Content />
            </div>
        )
    }
});