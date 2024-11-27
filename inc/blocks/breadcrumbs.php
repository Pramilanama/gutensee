<?php
function gutensee_render_breadcrumbs_callback($attributes) {
    // Determine the heading level (default to h2)
    $uniqueid=$attributes['uniqueid'];
    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';
    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;
    $animationclass='wow animated '.$attributes['durations'].' '.$attributes['animation'];

    $bordertop=(!empty($attributes['border']['top'])) ? $attributes['border']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['border']['top']['color'] : null;
    $borderright=(!empty($attributes['border']['right'])) ? $attributes['border']['right']['width'].' '. $attributes['border']['right']['style'].' '. $attributes['border']['right']['color'] : null;
    $borderbottom=(!empty($attributes['border']['bottom'])) ? $attributes['border']['bottom']['width'].' '. $attributes['border']['bottom']['style'].' '. $attributes['border']['bottom']['color'] : null;
    $borderleft=(!empty($attributes['border']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['border']['left']['color'] : null;

    $borderwidth=(!empty($attributes['border']['width']))? $attributes['border']['width'] :null;
    $borderstyle=(!empty($attributes['border']['style']))? $attributes['border']['style'] :null;
    $bordercolor=(!empty($attributes['border']['color']))? $attributes['border']['color'] :null;

    $output =$attributes['addcss'];
    $heading_level = isset($attributes['headingLevel']) ? $attributes['headingLevel'] : 'h2';
    $output .= '<div id="'.$attributes['advid'].'"><div id="'.$uniqueid.'" class="gutensee-breadcrumb '.$displayclass.' '.$animationclass.' '.$attributes['advclass'].'">';
    // Initialize the output with the current page title or other relevant titles
    $output .= '<' . $heading_level . '>';

    if (is_search()) {
        // Show search query for search results page
        $output .= 'You searched for: ' . get_search_query();
    } elseif (is_category()) {
        // Show category name on category archive pages
        $output .= single_cat_title('', false);
    } elseif (is_tag()) {
        // Show tag name on tag archive pages
        $output .= single_tag_title('', false);
    } elseif (is_archive()) {
        // Show post type archive name (like author, date, etc.)
        if (is_author()) {
            $output .= get_the_author();
        } elseif (is_date()) {
            $output .= get_the_date();
        } elseif (is_post_type_archive()) {
            $output .= post_type_archive_title('', false);
        }
    } else {
        // Default title for other types of pages
        $output .= get_the_title();
    }

    $output .= '</' . $heading_level . '>';
    $output .= '<div>';
    // Start breadcrumbs with Home link
    $output .= '<nav class="breadcrumbs">';
    $homeicon=($attributes['enableicon']==true)? '<i class="fa-solid fa-house"></i>' : '';
    $home=($attributes['enablehomebreadcumb']==true)? 'Home' : '';
    $output .= '<a class="breadcrumbs-icon" href="' . home_url() . '">'.$homeicon.'</a>';
    $output .= '<a href="' . home_url() . '">'.$home.'</a>';

    if (!empty($attributes['separator'])) {
        $output .= '<span class="breadcrumbs-separator"><i class="' . esc_html($attributes['separator']) . '"></i></span>';
    }

    if (is_search()) {
        // For search pages, add the search query to the breadcrumbs
        $output .= '<span>You searched for: ' . get_search_query() . '</span>';
    } elseif (is_category()) {
        // For category archives
        $category = get_category(get_query_var('cat'));
        if ($category->parent != 0) {
            $ancestors = array_reverse(get_ancestors($category->term_id, 'category'));
            foreach ($ancestors as $ancestor) {
                $ancestor_category = get_category($ancestor);
                $output .= '<a href="' . get_category_link($ancestor_category->term_id) . '">' . $ancestor_category->name . '</a>';
                $output .= '<span class="breadcrumbs-separator"><i class="' . esc_html($attributes['separator']) . '"></i></span>';
            }
        }
        $output .= '<span>' . single_cat_title('', false) . '</span>';
    } elseif (is_tag()) {
        // For tag archives
        $output .= '<span>' . single_tag_title('', false) . '</span>';
    } elseif (is_archive()) {
        // For other types of archives (author, date, etc.)
        if (is_author()) {
            $output .= '<span>' . get_the_author() . '</span>';
        } elseif (is_date()) {
            $output .= '<span>' . get_the_date() . '</span>';
        } elseif (is_post_type_archive()) {
            $output .= '<span>' . post_type_archive_title('', false) . '</span>';
        }
    } elseif (is_single()) {
        // Single post breadcrumbs with category
        $categories = get_the_category();
        if ($categories) {
            $category = $categories[0];
            $ancestors = array_reverse(get_ancestors($category->term_id, 'category'));
            foreach ($ancestors as $ancestor) {
                $ancestor_category = get_category($ancestor);
                $output .= '<a href="' . get_category_link($ancestor_category->term_id) . '">' . $ancestor_category->name . '</a>';
                $output .= '<span class="breadcrumbs-separator"><i class="' . esc_html($attributes['separator']) . '"></i></span>';
            }
            $output .= '<a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a>';
            $output .= '<span class="breadcrumbs-separator"><i class="' . esc_html($attributes['separator']) . '"></i></span>';
        }
        $output .= '<span>' . get_the_title() . '</span>';
    } elseif (is_page()) {
        // Breadcrumbs for pages with parent pages
        global $post;
        if ($post->post_parent) {
            $ancestors = array_reverse(get_post_ancestors($post->ID));
            foreach ($ancestors as $ancestor) {
                $output .= '<a href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a>';
                $output .='<span class="breadcrumbs-separator"><i class="' . esc_html($attributes['separator']) . '"></i></span>';
            }
        }
        $output .= '<span>' . get_the_title() . '</span>';
    } else {
        // For homepage or any other page without specific taxonomy
        $output .= '<span>' . get_the_title() . '</span>';
    }

    $output .= '</nav>';

    $output .= '</div>';
    $output .= '</div></div>';
    $output .=$attributes['addjs'];
    return $output;
}