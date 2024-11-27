<?php 
/**
* Plugin Name:          Gutensee
* Plugin URI:
* Description:          Gutensee Plugin
* Version:              1.0.2
* Requires at least:    5.3
* Requires PHP:         5.2
* Tested up to:         6.7
* Author:               premila
* Author URI:           
* License:              GPLv2 or later
* License URI:          https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:          gutensee
* Domain Path:          /lang
*/

if( !defined( 'ABSPATH' ) ) {exit(); }
define('GUTENSEE__VERSION', '0.3');
define('GUTENSEE_PLUGIN_PATH',trailingslashit(plugin_dir_path(__FILE__)));
define('GUTENSEE_PLUGIN_URL',trailingslashit(plugins_url('/',__FILE__)));

/**
 * Enqueue Script
 */
require_once GUTENSEE_PLUGIN_PATH.'/inc/script.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/templates/template.php';


/**
 * Add Blocks
 */
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/navbar.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/topbar.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/breadcrumbs.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/latest-post.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/post-query.php';
require_once GUTENSEE_PLUGIN_PATH.'/inc/blocks/contact-us.php';

/**

 * Load the localisation file.
 */
add_action('init','gutensee_load_plugin_textdomain');
function gutensee_load_plugin_textdomain() {
    load_plugin_textdomain( 'gutensee', false, dirname( plugin_basename( __FILE__ ) ) . '/lang' );
}
 

/**
 * Add plugin Class
 */
add_filter( 'body_class', function ( $classes ) {
    $classes[] = 'gutensee';
    return $classes;
});


/**
 * Add Category
 */
function gutensee_custom_block_category( $gutensee_categories ) {
    return array_merge(
        array(
            array(
                'slug' => 'gutensee',
                'title' => __( 'Gutensee', 'gutensee' ),
            ),
        ),
        $gutensee_categories
    );
}
if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
    add_filter( 'block_categories_all', 'gutensee_custom_block_category' );
} else {
    add_filter( 'block_categories', 'gutensee_custom_block_category', 10, 2 );
}

function gutensee_add_template() {
    if(file_exists(get_template_directory().'/theme.json')){
        $plugin_dir_left = plugin_dir_path( __FILE__ ) . 'inc/templates/gutensee-template.html';
        $theme_dir_left = get_stylesheet_directory() . '/templates/gutensee-template.html';

        if (!copy($plugin_dir_left, $theme_dir_left)) {
            echo esc_html("failed to copy $plugin_dir_left to $theme_dir_left...\n",'gutensee' );
        }
        function gutensee_filter_theme_json_theme_template( $theme_json ){
            $new_data = array(
                'version'  => 2,
                'customTemplates'=> array(
                    array(
                        'name'=> 'gutensee-template',
                        'title'=> 'Gutensee Template'
                    ),   
                ),
            );

            return $theme_json->update_with( $new_data );
        }
        add_filter( 'wp_theme_json_data_theme', 'gutensee_filter_theme_json_theme_template' );
    }
    else{
        $plugin_dir_left = plugin_dir_path( __FILE__ ) . 'inc/templates/gutensee-template.php';
        $theme_dir_left = get_stylesheet_directory() . '/gutensee-template.php';

        if (!copy($plugin_dir_left, $theme_dir_left)) {
            echo esc_html("failed to copy $plugin_dir_left to $theme_dir_left...\n",'gutensee' );
        }
    }
}
add_action( 'wp_head', 'gutensee_add_template' );
