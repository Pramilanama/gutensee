const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { BaseControl, Button, Popover, TabPanel, TextareaControl,  __experimentalInputControl as InputControl, FormToggle, PanelBody, ButtonGroup, Placeholder, QueryControls, RadioControl, RangeControl, Spinner, ToggleControl, ToolbarGroup, SelectControl, TextControl, __experimentalBorderBoxControl as BorderBoxControl,   __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
const { useState } = wp.element;
import {InspectorControls, RichText, PanelColorSettings, FontSizePicker, BlockAlignmentToolbar, BlockControls, __experimentalImageSizeControl as ImageSizeControl, useBlockProps, store as blockEditorStore, ColorPalette, __experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {fontfamilylist} from "./lib/fontfamilylist.js";
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import MonacoEditor from '@monaco-editor/react';

registerBlockType('gutensee/gutensee-breadcrumbs', {
    title: 'Breadcrumbs',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" ><rect width="280.074315" height="275.197399" rx="0" ry="0" transform="matrix(1.0398 0 0 1.061772 4.389364 3.901559)" fill="#fff" stroke="#099" stroke-width="8"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="translate(21.27264 100)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/><line x1="22.83" y1="50" x2="77.17" y2="50" transform="translate(182.907568 99.692488)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10"/><polyline points="12.79,40 50,60 87.21,40" transform="matrix(.013243 0.430437-.999527 0.030751 203.531929 126.940572)" fill="none" stroke="#099" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>,
    category: 'gutensee',
    example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
    keywords:['Gutensee Breadcrumbs','breadcrumbs','Link'],
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
        enabletitle:{
            type:'boolean',
            default:true,
        },
        enableicon:{
            type:'boolean',
            default:true,
        },
        enablehomebreadcumb:{
            type:'boolean',
            default:true,
        },
        gap:{
            type:'number',
            default:'5',
        },
        separator:{
            type:'string',
            default:'fa-solid fa-chevron-right',
        },
        headingLevel: {
            type: 'string',
            default: 'h2',
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
        bgColor:{
            type:'string',
        },
        bggradientValue:{
            type:'string',
        },
        labelColor:{
            type:'string',
        },
        labelhColor:{
            type:'string',
        },
        fieldColor:{
            type:'string',
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
        previewlabelmargins:{
            type:'string',
            default:'Desktop',
        },
        labelmargins: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '10px'
            }
        },
        labelmarginstab: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '10px'
            }
        },
        labelmarginsmob: {
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '10px'
            }
        },
        previewpaddings:{
            type:'string',
            default:'Desktop',
        },
        paddings:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        paddingstab:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        paddingsmob:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        },
        previewlabelpaddings:{
            type:'string',
            default:'Desktop',
        },
        labelpaddings:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        labelpaddingstab:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
            },
        }, 
        labelpaddingsmob:{
            type: 'object',
            default: {
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
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
        border: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        labelborderradius:{
            type: 'object',
            default: {
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
            },
        },        
        labelborder: {
            type: 'object',
            default: {
                color: '#000',
                style: 'solid',
                width: '0',        
            },
        },
        labelfontfamily:{
            type:'string',
            default:'Poppins',
        },
        previewlabelfontsize:{
            type:'string',
            default:'Desktop',
        },
        labelfontSize:{
            type:'string',
            default:'16px'
        },
        labelfontSizetab:{
            type:'string',
            default:'16px'
        },
        labelfontSizemob:{
            type:'string',
            default:'16px'
        }, 
        labelFontWeight:{
            type:'string',
            default:'600'
        },
        previewlabellineheight:{
            type:'string',
            default:'Desktop',
        }, 
        labelLineHeight:{
            type:'number',
            default:'26px'
        },
        labelaLineHeighttab:{
            type:'number',
            default:'26px'
        },
        labelLineHeightmob:{
            type:'number',
            default:'26px'
        }, 
        labelTransform:{
            type:'string',
        }, 
        labelDecoration:{
            type:'string',
            default:'none',
        }, 
        previewlabelltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        labelLetterSpacing:{
            type:'number',
        },
        labelLetterSpacingtab:{
            type:'number',
        },
        labelLetterSpacingmob:{
            type:'number',
        }, 
        titlefontfamily:{
            type:'string',
            default:'Poppins',
        }, 
        previewfontsize:{
            type:'string',
            default:'Desktop',
        },
        titlefontSize:{
            type:'string',
            default:'24px'
        },
        titlefontSizetab:{
            type:'string',
            default:'24px'
        },
        titlefontSizemob:{
            type:'string',
            default:'24px'
        }, 
        titleFontWeight:{
            type:'string',
            default:'600',
        }, 
        previewlineheight:{
            type:'string',
            default:'Desktop',
        },
        titleLineHeight:{
            type:'number',
            default:'34px'
        }, 
        titleLineHeighttab:{
            type:'number',
            default:'34px'
        }, 
        titleLineHeightmob:{
            type:'number',
            default:'34px'
        }, 
        titleTransform:{
            type:'string',
        }, 
        titleDecoration:{
            type:'string',
            default:'none',
        },
        previewltrspaceing:{
            type:'string',
            default:'Desktop',
        },
        titleLetterSpacing:{
            type:'number',
        }, 
        titleLetterSpacingtab:{
            type:'number',
        }, 
        titleLetterSpacingmob:{
            type:'number',
        }, 
        addcss:{
            type:'string',
        },
        addjs:{
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
    edit(props) {
        const { attributes, setAttributes, clientId } = props;
        setAttributes({ uniqueid: 'gutenseebreadcrumb' +clientId.slice(0,8) });
        const { uniqueid, controlType, gap, iconsize, sepsize, colorType, separator, enabletitle, enableicon, enablehomebreadcumb, headingLevel, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bgColor, bggradientValue, labelColor, labelhColor, fieldbgColor, fieldbggradientValue, fieldColor, previewmargins, margins, marginstab, marginsmob, previewfieldmargins, fieldmargins, fieldmarginstab, fieldmarginsmob, previewlabelmargins, labelmargins, labelmarginstab, labelmarginsmob, previewpaddings, paddings, paddingstab, paddingsmob, previewfieldpaddings, fieldpaddings, fieldpaddingstab, fieldpaddingsmob, previewlabelpaddings,labelpaddings, labelpaddingstab,  labelpaddingsmob, border, borderradius, labelborder, labelborderradius, labelfontfamily, previewlabelfontsize, labelfontSize, labelfontSizetab, labelfontSizemob, labelFontWeight, previewlabellineheight,  labelLineHeight, labelLineHeighttab, labelLineHeightmob,  labelTransform, labelDecoration,  previewlabelltrspaceing, labelLetterSpacing, labelLetterSpacingtab, labelLetterSpacingmob,  titlefontfamily, previewfontsize, titlefontSize, titlefontSizetab, titlefontSizemob,  titleFontWeight, previewlineheight, titleLineHeight, titleLineHeighttab, titleLineHeightmob, titleTransform, titleDecoration, previewltrspaceing, titleLetterSpacing,  titleLetterSpacingtab,  titleLetterSpacingmob, addcss, addjs, advid, advclass, advcss} = attributes;

        const animationclass='animated '+attributes.durations+' '+attributes.animation;
        const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
        const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
        const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
        const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;
        const blockclass='gutensee-breadcrumbs';

        const fontAwesomeIcons = [
            { value: 'fa-solid fa-arrow-right', icon: 'fa-solid fa-arrow-right' },
            { value: 'fa-solid fa-right-long', icon: 'fa-solid fa-right-long' },
            { value: 'fa-solid fa-chevron-right', icon: 'fa-solid fa-chevron-right' },
            { value: 'fa-solid fa-caret-right', icon: 'fa-solid fa-caret-right' },
            { value: 'fa-solid fa-arrow-right-long', icon: 'fa-solid fa-arrow-right-long' },
            { value: 'fa-solid fa-angle-right', icon: 'fa-solid fa-angle-right' },
            { value: 'fa-solid fa-angles-right', icon: 'fa-solid fa-angles-right' },
            // Add more icons as needed.
        ];
        
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        const selectIcon = (icon) => {
            setAttributes({ separator: icon });
            setIsDropdownOpen(false);
        };

        function setPreviewmargins(value) {
            setAttributes({previewmargins:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }
        
        function setPreviewpaddings(value) {
            setAttributes({previewpaddings:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }
       
        function setPreviewlabelfontsize(value) {
            setAttributes({previewlabelfontsize:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }

        function setPreviewfontsize(value) {
            setAttributes({previewfontsize:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }

        function setPreviewlabellineheight(value) {
            setAttributes({previewlabellineheight:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }

        function setPreviewlineheight(value) {
            setAttributes({previewlineheight:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }
        function setPreviewlabelltrspaceing(value) {
            setAttributes({previewlabelltrspaceing:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }

        function setPreviewltrspaceing(value) {
            setAttributes({previewltrspaceing:value});
            wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
        }

        const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
        const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
        const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
        const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

        if(labelfontfamily !=null){
            let urlf = 'https://fonts.googleapis.com/css2?family='+labelfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
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

        if(titlefontfamily !=null){
            let urlf = 'https://fonts.googleapis.com/css2?family='+titlefontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
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

        setAttributes({'addcss':`<style>
                    #${uniqueid}{
                         background-color:${bgColor};
                         background-image:${bggradientValue};
                         border: ${border.width} ${border.style} ${border.color};
                         border-top:${bordertop};
                         border-right:${borderright};
                         border-bottom:${borderbottom};
                         border-left:${borderleft};
                         border-radius: ${borderradius.top} ${borderradius.right} ${borderradius.bottom} ${borderradius.left};
                         margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
                         padding: ${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left};
                    }    
                    #${uniqueid} .breadcrumbs-title{
                        color:${fieldColor};
                        font-family:${titlefontfamily};
                        font-size: ${titlefontSize};
                        font-weight: ${titleFontWeight};
                        line-height: ${titleLineHeight};
                        text-transform:${titleTransform};
                        text-decoration:${titleDecoration};
                        letter-spacing:${titleLetterSpacing}px;
                    }  
                    #${uniqueid} .breadcrumbs .breadcrumbs-icon i{
                        font-size:${iconsize}px;
                    }
                    #${uniqueid} .breadcrumbs .breadcrumbs-separator i{
                        font-size:${sepsize}px;
                    }
                    #${uniqueid} .breadcrumbs,
                    #${uniqueid} .breadcrumbs a{
                        color:${labelColor};
                        font-family:${labelfontfamily};
                        font-size: ${labelfontSize};
                        font-weight: ${labelFontWeight};
                        line-height: ${labelLineHeight};
                        text-transform:${labelTransform};
                        text-decoration:${labelDecoration};
                        letter-spacing:${labelLetterSpacing}px;
                        display:flex;
                        gap:${gap}px;
                    }   
                    #${uniqueid} .breadcrumbs a:hover{
                        color:${labelhColor};
                    }
                    @media (max-width:1024px){
                        #${uniqueid}{
                            margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
                            padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};
                        }   
                        #${uniqueid} .breadcrumbs-title{
                            font-size: ${titlefontSizetab};
                            line-height: ${titleLineHeighttab};
                            letter-spacing:${titleLetterSpacingtab}px;
                        }  
                        #${uniqueid} .breadcrumbs{
                            font-size: ${labelfontSizetab};
                            line-height: ${labelLineHeighttab};
                            letter-spacing:${labelLetterSpacingtab}px;
                        }   
                                                         
                    }
                    @media (max-width:767px){
                        #${uniqueid}{
                            margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
                            padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};
                        }  
                        #${uniqueid} .breadcrumbs-title{
                            font-size: ${titlefontSizemob};
                            line-height: ${titleLineHeightmob};
                            letter-spacing:${titleLetterSpacingmob}px;
                        }  
                        #${uniqueid} .breadcrumbs{
                            font-size: ${labelfontSizemob};
                            line-height: ${labelLineHeightmob};
                            letter-spacing:${labelLetterSpacingmob}px;
                        }   
                        
                    }</style>`});
        
        setAttributes({'addjs':`<script>
                                    var url2 = "https://fonts.googleapis.com/css2?family=${labelfontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                                    var link2 = document.createElement("link");
                                    link2.href = url2;
                                    link2.rel = "stylesheet";
                                    link2.type =  "text/css";             
                                    document.head.appendChild(link2);

                                    var url2 = "https://fonts.googleapis.com/css2?family=${titlefontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                                    var link2 = document.createElement("link");
                                    link2.href = url2;
                                    link2.rel = "stylesheet";
                                    link2.type =  "text/css";             
                                    document.head.appendChild(link2);
                                </script>`
                });
        return (
            <>
                <style dangerouslySetInnerHTML={{
              __html: [
                 `${addcss}
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
                                <ToggleControl
                                    label={__('Enable/Disable Title','gutensee')}
                                    checked={enabletitle}
                                    onChange={(newval) => setAttributes({ enabletitle: newval })}
                                />
                                <ToggleControl
                                    label={__('Enable/Disable Icon','gutensee')}
                                    checked={enableicon}
                                    onChange={(newval) => setAttributes({ enableicon: newval })}
                                />
                                <ToggleControl
                                    label={__('Enable/Disable Home','gutensee')}
                                    checked={enablehomebreadcumb}
                                    onChange={(newval) => setAttributes({ enablehomebreadcumb: newval })}
                                />
                                <ButtonGroup className={'gutensee-button-group'}>
                                    <p>{__('Separator','gutensee')}</p>
                                    <Button
                                        isPrimary
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        {separator ? (
                                            <>
                                                <i className={`fa ${separator}`}></i> {__('Change Icon')}
                                            </>
                                        ) : __('Select an Icon')}
                                    </Button>
                                
                                    {isDropdownOpen && (
                                        <Popover onClose={() => setIsDropdownOpen(false)}>
                                            <div className="gutensee-icon-picker-grid">
                                                {fontAwesomeIcons.map((icon) => (
                                                    <Button
                                                        key={icon.value}
                                                        onClick={() => selectIcon(icon.value)}
                                                        className="gutensee-icon-picker-icon"
                                                    >
                                                        <i className={icon.icon}></i>
                                                    </Button>
                                                ))}
                                            </div>
                                        </Popover>
                                    )}
                                </ButtonGroup>
                                <RangeControl 
                                    label={ __('Gap(px)','gutensee') }                
                                    value={ gap }
                                    onChange={(newtext) => setAttributes({ gap: newtext })}
                                    min={0}
                                    max={100}
                                />
                                <RangeControl 
                                    label={ __('Icon Size(px)','gutensee') }                
                                    value={ iconsize }
                                    onChange={(newtext) => setAttributes({ iconsize: newtext })}
                                    min={0}
                                    max={100}
                                />
                                <RangeControl 
                                    label={ __('Separator Size(px)','gutensee') }                
                                    value={ sepsize }
                                    onChange={(newtext) => setAttributes({ sepsize: newtext })}
                                    min={0}
                                    max={100}
                                />
                                {enabletitle &&(
                                    <ButtonGroup className={'gutensee-button-group'}>
                                        <p>{__('Title Tag','gutensee')}</p>
                                        <Button isSecondary isPrimary={headingLevel == 'h1'} onClick={() => setAttributes({ headingLevel: 'h1' })}>{__('H1','gutensee')}</Button>
                                        <Button isSecondary isPrimary={headingLevel == 'h2'} onClick={() => setAttributes({ headingLevel: 'h2' })}>{__('H2','gutensee')}</Button>
                                        <Button isSecondary isPrimary={headingLevel == 'h3'} onClick={() => setAttributes({ headingLevel: 'h3' })}>{__('H3','gutensee')}</Button>
                                        <Button isSecondary isPrimary={headingLevel == 'h4'} onClick={() => setAttributes({ headingLevel: 'h4' })}>{__('H4','gutensee')}</Button>
                                        <Button isSecondary isPrimary={headingLevel == 'h5'} onClick={() => setAttributes({ headingLevel: 'h5' })}>{__('H5','gutensee')}</Button>                           
                                        <Button isSecondary isPrimary={headingLevel == 'h6'} onClick={() => setAttributes({ headingLevel: 'h6' })}>{__('H6','gutensee')}</Button>
                                    </ButtonGroup>
                                )}
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
                                            type={"number"}
                                            onChange={(newtext) => setAttributes({ delay: newtext })}
                                        />
                                    </>
                                    )
                                }
                                <PanelBody initialOpen={false}  title={__('Visiblity','gutensee')} className={'gutensee-panel-edit gutensee-visible'}>                                                    
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

                                <PanelBody initialOpen={false}  title={__('Color','gutensee')} className={'gutensee-panel-edit gutensee-button-dual-color'}>
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
                                                           label:__("Field Background"),
                                                           onColorChange:(newValue) => setAttributes({bgColor: newValue }),
                                                           onGradientChange:(newValue) => setAttributes({bggradientValue: newValue }),
                                                       },
                                                   ] }
                                               />
                                           </div>
                                       </div>
                                       <div className="gutensee_block_section_flex_panel">
                                           <p className="gutensee_block_section_panel_label">
                                               { __('Title','gutensee')}
                                           </p>
                                           <div className="gutensee_block_section_panel">                     
                                               <ColorPalette
                                                   className={'gutensee-color'}
                                                   title={ __('Field','gutensee')}
                                                   value={ fieldColor }
                                                   onChange={ (newtext) => setAttributes({ fieldColor: newtext }) }
                                               />
                                           </div>
                                       </div> 
                                       <div className="gutensee_block_section_flex_panel">
                                           <p className="gutensee_block_section_panel_label">
                                               { __('Breadcrumbs','gutensee')}
                                           </p>
                                           <div className="gutensee_block_section_panel">                     
                                               <ColorPalette
                                                   className={'gutensee-color'}
                                                   title={ __('Label','gutensee')}
                                                   value={ labelColor }
                                                   onChange={ (newtext) => setAttributes({ labelColor: newtext }) }
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
                                               { __('Breadcrumbs','gutensee')}
                                            </p>
                                            <div className="gutensee_block_section_panel">                     
                                               <ColorPalette
                                                   className={'gutensee-color'}
                                                   title={ __('Breadcrumbs','gutensee')}
                                                   value={ labelhColor }
                                                   onChange={ (newtext) => setAttributes({ labelhColor: newtext }) }
                                               />
                                            </div>
                                        </div>                                                            
                                      </>
                                   )}

                                </PanelBody>

                                <PanelBody initialOpen={false}  title={__('Spacing','gutensee')} className={'gutensee-panel-edit'}>

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

                                <PanelBody initialOpen={false}  title={__('Border','gutensee')} className={'gutensee-panel-edit'}>
                                   <BorderBoxControl
                                       colors={ colors }
                                       label={ __( 'Border' ,'gutensee') }
                                       onChange={(newtext) => setAttributes({ border: newtext })}
                                       value={ border }
                                   />
                                   <BoxControl
                                       label={__('Border Radius','gutensee')}
                                       values={borderradius}
                                       onChange={(newtext) => 
                                           setAttributes({
                                                ...borderradius,
                                               borderradius: {
                                                   top: newtext.top,
                                                   left: newtext.left,
                                                   right: newtext.right,
                                                   bottom: newtext.bottom,
                                               },
                                           })
                                       }
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

                                <PanelBody initialOpen={false} title={__('Title','gutensee')} className={'gutensee-panel-edit'}>
                                    
                                    <SelectControl
                                        label={__(' Font Family','gutensee')}
                                        value={ titlefontfamily }
                                        options={fontfamilylist}
                                        onChange={ (newtext) => setAttributes({ titlefontfamily: newtext }) }
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
                                        value={ titleFontWeight }
                                        options={ [
                                            { label: __('Thin','gutensee'), value: '100' },
                                            { label: __('Extra Light','gutensee'), value: '200' },
                                            { label: __('Light','gutensee'), value: '300' },
                                            { label: __('Regular','gutensee'), value: '400' },
                                            { label: __('Medium','gutensee'), value: '500' },
                                            { label: __('Semi Bold','gutensee'), value: '600' },
                                            { label: __('Bold','gutensee'), value: '700' },
                                            { label: __('Extra Bold','gutensee'), value: '800' },
                                            { label: __('Black','gutensee'), value: '900' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ titleFontWeight: newtext }) }                     
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
                                                    value={ titleLineHeight}
                                                    onChange={(newtext) => setAttributes({ titleLineHeight: newtext })}                 
                                                />
                                            </>
                                        )}
                                        { previewlineheight === 'Tablet' && (
                                            <>
                                                <UnitControl 
                                                    label={__('line Height(px)','gutensee')}   
                                                    className={'gutensee-singl'}           
                                                    value={ titleLineHeighttab}
                                                    onChange={(newtext) => setAttributes({ titleLineHeighttab: newtext })}                  
                                                />
                                            </>
                                        )}
                                        { previewlineheight === 'Mobile' && (
                                            <>
                                                <UnitControl 
                                                    label={__('line Height(px)','gutensee')}   
                                                    className={'gutensee-singl'}           
                                                    value={ titleLineHeightmob}
                                                    onChange={(newtext) => setAttributes({ titleLineHeightmob: newtext })}                  
                                                />
                                            </>
                                        )}
                                    </div>

                                    <SelectControl
                                        label={__('Transform','gutensee')}
                                        value={ titleTransform }
                                        options={ [
                                            { label: __('Default','gutensee'), value: '' },
                                            { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                            { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                            { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ titleTransform: newtext }) }                      
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
                                                    value={ titleLetterSpacing}
                                                    onChange={(newtext) => setAttributes({ titleLetterSpacing: newtext })}
                                                />
                                            </>
                                        )}
                                        { previewltrspaceing === 'Tablet' && (
                                            <>
                                                <UnitControl 
                                                    label={__('Letter Spacing','gutensee')}
                                                    className={'gutensee-singl'}               
                                                    value={ titleLetterSpacingtab}
                                                    onChange={(newtext) => setAttributes({ titleLetterSpacingtab: newtext })}
                                                />
                                            </>
                                        )}
                                        { previewltrspaceing === 'Mobile' && (
                                            <>
                                                <UnitControl 
                                                    label={__('Letter Spacing','gutensee')}
                                                    className={'gutensee-singl'}               
                                                    value={ titleLetterSpacingmob}
                                                    onChange={(newtext) => setAttributes({ titleLetterSpacingmob: newtext })}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <SelectControl
                                        label={__('Decoration ','gutensee')}
                                        value={ titleDecoration }
                                        options={ [
                                            { label: __('Default','gutensee'), value: 'none' },
                                            { label: __('Underline','gutensee'), value: 'underline' },
                                            { label: __('Overline','gutensee'), value: 'overline' },
                                            { label: __('Line Through','gutensee'), value: 'line-through' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ titleDecoration: newtext }) }                     
                                    />     

                                </PanelBody>

                                <PanelBody initialOpen={false} title={__('Breadcrumbs','gutensee')} className={'gutensee-panel-edit'}>
                                    <SelectControl
                                        label={__(' Font Family','gutensee')}
                                        value={ labelfontfamily }
                                        options={fontfamilylist}
                                        onChange={ (newtext) => setAttributes({ labelfontfamily: newtext }) }
                                    />  

                                    <div class="gutensee-preview-control">
                                        <RadioGroup label="Width" onChange={ setPreviewlabelfontsize } checked={ previewlabelfontsize } className={"preview-icon"}>
                                            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                        </RadioGroup>
                                        { previewlabelfontsize === 'Desktop' && (
                                            <>  
                                                <UnitControl 
                                                    label={__(' Font Size','gutensee')}
                                                    className={'gutensee-singl'}
                                                    value={ labelfontSize }
                                                    onChange={(userVal) => setAttributes({
                                                                labelfontSize: userVal
                                                            })}
                                                />
                                            </>
                                        )}
                                        { previewlabelfontsize === 'Tablet' && (
                                            <>  
                                                <UnitControl 
                                                    label={__(' Font Size','gutensee')}
                                                    className={'gutensee-singl'}
                                                    value={ labelfontSizetab }
                                                    onChange={(userVal) => setAttributes({
                                                                labelfontSizetab: userVal
                                                            })}
                                                />
                                            </>
                                        )}
                                        { previewlabelfontsize === 'Mobile' && (
                                            <>  
                                                <UnitControl 
                                                    label={__(' Font Size','gutensee')}
                                                    className={'gutensee-singl'}
                                                    value={ labelfontSizemob }
                                                    onChange={(userVal) => setAttributes({
                                                                labelfontSizemob: userVal
                                                            })}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <SelectControl
                                        label={__('Font Weight','gutensee')}
                                        value={ labelFontWeight }
                                        options={ [
                                            { label: __('Thin','gutensee'), value: '100' },
                                            { label: __('Extra Light','gutensee'), value: '200' },
                                            { label: __('Light','gutensee'), value: '300' },
                                            { label: __('Regular','gutensee'), value: '400' },
                                            { label: __('Medium','gutensee'), value: '500' },
                                            { label: __('Semi Bold','gutensee'), value: '600' },
                                            { label: __('Bold','gutensee'), value: '700' },
                                            { label: __('Extra Bold','gutensee'), value: '800' },
                                            { label: __('Black','gutensee'), value: '900' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ labelFontWeight: newtext }) }                      
                                    />

                                    <div class="gutensee-preview-control">
                                        <RadioGroup label="Width" onChange={ setPreviewlabellineheight } checked={ previewlabellineheight } className={"preview-icon"}>
                                            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                        </RadioGroup>
                                        { previewlabellineheight === 'Desktop' && (
                                            <>
                                                <UnitControl 
                                                    label={__('line Height(px)','gutensee')}   
                                                    className={'gutensee-singl'}           
                                                    value={ labelLineHeight}
                                                    onChange={(newtext) => setAttributes({ labelLineHeight: newtext })}                 
                                                />
                                            </>
                                        )}
                                        { previewlabellineheight === 'Tablet' && (
                                            <>
                                                <UnitControl 
                                                    label={__('line Height(px)','gutensee')}   
                                                    className={'gutensee-singl'}           
                                                    value={ labelLineHeighttab}
                                                    onChange={(newtext) => setAttributes({ labelLineHeighttab: newtext })}                  
                                                />
                                            </>
                                        )}
                                        { previewlabellineheight === 'Mobile' && (
                                            <>
                                                <UnitControl 
                                                    label={__('line Height(px)','gutensee')}   
                                                    className={'gutensee-singl'}           
                                                    value={ labelLineHeightmob}
                                                    onChange={(newtext) => setAttributes({ labelLineHeightmob: newtext })}                  
                                                />
                                            </>
                                        )}
                                    </div>

                                    <SelectControl
                                        label={__('Transform','gutensee')}
                                        value={ labelTransform }
                                        options={ [
                                            { label: __('Default','gutensee'), value: '' },
                                            { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                            { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                            { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ labelTransform: newtext }) }                   
                                    />

                                    <div class="gutensee-preview-control">
                                        <RadioGroup label="Width" onChange={ setPreviewlabelltrspaceing } checked={ previewlabelltrspaceing } className={"preview-icon"}>
                                            <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                            <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                            <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                        </RadioGroup>
                                        { previewlabelltrspaceing === 'Desktop' && (
                                            <>
                                                <UnitControl 
                                                    label={__('Letter Spacing','gutensee')}
                                                    className={'gutensee-singl'}               
                                                    value={ labelLetterSpacing}
                                                    onChange={(newtext) => setAttributes({ labelLetterSpacing: newtext })}
                                                />
                                            </>
                                        )}
                                        { previewlabelltrspaceing === 'Tablet' && (
                                            <>
                                                <UnitControl 
                                                    label={__('Letter Spacing','gutensee')}
                                                    className={'gutensee-singl'}               
                                                    value={ labelLetterSpacingtab}
                                                    onChange={(newtext) => setAttributes({ labelLetterSpacingtab: newtext })}
                                                />
                                            </>
                                        )}
                                        { previewlabelltrspaceing === 'Mobile' && (
                                            <>
                                                <UnitControl 
                                                    label={__('Letter Spacing','gutensee')}
                                                    className={'gutensee-singl'}               
                                                    value={ labelLetterSpacingmob}
                                                    onChange={(newtext) => setAttributes({ labelLetterSpacingmob: newtext })}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <SelectControl
                                        label={__('Decoration ','gutensee')}
                                        value={ labelDecoration }
                                        options={ [
                                            { label: __('Default','gutensee'), value: 'none' },
                                            { label: __('Underline','gutensee'), value: 'underline' },
                                            { label: __('Overline','gutensee'), value: 'overline' },
                                            { label: __('Line Through','gutensee'), value: 'line-through' },
                                        ] }
                                        onChange={ (newtext) => setAttributes({ labelDecoration: newtext }) }                      
                                    />
                                        
                                </PanelBody>

                            </div>
                        </>
                    )}

                </InspectorControls>
                {/* Editor Preview */}
                <div id={advid}>
                    <div className={`${blockclass} ${animationclass} ${displayclass} ${advclass}`} id={uniqueid}>
                        <div>
                            {enabletitle &&(
                                <RichText
                                    tagName={ headingLevel }
                                    className={"breadcrumbs-title"}
                                    value={"Current Title"}
                                />
                            )}
                            <div className="breadcrumbs">
                                {enableicon &&(
                                <a class="breadcrumbs-icon" href="#"><i class="fa-solid fa-house"></i></a>
                                )}
                                {enablehomebreadcumb &&(<a href="#">Home</a>)}
                                <span class="breadcrumbs-separator"><i class={separator}></i></span>
                                <span>Level 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save() {
        return null; // Use render callback to generate frontend output
    },
});
