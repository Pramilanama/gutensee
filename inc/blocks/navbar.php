<?php
/**
* Register Blocks
*/
add_action('init','gutensee_register_block');        
function gutensee_register_block(){ 
    if ( ! has_nav_menu( 'primary' ) ) {   
        register_nav_menus(
            array(
                'primary' => esc_html__( 'Primary Menu', 'gutensee' ),
            )
        );
    }

    register_block_type('gutensee/gutensee-navigation',[
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_nav_menu_callback',
        'attributes' => [               
            'uniqueid'=> [ 'type'=>'string'],
            'menuname'=> [ 'type'=>'string','default'=>''],
            'controlType'=> [ 'type'=>'string','default'=>'basic'],
            'colorType'=> [ 'type'=>'string','default'=>'normal'],
            'textAlignment'=> [ 'type'=>'string','default'=>''],
            'previewtogglesize'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'hidebtn'=> ['type'=>'boolean', 'default'=>true ],
            'hidesearch'=> ['type'=>'boolean', 'default'=>true ], 
            'previewiconWidth'=> [ 'type'=>'boolean','default'=> 'Desktop'],
            'iconWidth'=> [ 'type'=>'number','default'=> 16],
            'iconWidthtab'=> [ 'type'=>'number','default'=> 16],
            'iconWidthmob'=> [ 'type'=>'number','default'=> 16],
            'previewtogglesize'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'togglesize'=> [ 'type'=>'number','default'=>28],
            'togglesizetab'=> [ 'type'=>'number','default'=>28],
            'togglesizemob'=> [ 'type'=>'number','default'=>28],
            'previewtogglepos'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'toggleposition'=> [ 'type'=>'string','default'=>'right'],
            'togglepositiontab'=> [ 'type'=>'string','default'=>'right'],
            'togglepositionmob'=> [ 'type'=>'string','default'=>'right'],
            'borderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'border'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'ddborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'ddborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'menuborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'menuborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'submenuborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'submenuborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'toggleborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'toggleborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'iconborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'btnborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'btnborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'sformborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'sformborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'sbtnborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'sbtnborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'hidedesktop'=> ['type'=>'boolean', 'default'=>true ],
            'hidetablet'=> ['type'=>'boolean', 'default'=>true],
            'hidemobile'=> ['type'=>'boolean', 'default'=>true ],   
            'animation'=> [ 'type'=>'string','default'=> ''],
            'durations'=> [ 'type'=>'string','default'=> ''],
            'delay'=> [ 'type'=>'string','default'=> ''],
            'boxshadow'=> [ 'type'=>'boolean','default'=> false],
            'hshadow'=> [ 'type'=>'number','default'=> '0'],
            'vshadow'=> [ 'type'=>'number','default'=> '10'],
            'blurshadow'=> [ 'type'=>'number','default'=> '30'],
            'shadowColor'=> [ 'type'=>'string','default'=> 'rgba(0, 0, 0, 0.1)'],
            'sboxshadow'=> [ 'type'=>'boolean','default'=> false],
            'shshadow'=> [ 'type'=>'number','default'=> '0'],
            'svshadow'=> [ 'type'=>'number','default'=> '10'],
            'sblurshadow'=> [ 'type'=>'number','default'=> '30'],
            'sshadowColor'=> [ 'type'=>'string','default'=> 'rgba(0, 0, 0, 0.1)'],
            'sbboxshadow'=> [ 'type'=>'boolean','default'=> false],
            'sbhshadow'=> [ 'type'=>'number','default'=> '0'],
            'sbvshadow'=> [ 'type'=>'number','default'=> '10'],
            'sbblurshadow'=> [ 'type'=>'number','default'=> '30'],
            'sbshadowColor'=> [ 'type'=>'string','default'=> 'rgba(0, 0, 0, 0.1)'],
            'menuColor'=> [ 'type'=>'string','default'=>'#262626'],
            'bgColor'=> [ 'type'=>'string','default'=>'#fff'],
            'mobbgColor'=> [ 'type'=>'string','default'=>'#fff'],
            'menubgColor'=> [ 'type'=>'string','default'=>''],
            'menubgHColor'=> [ 'type'=>'string','default'=>'#FC3549'],
            'ddColor'=> [ 'type'=>'string','default'=>'#e3e3e3'],
            'submenuColor'=> [ 'type'=>'string','default'=>'#262626'],
            'submenubgColor'=> [ 'type'=>'string','default'=>'#f6f6f6'],
            'submenuHColor'=> [ 'type'=>'string','default'=>'#fff'],
            'submenubgHColor'=> [ 'type'=>'string','default'=> '#FC3549'],
            'menuHColor'=> [ 'type'=>'string','default'=>'#fff'],
            'bgHColor'=> [ 'type'=>'string','default'=>''],
            'toggleColor'=> [ 'type'=>'string','default'=> '#fff'],
            'toggleHColor'=> [ 'type'=>'string','default'=> '#fff'],
            'togglebgColor'=> [ 'type'=>'string','default'=> '#FC3549'],
            'togglebgHColor'=> [ 'type'=>'string','default'=> ''],
            'activebgColor'=> [ 'type'=>'string','default'=>'#FC3549'],
            'activeColor'=> [ 'type'=>'string','default'=>'#fff'],
            'activebghColor'=> [ 'type'=>'string','default'=>''],
            'activehColor'=> [ 'type'=>'string','default'=>''],
            'btnColor'=> [ 'type'=>'string','default'=>'#fff'],
            'btnhColor'=> [ 'type'=>'string','default'=>'#fff'],
            'btnbgColor'=> [ 'type'=>'string','default'=>'#86A700'],
            'btnbghColor'=> [ 'type'=>'string','default'=>'#ff5e14'],
            'iconColor'=> [ 'type'=>'string','default'=>'#fff'],
            'iconbgColor'=> [ 'type'=>'string','default'=>'#FC3549'],
            'iconhColor'=> [ 'type'=>'string','default'=>''],
            'iconbghColor'=> [ 'type'=>'string','default'=>'#FC3549'],
            'sbtnColor'=> [ 'type'=>'string','default'=>'#fff'],
            'sbtnhColor'=> [ 'type'=>'string','default'=>''],
            'sbtnbgColor'=> [ 'type'=>'string','default'=>'#FC3549'],
            'sbtnbghColor'=> [ 'type'=>'string','default'=>''],
            'fontfamily'=> [ 'type'=>'string','default'=>'Nunito'],
            'menuFontWeight'=> [ 'type'=>'number','default'=>600],
            'previewmenulineheight'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'menuLineHeight'=> [ 'type'=>'number','default'=>30],
            'menuLineHeighttab'=> [ 'type'=>'number','default'=>30],
            'menuLineHeightmob'=> [ 'type'=>'number','default'=>30],
            'menuTransform'=> [ 'type'=>'string','default'=>'capitalize'],
            'menuDecoration'=> [ 'type'=>'string','default'=>'none'],
            'previewmenuLetterSpacing'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'menuLetterSpacing'=> [ 'type'=>'number','default'=>''],
            'menuLetterSpacingtab'=> [ 'type'=>'number','default'=>''],
            'menuLetterSpacingmob'=> [ 'type'=>'number','default'=>''],
            'previewmenufontSize'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'menufontSize'=> [ 'type'=>'string', 'default'=>'20px'],
            'menufontSizetab'=> [ 'type'=>'string', 'default'=>'20px'],
            'menufontSizemob'=> [ 'type'=>'string', 'default'=>'20px'],
            'submenufontfamily'=> [ 'type'=>'string', 'default'=>'Nunito'],
            'submenuFontWeight'=> [ 'type'=>'number','default'=>600],
            'previewsubmenulineheight'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'submenuLineHeight'=> [ 'type'=>'number','default'=>30],
            'submenuLineHeighttab'=> [ 'type'=>'number','default'=>30],
            'submenuLineHeightmob'=> [ 'type'=>'number','default'=>30],
            'submenuTransform'=> [ 'type'=>'string','default'=>'capitalize'],
            'submenuDecoration'=> [ 'type'=>'string','default'=> 'none'],
            'previewsubmenuLetterSpacing'=> [ 'type'=>'boolean','default'=> 'Desktop'],
            'submenuLetterSpacing'=> [ 'type'=>'number','default'=> 0.7],
            'submenuLetterSpacingtab'=> [ 'type'=>'number','default'=> 0.7],
            'submenuLetterSpacingmob'=> [ 'type'=>'number','default'=> 0.7],
            'previewsubmenufontSize'=> [ 'type'=>'boolean','default'=> 'Desktop'],
            'submenufontSize'=> [ 'type'=>'string','default'=> 20],
            'submenufontSizetab'=> [ 'type'=>'string','default'=> 20],
            'submenufontSizemob'=> [ 'type'=>'string','default'=> 20],
            'btnfontfamily'=> [ 'type'=>'string','default'=>'Nunito'],
            'btnFontWeight'=> [ 'type'=>'number','default'=>600],
            'previewbtnlineheight'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'btnLineHeight'=> [ 'type'=>'number','default'=>30],
            'btnLineHeighttab'=> [ 'type'=>'number','default'=>30],
            'btnLineHeightmob'=> [ 'type'=>'number','default'=>30],
            'btnTransform'=> [ 'type'=>'string','default'=>'capitalize'],
            'btnDecoration'=> [ 'type'=>'string','default'=>'none'],
            'previewbtnLetterSpacing'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'btnLetterSpacing'=> [ 'type'=>'number','default'=>''],
            'btnLetterSpacingtab'=> [ 'type'=>'number','default'=>''],
            'btnLetterSpacingmob'=> [ 'type'=>'number','default'=>''],
            'previewbtnfontSize'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'btnfontSize'=> [ 'type'=>'string', 'default'=>'20px'],
            'btnfontSizetab'=> [ 'type'=>'string', 'default'=>'20px'],
            'btnfontSizemob'=> [ 'type'=>'string', 'default'=>'20px'],
            'sbtnfontfamily'=> [ 'type'=>'string','default'=>'Nunito'],
            'sbtnFontWeight'=> [ 'type'=>'number','default'=>600],
            'previewsbtnlineheight'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'sbtnLineHeight'=> [ 'type'=>'number','default'=>30],
            'sbtnLineHeighttab'=> [ 'type'=>'number','default'=>30],
            'sbtnLineHeightmob'=> [ 'type'=>'number','default'=>30],
            'sbtnTransform'=> [ 'type'=>'string','default'=>'capitalize'],
            'sbtnDecoration'=> [ 'type'=>'string','default'=>'none'],
            'previewsbtnLetterSpacing'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'sbtnLetterSpacing'=> [ 'type'=>'number','default'=>''],
            'sbtnLetterSpacingtab'=> [ 'type'=>'number','default'=>''],
            'sbtnLetterSpacingmob'=> [ 'type'=>'number','default'=>''],
            'previewsbtnfontSize'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'sbtnfontSize'=> [ 'type'=>'string', 'default'=>'20px'],
            'sbtnfontSizetab'=> [ 'type'=>'string', 'default'=>'20px'],
            'sbtnfontSizemob'=> [ 'type'=>'string', 'default'=>'20px'],
            'btntext'=> [ 'type'=>'string','default'=> 'Buy Now'],
            'addclass'=> [ 'type'=>'string','default'=> ''],
            'customcss'=> [ 'type'=>'string','default'=> ''],
            'previewmargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'margins'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'marginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'marginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],        
            'previewmenumargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'menumargins'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'menumarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'menumarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],        
            'previewsubmenumargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'submenumargins'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'submenumarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'submenumarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'previewddmargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'ddmargins'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'ddmarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'ddmarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],   
            'previewbtnmargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'btnmargins'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'btnmarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'btnmarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],        
            'previewiconmargins'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'iconmargins'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'iconmarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],
            'iconmarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'10px','right'=>'10px','bottom'=>'10px'],],        
            'previewpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'paddings'=> [ 'type'=> 'object', 'default'=>['top'=>'15px','left'=>'20px','right'=>'20px','bottom'=>'15px'],],
            'paddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'15px','left'=>'20px','right'=>'20px','bottom'=>'15px'],],
            'paddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'15px','left'=>'20px','right'=>'20px','bottom'=>'15px'],],
            'previewmenupaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'menupaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'menupaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'menupaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'previewsubmenupaddings'=>[ 'type'=>'boolean', 'default'=>'Desktop'],
            'submenupaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'submenupaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'submenupaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'21px','right'=>'21px','bottom'=>'10px'],],
            'previewbtnpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'btnpaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'33px','right'=>'33px','bottom'=>'10px'],],
            'btnpaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'33px','right'=>'33px','bottom'=>'10px'],],
            'btnpaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'10px','left'=>'33px','right'=>'33px','bottom'=>'10px'],],
            'previewiconpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'iconpaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],
            'iconpaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],
            'iconpaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],
            'previewsbtnpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'sbtnpaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],
            'sbtnpaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],
            'sbtnpaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'12px','left'=>'17px','right'=>'17px','bottom'=>'12px'],],   
            'addcss'=> [ 'type'=>'string','default'=>''],
            'addjs'=> [ 'type'=>'string','default'=>''],
            'advid'=> [ 'type'=>'string','default'=>''], 
            'advclass'=> [ 'type'=>'string','default'=>''],        
        ] 
    ]);
    
    register_block_type('gutensee/gutensee-topbar',[
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_date_time_callback',
        'attributes' => [               
            'uniqueid'=> [ 'type'=>'string'],
            'topbartypes:'=> [ 'type'=>'string','default'=>'date'],
            'controlType'=> [ 'type'=>'string','default'=>'basic'],
            'colorType'=> [ 'type'=>'string','default'=>'normal'],
            'textAlignment'=> [ 'type'=>'string','default'=>''],
            'topbartypes'=> [ 'type'=>'string','default'=>'date'],
            'topbaricon'=> [ 'type'=>'string','default'=>''],
            'previewwidth'=> [ 'type'=>'string','default'=>'Desktop'],
            'iconWidth'=> [ 'type'=>'number','default'=>''],
            'iconWidthtab'=> [ 'type'=>'number','default'=>''],
            'iconWidthmob'=> [ 'type'=>'number','default'=>''],
            'dateFormat'=> [ 'type'=>'string','default'=>'D MMMM YYYY'],
            'timeFormat'=> [ 'type'=>'string','default'=>'HH:mm:ss'],
            'text'=> [ 'type'=>'string','default'=>'example@abc.com'],
            'topbartarget'=> [ 'type'=>'string','default'=>''],
            'textlink'=> [ 'type'=>'string','default'=>''],
            'title'=> [ 'type'=>'string','default'=>'example@abc.com'],
            'titleColor'=> [ 'type'=>'string','default'=>''],
            'bgColor'=> [ 'type'=>'string','default'=>''],
            'iconColor'=> [ 'type'=>'string','default'=>''],
            'iconhColor'=> [ 'type'=>'string','default'=>''],
            'iconbgColor'=> [ 'type'=>'string','default'=>''],
            'iconbghColor'=> [ 'type'=>'string','default'=>''],
            'bggradientValue'=> [ 'type'=>'string','default'=>''],
            'titlehColor'=> [ 'type'=>'string','default'=>''],
            'bghColor'=> [ 'type'=>'string','default'=>''],
            'bggradienthValue'=> [ 'type'=>'string','default'=>''],
            'shadowColor'=> [ 'type'=>'string','default'=>''],
            'title'=> [ 'type'=>'string','default'=>''],
            'previewmargins:'=> [ 'type'=>'string','default'=>''],            
            'margins'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'marginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'marginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],], 
            'previewtextmargins:'=> [ 'type'=>'string','default'=>''],            
            'textmargins'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'textmarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'textmarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],], 
            'previewiconmargins:'=> [ 'type'=>'string','default'=>''],            
            'iconmargins'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconmarginstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconmarginsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],], 
            'previewpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'paddings'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'paddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'paddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'previewtextpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'textpaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'textpaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'textpaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'previewiconpaddings'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'iconpaddings'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconpaddingstab'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconpaddingsmob'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],     
            'borderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'border'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'textborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'textborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],
            'iconborderradius'=> [ 'type'=> 'object', 'default'=>['top'=>'0px','left'=>'0px','right'=>'0px','bottom'=>'0px'],],
            'iconborder'=> [ 'type'=>'object','default'=> [ 'color'=>'', 'style'=>'', 'width'=>''], ],            
            'hidedesktop'=> ['type'=>'boolean', 'default'=>true ],
            'hidetablet'=> ['type'=>'boolean', 'default'=>true],
            'hidemobile'=> ['type'=>'boolean', 'default'=>true ],   
            'animation'=> [ 'type'=>'string','default'=> ''],
            'durations'=> [ 'type'=>'string','default'=> ''],
            'delay'=> [ 'type'=>'string','default'=> ''],           
            'fontfamily'=> [ 'type'=>'string','default'=>'Open Sans'],
            'previewfontSize'=> [ 'type'=>'boolean', 'default'=>'Desktop'],
            'titlefontSize'=> [ 'type'=>'string', 'default'=>'18px'],
            'titlefontSizetab'=> [ 'type'=>'string', 'default'=>'18px'],
            'titlefontSizemob'=> [ 'type'=>'string', 'default'=>'18px'],
            'previewlineheight'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'TitleLineHeight'=> [ 'type'=>'number','default'=>28],
            'TitleLineHeighttab'=> [ 'type'=>'number','default'=>28],
            'TitleLineHeightmob'=> [ 'type'=>'number','default'=>28],            
            'TitleFontWeight'=> [ 'type'=>'number','default'=>400],
            'TitleTransform'=> [ 'type'=>'string','default'=>''],
            'TitleDecoration'=> [ 'type'=>'string','default'=>''],
            'previewltrspaceing'=> [ 'type'=>'boolean','default'=>'Desktop'],
            'TitleLetterSpacing'=> [ 'type'=>'number','default'=>''],
            'TitleLetterSpacingtab'=> [ 'type'=>'number','default'=>''],
            'TitleLetterSpacingmob'=> [ 'type'=>'number','default'=>''],            
            'addclass'=> [ 'type'=>'string','default'=> ''],
            'customcss'=> [ 'type'=>'string','default'=> ''],   
            'addcss'=> [ 'type'=>'string','default'=>''],
            'addjs'=> [ 'type'=>'string','default'=>''],            
            'advid'=> [ 'type'=>'string','default'=>''], 
            'advclass'=> [ 'type'=>'string','default'=>''],            
        ] 
    ]);

    register_block_type('gutensee/gutensee-breadcrumbs', array(
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_breadcrumbs_callback',
        'attributes'=> [
            'uniqueid'=> [ 'type'=>'string'],
            'controlType'=>['type'=>'string', 'default'=>'basic',],
            'colorType'=>['type'=>'string', 'default'=>'normal',],
            'enabletitle'=> [ 'type'=>'boolean', 'default'=>true],
            'enableicon'=> [ 'type'=>'boolean', 'default'=>true],
            'enablehomebreadcumb'=> [ 'type'=>'boolean', 'default'=>true],
            'gap'=> [ 'type'=>'number', 'default'=>5],
            'iconsize'=> [ 'type'=>'number', 'default'=>24],
            'sepsize'=> [ 'type'=>'number', 'default'=>24],                    
            'separator'=> [ 'type'=>'string', 'default'=>'fa-solid fa-chevron-right'],
            'headingLevel'=>['type'=>'string', 'default'=>'h2',],
            'hidedesktop'=> [ 'type'=>'boolean', 'default'=>true],
            'hidetablet'=> [ 'type'=>'boolean', 'default'=>true],
            'hidemobile'=> [ 'type'=>'boolean', 'default'=>true],
            'iconsize'=> [ 'type'=>'number', 'default'=>24],
            'animation'=> [ 'type'=>'string', 'default'=>'',],
            'durations'=> [ 'type'=>'string', 'default'=>'',],
            'delay'=> [ 'type'=>'string', 'default'=>'',],
            'bggradientValue'=>['type'=>'string', 'default'=>'',],
            'labelColor'=>['type'=>'string', 'default'=>'',],
            'labelhColor'=>['type'=>'string', 'default'=>'',],
            'fieldColor'=>['type'=>'string', 'default'=>'',],
            'previewmargins'=>['type'=>'string', 'default'=>'Desktop',],
            'margins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
            'marginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
            'marginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
            'previewpaddings'=>['type'=>'string', 'default'=>'Desktop',],
            'paddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
            'paddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
            'paddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
            'border'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
            'borderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
            'labelfontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
            'previewlabelfontSize'=>['type'=>'string', 'default'=>'Desktop',],
            'labelfontSize'=>[ 'type'=>'string','default'=>'16px'],
            'labelfontSizetab'=>[ 'type'=>'string','default'=>'16px'],
            'labelfontSizemob'=>[ 'type'=>'string','default'=>'16px'], 
            'labelFontWeight'=>[ 'type'=>'string','default'=>'600'], 
            'previewlabellineheight'=>['type'=>'string', 'default'=>'Desktop',],
            'labelLineHeight'=>[ 'type'=>'number','default'=>'26px'], 
            'labelLineHeighttab'=>[ 'type'=>'number','default'=>'26px'], 
            'labelLineHeightmob'=>[ 'type'=>'number','default'=>'26px'], 
            'labelTransform'=>[ 'type'=>'string','default'=>''], 
            'labelDecoration'=>[ 'type'=>'string','default'=>'none'],
            'previewlabelltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
            'labelLetterSpacing'=>[ 'type'=>'number','default'=>1],
            'labelLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
            'labelLetterSpacingmob'=>[ 'type'=>'number','default'=>1],            
            'titlefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
            'previewfontSize'=>['type'=>'string', 'default'=>'Desktop',],
            'titlefontSize'=>[ 'type'=>'string','default'=>'24px'],
            'titlefontSizetab'=>[ 'type'=>'string','default'=>'24px'],
            'titlefontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
            'titleFontWeight'=>[ 'type'=>'string','default'=>'600'], 
            'previewlineheight'=>['type'=>'string', 'default'=>'Desktop',],
            'titleLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
            'titleLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
            'titleLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
            'titleTransform'=>[ 'type'=>'string','default'=>''], 
            'titleDecoration'=>[ 'type'=>'string','default'=>'none'],
            'previewltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
            'titleLetterSpacing'=>[ 'type'=>'number','default'=>1],
            'titleLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
            'titleLetterSpacingmob'=>[ 'type'=>'number','default'=>1],
            'addcss'=> [ 'type'=>'string','default'=>''],
            'addjs'=> [ 'type'=>'string','default'=>''], 
            'advid'=> [ 'type'=>'string','default'=>''], 
            'advclass'=> [ 'type'=>'string','default'=>''],   
        ],
    ));

    register_block_type('gutensee/gutensee-latest-post',[
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_latest_posts_callback',
        'attributes' => [
                        'uniqueid'=> [ 'type'=>'string'],
                        'reorder'=> ['type'=> 'array','default'=> ['Featured Image', 'Meta', 'Title', 'Content']],
                        'controlType'=>['type'=>'string', 'default'=>'basic',],
                        'colorType'=>['type'=>'string', 'default'=>'normal',],
                        'def'=>['type'=>'string', 'default'=>'',],
                        'enableslider'=>['type'=>'boolean', 'default'=>false,],
                        'infiniteloop'=>['type'=>'boolean', 'default'=>true,],
                        'autoplay'=>['type'=>'boolean', 'default'=>true,],
                        'displaynav'=>['type'=>'boolean', 'default'=>true,],
                        'displaydots'=>['type'=>'boolean', 'default'=>true,],
                        'poststyle'=>['type'=>'string', 'default'=>'grid-layout',],
                        'noitems'=>['type'=>'number', 'default'=>2,],
                        'noscrollitems'=>['type'=>'number', 'default'=>1,],
                        'navicon'=>['type'=>'string', 'default'=>'angle',],
                        'dotssize'=>['type'=>'string', 'default'=>'',],
                        'metagap'=>['type'=>'string', 'default'=>'2px',],
                        'columnNumber'=>[ 'type'=>'string', 'default'=>'4'],
                        'postgap'=>[ 'type'=>'string', 'default'=>'20'],                    
                        'authortype'=>[ 'type'=>'string', 'default'=>'image'],
                        'authorimgwidth'=>['type'=>'number', 'default'=>36,],
                        'authorimgbr'=>['type'=>'string', 'default'=>'50%',],
                        'textalign'=>['type'=>'string', 'default'=>'center',],
                        'commentsCount'=>['type'=>'number', 'default'=>0,],
                        'disablebtn'=>['type'=>'boolean', 'default'=>true,],
                        'opennewtab'=>['type'=>'boolean', 'default'=>true,],
                        'buttonlabel'=>['type'=>'string', 'default'=>'Read More',],
                        'shadowColor'=>['type'=>'string', 'default'=>'#e7e7e7',],
                        'btnshadowColor'=>['type'=>'string', 'default'=>'',],
                        'boxshadow'=>['type'=>'boolean', 'default'=>false,],
                        'previewfeaturedmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'featuredmargins'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'featuredmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'featuredmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'previewmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'margins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                        'marginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                        'marginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                        'previewnavmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'navmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'navmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'navmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewdotsmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'dotsmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'dotsmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'dotsmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewmetamargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'metamargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'metamarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'metamarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewheadingmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'headingmargins'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                        'headingmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                        'headingmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                        'previewcontentmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'contentmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'contentmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'contentmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewbuttonmargins'=>['type'=>'string', 'default'=>'Desktop',],
                        'buttonmargins'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                        'buttonmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                        'buttonmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                        'previewpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'paddings'=> ['type'=> 'object','default'=> [ 'top'=> '8px', 'left'=> '8px', 'right'=> '8px', 'bottom'=> '8px']],
                        'paddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '8px', 'left'=> '8px', 'right'=> '8px', 'bottom'=> '8px']],
                        'paddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '8px', 'left'=> '8px', 'right'=> '8px', 'bottom'=> '8px']],
                        'previewnavpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'navpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'navpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'navpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewdotspaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'dotspaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'dotspaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'dotspaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewfeaturedpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'featuredpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'featuredpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'featuredpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'previewmetapaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'metapaddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'metapaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'metapaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'previewheadingpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'headingpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'headingpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'headingpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'previewcontentpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'contentpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'contentpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'contentpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                        'previewbuttonpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                        'buttonpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                        'buttonpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                        'buttonpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                        'border'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'borderradius'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'navborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'navborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'dotsborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'dotsborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'featuredborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'featuredborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '8px', 'left'=> '8px', 'right'=> '8px', 'bottom'=> '8px']],
                        'metaborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'metaborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'headingborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'headingborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'contentborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'contentborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                        'buttonborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                        'buttonborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                        'hshadow'=> [ 'type'=> 'number', 'default'=> 0],
                        'vshadow'=> [ 'type'=> 'number', 'default'=> 0 ],
                        'blurshadow'=> [ 'type'=> 'number', 'default'=> 15 ],
                        'btnhshadow'=> [ 'type'=> 'number', 'default'=> 0],
                        'btnvshadow'=> [ 'type'=> 'number', 'default'=> 0 ],
                        'btnblurshadow'=> [ 'type'=> 'number', 'default'=> 0 ],                        
                        'hidedesktop'=>[ 'type'=> 'boolean',  'default'=> true],
                        'hidetablet'=>[ 'type'=> 'boolean', 'default'=> true],
                        'hidemobile'=>[ 'type'=> 'boolean', 'default'=> true ],
                        'animation'=>[ 'type'=>'string',  'default'=>'' ],
                        'durations'=>[ 'type'=>'string',  'default'=>'' ],
                        'delay'=>[ 'type'=>'string','default'=>''],       
                        'categories'=> ['type'=> 'array','items'=> ['type'=> "object"]],
                        'selectedAuthor'=>['type'=> "number"],
                        'postsToShow'=> ['type'=> "number",'default'=> 3],
                        'displayPostContent'=> ['type'=> "boolean",  'default'=> true],
                        'displayPostContentRadio'=> [ 'type'=> "string",'default'=> "excerpt" ],
                        'excerptLength'=> ['type'=> "number", 'default'=> 55],
                        'displayAuthor'=> [ 'type'=> "boolean", 'default'=> true ],
                        'displayComment'=> [ 'type'=> "boolean", 'default'=> true ],
                        'displayCat'=> [ 'type'=> "boolean", 'default'=> true ],
                        'displayTag'=> [ 'type'=> "boolean", 'default'=> true ],                   
                        'displayPostDate'=> ['type'=> "boolean",'default'=> true ],
                        'autoplay'=> ['type'=> "boolean",'default'=> false ],
                        'bgImageOverlay'=> [ 'type'=> 'boolean', 'default'=> ''],
                        'bgOverlayColor'=> [ 'type'=> 'string', 'default'=> '#000'],
                        'bgOverlayOpacity'=> [ 'type'=> "number", 'default'=> 0.2 ],
                        'postLayout'=> [ 'type'=> "string",'default'=> "list" ],
                        'columns'=> [ 'type'=> "number",'default'=> 3],
                        'order'=> ['type'=> "string",'default'=> "desc"],
                        'orderBy'=> [ 'type'=> "string",'default'=> "date"],
                        'displayFeaturedImage'=> [ 'type'=> "boolean", 'default'=> true ],
                        'displayTitle'=> [ 'type'=> "boolean", 'default'=> true ],
                        'featuredImageAlign'=> ['type'=> "string",'enum'=> [ "left", "center", "right" ]],
                        'featuredImageSizeSlug'=> ['type'=> "string",'default'=> "large"],
                        'featuredImageSizeWidth'=> ['type'=> "number", 'default'=> null],
                        'featuredImageSizeHeight'=> [ 'type'=> "number",'default'=> null],
                        'addLinkToFeaturedImage'=> ['type'=> "boolean",'default'=> true ],
                        'titleColor'=>[ 'type'=>'string','default'=>'#000000'],
                        'titlehColor'=>[ 'type'=>'string','default'=>''],
                        'bgColor'=>[ 'type'=>'string','default'=>''],
                        'bggradientValue'=>[ 'type'=>'string','default'=>''],
                        'bghColor'=>[ 'type'=>'string','default'=>''],
                        'bggradienthValue'=>[ 'type'=>'string','default'=>''],
                        'navColor'=>[ 'type'=>'string','default'=>''],
                        'navbgColor'=>[ 'type'=>'string','default'=>''],
                        'navbggradientValue'=>[ 'type'=>'string','default'=>''],
                        'navhColor'=>[ 'type'=>'string','default'=>''],
                        'navbghColor'=>[ 'type'=>'string','default'=>''],
                        'navbggradienthValue'=>[ 'type'=>'string','default'=>''],
                        'dotsbgColor'=>[ 'type'=>'string','default'=>''],
                        'dotsbghColor'=>[ 'type'=>'string','default'=>''],
                        'contentColor'=>[ 'type'=>'string','default'=>'#3c3c3c'],
                        'btnColor'=>[ 'type'=>'string','default'=>'#ffffff'],
                        'btnbgColor'=>[ 'type'=>'string','default'=>'#ff6900'],
                        'btnbggradientValue'=>[ 'type'=>'string','default'=>''],
                        'btnhColor'=>[ 'type'=>'string','default'=>'#ffffff'],
                        'btnbghColor'=>[ 'type'=>'string','default'=>'#0D6B68'],
                        'btnbggradienthValue'=>[ 'type'=>'string','default'=>''],
                        'metaColor'=>[ 'type'=>'string','default'=>'#000000'],
                        'metahColor'=>[ 'type'=>'string','default'=>'#0D6B68'],                              
                        'titlefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                        'previewfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                        'titlefontSize'=>[ 'type'=>'string','default'=>'24px'],
                        'titlefontSizetab'=>[ 'type'=>'string','default'=>'24px'],
                        'titlefontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
                        'titleFontWeight'=>[ 'type'=>'string','default'=>'600'], 
                        'previewlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                        'titleLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
                        'titleLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
                        'titleLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
                        'titleTransform'=>[ 'type'=>'string','default'=>''], 
                        'titleDecoration'=>[ 'type'=>'string','default'=>'none'],
                        'previewltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                        'titleLetterSpacing'=>[ 'type'=>'number','default'=>1],
                        'titleLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                        'titleLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                    
                        'contentfontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                        'previewcontentfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                        'contentfontSize'=>[ 'type'=>'string','default'=>'15px'],
                        'contentfontSizetab'=>[ 'type'=>'string','default'=>'15px'],
                        'contentfontSizemob'=>[ 'type'=>'string','default'=>'15px'], 
                        'contentFontWeight'=>[ 'type'=>'string','default'=>'400'], 
                        'previewcontentlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                        'contentLineHeight'=>[ 'type'=>'number','default'=>'25px'], 
                        'contentLineHeighttab'=>[ 'type'=>'number','default'=>'25px'], 
                        'contentLineHeightmob'=>[ 'type'=>'number','default'=>'25px'], 
                        'contentTransform'=>[ 'type'=>'string','default'=>''],         
                        'contentDecoration'=>[ 'type'=>'string','default'=>'none'], 
                        'previewcontentltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                        'contentLetterSpacing'=>[ 'type'=>'number','default'=>1],  
                        'contentLetterSpacingtab'=>[ 'type'=>'number','default'=>1],  
                        'contentLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                    
                        'metafontfamily'=>[ 'type'=>'string','default'=>'Poppins'],
                        'previewmetafontSize'=>['type'=>'string', 'default'=>'Desktop',],
                        'metafontSize'=>[ 'type'=>'string','default'=>'14px'],
                        'metafontSizetab'=>[ 'type'=>'string','default'=>'14px'],
                        'metafontSizemob'=>[ 'type'=>'string','default'=>'14px'], 
                        'metaFontWeight'=>[ 'type'=>'string','default'=>'500'], 
                        'previewmetalineheight'=>['type'=>'string', 'default'=>'Desktop',],
                        'metaLineHeight'=>[ 'type'=>'number','default'=>'26px'],
                        'metaLineHeighttab'=>[ 'type'=>'number','default'=>'26px'],
                        'metaLineHeightmob'=>[ 'type'=>'number','default'=>'26px'],
                        'metaTransform'=>[ 'type'=>'string','default'=>''], 
                        'metaDecoration'=>[ 'type'=>'string','default'=>'none'], 
                        'previewmetaltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                        'metaLetterSpacing'=>[ 'type'=>'number','default'=>1],
                        'metaLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                        'metaLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                   
                        'readmorefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                        'previewreadmorefontSize'=>['type'=>'string', 'default'=>'Desktop',],
                        'readmorefontSize'=>[ 'type'=>'string','default'=>'14px'],
                        'readmorefontSizetab'=>[ 'type'=>'string','default'=>'14px'],
                        'readmorefontSizemob'=>[ 'type'=>'string','default'=>'14px'], 
                        'readmoreFontWeight'=>[ 'type'=>'string','default'=>'500'], 
                        'previewreadmorelineheight'=>['type'=>'string', 'default'=>'Desktop',],
                        'readmoreLineHeight'=>[ 'type'=>'number','default'=>'25px'],
                        'readmoreLineHeighttab'=>[ 'type'=>'number','default'=>'25px'],
                        'readmoreLineHeightmob'=>[ 'type'=>'number','default'=>'25px'], 
                        'readmoreTransform'=>[ 'type'=>'string','default'=>''], 
                        'readmoreDecoration'=>[ 'type'=>'string','default'=>'none'], 
                        'previewreadmoreltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                        'readmoreLetterSpacing'=>['type'=>'number','default'=>1],
                        'readmoreLetterSpacingtab'=>['type'=>'number','default'=>1],
                        'readmoreLetterSpacingmob'=>['type'=>'number','default'=>1],
                        'addid'=>['type'=>'string', 'default'=>'',],
                        'addclass'=>['type' => 'string','default' => ''],
                        'customcss'=>['type' => 'string','default' => ''],
                        'addcss'=> [ 'type'=>'string','default'=>''],
                        'addjs'=> [ 'type'=>'string','default'=>''], 
                        'advid'=> [ 'type'=>'string','default'=>''], 
                        'advclass'=> [ 'type'=>'string','default'=>''],  

        ]
    ]);

    register_block_type( 'gutensee/gutensee-post-query',[
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_post_query_callback',
        'attributes' => [
                    'uniqueid'=> [ 'type'=>'string'],
                    'hidepagination'=> [ 'type'=>'boolean', 'default'=>false,],
                    'sortOrder'=> [ 'type'=>'string', 'default'=>'desc',],
                    'selectedCategories'=> [ 'type'=>'array', 'default'=>[],],
                    'postCount'=> [ 'type'=>'number', 'default'=>5,],
                    'displayContent'=> [ 'type'=>'boolean', 'default'=>false,],
                    'excerptLimit'=> [ 'type'=>'number', 'default'=>55,],
                    'readMoreText'=> [ 'type'=>'string', 'default'=>'Read More',],
                    'reorder'=> ['type'=> 'array','default'=> ['Featured Image', 'Meta', 'Title', 'Content']],
                    'controlType'=>['type'=>'string', 'default'=>'basic',],
                    'colorType'=>['type'=>'string', 'default'=>'normal',],
                    'def'=>['type'=>'string', 'default'=>'',],
                    'enableslider'=>['type'=>'boolean', 'default'=>false,],
                    'infiniteloop'=>['type'=>'boolean', 'default'=>true,],
                    'enableautoplay'=>['type'=>'boolean', 'default'=>true,],
                    'displaynav'=>['type'=>'boolean', 'default'=>true,],
                    'displaydots'=>['type'=>'boolean', 'default'=>true,],
                    'poststyle'=>['type'=>'string', 'default'=>'grid-layout',],
                    'noitems'=>['type'=>'number', 'default'=>2,],
                    'noscrollitems'=>['type'=>'number', 'default'=>1,],
                    'navicon'=>['type'=>'string', 'default'=>'angle',],
                    'dotssize'=>['type'=>'number', 'default'=>15,],
                    'metagap'=>['type'=>'string', 'default'=>'',],
                    'columnNumber'=>[ 'type'=>'string', 'default'=>'4'],
                    'postgap'=>[ 'type'=>'string', 'default'=>'20'],                    
                    'authortype'=>[ 'type'=>'string', 'default'=>'image'],
                    'authorimgwidth'=>['type'=>'number', 'default'=>36,],
                    'authorimgbr'=>['type'=>'string', 'default'=>'50%',],
                    'textalign'=>['type'=>'string', 'default'=>'center',],
                    'commentsCount'=>['type'=>'number', 'default'=>0,],
                    'disablebtn'=>['type'=>'boolean', 'default'=>true,],
                    'opennewtab'=>['type'=>'boolean', 'default'=>true,],
                    'buttonlabel'=>['type'=>'string', 'default'=>'Read More',],
                    'shadowColor'=>['type'=>'string', 'default'=>'#e7e7e7',],
                    'btnshadowColor'=>['type'=>'string', 'default'=>'',],
                    'boxshadow'=>['type'=>'boolean', 'default'=>false,],
                    'previewfeaturedmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'featuredmargins'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'featuredmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'featuredmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'margins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'marginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'marginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'previewnavmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'navmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'navmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'navmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewdotsmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'dotsmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'dotsmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'dotsmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewmetamargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'metamargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'metamarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'metamarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewheadingmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'headingmargins'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                    'headingmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                    'headingmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '5px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '16px']],
                    'previewcontentmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'contentmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'contentmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'contentmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewbuttonmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'buttonmargins'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                    'buttonmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                    'buttonmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '10px']],
                    'previewpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'paddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'paddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'paddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewnavpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'navpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'navpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'navpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewdotspaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'dotspaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'dotspaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'dotspaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewfeaturedpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'featuredpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'featuredpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'featuredpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewmetapaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'metapaddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'metapaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'metapaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewheadingpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'headingpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'headingpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'headingpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'previewcontentpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'contentpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'contentpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'contentpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '0px']],
                    'previewbuttonpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'buttonpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                    'buttonpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                    'buttonpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '6px', 'left'=> '12px', 'right'=> '12px', 'bottom'=> '6px']],
                    'border'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'borderradius'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'navborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'navborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'dotsborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'dotsborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'featuredborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'featuredborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '8px', 'left'=> '8px', 'right'=> '8px', 'bottom'=> '8px']],
                    'metaborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'metaborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'headingborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'headingborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'contentborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'contentborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'buttonborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'buttonborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'hshadow'=> [ 'type'=> 'number', 'default'=> 0],
                    'vshadow'=> [ 'type'=> 'number', 'default'=> 0 ],
                    'blurshadow'=> [ 'type'=> 'number', 'default'=> 15 ],
                    'btnhshadow'=> [ 'type'=> 'number', 'default'=> 0],
                    'btnvshadow'=> [ 'type'=> 'number', 'default'=> 0 ],
                    'btnblurshadow'=> [ 'type'=> 'number', 'default'=> 0 ],                        
                    'hidedesktop'=>[ 'type'=> 'boolean',  'default'=> true],
                    'hidetablet'=>[ 'type'=> 'boolean', 'default'=> true],
                    'hidemobile'=>[ 'type'=> 'boolean', 'default'=> true ],
                    'animation'=>[ 'type'=>'string',  'default'=>'' ],
                    'durations'=>[ 'type'=>'string',  'default'=>'' ],
                    'delay'=>[ 'type'=>'string','default'=>''],       
                    'categories'=> ['type'=> 'array','items'=> ['type'=> "object"]],
                    'selectedAuthor'=>['type'=> "number"],
                    'postsToShow'=> ['type'=> "number",'default'=> 3],
                    'displayPostContent'=> ['type'=> "boolean",  'default'=> true],
                    'displayPostContentRadio'=> [ 'type'=> "string",'default'=> "excerpt" ],
                    'excerptLength'=> ['type'=> "number", 'default'=> 55],
                    'displayAuthor'=> [ 'type'=> "boolean", 'default'=> true ],
                    'displayComment'=> [ 'type'=> "boolean", 'default'=> true ],
                    'displayCat'=> [ 'type'=> "boolean", 'default'=> true ],
                    'displayTag'=> [ 'type'=> "boolean", 'default'=> true ], 
                    'displayPostContent'=> [ 'type'=> "boolean", 'default'=> true ],                    
                    'displayDate'=> ['type'=> "boolean",'default'=> true ],
                    'autoplay'=> ['type'=> "boolean",'default'=> false ],
                    'bgImageOverlay'=> [ 'type'=> 'boolean', 'default'=> ''],
                    'bgOverlayColor'=> [ 'type'=> 'string', 'default'=> '#000'],
                    'bgOverlayOpacity'=> [ 'type'=> "number", 'default'=> 0.6 ],
                    'postLayout'=> [ 'type'=> "string",'default'=> "list" ],
                    'columns'=> [ 'type'=> "number",'default'=> 3],
                    'order'=> ['type'=> "string",'default'=> "desc"],
                    'orderBy'=> [ 'type'=> "string",'default'=> "date"],
                    'displayFeaturedImage'=> [ 'type'=> "boolean", 'default'=> true ],
                    'displayTitle'=> [ 'type'=> "boolean", 'default'=> true ],
                    'featuredImageAlign'=> ['type'=> "string",'enum'=> [ "left", "center", "right" ]],
                    'featuredImageSizeSlug'=> ['type'=> "string",'default'=> "large"],
                    'featuredImageSizeWidth'=> ['type'=> "number", 'default'=> null],
                    'featuredImageSizeHeight'=> [ 'type'=> "number",'default'=> null],
                    'addLinkToFeaturedImage'=> ['type'=> "boolean",'default'=> true ],
                    'titleColor'=>[ 'type'=>'string','default'=>'#000000'],
                    'titlehColor'=>[ 'type'=>'string','default'=>''],
                    'bgColor'=>[ 'type'=>'string','default'=>''],
                    'bggradientValue'=>[ 'type'=>'string','default'=>''],
                    'bghColor'=>[ 'type'=>'string','default'=>''],
                    'bggradienthValue'=>[ 'type'=>'string','default'=>''],
                    'navColor'=>[ 'type'=>'string','default'=>''],
                    'navbgColor'=>[ 'type'=>'string','default'=>''],
                    'navbggradientValue'=>[ 'type'=>'string','default'=>''],
                    'navhColor'=>[ 'type'=>'string','default'=>''],
                    'navbghColor'=>[ 'type'=>'string','default'=>''],
                    'navbggradienthValue'=>[ 'type'=>'string','default'=>''],
                    'dotsbgColor'=>[ 'type'=>'string','default'=>''],
                    'dotsbghColor'=>[ 'type'=>'string','default'=>''],
                    'contentColor'=>[ 'type'=>'string','default'=>'#3c3c3c'],
                    'btnColor'=>[ 'type'=>'string','default'=>'#ffffff'],
                    'btnbgColor'=>[ 'type'=>'string','default'=>'#ff6900'],
                    'btnbggradientValue'=>[ 'type'=>'string','default'=>''],
                    'btnhColor'=>[ 'type'=>'string','default'=>'#ffffff'],
                    'btnbghColor'=>[ 'type'=>'string','default'=>'#0D6B68'],
                    'btnbggradienthValue'=>[ 'type'=>'string','default'=>''],
                    'metaColor'=>[ 'type'=>'string','default'=>'#000000'],
                    'metahColor'=>[ 'type'=>'string','default'=>'#0D6B68'],                              
                    'titlefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'titlefontSize'=>[ 'type'=>'string','default'=>'24px'],
                    'titlefontSizetab'=>[ 'type'=>'string','default'=>'24px'],
                    'titlefontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
                    'titleFontWeight'=>[ 'type'=>'string','default'=>'600'], 
                    'previewlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'titleLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleTransform'=>[ 'type'=>'string','default'=>''], 
                    'titleDecoration'=>[ 'type'=>'string','default'=>'none'],
                    'previewltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'titleLetterSpacing'=>[ 'type'=>'number','default'=>1],
                    'titleLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                    'titleLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                    
                    'contentfontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewcontentfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'contentfontSize'=>[ 'type'=>'string','default'=>'15px'],
                    'contentfontSizetab'=>[ 'type'=>'string','default'=>'15px'],
                    'contentfontSizemob'=>[ 'type'=>'string','default'=>'15px'], 
                    'contentFontWeight'=>[ 'type'=>'string','default'=>'400'], 
                    'previewcontentlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'contentLineHeight'=>[ 'type'=>'number','default'=>'25px'], 
                    'contentLineHeighttab'=>[ 'type'=>'number','default'=>'25px'], 
                    'contentLineHeightmob'=>[ 'type'=>'number','default'=>'25px'], 
                    'contentTransform'=>[ 'type'=>'string','default'=>''],         
                    'contentDecoration'=>[ 'type'=>'string','default'=>'none'], 
                    'previewcontentltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'contentLetterSpacing'=>[ 'type'=>'number','default'=>1],  
                    'contentLetterSpacingtab'=>[ 'type'=>'number','default'=>1],  
                    'contentLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                    
                    'metafontfamily'=>[ 'type'=>'string','default'=>'Poppins'],
                    'previewmetafontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'metafontSize'=>[ 'type'=>'string','default'=>'14px'],
                    'metafontSizetab'=>[ 'type'=>'string','default'=>'14px'],
                    'metafontSizemob'=>[ 'type'=>'string','default'=>'14px'], 
                    'metaFontWeight'=>[ 'type'=>'string','default'=>'500'], 
                    'previewmetalineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'metaLineHeight'=>[ 'type'=>'number','default'=>'26px'],
                    'metaLineHeighttab'=>[ 'type'=>'number','default'=>'26px'],
                    'metaLineHeightmob'=>[ 'type'=>'number','default'=>'26px'],
                    'metaTransform'=>[ 'type'=>'string','default'=>''], 
                    'metaDecoration'=>[ 'type'=>'string','default'=>'none'], 
                    'previewmetaltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'metaLetterSpacing'=>[ 'type'=>'number','default'=>1],
                    'metaLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                    'metaLetterSpacingmob'=>[ 'type'=>'number','default'=>1],                   
                    'readmorefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewreadmorefontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'readmorefontSize'=>[ 'type'=>'string','default'=>'14px'],
                    'readmorefontSizetab'=>[ 'type'=>'string','default'=>'14px'],
                    'readmorefontSizemob'=>[ 'type'=>'string','default'=>'14px'], 
                    'readmoreFontWeight'=>[ 'type'=>'string','default'=>'500'], 
                    'previewreadmorelineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'readmoreLineHeight'=>[ 'type'=>'number','default'=>'25px'],
                    'readmoreLineHeighttab'=>[ 'type'=>'number','default'=>'25px'],
                    'readmoreLineHeightmob'=>[ 'type'=>'number','default'=>'25px'], 
                    'readmoreTransform'=>[ 'type'=>'string','default'=>''], 
                    'readmoreDecoration'=>[ 'type'=>'string','default'=>'none'], 
                    'previewreadmoreltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'readmoreLetterSpacing'=>['type'=>'number','default'=>1],
                    'readmoreLetterSpacingtab'=>['type'=>'number','default'=>1],
                    'readmoreLetterSpacingmob'=>['type'=>'number','default'=>1],
                    'addid'=>['type'=>'string', 'default'=>'',],
                    'addclass'=>['type' => 'string','default' => ''],
                    'customcss'=>['type' => 'string','default' => ''],
                    'addcss'=> [ 'type'=>'string','default'=>''],
                    'addjs'=> [ 'type'=>'string','default'=>''],
                    'advid'=> [ 'type'=>'string','default'=>''], 
                    'advclass'=> [ 'type'=>'string','default'=>''],    
        ]
    ]);

    register_block_type('gutensee/gutensee-contact-us', array(
        'style'=> 'gutensee-blocks-style',
        'editor_style'=>'gutensee-blocks-editor-css',
        'render_callback' => 'gutensee_render_contact_form_callback',
        'attributes'=> [
                    'uniqueid'=> [ 'type'=>'string'],
                    'controlType'=>['type'=>'string', 'default'=>'basic',],
                    'colorType'=>['type'=>'string', 'default'=>'normal',],
                    'style'=> [ 'type'=>'string', 'default'=>'style-1'],
                    'enablename'=> [ 'type'=>'boolean', 'default'=>true],
                    'enableemail'=> [ 'type'=>'boolean', 'default'=>true],
                    'enablesubject'=> [ 'type'=>'boolean', 'default'=>true],
                    'enablemobile'=> [ 'type'=>'boolean', 'default'=>true],
                    'enablemesg'=> [ 'type'=>'boolean', 'default'=>true],
                    'enablelabel'=> [ 'type'=>'boolean', 'default'=>true],
                    'namelabel'=>['type'=>'string', 'default'=>'Name',],
                    'emaillabel'=>['type'=>'string', 'default'=>'Email',],
                    'subjectlabel'=>['type'=>'string', 'default'=>'Subject',],
                    'mobilelabel'=>['type'=>'string', 'default'=>'Mobile',],
                    'mesglabel'=>['type'=>'string', 'default'=>'Message',],
                    'btnlabel'=>['type'=>'string', 'default'=>'Send Message',],
                    'enableplaceholder'=> [ 'type'=>'boolean', 'default'=>true],
                    'nameholder'=>['type'=>'string', 'default'=>'Enter Name',],
                    'emailholder'=>['type'=>'string', 'default'=>'Enter Email',],
                    'subjectholder'=>['type'=>'string', 'default'=>'Enter Subject',],
                    'mobileholder'=>['type'=>'string', 'default'=>'Enter Mobile',],
                    'mesgholder'=>['type'=>'string', 'default'=>'Enter Message',],
                    'hidedesktop'=> [ 'type'=>'boolean', 'default'=>true],
                    'hidetablet'=> [ 'type'=>'boolean', 'default'=>true],
                    'hidemobile'=> [ 'type'=>'boolean', 'default'=>true],
                    'animation'=> [ 'type'=>'string','default'=> ''],
                    'durations'=> [ 'type'=>'string','default'=> ''],
                    'delay'=> [ 'type'=>'string','default'=> ''],
                    'bgColor'=> [ 'type'=>'string', 'default'=>'',],
                    'bggradientValue'=>['type'=>'string', 'default'=>'',],
                    'labelColor'=>['type'=>'string', 'default'=>'',],
                    'fieldbgColor'=>['type'=>'string', 'default'=>'',],
                    'fieldbggradientValue'=>['type'=>'string', 'default'=>'',],
                    'fieldColor'=>['type'=>'string', 'default'=>'',],
                    'btnColor'=>['type'=>'string', 'default'=>'',],
                    'btnbgColor'=>['type'=>'string', 'default'=>'',],
                    'btnbggradientValue'=>['type'=>'string', 'default'=>'',],
                    'btnhColor'=>['type'=>'string', 'default'=>'',],
                    'btnbghColor'=>['type'=>'string', 'default'=>'',],
                    'btnbggradienthValue'=>['type'=>'string', 'default'=>'',],
                    'hshadow'=>['type'=>'number', 'default'=>0,],
                    'vshadow'=>['type'=>'number', 'default'=>0,],
                    'blurshadow'=>['type'=>'number', 'default'=>15,],
                    'shadowColor'=>['type'=>'string', 'default'=>'#e7e7e7',],
                    'boxshadow'=>['type'=>'boolean', 'default'=>false,],
                    'previewmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'margins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'marginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'marginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'previewlabelmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'labelmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'labelmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'labelmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'previewfieldmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'fieldmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'fieldmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'fieldmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'previewbtnmargins'=>['type'=>'string', 'default'=>'Desktop',],
                    'btnmargins'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'btnmarginstab'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],
                    'btnmarginsmob'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '20px']],                    
                    'previewpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'paddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'paddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'paddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewlabelpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'labelpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'labelpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'labelpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewfieldpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'fieldpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'fieldpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'fieldpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'previewbtnpaddings'=>['type'=>'string', 'default'=>'Desktop',],
                    'btnpaddings'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'btnpaddingstab'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'btnpaddingsmob'=> ['type'=> 'object','default'=> [ 'top'=> '10px', 'left'=> '10px', 'right'=> '10px', 'bottom'=> '10px']],
                    'border'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'borderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'labelborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'labelborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'fieldborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'fieldborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'btnborder'=> ['type'=> 'object', 'default'=> ['color'=> '', 'style'=> '', 'width'=> '' ]],
                    'btnborderradius'=> ['type'=> 'object','default'=> [ 'top'=> '0px', 'left'=> '0px', 'right'=> '0px', 'bottom'=> '0px']],
                    'labelfontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewlabelfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'labelfontSize'=>[ 'type'=>'string','default'=>'24px'],
                    'labelfontSizetab'=>[ 'type'=>'string','default'=>'24px'],
                    'labelfontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
                    'labelFontWeight'=>[ 'type'=>'string','default'=>'600'], 
                    'previewlabellineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'labelLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
                    'labelLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
                    'labelLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
                    'labelTransform'=>[ 'type'=>'string','default'=>''], 
                    'labelDecoration'=>[ 'type'=>'string','default'=>'none'],
                    'previewlabelltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'labelLetterSpacing'=>[ 'type'=>'number','default'=>1],
                    'labelLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                    'labelLetterSpacingmob'=>[ 'type'=>'number','default'=>1],

                    'titlefontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'titlefontSize'=>[ 'type'=>'string','default'=>'24px'],
                    'titlefontSizetab'=>[ 'type'=>'string','default'=>'24px'],
                    'titlefontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
                    'titleFontWeight'=>[ 'type'=>'string','default'=>'600'], 
                    'previewlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'titleLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
                    'titleTransform'=>[ 'type'=>'string','default'=>''], 
                    'titleDecoration'=>[ 'type'=>'string','default'=>'none'],
                    'previewltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'titleLetterSpacing'=>[ 'type'=>'number','default'=>1],
                    'titleLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                    'titleLetterSpacingmob'=>[ 'type'=>'number','default'=>1],

                    'btnfontfamily'=>[ 'type'=>'string','default'=>'Poppins'], 
                    'previewbtnfontSize'=>['type'=>'string', 'default'=>'Desktop',],
                    'btnfontSize'=>[ 'type'=>'string','default'=>'24px'],
                    'btnfontSizetab'=>[ 'type'=>'string','default'=>'24px'],
                    'btnfontSizemob'=>[ 'type'=>'string','default'=>'24px'], 
                    'btnFontWeight'=>[ 'type'=>'string','default'=>'600'], 
                    'previewbtnlineheight'=>['type'=>'string', 'default'=>'Desktop',],
                    'btnLineHeight'=>[ 'type'=>'number','default'=>'34px'], 
                    'btnLineHeighttab'=>[ 'type'=>'number','default'=>'34px'], 
                    'btnLineHeightmob'=>[ 'type'=>'number','default'=>'34px'], 
                    'btnTransform'=>[ 'type'=>'string','default'=>''], 
                    'btnDecoration'=>[ 'type'=>'string','default'=>'none'],
                    'previewbtnltrspaceing'=>['type'=>'string', 'default'=>'Desktop',],
                    'btnLetterSpacing'=>[ 'type'=>'number','default'=>1],
                    'btnLetterSpacingtab'=>[ 'type'=>'number','default'=>1],
                    'btnLetterSpacingmob'=>[ 'type'=>'number','default'=>1],
                    'addcss'=> [ 'type'=>'string','default'=>''],
                    'addjs'=> [ 'type'=>'string','default'=>''],
                    'advid'=> [ 'type'=>'string','default'=>''], 
                    'advclass'=> [ 'type'=>'string','default'=>''],    

        ],
    ));
}

