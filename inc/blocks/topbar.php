<?php

function gutensee_render_date_time_callback($attributes) {
    $list_items_markup = '';

    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';
    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;
    $animationclass='wow animated '.$attributes['durations'].' '.$attributes['animation'];
    $alignmentClass = ($attributes['textAlignment'] != null) ? 'has-text-align-'.$attributes['textAlignment'] : '';

    $bordertop=(!empty($attributes['border']['top'])) ? $attributes['border']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['border']['top']['color'] : null;
    $borderright=(!empty($attributes['border']['right'])) ? $attributes['border']['right']['width'].' '. $attributes['border']['right']['style'].' '. $attributes['border']['right']['color'] : null;
    $borderbottom=(!empty($attributes['border']['bottom'])) ? $attributes['border']['bottom']['width'].' '. $attributes['border']['bottom']['style'].' '. $attributes['border']['bottom']['color'] : null;
    $borderleft=(!empty($attributes['border']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['border']['left']['color'] : null;

    $iconbordertop=(!empty($attributes['iconborder']['top'])) ? $attributes['iconborder']['top']['width'].' '. $attributes['iconborder']['top']['style'].' '. $attributes['iconborder']['top']['color'] : null;
    $iconborderright=(!empty($attributes['iconborder']['right'])) ? $attributes['iconborder']['right']['width'].' '. $attributes['iconborder']['right']['style'].' '. $attributes['iconborder']['right']['color'] : null;
    $iconborderbottom=(!empty($attributes['iconborder']['bottom'])) ? $attributes['iconborder']['bottom']['width'].' '. $attributes['iconborder']['bottom']['style'].' '. $attributes['iconborder']['bottom']['color'] : null;
    $iconborderleft=(!empty($attributes['iconborder']['left'] )) ? $attributes['iconborder']['left']['width'].' '. $attributes['iconborder']['left']['style'].' '. $attributes['iconborder']['left']['color'] : null;

    $textbordertop=(!empty($attributes['textborder']['top'])) ? $attributes['textborder']['top']['width'].' '. $attributes['textborder']['top']['style'].' '. $attributes['textborder']['top']['color'] : null;
    $textborderright=(!empty($attributes['textborder']['right'])) ? $attributes['textborder']['right']['width'].' '. $attributes['textborder']['right']['style'].' '. $attributes['textborder']['right']['color'] : null;
    $textborderbottom=(!empty($attributes['textborder']['bottom'])) ? $attributes['textborder']['bottom']['width'].' '. $attributes['textborder']['bottom']['style'].' '. $attributes['textborder']['bottom']['color'] : null;
    $textborderleft=(!empty($attributes['textborder']['left'] )) ? $attributes['textborder']['left']['width'].' '. $attributes['textborder']['left']['style'].' '. $attributes['textborder']['left']['color'] : null;
    

    $dateFormat = isset($attributes['dateFormat']) ? $attributes['dateFormat'] : 'MM/DD/YYYY';
    $timeFormat = isset($attributes['timeFormat']) ? $attributes['timeFormat'] : 'HH:mm:ss';
    $now = new DateTime();
    $topbartarget=($attributes['topbartarget'] === true ) ? '_blank' : 'self';
    $args = [
        'post_type' => 'post',
        'paged' => 1,
        'posts_per_page'=>4
    ];
    $query = new WP_Query($args);

    $list_items_markup .=$attributes['addcss'];

    // Format the date based on selected format
    switch ($dateFormat) {
        case 'MM/DD/YYYY':
            $displayDateValue = $now->format('m/d/Y');
            break;
        case 'DD/MM/YYYY':
            $displayDateValue = $now->format('d/m/Y');
            break;
        case 'YYYY/MM/DD':
            $displayDateValue = $now->format('Y/m/d');
            break;
        case 'D MMMM YYYY':
            $displayDateValue = $now->format('j F Y');
            break;
        default:
            $displayDateValue = $now->format('m/d/Y');
            break;
    }

    // Format the time based on selected format
    switch ($timeFormat) {
        case 'HH:mm:ss':
            $displayTimeValue = $now->format('H:i:s');
            break;
        case 'hh:mm:ss A':
            $displayTimeValue = $now->format('h:i:s A');
            break;
        case 'HH:mm':
            $displayTimeValue = $now->format('H:i');
            break;
        case 'hh:mm A':
            $displayTimeValue = $now->format('h:i A');
            break;
        default:
            $displayTimeValue = $now->format('H:i:s');
            break;
    }
    $content='';
    switch ($attributes['topbartypes']) {
        case 'date':
            $content='<div><span class="date"><i class="'.$attributes['topbaricon'].'"></i>'.$displayDateValue.'</span></div>';
            break;
        case 'time':
            $content='<div><i class="'.$attributes['topbaricon'].'"></i><span class="display-time" data-time-format="'.$timeFormat.'">'.$displayTimeValue.'</span></div>';
            break;
        case 'post':
            $content .='<div class="slick-slider '.$attributes['uniqueid'].'">';
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $content .='<div class="slide '.$alignmentClass.'"><span class="slide-heading"><a href="'.get_the_permalink().'"><i class="'.$attributes['topbaricon'].'"}></i>'.get_the_title().'</a></span></div>';
                }
            }

            $content .='</div>';
            break;
        case 'custom':
            $content='<div><span><a href="'.$attributes['textlink'].'" target="'.$topbartarget.'"><i class="'.$attributes['topbaricon'].'"></i>'.$attributes['text'].'</a></span></div>';
            break;
        default:
            $content = '';
            break;
    }

    $list_items_markup .= '<div id="'.$attributes['advid'].'"><div class="gutensee-topbar '.$displayclass.' '.$animationclass.' '.$alignmentClass.' '.$attributes['advclass'].'" id="'.$attributes['uniqueid'].'">'.$content.'</div></div>';

    $list_items_markup .=$attributes['addjs'];

    return $list_items_markup;
}