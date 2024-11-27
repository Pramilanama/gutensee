<?php
// Latest Post Render Function
global $gutensee_posts_excerpt_length;
$gutensee_posts_excerpt_length = 0;

function gutensee_get_excerpt_length() {
    global $gutensee_posts_excerpt_length;
    return $gutensee_posts_excerpt_length;
}

function gutensee_render_latest_posts_callback( $attributes ) {
    global $post, $gutensee_posts_excerpt_length;
    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';
    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;
    $animationclass='wow animated '.$attributes['durations'].' '.$attributes['animation'];
    
    $args = array(
        'posts_per_page'      => $attributes['postsToShow'],
        'post_status'         => 'publish',
        'order'               => $attributes['order'],
        'orderby'             => $attributes['orderBy'],
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
    );

    $gutensee_posts_excerpt_length = $attributes['excerptLength'];
    add_filter( 'excerpt_length', 'gutensee_get_excerpt_length', 20 );

    if ( isset( $attributes['categories'] ) ) {
        $args['category__in'] = array_column( $attributes['categories'], 'id' );
    }
    if ( isset( $attributes['selectedAuthor'] ) ) {
        $args['author'] = $attributes['selectedAuthor'];
    }

    $query        = new WP_Query();
    $recent_posts = $query->query( $args );

    if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
        update_post_thumbnail_cache( $query );
    }

    $list_items_markup = '';

    $uniqueid=$attributes['uniqueid'];

    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';

    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;

    $animationclass='wow animated '.$attributes['durations'].' '.$attributes['animation'];

    $ColumnClass='';
    $Rowclass='';
    switch($attributes['poststyle']){
        case 'grid-layout':
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
        case 'list-layout':
            $ColumnClass='block-col-12';
            $Rowclass='block-row';
            break;
        case 'masonry-layout':
            $ColumnClass='masonry-column';
            $Rowclass='masonry-row masonry-layout-'.$attributes['columnNumber'];
            break;
        case 'cover-layout':
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
        default:
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
    }


    $bordertop=(!empty($attributes['border']['top'])) ? $attributes['border']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['border']['top']['color'] : null;
    $borderright=(!empty($attributes['border']['right'])) ? $attributes['border']['right']['width'].' '. $attributes['border']['right']['style'].' '. $attributes['border']['right']['color'] : null;
    $borderbottom=(!empty($attributes['border']['bottom'])) ? $attributes['border']['bottom']['width'].' '. $attributes['border']['bottom']['style'].' '. $attributes['border']['bottom']['color'] : null;
    $borderleft=(!empty($attributes['border']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['border']['left']['color'] : null;

    $navbordertop=(!empty($attributes['navborder']['top'])) ? $attributes['navborder']['top']['width'].' '. $attributes['navborder']['top']['style'].' '. $attributes['navborder']['top']['color'] : null;
    $navborderright=(!empty($attributes['navborder']['right'])) ? $attributes['navborder']['right']['width'].' '. $attributes['navborder']['right']['style'].' '. $attributes['navborder']['right']['color'] : null;
    $navborderbottom=(!empty($attributes['navborder']['bottom'])) ? $attributes['navborder']['bottom']['width'].' '. $attributes['navborder']['bottom']['style'].' '. $attributes['navborder']['bottom']['color'] : null;
    $navborderleft=(!empty($attributes['navborder']['left'] )) ? $attributes['navborder']['left']['width'].' '. $attributes['navborder']['left']['style'].' '. $attributes['navborder']['left']['color'] : null;

    $dotsbordertop=(!empty($attributes['dotsborder']['top'])) ? $attributes['dotsborder']['top']['width'].' '. $attributes['dotsborder']['top']['style'].' '. $attributes['dotsborder']['top']['color'] : null;
    $dotsborderright=(!empty($attributes['dotsborder']['right'])) ? $attributes['dotsborder']['right']['width'].' '. $attributes['dotsborder']['right']['style'].' '. $attributes['dotsborder']['right']['color'] : null;
    $dotsborderbottom=(!empty($attributes['dotsborder']['bottom'])) ? $attributes['dotsborder']['bottom']['width'].' '. $attributes['dotsborder']['bottom']['style'].' '. $attributes['dotsborder']['bottom']['color'] : null;
    $dotsborderleft=(!empty($attributes['dotsborder']['left'] )) ? $attributes['dotsborder']['left']['width'].' '. $attributes['dotsborder']['left']['style'].' '. $attributes['dotsborder']['left']['color'] : null;

    $featuredbordertop=(!empty($attributes['featuredborder']['top'])) ? $attributes['featuredborder']['top']['width'].' '. $attributes['featuredborder']['top']['style'].' '. $attributes['featuredborder']['top']['color'] : null;
    $featuredborderright=(!empty($attributes['featuredborder']['right'])) ? $attributes['featuredborder']['right']['width'].' '. $attributes['featuredborder']['right']['style'].' '. $attributes['featuredborder']['right']['color'] : null;
    $featuredborderbottom=(!empty($attributes['featuredborder']['bottom'])) ? $attributes['featuredborder']['bottom']['width'].' '. $attributes['featuredborder']['bottom']['style'].' '. $attributes['featuredborder']['bottom']['color'] : null;
    $featuredborderleft=(!empty($attributes['featuredborder']['left'] )) ? $attributes['featuredborder']['left']['width'].' '. $attributes['featuredborder']['left']['style'].' '. $attributes['featuredborder']['left']['color'] : null;

    $metabordertop=(!empty($attributes['metaborder']['top'])) ? $attributes['metaborder']['top']['width'].' '. $attributes['metaborder']['top']['style'].' '. $attributes['metaborder']['top']['color'] : null;
    $metaborderright=(!empty($attributes['metaborder']['right'])) ? $attributes['metaborder']['right']['width'].' '. $attributes['metaborder']['right']['style'].' '. $attributes['metaborder']['right']['color'] : null;
    $metaborderbottom=(!empty($attributes['metaborder']['bottom'])) ? $attributes['metaborder']['bottom']['width'].' '. $attributes['metaborder']['bottom']['style'].' '. $attributes['metaborder']['bottom']['color'] : null;
    $metaborderleft=(!empty($attributes['metaborder']['left'] )) ? $attributes['metaborder']['left']['width'].' '. $attributes['metaborder']['left']['style'].' '. $attributes['metaborder']['left']['color'] : null;

    $headingbordertop=(!empty($attributes['headingborder']['top'])) ? $attributes['headingborder']['top']['width'].' '. $attributes['headingborder']['top']['style'].' '. $attributes['headingborder']['top']['color'] : null;
    $headingborderright=(!empty($attributes['headingborder']['right'])) ? $attributes['headingborder']['right']['width'].' '. $attributes['headingborder']['right']['style'].' '. $attributes['headingborder']['right']['color'] : null;
    $headingborderbottom=(!empty($attributes['headingborder']['bottom'])) ? $attributes['headingborder']['bottom']['width'].' '. $attributes['headingborder']['bottom']['style'].' '. $attributes['headingborder']['bottom']['color'] : null;
    $headingborderleft=(!empty($attributes['headingborder']['left'] )) ? $attributes['headingborder']['left']['width'].' '. $attributes['headingborder']['left']['style'].' '. $attributes['headingborder']['left']['color'] : null;    

    $contentbordertop=(!empty($attributes['contentborder']['top'] )) ? $attributes['contentborder']['top']['width'].' '. $attributes['contentborder']['top']['style'].' '. $attributes['contentborder']['top']['color'] : null;
    $contentborderright=(!empty($attributes['contentborder']['right'] )) ? $attributes['contentborder']['right']['width'].' '. $attributes['contentborder']['right']['style'].' '. $attributes['contentborder']['right']['color'] : null;
    $contentborderbottom=(!empty($attributes['contentborder']['bottom'] )) ? $attributes['contentborder']['bottom']['width'].' '. $attributes['contentborder']['bottom']['style'].' '. $attributes['contentborder']['bottom']['color'] : null;
    $contentborderleft=(!empty($attributes['contentborder']['left'] )) ? $attributes['contentborder']['left']['width'].' '. $attributes['contentborder']['left']['style'].' '. $attributes['contentborder']['left']['color'] : null;

    $buttonbordertop=(!empty($attributes['buttonborder']['top'])) ? $attributes['buttonborder']['top']['width'].' '. $attributes['buttonborder']['top']['style'].' '. $attributes['buttonborder']['top']['color'] : null;
    $buttonborderright=(!empty($attributes['buttonborder']['right'])) ? $attributes['buttonborder']['right']['width'].' '. $attributes['buttonborder']['right']['style'].' '. $attributes['buttonborder']['right']['color'] : null;
    $buttonborderbottom=(!empty($attributes['buttonborder']['bottom'])) ? $attributes['buttonborder']['bottom']['width'].' '. $attributes['buttonborder']['bottom']['style'].' '. $attributes['buttonborder']['bottom']['color'] : null;
    $buttonborderleft=(!empty($attributes['buttonborder']['left'] )) ? $attributes['buttonborder']['left']['width'].' '. $attributes['buttonborder']['left']['style'].' '. $attributes['buttonborder']['left']['color'] : null;

    $borderwidth=(!empty($attributes['border']['width']))? $attributes['border']['width'] :null;
    $borderstyle=(!empty($attributes['border']['style']))? $attributes['border']['style'] :null;
    $bordercolor=(!empty($attributes['border']['color']))? $attributes['border']['color'] :null;

    $navborderwidth=(!empty($attributes['navborder']['width']))? $attributes['navborder']['width'] :null;
    $navborderstyle=(!empty($attributes['navborder']['style']))? $attributes['navborder']['style'] :null;
    $navbordercolor=(!empty($attributes['navborder']['color']))? $attributes['navborder']['color'] :null;

    $dotsborderwidth=(!empty($attributes['dotsborder']['width']))? $attributes['dotsborder']['width'] :null;
    $dotsborderstyle=(!empty($attributes['dotsborder']['style']))? $attributes['dotsborder']['style'] :null;
    $dotsbordercolor=(!empty($attributes['dotsborder']['color']))? $attributes['dotsborder']['color'] :null;

    $featuredborderwidth=(!empty($attributes['featuredborder']['width']))? $attributes['featuredborder']['width'] :null;
    $featuredborderstyle=(!empty($attributes['featuredborder']['style']))? $attributes['featuredborder']['style'] :null;
    $featuredbordercolor=(!empty($attributes['featuredborder']['color']))? $attributes['featuredborder']['color'] :null;

    $metaborderwidth=(!empty($attributes['metaborder']['width']))? $attributes['metaborder']['width'] :null;
    $metaborderstyle=(!empty($attributes['metaborder']['style']))? $attributes['metaborder']['style'] :null;
    $metabordercolor=(!empty($attributes['metaborder']['color']))? $attributes['metaborder']['color'] :null;

    $headingborderwidth=(!empty($attributes['headingborder']['width']))? $attributes['headingborder']['width'] :null;
    $headingborderstyle=(!empty($attributes['headingborder']['style']))? $attributes['headingborder']['style'] :null;
    $headingbordercolor=(!empty($attributes['headingborder']['color']))? $attributes['headingborder']['color'] :null;

    $contentborderwidth=(!empty($attributes['contentborder']['width']))? $attributes['contentborder']['width'] :null;
    $contentborderstyle=(!empty($attributes['contentborder']['style']))? $attributes['contentborder']['style'] :null;
    $contentbordercolor=(!empty($attributes['contentborder']['color']))? $attributes['contentborder']['color'] :null;

    $buttonborderwidth=(!empty($attributes['buttonborder']['width']))? $attributes['buttonborder']['width'] :null;
    $buttonborderstyle=(!empty($attributes['buttonborder']['style']))? $attributes['buttonborder']['style'] :null;
    $buttonbordercolor=(!empty($attributes['buttonborder']['color']))? $attributes['buttonborder']['color'] :null;

    $ColumnClass='';
    $Rowclass='';
    switch($attributes['poststyle']){
        case 'grid-layout':
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
        case 'list-layout':
            $ColumnClass='block-col-12';
            $Rowclass='block-row';
            break;
        case 'masonry-layout':
            $ColumnClass='masonry-column';
            $Rowclass='masonry-row masonry-layout-'.$attributes['columnNumber'];
            break;
        case 'cover-layout':
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
        default:
            $ColumnClass='block-col-'.$attributes['columnNumber'];
            $Rowclass='block-row';
            break;
    }

    $list_items_markup .= $attributes['addcss'];
    $list_items_markup .= $attributes['addjs'];

    $list_items_markup .='<div id="'.$attributes['advid'].'"><div id="'.$uniqueid.'" class="post-query-loop '.$Rowclass.' single-item '.$uniqueid.' '.$attributes['addclass'].' '.$displayclass.' '. $animationclass.' '.$attributes['addclass'].'">';

    foreach ( $recent_posts as $post ) {
        $post_link = esc_url( get_permalink( $post ) );
        $title     = get_the_title( $post );

        if ( ! $title ) {
            $title = esc_html__( 'no title' ,'gutensee');
        }

        $post_content_class='';

        if ( $attributes['displayFeaturedImage'] &&  has_post_thumbnail( $post ) ){ 
            $post_content_class="post";
        }else{ 
            $post_content_class="post gutensee-remove-img";
        }
        $columnno=$attributes['columnNumber'];
        $list_items_markup .= '<div class="'.$ColumnClass.'" id="'.$attributes["addid"].'">';

        if($attributes['poststyle']=='grid-layout'){
            $list_items_markup .= '<div class="post grid-layout">';            
            foreach ($attributes['reorder'] as $index => $field) {
                switch ($field) {

                    case 'Featured Image':  
                        if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
                            $image_markup='';
                            $image_style = '';
                            if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
                                $image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
                            }
                            if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
                                $image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
                            }

                            $image_classes = 'wp-block-latest-posts__featured-image';
                            if ( isset( $attributes['featuredImageAlign'] ) ) {
                                $image_classes .= ' align' . $attributes['featuredImageAlign'];
                            }

                            $featured_image = get_the_post_thumbnail(
                                $post,
                                $attributes['featuredImageSizeSlug'],
                                array(
                                    'style' => esc_attr( $image_style ),
                                )
                            );
                            if ( $attributes['addLinkToFeaturedImage'] ) {
                                $featured_image = sprintf(
                                    '%1$s',
                                    $featured_image
                                );
                            }
                            $image_markup .= sprintf(
                                '<figure class="post-thumbnails %1$s">%2$s</figure>',
                                esc_attr( $image_classes ),
                                $featured_image
                            );
                            $backgroundColor= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayColor'] : '';
                            $opacity= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayOpacity'] : '';
                            $list_items_markup .= '<div class="featured-image post-thumbnail">
                                                        <div class="overlay" style="background-color:'.$backgroundColor.';opacity:'.$opacity.'"></div>
                                                        '.$image_markup.'
                                                    </div>';
                    }
                    break;

                    case 'Meta':
                        if(($attributes['displayAuthor']!=false) || ($attributes['displayPostDate']!=false) || ($attributes['displayCat']!=false) || ($attributes['displayComment']!=false)) {

                            $list_items_markup .= '<div class="post-meta">';                                  

                            if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
                                $author_display_name = get_the_author_meta( 'display_name', $post->post_author );
                                $author_display_url = get_avatar_url( 'avatar_urls', $post->post_id );
                                $author_display_link = get_author_posts_url( $post->post_author );

                                /* translators: byline. %s: current author. */
                                $byline = sprintf( ( '%s' ), $author_display_name );


                                if ( ! empty( $author_display_name ) ) {
                                    if($attributes['authortype']==='image'){
                                        $list_items_markup .= sprintf(
                                            '<span class="author"><img width="1060" height="766" src="'.$author_display_url.'" class="img-fluid" alt="user-1"><a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                            $byline
                                        );
                                    }else{
                                        $list_items_markup .= sprintf(
                                            '<span class="author"><i class="fa-regular fa-user"></i>&nbsp;&nbsp;<a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                            $byline
                                        );
                                    }
                                }
                            }
                            if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                                $list_items_markup .= sprintf(
                                    '<span class="date"><i class="far fa-calendar-alt"></i><a href="#" alt="date-time"><time class="entry-date" datetime="2023-01-03T07:12:10+00:00">%2$s</time></a></span>',
                                    esc_attr( get_the_date( 'c', $post ) ),
                                    get_the_date( '', $post )
                                );
                            }
                            if ( isset( $attributes['displayCat'] ) && $attributes['displayCat'] ) {
                                $categories = get_the_category();
                                $separator = ' ';
                                $output = '';
                                $output .='<span class="tag-links"><i class="far fa-folder"></i>&nbsp;&nbsp;';
                                    if ( ! empty( $categories ) ) {
                                        foreach( $categories as $category ) {
                                            // Translators: %s is the category name.
                                            $output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '" alt="' . esc_attr( sprintf( __( 'View all posts in %s', 'gutensee' ), $category->name ) ) . '">' . esc_html( $category->name ) . '</a>' . $separator;
                                        }
                                    }                
                                $list_items_markup .= trim( $output, $separator );
                                $list_items_markup .='</span>';
                            }  
                            if ( isset( $attributes['displayComment'] ) && $attributes['displayComment'] ) {
                                $commentcounts = get_comments_number();
                                $list_items_markup .= sprintf(
                                    '<span class="comments-link"><i class="far fa-comment"></i>&nbsp;&nbsp;<a href="%2$s/#comments">Comments(%1$s)</a></span>',
                                    $commentcounts,
                                    esc_url( $post_link )
                                );            
                            }                          
                            $list_items_markup .= '</div>';
                        }
                        break;

                    case 'Title':
                        if($attributes['displayTitle']){
                            $list_items_markup .= sprintf(
                                '<header class="post-entry-header"><h3 class="post-entry-title"><a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a></h3></header>',
                                esc_url( $post_link ),
                                $title
                            );
                        }
                        break;

                    case 'Content':
                        $btn_markup ='';
                        if (  $attributes['disablebtn'] !=false &&  $attributes['displayPostContentRadio'] === 'excerpt'  ) {
                            $target=($attributes['opennewtab']) ?'_blank':'_self';
                            $btn_markup .='<a  href="'.esc_url( $post_link ).'" class="more-link" target="'.$target.'">'.$attributes['buttonlabel'].'<i class="fas fa-arrow-right"></i></a>';
                        }

                        if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                            && isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

                            $trimmed_excerpt = get_the_excerpt( $post );

                            if ( post_password_required( $post ) ) {
                                $trimmed_excerpt = esc_html__( 'This content is password protected.' ,'gutensee');
                            }

                            $list_items_markup .= sprintf(
                                '<div class="post-entry-content wp-block-latest-posts__post-excerpt"><p class="spbb-entry-content">%1$s</p>%2$s</div>',
                                $trimmed_excerpt,
                                $btn_markup
                            );
                        }

                        if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                            && isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {

                            $post_content = html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );

                            if ( post_password_required( $post ) ) {
                                $post_content = esc_html__( 'This content is password protected.','gutensee');
                            }

                            $list_items_markup .= sprintf(
                                '<div class="post-entry-content wp-block-latest-posts__post-full-content"><p class="spbb-entry-content">%1$s</p></div>',
                                wp_kses_post( $post_content )
                            );
                        }
                        break;

                    default:
                        $list_items_markup .= '';
                        break;
                }
            }
            $list_items_markup .= "</div>";
        }
        elseif($attributes['poststyle']=='list-layout'){
            $list_items_markup .= '<div class="post list-layout">';            
                if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
                    $image_markup='';
                    $image_style = '';
                    if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
                        $image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
                    }
                    if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
                        $image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
                    }

                    $image_classes = 'wp-block-latest-posts__featured-image';
                    if ( isset( $attributes['featuredImageAlign'] ) ) {
                        $image_classes .= ' align' . $attributes['featuredImageAlign'];
                    }

                    $featured_image = get_the_post_thumbnail(
                        $post,
                        $attributes['featuredImageSizeSlug'],
                        array(
                            'style' => esc_attr( $image_style ),
                        )
                    );
                    if ( $attributes['addLinkToFeaturedImage'] ) {
                        $featured_image = sprintf(
                            '%1$s',
                            $featured_image
                        );
                    }
                    $image_markup .= sprintf(
                        '<figure class="post-thumbnails %1$s">%2$s</figure>',
                        esc_attr( $image_classes ),
                        $featured_image
                    );
                    $backgroundColor= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayColor'] : '';
                    $opacity= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayOpacity'] : '';
                    $list_items_markup .= '<div class="featured-image post-thumbnail">
                                                <div class="overlay" style="background-color:'.$backgroundColor.';opacity:'.$opacity.'"></div>
                                                '.$image_markup.'
                                            </div>';
                }
                $list_items_markup .= '<div class="post-list-layout">';                
                foreach ($attributes['reorder'] as $index => $field) {
                        switch ($field) {

                            case 'Meta':
                                if(($attributes['displayAuthor']!=false) || ($attributes['displayPostDate']!=false) || ($attributes['displayCat']!=false) || ($attributes['displayComment']!=false)) {

                                    $list_items_markup .= '<div class="post-meta">';                                  

                                    if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
                                        $author_display_name = get_the_author_meta( 'display_name', $post->post_author );
                                        $author_display_url = get_avatar_url( 'avatar_urls', $post->post_id );
                                        $author_display_link = get_author_posts_url( $post->post_author );

                                        /* translators: byline. %s: current author. */
                                        $byline = sprintf( '%s' , $author_display_name );


                                        if ( ! empty( $author_display_name ) ) {
                                            if($attributes['authortype']==='image'){
                                                $list_items_markup .= sprintf(
                                                    '<span class="author"><img width="1060" height="766" src="'.$author_display_url.'" class="img-fluid" alt="user-1"><a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                                    $byline
                                                );
                                            }else{
                                                $list_items_markup .= sprintf(
                                                    '<span class="author"><i class="fa-regular fa-user"></i>&nbsp;&nbsp;<a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                                    $byline
                                                );
                                            }
                                        }
                                    }
                                    if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                                        $list_items_markup .= sprintf(
                                            '<span class="date"><i class="far fa-calendar-alt"></i><a href="#" alt="date-time"><time class="entry-date" datetime="2023-01-03T07:12:10+00:00">%2$s</time></a></span>',
                                            esc_attr( get_the_date( 'c', $post ) ),
                                            get_the_date( '', $post )
                                        );
                                    }
                                    if ( isset( $attributes['displayCat'] ) && $attributes['displayCat'] ) {
                                        $categories = get_the_category();
                                        $separator = ' ';
                                        $output = '';
                                        $output .='<span class="tag-links"><i class="far fa-folder"></i>&nbsp;&nbsp;';
                                            if ( ! empty( $categories ) ) {
                                                foreach( $categories as $category ) {
                                                    // Translators: %s is the category name.
                                                    $output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '" alt="' . esc_attr( sprintf( __( 'View all posts in %s', 'gutensee' ), $category->name ) ) . '">' . esc_html( $category->name ) . '</a>' . $separator;
                                                }
                                            }                
                                        $list_items_markup .= trim( $output, $separator );
                                        $list_items_markup .='</span>';
                                    }  
                                    if ( isset( $attributes['displayComment'] ) && $attributes['displayComment'] ) {
                                        $commentcounts = get_comments_number();
                                        $list_items_markup .= sprintf(
                                            '<span class="comments-link"><i class="far fa-comment"></i>&nbsp;&nbsp;<a href="%2$s/#comments">Comments(%1$s)</a></span>',
                                            $commentcounts,
                                            esc_url( $post_link )
                                        );            
                                    }                          
                                    $list_items_markup .= '</div>';
                                }
                                break;

                            case 'Title':
                                if($attributes['displayTitle']){
                                    $list_items_markup .= sprintf(
                                        '<header class="post-entry-header"><h3 class="post-entry-title"><a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a></h3></header>',
                                        esc_url( $post_link ),
                                        $title
                                    );
                                }
                                break;

                            case 'Content':
                                $btn_markup ='';
                                if (  $attributes['disablebtn'] !=false &&  $attributes['displayPostContentRadio'] === 'excerpt'  ) {
                                    $target=($attributes['opennewtab']) ?'_blank':'_self';
                                    $btn_markup .='<a  href="'.esc_url( $post_link ).'" class="more-link" target="'.$target.'">'.$attributes['buttonlabel'].'<i class="fas fa-arrow-right"></i></a>';
                                }

                                if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                                    && isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

                                    $trimmed_excerpt = get_the_excerpt( $post );

                                    if ( post_password_required( $post ) ) {
                                        $trimmed_excerpt = esc_html__( 'This content is password protected.' ,'gutensee');
                                    }

                                    $list_items_markup .= sprintf(
                                        '<div class="post-entry-content wp-block-latest-posts__post-excerpt"><p class="spbb-entry-content">%1$s</p>%2$s</div>',
                                        $trimmed_excerpt,
                                        $btn_markup
                                    );
                                }

                                if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                                    && isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {

                                    $post_content = html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );

                                    if ( post_password_required( $post ) ) {
                                        $post_content = esc_html__( 'This content is password protected.' ,'gutensee');
                                    }

                                    $list_items_markup .= sprintf(
                                        '<div class="post-entry-content wp-block-latest-posts__post-full-content"><p class="spbb-entry-content">%1$s</p></div>',
                                        wp_kses_post( $post_content )
                                    );
                                }
                                break;

                            default:
                                $list_items_markup .= '';
                                break;
                        }
                }
                $list_items_markup .= "</div>";
            $list_items_markup .= "</div>";
        }
        elseif($attributes['poststyle']=='masonry-layout'){
            $list_items_markup .= '<div class="post masonry-layout">';            
            foreach ($attributes['reorder'] as $index => $field) {
                switch ($field) {

                    case 'Featured Image':  
                        if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
                            $image_markup='';
                            $image_style = '';
                            if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
                                $image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
                            }
                            if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
                                $image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
                            }

                            $image_classes = 'wp-block-latest-posts__featured-image';
                            if ( isset( $attributes['featuredImageAlign'] ) ) {
                                $image_classes .= ' align' . $attributes['featuredImageAlign'];
                            }

                            $featured_image = get_the_post_thumbnail(
                                $post,
                                $attributes['featuredImageSizeSlug'],
                                array(
                                    'style' => esc_attr( $image_style ),
                                )
                            );
                            if ( $attributes['addLinkToFeaturedImage'] ) {
                                $featured_image = sprintf(
                                    '%1$s',
                                    $featured_image
                                );
                            }
                            $image_markup .= sprintf(
                                '<figure class="post-thumbnails %1$s">%2$s</figure>',
                                esc_attr( $image_classes ),
                                $featured_image
                            );
                            $backgroundColor= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayColor'] : '';
                            $opacity= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayOpacity'] : '';
                            $list_items_markup .= '<div class="featured-image post-thumbnail">
                                                        <div class="overlay" style="background-color:'.$backgroundColor.';opacity:'.$opacity.'"></div>
                                                        '.$image_markup.'
                                                    </div>';
                    }
                    break;

                    case 'Meta':
                        if(($attributes['displayAuthor']!=false) || ($attributes['displayPostDate']!=false) || ($attributes['displayCat']!=false) || ($attributes['displayComment']!=false)) {

                            $list_items_markup .= '<div class="post-meta">';                                  

                            if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
                                $author_display_name = get_the_author_meta( 'display_name', $post->post_author );
                                $author_display_url = get_avatar_url( 'avatar_urls', $post->post_id );
                                $author_display_link = get_author_posts_url( $post->post_author );

                                /* translators: byline. %s: current author. */
                                $byline = sprintf( '%s' , $author_display_name );


                                if ( ! empty( $author_display_name ) ) {
                                    if($attributes['authortype']==='image'){
                                        $list_items_markup .= sprintf(
                                            '<span class="author"><img width="1060" height="766" src="'.$author_display_url.'" class="img-fluid" alt="user-1"><a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                            $byline
                                        );
                                    }else{
                                        $list_items_markup .= sprintf(
                                            '<span class="author"><i class="fa-regular fa-user"></i>&nbsp;&nbsp;<a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                            $byline
                                        );
                                    }
                                }
                            }
                            if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                                $list_items_markup .= sprintf(
                                    '<span class="date"><i class="far fa-calendar-alt"></i><a href="#" alt="date-time"><time class="entry-date" datetime="2023-01-03T07:12:10+00:00">%2$s</time></a></span>',
                                    esc_attr( get_the_date( 'c', $post ) ),
                                    get_the_date( '', $post )
                                );
                            }
                            if ( isset( $attributes['displayCat'] ) && $attributes['displayCat'] ) {
                                $categories = get_the_category();
                                $separator = ' ';
                                $output = '';
                                $output .='<span class="tag-links"><i class="far fa-folder"></i>&nbsp;&nbsp;';
                                    if ( ! empty( $categories ) ) {
                                        foreach( $categories as $category ) {
                                            // Translators: %s is the category name.
                                            $output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '" alt="' . esc_attr( sprintf( __( 'View all posts in %s', 'gutensee' ), $category->name ) ) . '">' . esc_html( $category->name ) . '</a>' . $separator;
                                        }
                                    }                
                                $list_items_markup .= trim( $output, $separator );
                                $list_items_markup .='</span>';
                            }  
                            if ( isset( $attributes['displayComment'] ) && $attributes['displayComment'] ) {
                                $commentcounts = get_comments_number();
                                $list_items_markup .= sprintf(
                                    '<span class="comments-link"><i class="far fa-comment"></i>&nbsp;&nbsp;<a href="%2$s/#comments">Comments(%1$s)</a></span>',
                                    $commentcounts,
                                    esc_url( $post_link )
                                );            
                            }                          
                            $list_items_markup .= '</div>';
                        }
                        break;

                    case 'Title':
                        if($attributes['displayTitle']){
                            $list_items_markup .= sprintf(
                                '<header class="post-entry-header"><h3 class="post-entry-title"><a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a></h3></header>',
                                esc_url( $post_link ),
                                $title
                            );
                        }                        
                        break;

                    case 'Content':
                        $btn_markup ='';
                        if (  $attributes['disablebtn'] !=false &&  $attributes['displayPostContentRadio'] === 'excerpt'  ) {
                            $target=($attributes['opennewtab']) ?'_blank':'_self';
                            $btn_markup .='<a  href="'.esc_url( $post_link ).'" class="more-link" target="'.$target.'">'.$attributes['buttonlabel'].'<i class="fas fa-arrow-right"></i></a>';
                        }

                        if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                            && isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

                            $trimmed_excerpt = get_the_excerpt( $post );

                            if ( post_password_required( $post ) ) {
                                $trimmed_excerpt = esc_html__( 'This content is password protected.','gutensee');
                            }

                            $list_items_markup .= sprintf(
                                '<div class="post-entry-content wp-block-latest-posts__post-excerpt"><p class="spbb-entry-content">%1$s</p>%2$s</div>',
                                $trimmed_excerpt,
                                $btn_markup
                            );
                        }

                        if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                            && isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {

                            $post_content = html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );

                            if ( post_password_required( $post ) ) {
                                $post_content = esc_html__( 'This content is password protected.' ,'gutensee');
                            }

                            $list_items_markup .= sprintf(
                                '<div class="post-entry-content wp-block-latest-posts__post-full-content"><p class="spbb-entry-content">%1$s</p></div>',
                                wp_kses_post( $post_content )
                            );
                        }
                        break;

                    default:
                        $list_items_markup .= '';
                        break;
                }
            }
            $list_items_markup .= "</div>";
        }
        elseif($attributes['poststyle']=='cover-layout'){
            $list_items_markup .= '<div class="post cover-layout">';            
                if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
                    $image_markup='';
                    $image_style = '';
                    if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
                        $image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
                    }
                    if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
                        $image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
                    }

                    $image_classes = 'wp-block-latest-posts__featured-image';
                    if ( isset( $attributes['featuredImageAlign'] ) ) {
                        $image_classes .= ' align' . $attributes['featuredImageAlign'];
                    }

                    $featured_image = get_the_post_thumbnail(
                        $post,
                        $attributes['featuredImageSizeSlug'],
                        array(
                            'style' => esc_attr( $image_style ),
                        )
                    );
                    if ( $attributes['addLinkToFeaturedImage'] ) {
                        $featured_image = sprintf(
                            '%1$s',
                            $featured_image
                        );
                    }
                    $image_markup .= sprintf(
                        '<figure class="post-thumbnails %1$s">%2$s</figure>',
                        esc_attr( $image_classes ),
                        $featured_image
                    );
                    $backgroundColor= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayColor'] : '';
                    $opacity= ($attributes['bgImageOverlay']) ? $attributes['bgOverlayOpacity'] : '';
                    $list_items_markup .= '<div class="featured-image post-thumbnail">
                                                <div class="overlay" style="background-color:'.$backgroundColor.';opacity:'.$opacity.'"></div>
                                                '.$image_markup.'
                                            </div>';
                }
                $list_items_markup .= '<div class="post-cover-layout">';                
                foreach ($attributes['reorder'] as $index => $field) {
                        switch ($field) {

                            case 'Meta':
                                if(($attributes['displayAuthor']!=false) || ($attributes['displayPostDate']!=false) || ($attributes['displayCat']!=false) || ($attributes['displayComment']!=false)) {

                                    $list_items_markup .= '<div class="post-meta">';                                  

                                    if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
                                        $author_display_name = get_the_author_meta( 'display_name', $post->post_author );
                                        $author_display_url = get_avatar_url( 'avatar_urls', $post->post_id );
                                        $author_display_link = get_author_posts_url( $post->post_author );

                                        /* translators: byline. %s: current author. */
                                        $byline = sprintf( '%s' , $author_display_name );


                                        if ( ! empty( $author_display_name ) ) {
                                            if($attributes['authortype']==='image'){
                                                $list_items_markup .= sprintf(
                                                    '<span class="author"><img width="1060" height="766" src="'.$author_display_url.'" class="img-fluid" alt="user-1"><a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                                    $byline
                                                );
                                            }else{
                                                $list_items_markup .= sprintf(
                                                    '<span class="author"><i class="fa-regular fa-user"></i>&nbsp;&nbsp;<a href="'.esc_url( $author_display_link).'">%1$s</a></span>',
                                                    $byline
                                                );
                                            }
                                        }
                                    }
                                    if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                                        $list_items_markup .= sprintf(
                                            '<span class="date"><i class="far fa-calendar-alt"></i><a href="#" alt="date-time"><time class="entry-date" datetime="2023-01-03T07:12:10+00:00">%2$s</time></a></span>',
                                            esc_attr( get_the_date( 'c', $post ) ),
                                            get_the_date( '', $post )
                                        );
                                    }
                                    if ( isset( $attributes['displayCat'] ) && $attributes['displayCat'] ) {
                                        $categories = get_the_category();
                                        $separator = ' ';
                                        $output = '';
                                        $output .='<span class="tag-links"><i class="far fa-folder"></i>&nbsp;&nbsp;';
                                            if ( ! empty( $categories ) ) {
                                                foreach( $categories as $category ) {
                                                    // Translators: %s is the category name.
                                                    $output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '" alt="' . esc_attr( sprintf( __( 'View all posts in %s', 'gutensee' ), $category->name ) ) . '">' . esc_html( $category->name ) . '</a>' . $separator;
                                                }
                                            }                
                                        $list_items_markup .= trim( $output, $separator );
                                        $list_items_markup .='</span>';
                                    }  
                                    if ( isset( $attributes['displayComment'] ) && $attributes['displayComment'] ) {
                                        $commentcounts = get_comments_number();
                                        $list_items_markup .= sprintf(
                                            '<span class="comments-link"><i class="far fa-comment"></i>&nbsp;&nbsp;<a href="%2$s/#comments">Comments(%1$s)</a></span>',
                                            $commentcounts,
                                            esc_url( $post_link )
                                        );            
                                    }                          
                                    $list_items_markup .= '</div>';
                                }
                                break;

                            case 'Title':
                                if($attributes['displayTitle']){
                                    $list_items_markup .= sprintf(
                                        '<header class="post-entry-header"><h3 class="post-entry-title"><a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a></h3></header>',
                                        esc_url( $post_link ),
                                        $title
                                    );
                                }
                                break;

                            case 'Content':
                                $btn_markup ='';
                                if (  $attributes['disablebtn'] !=false &&  $attributes['displayPostContentRadio'] === 'excerpt'  ) {
                                    $target=($attributes['opennewtab']) ?'_blank':'_self';
                                    $btn_markup .='<a  href="'.esc_url( $post_link ).'" class="more-link" target="'.$target.'">'.$attributes['buttonlabel'].'<i class="fas fa-arrow-right"></i></a>';
                                }

                                if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                                    && isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

                                    $trimmed_excerpt = get_the_excerpt( $post );

                                    if ( post_password_required( $post ) ) {
                                        $trimmed_excerpt = esc_html__( 'This content is password protected.' ,'gutensee');
                                    }

                                    $list_items_markup .= sprintf(
                                        '<div class="post-entry-content wp-block-latest-posts__post-excerpt"><p class="spbb-entry-content">%1$s</p>%2$s</div>',
                                        $trimmed_excerpt,
                                        $btn_markup
                                    );
                                }

                                if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                                    && isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {

                                    $post_content = html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );

                                    if ( post_password_required( $post ) ) {
                                        $post_content = esc_html__( 'This content is password protected.','gutensee');
                                    }

                                    $list_items_markup .= sprintf(
                                        '<div class="post-entry-content wp-block-latest-posts__post-full-content"><p class="spbb-entry-content">%1$s</p></div>',
                                        wp_kses_post( $post_content )
                                    );
                                }
                                break;

                            default:
                                $list_items_markup .= '';
                                break;
                        }
                }
                $list_items_markup .= "</div>";
            $list_items_markup .= "</div>";
        }

        $list_items_markup .= '</div>';
          
            
    }

        

    remove_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length__premium_only', 20 );

    $class = 'wp-block-latest-posts__list';

    if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
        $class .= ' is-grid';
    }

    if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
        $class .= ' columns-' . $attributes['columns'];
    }

    if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
        $class .= ' has-dates';
    }

    if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
        $class .= ' has-author';
    }

    $wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $class ) );

    $list_items_markup .='</div></div>';

    
    $list_items_markup .=$attributes['addjs'];
    
    return $list_items_markup;
}