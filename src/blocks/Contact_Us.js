const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { BaseControl, Button,TabPanel, TextareaControl,  __experimentalInputControl as InputControl, FormToggle, PanelBody, Placeholder, QueryControls, RadioControl, RangeControl, Spinner, ToggleControl, ToolbarGroup, SelectControl, TextControl, __experimentalBorderBoxControl as BorderBoxControl,   __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio,  __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
const { useState } = wp.element;
import {InspectorControls, PanelColorSettings,FontSizePicker, BlockAlignmentToolbar, BlockControls, __experimentalImageSizeControl as ImageSizeControl, useBlockProps, store as blockEditorStore, ColorPalette, __experimentalPanelColorGradientSettings as PanelColorGradientSettings} from '@wordpress/block-editor';
import {colors, dualcolors, gradcolors} from './lib/colors';
import {animationslist, animationsdurations} from "./lib/animationslist.js";
import {fontfamilylist} from "./lib/fontfamilylist.js";
import MonacoEditor from '@monaco-editor/react';

registerBlockType('gutensee/gutensee-contact-us', {
   title: __('Contact Us', 'gutensee'),
   icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M63.45,59l-6.09,6.1c-1.109415,1.092808-2.890585,1.092808-4,0L34.9,46.67c-1.092808-1.109415-1.092808-2.890585,0-4L41,36.55c.738001-.743358.842979-1.906517.25-2.77-2.837309-4.197455-5.309688-8.63034-7.39-13.25-.418558-.944531-1.276238-1.621685-2.29211-1.809661s-2.059067.13744-2.78789.869661l-6.25,6.25c-3.410796,3.419148-4.683868,8.427078-3.32,13.06C25.086619,59.110711,40.889289,74.913381,61.1,80.79c4.632922,1.363868,9.640852.090796,13.06-3.32l6.25-6.25c.732221-.728823,1.057637-1.772018.869661-2.78789s-.86513-1.873552-1.809661-2.29211c-4.61966-2.080312-9.052545-4.552691-13.25-7.39-.863483-.592979-2.026642-.488001-2.77.25Z" transform="matrix(2.985323 0.244464-.201741 2.463603-23.778643 55.018165)" fill="#099"/><g transform="matrix(2.168739 0 0 2.217251 106.820406-22.241607)"><circle r="30.09" transform="translate(50 50)" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><ellipse rx="16.46" ry="30.09" transform="translate(50 50)" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M71.09,71.46C64.946628,67.054701,57.559204,64.72183,50,64.8c-7.559204-.07817-14.946628,2.254701-21.09,6.66" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M71.09,28.54C64.946628,32.945299,57.559204,35.27817,50,35.2c-7.559204.07817-14.946628-2.254701-21.09-6.66" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><line x1="19.91" y1="50" x2="80.09" y2="50" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><line x1="50" y1="19.91" x2="50" y2="80.09" fill="none" stroke="#009999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g></svg>,
   category: 'gutensee',
   example: {
        'attributes' : {
            'mode' : 'preview',
        }
    },
   keywords:['Gutensee Contact','Contact Form','Form', 'contact-form'],
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
      style:{
         type:'string',
         default:'style-1',
      },
      enablename:{
         type:'boolean',
         default:true,
      },
      enableemail:{
         type:'boolean',
         default:true,
      },
      enablesubject:{
         type:'boolean',
         default:true,
      },
      enablemobile:{
         type:'boolean',
         default:true,
      },
      enablemesg:{
         type:'boolean',
         default:true,
      },
      enablelabel:{
         type:'boolean',
         default:true,
      },
      namelabel:{
         type:'string',
         default:'Name',
      },
      emaillabel:{
         type:'string',
         default:'Email',
      },
      subjectlabel:{
         type:'string',
         default:'Subject',
      },
      mobilelabel:{
         type:'string',
         default:'Mobile',
      },
      mesglabel:{
         type:'string',
         default:'Message',
      },
      btnlabel:{
         type:'string',
         default:'Send Message',
      },
      enableplaceholder:{
         type:'boolean',
         default:true,
      },
      nameholder:{
         type:'string',
         default:'Enter Name',
      },
      emailholder:{
         type:'string',
         default:'Enter Email',
      },
      subjectholder:{
         type:'string',
         default:'Enter Subject',
      },
      mobileholder:{
         type:'string',
         default:'Enter Mobile',
      },
      mesgholder:{
         type:'string',
         default:'Enter Message',
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
         type:'string',
      },
      labelColor:{
         type:'string',
      },
      fieldbgColor:{
         type:'string',
      },
      fieldbggradientValue:{
         type:'string',
      },
      fieldColor:{
         type:'string',
      },
      btnColor:{
         type:'string',
      },
      btnbgColor:{
         type:'string',
      },
      btnbggradientValue:{
         type:'string',
      },
      btnhColor:{
         type:'string',
      },
      btnbghColor:{
         type:'string',
      },
      btnbggradienthValue:{
         type:'string',
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
         default: 15
      },
      shadowColor:{
         type:'string',
         default:'#e7e7e7'
      },
      boxshadow:{
         type:'boolean',
         default:false,
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
      previewfieldmargins:{
         type:'string',
         default:'Desktop',
      },
      fieldmargins: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px'
         }
      },
      fieldmarginstab: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px'
         }
      },
      fieldmarginsmob: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px'
         }
      },
      previewbtnmargins:{
         type:'string',
         default:'Desktop',
      },
      btnmargins: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px'
         }
      },
      btnmarginstab: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px'
         }
      },
      btnmarginsmob: {
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '20px'
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
      previewfieldpaddings:{
         type:'string',
         default:'Desktop',
      },
      fieldpaddings:{
         type: 'object',
         default: {
             top: '10px',
             left: '10px',
             right: '10px',
             bottom: '10px',
         },
      }, 
      fieldpaddingstab:{
         type: 'object',
         default: {
             top: '10px',
             left: '10px',
             right: '10px',
             bottom: '10px',
         },
      }, 
      fieldpaddingsmob:{
         type: 'object',
         default: {
             top: '10px',
             left: '10px',
             right: '10px',
             bottom: '10px',
         },
      },
      previewbtnpaddings:{
         type:'string',
         default:'Desktop',
      },
      btnpaddings:{
         type: 'object',
         default: {
             top: '10px',
             left: '10px',
             right: '10px',
             bottom: '10px',
         },
      }, 
      btnpaddingstab:{
         type: 'object',
         default: {
             top: '10px',
             left: '10px',
             right: '10px',
             bottom: '10px',
         },
      }, 
      btnpaddingsmob:{
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
      fieldborderradius:{
         type: 'object',
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px',
         },
      },        
      fieldborder: {
         type: 'object',
         default: {
             color: '#000',
             style: 'solid',
             width: '0',        
         },
      },
      btnborderradius:{
         type: 'object',
         default: {
             top: '0px',
             left: '0px',
             right: '0px',
             bottom: '0px',
         },
      },        
      btnborder: {
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
         default:'14px'
      },
      labelfontSizetab:{
         type:'string',
         default:'14px'
      },
      labelfontSizemob:{
         type:'string',
         default:'14px'
      }, 
      labelFontWeight:{
         type:'string',
         default:'500'
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
      btnfontfamily:{
         type:'string',
         default:'Poppins',
      }, 
      previewbtnfontsize:{
         type:'string',
         default:'Desktop',
      },
      btnfontSize:{
         type:'string',
         default:'14px'
      }, 
      btnfontSizetab:{
         type:'string',
         default:'14px'
      }, 
      btnfontSizemob:{
         type:'string',
         default:'14px'
      }, 
      btnFontWeight:{
         type:'string',
         default:'500'
      }, 
      btnLineHeight:{
         type:'number',
         default:'25px'
      }, 
      btnLineHeighttab:{
         type:'number',
         default:'25px'
      }, 
      previewbtnlineheight:{
         type:'string',
         default:'Desktop',
      },
      btnLineHeightmob:{
         type:'number',
         default:'25px'
      }, 
      btnTransform:{
         type:'string',
      }, 
      btnDecoration:{
         type:'string',
         default:'none',
      }, 
      previewbtnltrspaceing:{
         type:'string',
         default:'Desktop',
      },
      btnLetterSpacing:{
         type:'number',
      },
      btnLetterSpacingtab:{
         type:'number',
      },
      btnLetterSpacingmob:{
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
      setAttributes({ uniqueid: 'gutenseecontact' +clientId.slice(0,8) });
      const { uniqueid, controlType, colorType, style, enablename, enableemail, enablesubject, enablemobile, enablemesg, enablelabel, namelabel, emaillabel, subjectlabel, mobilelabel, mesglabel, btnlabel, enableplaceholder, nameholder, emailholder, subjectholder, mobileholder, mesgholder, hidedesktop, hidetablet, hidemobile, animation, durations, delay, bgColor, bggradientValue, labelColor, fieldbgColor, fieldbggradientValue, fieldColor, btnColor, btnbgColor, btnbggradientValue, btnhColor, btnbghColor, btnbggradienthValue, hshadow, vshadow, blurshadow, shadowColor, boxshadow, previewmargins, margins, marginstab, marginsmob, previewlabelmargins, labelmargins, labelmarginstab, labelmarginsmob, previewfieldmargins, fieldmargins, fieldmarginstab, fieldmarginsmob, previewbtnmargins, btnmargins, btnmarginstab, btnmarginsmob, previewpaddings, paddings, paddingstab, paddingsmob, previewlabelpaddings,labelpaddings, labelpaddingstab,  labelpaddingsmob, previewfieldpaddings, fieldpaddings,  fieldpaddingstab, fieldpaddingsmob, previewbtnpaddings, btnpaddings, btnpaddingstab, btnpaddingsmob, border, borderradius, labelborder, labelborderradius, fieldborder,fieldborderradius, btnborder, btnborderradius, labelfontfamily, previewlabelfontsize, labelfontSize, labelfontSizetab, labelfontSizemob, labelFontWeight, previewlabellineheight,  labelLineHeight, labelLineHeighttab, labelLineHeightmob,  labelTransform, labelDecoration,  previewlabelltrspaceing, labelLetterSpacing, labelLetterSpacingtab, labelLetterSpacingmob,  titlefontfamily, previewfieldfontsize, titlefontSize, titlefontSizetab, titlefontSizemob,  titleFontWeight, previewfieldlineheight, titleLineHeight, titleLineHeighttab, titleLineHeightmob, titleTransform, titleDecoration, previewfieldltrspaceing, titleLetterSpacing,  titleLetterSpacingtab,  titleLetterSpacingmob,  btnfontfamily,  previewbtnfontsize, btnfontSize, btnfontSizetab, btnfontSizemob, btnFontWeight, btnLineHeight, btnLineHeighttab, previewbtnlineheight, btnLineHeightmob, btnTransform, btnDecoration, previewbtnltrspaceing, btnLetterSpacing, btnLetterSpacingtab, btnLetterSpacingmob, addcss, addjs, advid, advclass, advcss} = attributes;
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [subject, setSubject] = useState('');
      const [mobile, setMobile] = useState('');
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');

      const animationclass='animated '+attributes.durations+' '+attributes.animation;
      const displaydesktop=(hidedesktop == false) ? 'hide-desktop' : '';
      const displaytablet=(hidetablet == false) ? 'hide-tablet' : '';
      const displaymobile=(hidemobile == false) ? 'hide-mobile' : '';
      const displayclass=displaydesktop+' '+displaytablet+' '+displaymobile;

      const bordertop=(border.top != undefined) ? `${border.top.width} ${border.top.style} ${border.top.color}` : null;
      const borderright=(border.right != undefined) ? `${border.right.width} ${border.right.style} ${border.right.color}` : null;
      const borderbottom=(border.bottom != undefined) ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : null;
      const borderleft=(border.left != undefined) ? `${border.left.width} ${border.left.style} ${border.left.color}` : null;

      const labelbordertop=(labelborder.top != undefined) ? `${labelborder.top.width} ${labelborder.top.style} ${labelborder.top.color}` : null;
      const labelborderright=(labelborder.right != undefined) ? `${labelborder.right.width} ${labelborder.right.style} ${labelborder.right.color}` : null;
      const labelborderbottom=(labelborder.bottom != undefined) ? `${labelborder.bottom.width} ${labelborder.bottom.style} ${labelborder.bottom.color}` : null;
      const labelborderleft=(labelborder.left != undefined) ? `${labelborder.left.width} ${labelborder.left.style} ${labelborder.left.color}` : null;

      const fieldbordertop=(fieldborder.top != undefined) ? `${fieldborder.top.width} ${fieldborder.top.style} ${fieldborder.top.color}` : null;
      const fieldborderright=(fieldborder.right != undefined) ? `${fieldborder.right.width} ${fieldborder.right.style} ${fieldborder.right.color}` : null;
      const fieldborderbottom=(fieldborder.bottom != undefined) ? `${fieldborder.bottom.width} ${fieldborder.bottom.style} ${fieldborder.bottom.color}` : null;
      const fieldborderleft=(fieldborder.left != undefined) ? `${fieldborder.left.width} ${fieldborder.left.style} ${fieldborder.left.color}` : null;

      const btnbordertop=(btnborder.top != undefined) ? `${btnborder.top.width} ${btnborder.top.style} ${btnborder.top.color}` : null;
      const btnborderright=(btnborder.right != undefined) ? `${btnborder.right.width} ${btnborder.right.style} ${btnborder.right.color}` : null;
      const btnborderbottom=(btnborder.bottom != undefined) ? `${btnborder.bottom.width} ${btnborder.bottom.style} ${btnborder.bottom.color}` : null;
      const btnborderleft=(btnborder.left != undefined) ? `${btnborder.left.width} ${btnborder.left.style} ${btnborder.left.color}` : null;


      function setPreviewmargins(value) {
        setAttributes({previewmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewfieldmargins(value) {
        setAttributes({previewfieldmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewlabelmargins(value) {
        setAttributes({previewlabelmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewbtnmargins(value) {
        setAttributes({previewbtnmargins:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewpaddings(value) {
        setAttributes({previewpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewfieldpaddings(value) {
        setAttributes({previewfieldpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewlabelpaddings(value) {
        setAttributes({previewlabelpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewbtnpaddings(value) {
        setAttributes({previewbtnpaddings:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewlabelfontsize(value) {
        setAttributes({previewlabelfontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewfieldfontsize(value) {
        setAttributes({previewfieldfontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewbtnfontsize(value) {
        setAttributes({previewbtnfontsize:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewlabellineheight(value) {
        setAttributes({previewlabellineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewfieldlineheight(value) {
        setAttributes({previewfieldlineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewbtnlineheight(value) {
        setAttributes({previewbtnlineheight:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewlabelltrspaceing(value) {
        setAttributes({previewlabelltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewfieldltrspaceing(value) {
        setAttributes({previewfieldltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      function setPreviewbtnltrspaceing(value) {
        setAttributes({previewbtnltrspaceing:value});
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(value);
      }

      const validateForm = () => {
         if (!name || !email || !subject || !mobile || !message) {
            setError('All fields are required');
            return false;
         }        
         
         const namePattern = /^[a-zA-Z\s'-]+$/;
         if (!namePattern.test(name)) {
            setError('Invalid Name format');
            return false;
         }

         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
            setError('Invalid Email format');
            return false;
         }

         const mobilePattern = /^[0-9]{10}$/;
         if (!mobilePattern.test(mobile)) {
            setError('Invalid Mobile format');
            return false;
         }

         setError('');
         return true;
      };

      const handleSubmit = () => {
         if (!validateForm()) return;

         wp.apiFetch({
            path: '/wp-json/custom/v1/send-mail',
            method: 'POST',
            data: { name, email, subject, mobile, message },
         }).then(() => {
            alert('Email sent successfully');
         }).catch(() => {
            alert('Failed to send email');
         });
      };

      if(titlefontfamily !=null){
           let url3 = 'https://fonts.googleapis.com/css2?family='+titlefontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
            let link3 = document.createElement('link')
             link3.href = url3;
             link3.rel = "stylesheet";
             link3.type =  "text/css";
             
             if ( jQuery("body").hasClass("site-editor-php") ) { 
             jQuery('iframe').contents().find("head").append(link3);
         }else{
           document.head.appendChild(link3);
         }
       }
       if(labelfontfamily !=null){
           let url4 = 'https://fonts.googleapis.com/css2?family='+labelfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
            let link4 = document.createElement('link')
             link4.href = url4;
             link4.rel = "stylesheet";
             link4.type =  "text/css";
             
             if ( jQuery("body").hasClass("site-editor-php") ) { 
             jQuery('iframe').contents().find("head").append(link4);
         }else{
           document.head.appendChild(link4);
         }
       }   
       if(btnfontfamily !=null){
           let url5 = 'https://fonts.googleapis.com/css2?family='+btnfontfamily+':wght@100;200;300;400;500;600;700;800;900&display=swap';
            let link5 = document.createElement('link')
             link5.href = url5;
             link5.rel = "stylesheet";
             link5.type =  "text/css";
             
             if ( jQuery("body").hasClass("site-editor-php") ) { 
             jQuery('iframe').contents().find("head").append(link5);
         }else{
           document.head.appendChild(link5);
         }
       }

      const namelabel1=(enablelabel==true)? namelabel:'';
      const emaillabel1=(enablelabel==true)? emaillabel:'';
      const subjectlabel1=(enablelabel==true)? subjectlabel:'';
      const mobilelabel1=(enablelabel==true)? mobilelabel:'';
      const mesglabel1=(enablelabel==true)? mesglabel:'';

      const nameholder1=(enableplaceholder==true)? nameholder:'';
      const emailholder1=(enableplaceholder==true)? emailholder:'';
      const subjectholder1=(enableplaceholder==true)? subjectholder:'';
      const mobileholder1=(enableplaceholder==true)? mobileholder:'';
      const mesgholder1=(enableplaceholder==true)? mesgholder:'';

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
                        box-shadow: ${vshadow}px ${hshadow}px ${blurshadow}px ${vshadow}px  ${shadowColor};
                        animation-delay: ${delay}ms;
                    }
                    #${uniqueid} .contact-form-field label{
                        color:${labelColor};
                        border: ${labelborder.width} ${labelborder.style} ${labelborder.color};
                        border-top:${labelbordertop};
                        border-right:${labelborderright};
                        border-bottom:${labelborderbottom};
                        border-left:${labelborderleft};
                        border-radius: ${labelborderradius.top} ${labelborderradius.right} ${labelborderradius.bottom} ${labelborderradius.left};
                        margin: ${labelmargins.top} ${labelmargins.right} ${labelmargins.bottom} ${labelmargins.left};
                        padding: ${labelpaddings.top} ${labelpaddings.right} ${labelpaddings.bottom} ${labelpaddings.left};
                        font-family:${labelfontfamily};
                        font-size: ${labelfontSize};
                        font-weight: ${labelFontWeight};
                        line-height: ${labelLineHeight};
                        text-transform:${labelTransform};
                        text-decoration:${labelDecoration};
                        letter-spacing:${labelLetterSpacing}px; 

                    }
                    #${uniqueid} .contact-form-field input, 
                    #${uniqueid} .contact-form-field input::placeholder,
                    #${uniqueid} .contact-form-field textarea,
                    #${uniqueid} .contact-form-field textarea::placeholder{
                        color:${fieldColor};
                        background-color:${fieldbgColor};
                        background-image:${fieldbggradientValue};                     
                        border: ${fieldborder.width} ${fieldborder.style} ${fieldborder.color};
                        border-top:${fieldbordertop};
                        border-right:${fieldborderright};
                        border-bottom:${fieldborderbottom};
                        border-left:${fieldborderleft};
                        border-radius: ${fieldborderradius.top} ${fieldborderradius.right} ${fieldborderradius.bottom} ${fieldborderradius.left};
                        margin: ${fieldmargins.top} ${fieldmargins.right} ${fieldmargins.bottom} ${fieldmargins.left};
                        padding: ${fieldpaddings.top} ${fieldpaddings.right} ${fieldpaddings.bottom} ${fieldpaddings.left};
                        font-family:${titlefontfamily};
                        font-size: ${titlefontSize};
                        font-weight: ${titleFontWeight};
                        line-height: ${titleLineHeight};
                        text-transform:${titleTransform};
                        text-decoration:${titleDecoration};
                        letter-spacing:${titleLetterSpacing}px;                        
                    }    
                    #${uniqueid} .custom-contact-button button{
                        color:${btnColor};
                        background-color:${btnbgColor};
                        background-image:${btnbggradientValue};                     
                        border: ${btnborder.width} ${btnborder.style} ${btnborder.color};
                        border-top:${btnbordertop};
                        border-right:${btnborderright};
                        border-bottom:${btnborderbottom};
                        border-left:${btnborderleft};
                        border-radius: ${btnborderradius.top} ${btnborderradius.right} ${btnborderradius.bottom} ${btnborderradius.left};
                        margin: ${btnmargins.top} ${btnmargins.right} ${btnmargins.bottom} ${btnmargins.left};
                        padding: ${btnpaddings.top} ${btnpaddings.right} ${btnpaddings.bottom} ${btnpaddings.left};
                        font-family:${btnfontfamily};
                        font-size: ${btnfontSize};
                        font-weight: ${btnFontWeight};
                        line-height: ${btnLineHeight};
                        text-transform:${btnTransform};
                        text-decoration:${btnDecoration};
                        letter-spacing:${btnLetterSpacing}px;                        
                    }                
                    @media (max-width:1024px){
                        #${uniqueid}{
                           margin: ${marginstab.top} ${marginstab.right} ${marginstab.bottom} ${marginstab.left};
                           padding: ${paddingstab.top} ${paddingstab.right} ${paddingstab.bottom} ${paddingstab.left};
                       }
                       #${uniqueid} .contact-form-field label{
                           margin: ${labelmarginstab.top} ${labelmarginstab.right} ${labelmarginstab.bottom} ${labelmarginstab.left};
                           padding: ${labelpaddingstab.top} ${labelpaddingstab.right} ${labelpaddingstab.bottom} ${labelpaddingstab.left};
                           font-size: ${labelfontSizetab};
                           line-height: ${labelLineHeighttab};
                           letter-spacing:${labelLetterSpacingtab}px; 

                       }
                       #${uniqueid} .contact-form-field input, 
                       #${uniqueid} .contact-form-field input::placeholder,
                       #${uniqueid} .contact-form-field textarea,
                       #${uniqueid} .contact-form-field textarea::placeholder{
                           margin: ${fieldmarginstab.top} ${fieldmarginstab.right} ${fieldmarginstab.bottom} ${fieldmarginstab.left};
                           padding: ${fieldpaddingstab.top} ${fieldpaddingstab.right} ${fieldpaddingstab.bottom} ${fieldpaddingstab.left};
                           font-size: ${titlefontSizetab};
                           line-height: ${titleLineHeighttab};
                           letter-spacing:${titleLetterSpacingtab}px;                        
                       }    
                       #${uniqueid} .custom-contact-button button{
                           margin: ${btnmarginstab.top} ${btnmarginstab.right} ${btnmarginstab.bottom} ${btnmarginstab.left};
                           padding: ${btnpaddingstab.top} ${btnpaddingstab.right} ${btnpaddingstab.bottom} ${btnpaddingstab.left};
                           font-size: ${btnfontSizetab};
                           line-height: ${btnLineHeighttab};
                           letter-spacing:${btnLetterSpacingtab}px;                        
                       }                
                                                         
                    }
                    @media (max-width:767px){
                        #${uniqueid}{
                           margin: ${marginsmob.top} ${marginsmob.right} ${marginsmob.bottom} ${marginsmob.left};
                           padding: ${paddingsmob.top} ${paddingsmob.right} ${paddingsmob.bottom} ${paddingsmob.left};
                       }
                       #${uniqueid} .contact-form-field label{
                           margin: ${labelmarginsmob.top} ${labelmarginsmob.right} ${labelmarginsmob.bottom} ${labelmarginsmob.left};
                           padding: ${labelpaddingsmob.top} ${labelpaddingsmob.right} ${labelpaddingsmob.bottom} ${labelpaddingsmob.left};
                           font-size: ${labelfontSizemob};
                           line-height: ${labelLineHeightmob};
                           letter-spacing:${labelLetterSpacingmob}px; 

                       }
                       #${uniqueid} .contact-form-field input, 
                       #${uniqueid} .contact-form-field input::placeholder,
                       #${uniqueid} .contact-form-field textarea,
                       #${uniqueid} .contact-form-field textarea::placeholder{
                           margin: ${fieldmarginsmob.top} ${fieldmarginsmob.right} ${fieldmarginsmob.bottom} ${fieldmarginsmob.left};
                           padding: ${fieldpaddingsmob.top} ${fieldpaddingsmob.right} ${fieldpaddingsmob.bottom} ${fieldpaddingsmob.left};
                           font-size: ${titlefontSizemob};
                           line-height: ${titleLineHeightmob};
                           letter-spacing:${titleLetterSpacingmob}px;                        
                       }    
                       #${uniqueid} .custom-contact-button button{
                           margin: ${btnmarginsmob.top} ${btnmarginsmob.right} ${btnmarginsmob.bottom} ${btnmarginsmob.left};
                           padding: ${btnpaddingsmob.top} ${btnpaddingsmob.right} ${btnpaddingsmob.bottom} ${btnpaddingsmob.left};
                           font-size: ${btnfontSizemob};
                           line-height: ${btnLineHeightmob};
                           letter-spacing:${btnLetterSpacingmob}px;                        
                       }       
                    }${advcss}</style>`});

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

                                 var url2 = "https://fonts.googleapis.com/css2?family=${btnfontfamily}:wght@100;200;300;400;500;600;700;800;900&display=swap";
                                 var link2 = document.createElement("link");
                                 link2.href = url2;
                                 link2.rel = "stylesheet";
                                 link2.type =  "text/css";             
                                 document.head.appendChild(link2);

                                 document.getElementById(${uniqueid}).addEventListener('submit', function(e) {
                                 e.preventDefault();

                                 const formData = new FormData(this);

                                 fetch('/wp-json/custom/v1/send-mail', {
                                    method: 'POST',
                                    body: formData
                                 })
                                 .then(response => response.json())
                                 .then(data => {
                                    document.getElementById('form-response'${uniqueid}).innerText = data.message ? data.message : 'Message sent successfully!';
                                 })
                                 .catch(() => {
                                    document.getElementById('form-response'${uniqueid}).innerText = 'Failed to send message!';
                                 });
                              });
                             </script>`
                });  

      return (
         <>
         <style dangerouslySetInnerHTML={{
              __html: [
                 `${addcss} `                   
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
                     <SelectControl
                         label={__('Style','gutensee')}
                         value={ style }
                         options={ [
                             { label: __('Style 1','gutensee'), value: 'style-1' },
                             { label: __('Style 2','gutensee'), value: 'style-2' },
                             { label: __('Style 3','gutensee'), value: 'style-3' },
                             { label: __('Style 4','gutensee'), value: 'style-4' },
                             { label: __('Style 5','gutensee'), value: 'style-5' },
                         ] }
                         onChange={ (newval) => setAttributes({ style: newval }) }                    
                     />
                     <PanelBody initialOpen={false}  title={__('Hide/Show Field','gutensee')} className={'gutensee-panel-edit'}>
                        <ToggleControl
                            label={ __( 'Enable/Disable Name','gutensee' ) }
                            checked={ enablename }
                            onChange={ ( value ) =>
                                setAttributes( { enablename: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable Email','gutensee' ) }
                            checked={ enableemail }
                            onChange={ ( value ) =>
                                setAttributes( { enableemail: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable Subject','gutensee' ) }
                            checked={ enablesubject }
                            onChange={ ( value ) =>
                                setAttributes( { enablesubject: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable Mobile','gutensee' ) }
                            checked={ enablemobile }
                            onChange={ ( value ) =>
                                setAttributes( { enablemobile: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Enable/Disable Message','gutensee' ) }
                            checked={ enablemesg }
                            onChange={ ( value ) =>
                                setAttributes( { enablemesg: value } )
                            }
                        />
                     </PanelBody>
                     <PanelBody initialOpen={false}  title={__('Label','gutensee')} className={'gutensee-panel-edit'}>
                        <ToggleControl
                            label={ __( 'Enable/Disable Label','gutensee' ) }
                            checked={ enablelabel }
                            onChange={ ( value ) =>
                                setAttributes( { enablelabel: value } )
                            }
                        />
                        {enablelabel == true &&(
                           <>
                              <TextControl
                                   label={__('Name','gutensee')}
                                   value={ namelabel }
                                   onChange={ (newtext) => setAttributes({ namelabel: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Email','gutensee')}
                                   value={ emaillabel }
                                   onChange={ (newtext) => setAttributes({ emaillabel: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Subject','gutensee')}
                                   value={ subjectlabel }
                                   onChange={ (newtext) => setAttributes({ subjectlabel: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Mobile','gutensee')}
                                   value={ mobilelabel }
                                   onChange={ (newtext) => setAttributes({ mobilelabel: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Message','gutensee')}
                                   value={ mesglabel }
                                   onChange={ (newtext) => setAttributes({ mesglabel: newtext }) }                    
                               />
                           </>

                        )}
                        <TextControl
                             label={__('Button','gutensee')}
                             value={ btnlabel }
                             onChange={ (newtext) => setAttributes({ btnlabel: newtext }) }                    
                         />
                     </PanelBody>
                     <PanelBody initialOpen={false}  title={__('Placeholder','gutensee')} className={'gutensee-panel-edit'}>
                        <ToggleControl
                            label={ __( 'Enable/Disable Placeholder','gutensee' ) }
                            checked={ enableplaceholder }
                            onChange={ ( value ) =>
                                setAttributes( { enableplaceholder: value } )
                            }
                        />
                        {enableplaceholder == true &&(
                           <>
                              <TextControl
                                   label={__('Name','gutensee')}
                                   value={ nameholder }
                                   onChange={ (newtext) => setAttributes({ nameholder: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Email','gutensee')}
                                   value={ emailholder }
                                   onChange={ (newtext) => setAttributes({ emailholder: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Subject','gutensee')}
                                   value={ subjectholder }
                                   onChange={ (newtext) => setAttributes({ subjectholder: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Mobile','gutensee')}
                                   value={ mobileholder }
                                   onChange={ (newtext) => setAttributes({ mobileholder: newtext }) }                    
                               />
                               <TextControl
                                   label={__('Message','gutensee')}
                                   value={ mesgholder }
                                   onChange={ (newtext) => setAttributes({ mesgholder: newtext }) }                    
                               />
                           </>

                        )}
                     </PanelBody>
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
                                       { __('Label','gutensee')}
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
                               <div className="gutensee_block_section_flex_panel">
                                   <p className="gutensee_block_section_panel_label">
                                       { __('Field Background','gutensee')}
                                   </p>
                                   <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                       <PanelColorGradientSettings className="gutensee-color-gradient"
                                           settings={ [
                                               {
                                                   colorValue: attributes.fieldbgColor,
                                                   gradientValue: attributes.fieldbggradientValue,
                                                   colors:dualcolors,
                                                   gradients:gradcolors,
                                                   label:__("Field Background"),
                                                   onColorChange:(newValue) => setAttributes({fieldbgColor: newValue }),
                                                   onGradientChange:(newValue) => setAttributes({fieldbggradientValue: newValue }),
                                               },
                                           ] }
                                       />
                                   </div>
                               </div>
                               <div className="gutensee_block_section_flex_panel">
                                   <p className="gutensee_block_section_panel_label">
                                       { __('Field','gutensee')}
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
                                       { __('Button','gutensee')}
                                   </p>
                                   <div className="gutensee_block_section_panel">                     
                                       <ColorPalette
                                           className={'gutensee-color'}
                                           title={ __('Button','gutensee')}
                                           value={ btnColor }
                                           onChange={ (newtext) => setAttributes({ btnColor: newtext }) }
                                       />
                                   </div>
                               </div>
                               <div className="gutensee_block_section_flex_panel">
                                   <p className="gutensee_block_section_panel_label">
                                       { __('Button Background','gutensee')}
                                   </p>
                                   <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                       <PanelColorGradientSettings className="gutensee-color-gradient"
                                           settings={ [
                                               {
                                                   colorValue: attributes.btnbgColor,
                                                   gradientValue: attributes.btnbggradientValue,
                                                   colors:dualcolors,
                                                   gradients:gradcolors,
                                                   label:__("Button Background"),
                                                   onColorChange:(newValue) => setAttributes({btnbgColor: newValue }),
                                                   onGradientChange:(newValue) => setAttributes({btnbggradientValue: newValue }),
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
                                       { __('Button','gutensee')}
                                    </p>
                                    <div className="gutensee_block_section_panel">                     
                                       <ColorPalette
                                           className={'gutensee-color'}
                                           title={ __('Button','gutensee')}
                                           value={ btnhColor }
                                           onChange={ (newtext) => setAttributes({ btnhColor: newtext }) }
                                       />
                                    </div>
                                 </div>
                                 <div className="gutensee_block_section_flex_panel">
                                   <p className="gutensee_block_section_panel_label">
                                       { __('Button Background','gutensee')}
                                   </p>
                                   <div className="gutensee_block_section_panel gutensee-color-gradient">                        
                                       <PanelColorGradientSettings className="gutensee-color-gradient"
                                           settings={ [
                                               {
                                                   colorValue: attributes.btnbghColor,
                                                   gradientValue: attributes.btnbggradienthValue,
                                                   colors:dualcolors,
                                                   gradients:gradcolors,
                                                   label:__("Button Background"),
                                                   onColorChange:(newValue) => setAttributes({btnbghColor: newValue }),
                                                   onGradientChange:(newValue) => setAttributes({btnbggradienthValue: newValue }),
                                               },
                                           ] }
                                       />
                                   </div>
                                 </div>                          
                              </>
                           )}
                        </PanelBody>

                        <PanelBody initialOpen={false}  title={__('Box Shadow','gutensee')} className={'gutensee-panel-edit'}>
                           
                           <ToggleControl
                               label={__('Add Box Shadow','gutensee')}
                               checked={boxshadow}
                               onChange={(newval) => setAttributes({ boxshadow: newval })}
                           />
                           
                           { boxshadow != '' && ( 
                               <>
                                   <RangeControl 
                                       label={ __('Horizontal(px)','gutensee') }               
                                       value={ hshadow}
                                       onChange={(newtext) => setAttributes({ hshadow: newtext })}
                                       min={0}
                                       max={100}
                                   />
                                   <RangeControl 
                                       label={ __('Vertical(px)','gutensee') }             
                                       value={ vshadow}
                                       onChange={(newtext) => setAttributes({ vshadow: newtext })}
                                       min={0}
                                       max={100}
                                   />  
                                   <RangeControl 
                                       label={ __('Blur(px)','gutensee') }             
                                       value={ blurshadow}
                                       onChange={(newtext) => setAttributes({ blurshadow: newtext })}
                                       min={0}
                                       max={100} 
                                   />
                                   <div className="gutensee_block_section_flex_panel">
                                       <p className="gutensee_block_section_panel_label">
                                           {__('Color', 'gutensee')}
                                       </p>
                                       <div className="gutensee_block_section_panel">                     
                                           <ColorPalette
                                               className={'gutensee-color'}
                                               enableAlpha={true}
                                               title={ __('Color','gutensee')}
                                               value={ shadowColor }
                                               onChange={ (newtext) => setAttributes({ shadowColor: newtext }) }
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

                           <RadioGroup label="Width" onChange={ setPreviewlabelmargins } checked={ previewlabelmargins } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewlabelmargins === 'Desktop' && (
                               <>
                                   <BoxControl 
                                       label={__('Label Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={labelmargins}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...labelmargins,
                                               labelmargins: {
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

                           { previewlabelmargins === 'Tablet' && (
                               <>
                                   <BoxControl 
                                       label={__('Label Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={labelmarginstab}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...labelmarginstab,
                                               labelmarginstab: {
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

                           { previewlabelmargins === 'Mobile' && (
                               <>
                                   <BoxControl 
                                       label={__('Label Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={labelmarginsmob}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...labelmarginsmob,
                                               labelmarginsmob: {
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

                           <RadioGroup label="Width" onChange={ setPreviewlabelpaddings } checked={ previewlabelpaddings } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewlabelpaddings === 'Desktop' && (
                               <>                                  
                                   <BoxControl
                                       values={labelpaddings}
                                       label={__('Label Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...labelpaddings,
                                               labelpaddings: {
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

                           { previewlabelpaddings === 'Tablet' && (
                               <>                                  
                                   <BoxControl
                                       values={featuredpaddingstab}
                                       label={__('Label Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...featuredpaddingstab,
                                               featuredpaddingstab: {
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

                           { previewlabelpaddings === 'Mobile' && (
                               <>                                  
                                   <BoxControl
                                       values={labelpaddingsmob}
                                       label={__('Label Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...labelpaddingsmob,
                                               labelpaddingsmob: {
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

                           
                           <RadioGroup label="Width" onChange={ setPreviewfieldmargins } checked={ previewfieldmargins } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewfieldmargins === 'Desktop' && (
                               <>
                                   <BoxControl 
                                       label={__('Field Margin','gutensee')}
                                       values={fieldmargins}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldmargins,
                                               fieldmargins: {
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

                           { previewfieldmargins === 'Tablet' && (
                               <>
                                   <BoxControl 
                                       label={__('Field Margin','gutensee')}
                                       values={fieldmarginstab}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldmarginstab,
                                               fieldmarginstab: {
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

                           { previewfieldmargins === 'Mobile' && (
                               <>
                                   <BoxControl 
                                       label={__('Field Margin','gutensee')}
                                       values={fieldmarginsmob}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldmarginsmob,
                                               fieldmarginsmob: {
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

                           <RadioGroup label="Width" onChange={ setPreviewfieldpaddings } checked={ previewfieldpaddings } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewfieldpaddings === 'Desktop' && (
                               <>                                  
                                   <BoxControl
                                       values={fieldpaddings}
                                       label={__('Field Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldpaddings,
                                               fieldpaddings: {
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

                           { previewfieldpaddings === 'Tablet' && (
                               <>                                  
                                   <BoxControl
                                       values={fieldpaddingstab}
                                       label={__('Field Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldpaddingstab,
                                               fieldpaddingstab: {
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

                           { previewfieldpaddings === 'Mobile' && (
                               <>                                  
                                   <BoxControl
                                       values={fieldpaddingsmob}
                                       label={__('Field Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...fieldpaddingsmob,
                                               fieldpaddingsmob: {
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

                           <RadioGroup label="Width" onChange={ setPreviewbtnmargins } checked={ previewbtnmargins } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewbtnmargins === 'Desktop' && (
                               <>
                                   <BoxControl 
                                       label={__('Button Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={btnmargins}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnmargins,
                                               btnmargins: {
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

                           { previewbtnmargins === 'Tablet' && (
                               <>
                                   <BoxControl 
                                       label={__('Button Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={btnmarginstab}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnmarginstab,
                                               btnmarginstab: {
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

                           { previewbtnmargins === 'Mobile' && (
                               <>
                                   <BoxControl 
                                       label={__('Button Margin','gutensee')}
                                       inputProps={{ min: -300 }}
                                       values={btnmarginsmob}
                                       sides={['top', 'bottom','left','right']}
                                       allowReset={false}
                                       units={[]}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnmarginsmob,
                                               btnmarginsmob: {
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

                           <RadioGroup label="Width" onChange={ setPreviewbtnpaddings } checked={ previewbtnpaddings } className={"preview-icon"}>
                               <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                               <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                               <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                           </RadioGroup>

                           { previewbtnpaddings === 'Desktop' && (
                               <>                                  
                                   <BoxControl
                                       values={btnpaddings}
                                       label={__('Button Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnpaddings,
                                               btnpaddings: {
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

                           { previewbtnpaddings === 'Tablet' && (
                               <>                                  
                                   <BoxControl
                                       values={btnpaddingstab}
                                       label={__('Button Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnpaddingstab,
                                               btnpaddingstab: {
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

                           { previewbtnpaddings === 'Mobile' && (
                               <>                                  
                                   <BoxControl
                                       values={btnpaddingsmob}
                                       label={__('Button Padding','gutensee')}
                                       units={[]}
                                       allowReset={false}
                                       onChange={(newValue) =>
                                           setAttributes({
                                               ...btnpaddingsmob,
                                               btnpaddingsmob: {
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
                           <BorderBoxControl
                              colors={ colors }
                              label={ __( 'Label Border' ,'gutensee') }
                              onChange={(newtext) => setAttributes({ labelborder: newtext })}
                              value={ labelborder }
                           />
                           <BoxControl
                              label={__('Label Border Radius','gutensee')}
                              values={labelborderradius}
                              onChange={(newtext) => 
                                  setAttributes({
                                       ...labelborderradius,
                                      labelborderradius: {
                                          top: newtext.top,
                                          left: newtext.left,
                                          right: newtext.right,
                                          bottom: newtext.bottom,
                                      },
                                  })
                              }
                           />
                           <BorderBoxControl
                              colors={ colors }
                              label={ __( 'Field Border' ,'gutensee') }
                              onChange={(newtext) => setAttributes({ fieldborder: newtext })}
                              value={ fieldborder }
                           />
                           <BoxControl
                              label={__('Field Border Radius','gutensee')}
                              values={fieldborderradius}
                              onChange={(newtext) => 
                                  setAttributes({
                                       ...fieldborderradius,
                                      fieldborderradius: {
                                          top: newtext.top,
                                          left: newtext.left,
                                          right: newtext.right,
                                          bottom: newtext.bottom,
                                      },
                                  })
                              }
                           /> 
                           <BorderBoxControl
                               colors={ colors }
                               label={ __( 'Button Border' ,'gutensee') }
                               onChange={(newtext) => setAttributes({ btnborder: newtext })}
                               value={ btnborder }
                           />
                           <BoxControl
                               label={__('Button Border Radius','gutensee')}
                               values={btnborderradius}
                               onChange={(newtext) => 
                                   setAttributes({
                                        ...btnborderradius,
                                       btnborderradius: {
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

                        <PanelBody initialOpen={false} title={__('Label','gutensee')} className={'gutensee-panel-edit'}>
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

                        <PanelBody initialOpen={false} title={__('Field','gutensee')} className={'gutensee-panel-edit'}>
                            
                            <SelectControl
                                label={__(' Font Family','gutensee')}
                                value={ titlefontfamily }
                                options={fontfamilylist}
                                onChange={ (newtext) => setAttributes({ titlefontfamily: newtext }) }
                            />  

                            <div class="gutensee-preview-control">
                                <RadioGroup label="Width" onChange={ setPreviewfieldfontsize } checked={ previewfieldfontsize } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewfieldfontsize === 'Desktop' && (
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
                                { previewfieldfontsize === 'Tablet' && (
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
                                { previewfieldfontsize === 'Mobile' && (
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
                                <RadioGroup label="Width" onChange={ setPreviewfieldlineheight } checked={ previewfieldlineheight } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewfieldlineheight === 'Desktop' && (
                                    <>
                                        <UnitControl 
                                            label={__('line Height(px)','gutensee')}   
                                            className={'gutensee-singl'}           
                                            value={ titleLineHeight}
                                            onChange={(newtext) => setAttributes({ titleLineHeight: newtext })}                 
                                        />
                                    </>
                                )}
                                { previewfieldlineheight === 'Tablet' && (
                                    <>
                                        <UnitControl 
                                            label={__('line Height(px)','gutensee')}   
                                            className={'gutensee-singl'}           
                                            value={ titleLineHeighttab}
                                            onChange={(newtext) => setAttributes({ titleLineHeighttab: newtext })}                  
                                        />
                                    </>
                                )}
                                { previewfieldlineheight === 'Mobile' && (
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
                                <RadioGroup label="Width" onChange={ setPreviewfieldltrspaceing } checked={ previewfieldltrspaceing } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewfieldltrspaceing === 'Desktop' && (
                                    <>
                                        <UnitControl 
                                            label={__('Letter Spacing','gutensee')}
                                            className={'gutensee-singl'}               
                                            value={ titleLetterSpacing}
                                            onChange={(newtext) => setAttributes({ titleLetterSpacing: newtext })}
                                        />
                                    </>
                                )}
                                { previewfieldltrspaceing === 'Tablet' && (
                                    <>
                                        <UnitControl 
                                            label={__('Letter Spacing','gutensee')}
                                            className={'gutensee-singl'}               
                                            value={ titleLetterSpacingtab}
                                            onChange={(newtext) => setAttributes({ titleLetterSpacingtab: newtext })}
                                        />
                                    </>
                                )}
                                { previewfieldltrspaceing === 'Mobile' && (
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

                        <PanelBody initialOpen={false} title={__('Button','gutensee')}  className={'gutensee-panel-edit'}>
                            <SelectControl
                                label={__(' Font Family','gutensee')}
                                value={ btnfontfamily }
                                options={fontfamilylist}
                                onChange={ (newtext) => setAttributes({ btnfontfamily: newtext }) }
                            /> 

                            <div class="gutensee-preview-control">
                                <RadioGroup label="Width" onChange={ setPreviewbtnfontsize } checked={ previewbtnfontsize } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewbtnfontsize === 'Desktop' && (
                                    <>  
                                        <UnitControl 
                                            label={__(' Font Size','gutensee')}
                                            className={'gutensee-singl'}
                                            value={ btnfontSize }
                                            onChange={(userVal) => setAttributes({
                                                        btnfontSize: userVal
                                                    })}
                                        />
                                    </>
                                )}
                                { previewbtnfontsize === 'Tablet' && (
                                    <>  
                                        <UnitControl 
                                            label={__(' Font Size','gutensee')}
                                            className={'gutensee-singl'}
                                            value={ btnfontSizetab }
                                            onChange={(userVal) => setAttributes({
                                                        btnfontSizetab: userVal
                                                    })}
                                        />
                                    </>
                                )}
                                { previewbtnfontsize === 'Mobile' && (
                                    <>  
                                        <UnitControl 
                                            label={__(' Font Size','gutensee')}
                                            className={'gutensee-singl'}
                                            value={ btnfontSizemob }
                                            onChange={(userVal) => setAttributes({
                                                        btnfontSizemob: userVal
                                                    })}
                                        />
                                    </>
                                )}
                            </div>

                            <SelectControl
                                label={__('Font Weight','gutensee')}
                                value={ btnFontWeight }
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
                                onChange={ (newtext) => setAttributes({ btnFontWeight: newtext }) }                      
                            />

                            <div class="gutensee-preview-control">
                                <RadioGroup label="Width" onChange={ setPreviewbtnlineheight } checked={ previewbtnlineheight } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewbtnlineheight === 'Desktop' && (
                                    <>
                                        <UnitControl 
                                            label={__('line Height(px)','gutensee')}   
                                            className={'gutensee-singl'}           
                                            value={ btnLineHeight}
                                            onChange={(newtext) => setAttributes({ btnLineHeight: newtext })}                 
                                        />
                                    </>
                                )}
                                { previewbtnlineheight === 'Tablet' && (
                                    <>
                                        <UnitControl 
                                            label={__('line Height(px)','gutensee')}   
                                            className={'gutensee-singl'}           
                                            value={ btnLineHeighttab}
                                            onChange={(newtext) => setAttributes({ btnLineHeighttab: newtext })}                  
                                        />
                                    </>
                                )}
                                { previewbtnlineheight === 'Mobile' && (
                                    <>
                                        <UnitControl 
                                            label={__('line Height(px)','gutensee')}   
                                            className={'gutensee-singl'}           
                                            value={ btnLineHeightmob}
                                            onChange={(newtext) => setAttributes({ btnLineHeightmob: newtext })}                  
                                        />
                                    </>
                                )}
                            </div>

                            <SelectControl
                                label={__('Transform','gutensee')}
                                value={ btnTransform }
                                options={ [
                                    { label: __('Default','gutensee'), value: '' },
                                    { label: __('Uppercase','gutensee'), value: 'uppercase' },
                                    { label: __('Lowercase','gutensee'), value: 'lowercase' },
                                    { label: __('Capitalize','gutensee'), value: 'capitalize' },
                                ] }
                                onChange={ (newtext) => setAttributes({ btnTransform: newtext }) }                   
                            />

                            <div class="gutensee-preview-control">
                                <RadioGroup label="Width" onChange={ setPreviewbtnltrspaceing } checked={ previewbtnltrspaceing } className={"preview-icon"}>
                                    <Radio className={"preview-options"} value="Desktop"><span class="dashicons dashicons-desktop"></span></Radio>
                                    <Radio className={"preview-options"} value="Tablet"><span class="dashicons dashicons-tablet"></span></Radio>
                                    <Radio className={"preview-options"} value="Mobile"><span class="dashicons dashicons-smartphone"></span></Radio>
                                </RadioGroup>
                                { previewbtnltrspaceing === 'Desktop' && (
                                    <>
                                        <UnitControl 
                                            label={__('Letter Spacing','gutensee')}
                                            className={'gutensee-singl'}               
                                            value={ btnLetterSpacing}
                                            onChange={(newtext) => setAttributes({ btnLetterSpacing: newtext })}
                                        />
                                    </>
                                )}
                                { previewbtnltrspaceing === 'Tablet' && (
                                    <>
                                        <UnitControl 
                                            label={__('Letter Spacing','gutensee')}
                                            className={'gutensee-singl'}               
                                            value={ btnLetterSpacingtab}
                                            onChange={(newtext) => setAttributes({ btnLetterSpacingtab: newtext })}
                                        />
                                    </>
                                )}
                                { previewbtnltrspaceing === 'Mobile' && (
                                    <>
                                        <UnitControl 
                                            label={__('Letter Spacing','gutensee')}
                                            className={'gutensee-singl'}               
                                            value={ btnLetterSpacingmob}
                                            onChange={(newtext) => setAttributes({ btnLetterSpacingmob: newtext })}
                                        />
                                    </>
                                )}
                            </div>

                            <SelectControl
                                label={__('Decoration ','gutensee')}
                                value={ btnDecoration }
                                options={ [
                                    { label: __('Default','gutensee'), value: 'none' },
                                    { label: __('Underline','gutensee'), value: 'underline' },
                                    { label: __('Overline','gutensee'), value: 'overline' },
                                    { label: __('Line Through','gutensee'), value: 'line-through' },
                                ] }
                                onChange={ (newtext) => setAttributes({ btnDecoration: newtext }) }                      
                            />

                        </PanelBody>                        

                    </div>
                </>
            )}  
         </InspectorControls>
         <div id={advid}>
            <div className={`${"custom-contact-form"} ${style} ${animationclass} ${displayclass} ${props.attributes.className} ${advclass}`} id={uniqueid}>
               {enablename ==true &&(
                  <div className="custom-contact-name">               
                     <TextControl
                        label={namelabel1}
                        value={name}
                        onChange={setName}
                        type={"text"}
                        placeholder={nameholder1}
                        className={"contact-form-field"}

                     />
                  </div>
               )}
               {enableemail ==true &&(
                  <div className="custom-contact-email">
                     <TextControl
                        label={emaillabel1}
                        value={email}
                        onChange={setEmail}
                        type={"email"}
                        placeholder={emailholder1}
                        className={"contact-form-field"}
                     />
                  </div>
               )}
               {enablesubject ==true &&(
                  <div className="custom-contact-subject">
                     <TextControl
                        label={subjectlabel1}
                        value={subject}
                        onChange={setSubject}
                        type={"text"}
                        placeholder={subjectholder1}
                        className={"contact-form-field"}
                     />
                  </div>
               )}
               {enablemobile ==true &&(
                  <div className="custom-contact-mobile">
                     <TextControl
                        label={mobilelabel1}
                        value={mobile}
                        onChange={setMobile}
                        type={"number"}
                        placeholder={mobileholder1}
                        className={"contact-form-field"}
                     />
                  </div>
               )}
               {enablemesg ==true &&(
                  <div className="custom-contact-message">
                     <TextareaControl
                        label={mesglabel1}
                        value={message}
                        onChange={setMessage}
                        type={"text"}
                        placeholder={mesgholder1}
                        className={"contact-form-field"}
                     />
                  </div>
               )} 
               {error && <p style={{ color: 'red' }}>{error}</p>}
               <div className="custom-contact-button">
                  <Button isPrimary onClick={handleSubmit} className={"contact-form-button"}>{btnlabel}</Button>
               </div>
            </div>
         </div>
         </>
      );
   },

   save() {
      return null; // Server-side rendering
   },
});
