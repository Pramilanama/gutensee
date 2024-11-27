<?php
/**
 * Register Block Editor Assets
 */   
add_action('enqueue_block_editor_assets','gutensee_register_block_editor_assets');
function gutensee_register_block_editor_assets(){
    wp_enqueue_script('gutensee-main', GUTENSEE_PLUGIN_URL.'/build/index.js', [ 'wp-blocks', 'wp-editor', 'wp-i18n', 'wp-element', 'wp-components', 'wp-data', ],'1.0.0',true);
}

/**
 * Register Block Assets
 */  
add_action('enqueue_block_assets','gutensee_register_block_assets');
function gutensee_register_block_assets(){        
    wp_enqueue_style('gutensee-animate', GUTENSEE_PLUGIN_URL.'assets/css/animate.css', '1.0.0', 'all');  
    wp_enqueue_style('gutensee-menu', GUTENSEE_PLUGIN_URL.'assets/css/menu.css', '1.0.0', 'all');              
    wp_enqueue_style('gutensee-style', GUTENSEE_PLUGIN_URL.'assets/css/style.css', [], '1.0.0', 'all');  
    wp_enqueue_style('gutensee-fontawesome-css', GUTENSEE_PLUGIN_URL.'assets/css/font-awesome/css/all.min.css', ['wp-edit-blocks'],'1.0.0', 'all' );
    wp_enqueue_style('gutensee-slick-css', GUTENSEE_PLUGIN_URL.'assets/css/slick.css', '1.8.1', 'all');
    wp_enqueue_script('gutensee-fontawesome', GUTENSEE_PLUGIN_URL.'assets/js/font-awesome/js/brands.js', array(), '1.0.0', true);    
    wp_enqueue_script('gutensee-slick-js',GUTENSEE_PLUGIN_URL.'assets/js/slick.min.js', array('jquery'), '1.8.1', true);
    wp_enqueue_style('gutensee-slickslider-theme-css', GUTENSEE_PLUGIN_URL.'assets/css/slick-theme.css', array(), '1.8.1');
}
    
/**
 * Register Admin Scripts
 */  
add_action('admin_enqueue_scripts','gutensee_register_admin_scripts');         
function gutensee_register_admin_scripts(){  
    wp_enqueue_script('gutensee-editor', GUTENSEE_PLUGIN_URL.'assets/js/editor.js', array('jquery'),wp_rand(), true);
    wp_localize_script('gutensee-editor','gutensee_plugin',['gutensee_pluginpath' => GUTENSEE_PLUGIN_URL ]);
    wp_enqueue_script('gutensee-editor');
    wp_enqueue_style( 'gutensee-editor', GUTENSEE_PLUGIN_URL.'assets/css/editor.css',['wp-edit-blocks'], '1.0.0', 'all');
    wp_enqueue_style('gutensee-fontawesome-css', GUTENSEE_PLUGIN_URL.'assets/css/all.min.css', '1.0.0', 'all' );
}