function gutensee_create_bootstrap_menu( $theme_location, $attributes ) {
    if ( ($theme_location)  ) {   

        $menu = get_term( $theme_location, 'nav_menu' );
        $menu_items = wp_get_nav_menu_items($menu->term_id);
        $menu_list = '<ul class="nav gutensee-nav gutensee-right">
                      <li class="sbp-menu-close"><span id="sbp-close" class="fa fa-xmark"></span></li>';
        $menucount = 1;
        $bool = true;
        //print_r($menu_items);die();
         $frontpage_id = get_option( 'page_on_front' );
        $page_for_posts = get_option( 'page_for_posts' );
        // echo 'dev-'.$page_for_posts;
        foreach( $menu_items as $menu_item ) {
            if( $menu_item->menu_item_parent == 0 ) {
                 
                $parent = $menu_item->ID;
                 
                $menu_array = array();
                $dractive='';
                $drpreactive='';
                foreach( $menu_items as $submenu ) {
                    if( $submenu->menu_item_parent == $parent ) {
                        $bool = true;$str2='';
                        $active=(($submenu->object_id==get_the_id() && !is_front_page()) || ($submenu->title==is_category($submenu->object_id)) || ($submenu->object_id==$frontpage_id && is_front_page()) || ($submenu->object_id==$page_for_posts && is_home())  ) ? 'active' :'';
                        $str2 .= '<a class="' . $submenu->object_id . ' nav-link" href="' . $submenu->url . '" >' . $submenu->title; 
                        $parents = $submenu->ID;
                        $str='';
                        $activert='';
                        foreach($menu_items as $submenus){
                            if( $submenus->menu_item_parent == $parents ) {
                                $str3='';
                                $parents1 = $submenus->ID;

                                $active1=(($submenus->object_id==get_the_id()) || ($submenus->title==is_category($submenus->object_id)) || ($submenus->object_id==$frontpage_id && is_front_page()) || ($submenus->object_id==$page_for_posts && is_home()) ) ? 'active' :'';
                                $activert10='';
                                foreach($menu_items as $submenus1){
                                     $active10=(($submenus1->object_id==get_the_id()) || ($submenus1->title==is_category($submenus1->object_id)) || ($submenus1->object_id==$frontpage_id && is_front_page()) || ($submenus1->object_id==$page_for_posts && is_home()) ) ? 'active' :'';
                                    if( $submenus1->menu_item_parent == $parents1 ) {
                                        $str3 .= '<li class="3 menu-item menu-item-type-post_type menu-item-object-page '.$active10.' '. $submenus1->object_id .' '.get_the_id().'"><a class="nav-link" href="' . $submenus1->url . '" >' . $submenus1->title . '</a></li>';
                                     $activert10.=($active10==='active' ) ? 'active' :'';
                                 }
                                }
                                $def=($str3!='')?'<ul class="dropdown-menu 3">'.$str3.'</ul>':'';
                                $activert.=($active1==='active' || $activert10==='active') ? 'active' :'';
                               
                                if($def!=''){
                                    $str .= '<li class="3 menu-item dropdown menu-item-type-post_type menu-item-object-page '.$activert10.' '.$active1.' '. $submenus->object_id .' '.get_the_id().'"><a class="nav-link" href="' . $submenus->url . '" >' . $submenus->title . '<i class="fas fa-caret-down"></i></a>'.$def.'</li>';
                                }else{
                                    $str .= '<li class="3 menu-item menu-item-type-post_type menu-item-object-page '.$activert10.' '.$active1.' '. $submenus->object_id .' '.get_the_id().'"><a class="nav-link" href="' . $submenus->url . '" >' . $submenus->title . '</a></li>';
                                }

                            }
                        }
                        if($str!=null){
                        $menu_array[] ='<li class="2 menu-item  menu-item-has-children dropdown '.$active.' '.$activert.'">';
                        $menu_array[] .= $str2;                    
                        $menu_array[] .= '<i class="fas fa-caret-down"></i></a>';
                        $menu_array[] .='<ul class="dropdown-menu">';
                        $menu_array[] .=$str;   
                        $menu_array[] .= '</ul></li>';
                        }else{
                            $menu_array[] ='<li class=" 4 menu-item  menu-item-has-children '.$active.' '.$activert.'">';
                            $menu_array[] .= $str2;
                            $menu_array[] .= '</a>';
                            $menu_array[] .= '</li>';
                        }
                         $dractive.=($activert==='active') ? 'active' :'';
                         $drpreactive.=($active==='active') ? 'active' :'';
                    }
                   
                }
                if( $bool == true && count( $menu_array ) > 0 ) {
                    //print_r($menu_items);
                   
                    $active2=(($menu_item->object_id==get_the_id()  && !is_front_page()) || ($menu_item->title==is_category($menu_item->object_id)) || ($menu_item->object_id==$frontpage_id && is_front_page()) || ($menu_item->object_id==$page_for_posts && is_home()) ) ? 'active' :''; 
                    $menu_list .= '<li class="1 menu-item  menu-item-has-children dropdown '.$active2.' '.$dractive.' '.$drpreactive.'">';
                    $menu_list .= '<a class="nav-link" href="'.$menu_item->url.'">'.$menu_item->title.'<i class="fas fa-caret-down"></i></a>';
                     
                    $menu_list .= '<ul class="dropdown-menu">' ."\n";
                    $menu_list .= implode( $menu_array );
                    $menu_list .= '</ul>';
                     
                } else {
                    // echo "<pre>"; print_r($menu_item); 
                    $active2=(($menu_item->object_id==get_the_id()  && !is_front_page()) || ($menu_item->title==is_category($menu_item->object_id)) || ($menu_item->object_id==$frontpage_id && is_front_page()) || ($menu_item->object_id==$page_for_posts && is_home())) ? 'active' :''; 
                    $menu_list .= '<li class=" 5 menu-item menu-item-type-post_type menu-item-object-page '.$active2.' '.$dractive.'">';
                    $menu_list .= '<a class="nav-link" href="'.$menu_item->url.'">' . $menu_item->title . '</a>';
                }
                 
            }
             
            // end <li>
            $menu_list .= '</li>';
            
            $menucount++;
        }

        if($attributes['hidebtn']===true){
            $menu_list .='<li class="menu-item header-button">
                            <a  class="theme-btn btn-style-one nav-link"  style="outline: none;">
                              <span class="txt">'.$attributes['btntext'].'</span>
                            </a>
                          </li>';
        }
        if($attributes['hidesearch']===true){
            $menu_list .='<li class="menu-item dropdown-sbp dropdown search_exists">
                              <a href="#" title="Search" class="search-icon-sbp dropdown nav-link" aria-haspopup="true" aria-expanded="false" style="outline: none;">
                                <i class="fas fa-search"></i>
                              </a>
                              <ul class="dropdown-menu search-panel leftauto left-side" role="menu">
                                <li>
                                  <div class="form-gutensee-container">
                                    <form id="searchform" autocomplete="off" role="Search" method="get" class="search-form" action="'.esc_url( home_url( '/' )).'"">
                                        <input type="search" class="search-field" placeholder="Search" value="" name="s">
                                        <input type="submit" class="search-submit" value="Search">
                                    </form>           
                                  </div>
                                </li>
                              </ul>
                            </li>';
        }
    } else {
        $menu_list = '<!-- no menu defined in location "'.$theme_location.'" -->';
    }
 
    return $menu_list;
 }

function gutensee_render_nav_menu_callback($attributes){
    $list_items_markup = '';
    $uniqueid=$attributes['uniqueid'];
    $menuname=$attributes['menuname'];
    $uniqueid01='gutensee-toggler'.$uniqueid;

    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';
    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;

    $bordertop=(!empty($attributes['border']['top'])) ? $attributes['border']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['border']['top']['color'] : null;
    $borderright=(!empty($attributes['border']['right'])) ? $attributes['border']['right']['width'].' '. $attributes['border']['right']['style'].' '. $attributes['border']['right']['color'] : null;
    $borderbottom=(!empty($attributes['border']['bottom'])) ? $attributes['border']['bottom']['width'].' '. $attributes['border']['bottom']['style'].' '. $attributes['border']['bottom']['color'] : null;
    $borderleft=(!empty($attributes['border']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['border']['left']['color'] : null;

    $menubordertop=(!empty($attributes['menuborder']['top'])) ? $attributes['menuborder']['top']['width'].' '. $attributes['menuborder']['top']['style'].' '. $attributes['menuborder']['top']['color'] : null;
    $menuborderright=(!empty($attributes['menuborder']['right'])) ? $attributes['menuborder']['right']['width'].' '. $attributes['menuborder']['right']['style'].' '. $attributes['menuborder']['right']['color'] : null;
    $menuborderbottom=(!empty($attributes['menuborder']['bottom'])) ? $attributes['menuborder']['bottom']['width'].' '. $attributes['menuborder']['bottom']['style'].' '. $attributes['menuborder']['bottom']['color'] : null;
    $menuborderleft=(!empty($attributes['menuborder']['left'] )) ? $attributes['menuborder']['left']['width'].' '. $attributes['menuborder']['left']['style'].' '. $attributes['menuborder']['left']['color'] : null;

    $ddbordertop=(!empty($attributes['ddborder']['top'])) ? $attributes['ddborder']['top']['width'].' '. $attributes['ddborder']['top']['style'].' '. $attributes['ddborder']['top']['color'] : null;
    $ddborderright=(!empty($attributes['ddborder']['right'])) ? $attributes['ddborder']['right']['width'].' '. $attributes['ddborder']['right']['style'].' '. $attributes['ddborder']['right']['color'] : null;
    $ddborderbottom=(!empty($attributes['ddborder']['bottom'])) ? $attributes['ddborder']['bottom']['width'].' '. $attributes['ddborder']['bottom']['style'].' '. $attributes['ddborder']['bottom']['color'] : null;
    $ddborderleft=(!empty($attributes['ddborder']['left'] )) ? $attributes['ddborder']['left']['width'].' '. $attributes['ddborder']['left']['style'].' '. $attributes['ddborder']['left']['color'] : null;

    $submenubordertop=(!empty($attributes['submenuborder']['top'])) ? $attributes['submenuborder']['top']['width'].' '. $attributes['submenuborder']['top']['style'].' '. $attributes['submenuborder']['top']['color'] : null;
    $submenuborderright=(!empty($attributes['submenuborder']['right'])) ? $attributes['submenuborder']['right']['width'].' '. $attributes['submenuborder']['right']['style'].' '. $attributes['submenuborder']['right']['color'] : null;
    $submenuborderbottom=(!empty($attributes['submenuborder']['bottom'])) ? $attributes['submenuborder']['bottom']['width'].' '. $attributes['submenuborder']['bottom']['style'].' '. $attributes['submenuborder']['bottom']['color'] : null;
    $submenuborderleft=(!empty($attributes['submenuborder']['left'] )) ? $attributes['submenuborder']['left']['width'].' '. $attributes['submenuborder']['left']['style'].' '. $attributes['submenuborder']['left']['color'] : null;

    $togglebordertop=(!empty($attributes['toggleborder']['top'])) ? $attributes['toggleborder']['top']['width'].' '. $attributes['toggleborder']['top']['style'].' '. $attributes['toggleborder']['top']['color'] : null;
    $toggleborderright=(!empty($attributes['toggleborder']['right'])) ? $attributes['toggleborder']['right']['width'].' '. $attributes['toggleborder']['right']['style'].' '. $attributes['toggleborder']['right']['color'] : null;
    $toggleborderbottom=(!empty($attributes['toggleborder']['bottom'])) ? $attributes['toggleborder']['bottom']['width'].' '. $attributes['toggleborder']['bottom']['style'].' '. $attributes['toggleborder']['bottom']['color'] : null;
    $toggleborderleft=(!empty($attributes['toggleborder']['left'] )) ? $attributes['toggleborder']['left']['width'].' '. $attributes['toggleborder']['left']['style'].' '. $attributes['toggleborder']['left']['color'] : null;

    $btnbordertop=(!empty($attributes['btnborder']['top'])) ? $attributes['btnborder']['top']['width'].' '. $attributes['btnborder']['top']['style'].' '. $attributes['btnborder']['top']['color'] : null;
    $btnborderright=(!empty($attributes['btnborder']['right'])) ? $attributes['btnborder']['right']['width'].' '. $attributes['btnborder']['right']['style'].' '. $attributes['btnborder']['right']['color'] : null;
    $btnborderbottom=(!empty($attributes['btnborder']['bottom'])) ? $attributes['btnborder']['btnbottom']['width'].' '. $attributes['btnborder']['bottom']['style'].' '. $attributes['btnborder']['bottom']['color'] : null;
    $btnborderleft=(!empty($attributes['btnborder']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['btnborder']['left']['color'] : null;

    $sbtnbordertop=(!empty($attributes['sbtnborder']['top'])) ? $attributes['sbtnborder']['top']['width'].' '. $attributes['sbtnborder']['top']['style'].' '. $attributes['sbtnborder']['top']['color'] : null;
    $sbtnborderright=(!empty($attributes['sbtnborder']['right'])) ? $attributes['sbtnborder']['right']['width'].' '. $attributes['sbtnborder']['right']['style'].' '. $attributes['sbtnborder']['right']['color'] : null;
    $sbtnborderbottom=(!empty($attributes['sbtnborder']['bottom'])) ? $attributes['sbtnborder']['bottom']['width'].' '. $attributes['sbtnborder']['bottom']['style'].' '. $attributes['sbtnborder']['bottom']['color'] : null;
    $sbtnborderleft=(!empty($attributes['sbtnborder']['left'] )) ? $attributes['sbtnborder']['left']['width'].' '. $attributes['sbtnborder']['left']['style'].' '. $attributes['sbtnborder']['left']['color'] : null;

    $sformbordertop=(!empty($attributes['sformborder']['top'])) ? $attributes['sformborder']['top']['width'].' '. $attributes['sformborder']['top']['style'].' '. $attributes['sformborder']['top']['color'] : null;
    $sformborderright=(!empty($attributes['sformborder']['right'])) ? $attributes['sformborder']['right']['width'].' '. $attributes['sformborder']['right']['style'].' '. $attributes['sformborder']['right']['color'] : null;
    $sformborderbottom=(!empty($attributes['sformborder']['bottom'])) ? $attributes['sformborder']['bottom']['width'].' '. $attributes['sformborder']['bottom']['style'].' '. $attributes['sformborder']['bottom']['color'] : null;
    $sformborderleft=(!empty($attributes['sformborder']['left'] )) ? $attributes['sformborder']['left']['width'].' '. $attributes['sformborder']['left']['style'].' '. $attributes['sformborder']['left']['color'] : null;


    $iconbordertop=(!empty($attributes['iconborder']['top'])) ? $attributes['iconborder']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['iconborder']['top']['color'] : null;
    $iconborderright=(!empty($attributes['iconborder']['right'])) ? $attributes['iconborder']['right']['width'].' '. $attributes['iconborder']['right']['style'].' '. $attributes['iconborder']['right']['color'] : null;
    $iconborderbottom=(!empty($attributes['iconborder']['bottom'])) ? $attributes['iconborder']['bottom']['width'].' '. $attributes['iconborder']['bottom']['style'].' '. $attributes['iconborder']['iconbottom']['color'] : null;
    $iconborderleft=(!empty($attributes['iconborder']['left'] )) ? $attributes['iconborder']['left']['width'].' '. $attributes['iconborder']['left']['style'].' '. $attributes['iconborder']['left']['color'] : null;

    $borderwidth=(!empty($attributes['border']['width']))? $attributes['border']['width'] :null;
    $borderstyle=(!empty($attributes['border']['style']))? $attributes['border']['style'] :null;
    $bordercolor=(!empty($attributes['border']['color']))? $attributes['border']['color'] :null;

    $menuboxshadow=($attributes['boxshadow'] === true) ? ''.$attributes['vshadow'].'px '.$attributes['hshadow'].'px '.$attributes['blurshadow'].'px '.$attributes['shadowColor'].'' : '';
    $smenuboxshadow=($attributes['sboxshadow'] === true) ? ''.$attributes['svshadow'].'px '.$attributes['shshadow'].'px '.$attributes['sblurshadow'].'px '.$attributes['sshadowColor'].'' : '';
    $sbmenuboxshadow=($attributes['sbboxshadow'] === true) ? ''.$attributes['sbvshadow'].'px '.$attributes['sbhshadow'].'px '.$attributes['sbblurshadow'].'px '.$attributes['sbshadowColor'].'' : '';

    $list_items_markup .= $attributes['addcss'];

    $alignmentClass = ($attributes['textAlignment'] != null) ? 'has-text-align-'.$attributes['textAlignment'].'' : '';

    if($menuname){
        $menu_list = gutensee_create_bootstrap_menu($menuname, $attributes);   
        $list_items_markup .= '<div id="'.$attributes['advid'].'"><nav class="gutensee gutensee-block  trsprnt-menu '.$displayclass.'" role="navigation" >';
        $list_items_markup .= '<div class="gutensee-container">';
        $list_items_markup .= '<!-- Brand and toggle get grouped for better mobile display -->';
        $list_items_markup .= '<div class="gutensee-header">';
        $list_items_markup .= '<button id="'.$uniqueid01.'" class="gutensee-toggle '.$uniqueid.' '.$attributes['toggleposition'].' '.$attributes['togglepositiontab'].' '.$attributes['togglepositionmob'].' '.$attributes['advclass'].'" data-toggle="collapse" type="button" aria-controls="menu" aria-expanded="false">';
        $list_items_markup .= '<i class="fas fa-bars"></i>';
        $list_items_markup .= '</button></div>';
        $list_items_markup .= '<!-- Collect the nav links, forms, and other content for toggling -->';
        $list_items_markup .= '<div class="collapse gutensee-collapse '.$uniqueid.'" id="custom-collapse">';
        $list_items_markup .= '<div class="gutensee-blocks-menu navigation '.$alignmentClass.' '.$displayclass.' '.$attributes['addclass'].'" id="'.$uniqueid.'">';
        $list_items_markup .= $menu_list;
        $list_items_markup .= '</div>';
        $list_items_markup .= '</div>';
        $list_items_markup .= '</div>';
        $list_items_markup .= '</nav></div>';
    }
    $list_items_markup .=$attributes['addjs'];
    return $list_items_markup;     
}