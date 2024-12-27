<?php 
/**
* Plugin Name:          Gutensee
* Plugin URI:
* Description:          Gutensee is a Gutenberg base block plugin that helps to build a beautiful block websites.
* Version:              1.0.5
* Requires at least:    5.3
* Requires PHP:         5.4
* Tested up to:         6.7.1
* Author:               premila
* Author URI:           
* License:              GPLv2 or later
* License URI:          https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:          gutensee
* Domain Path:          /lang
*/
if( !defined( 'ABSPATH' ) ) {exit(); }
define('GUTENSEE_VERSION', '1.0.4');
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

function gutensee_save_gravatar_to_media_library($gravatar_url) {
    // Validate Gravatar URL
    if (empty($gravatar_url) || !filter_var($gravatar_url, FILTER_VALIDATE_URL)) {
        return new WP_Error('invalid_url', 'The provided Gravatar URL is not valid.');
    }

    // Parse URL to get the filename
    $parsed_url = wp_parse_url($gravatar_url);
    $query_params = [];
    if (!empty($parsed_url['query'])) {
        parse_str($parsed_url['query'], $query_params);
    }
    $filename = sanitize_file_name(md5($gravatar_url) . '.jpg'); // Unique filename based on the URL

    // Get the upload directory
    $upload_dir = wp_upload_dir();
    $file_path = trailingslashit($upload_dir['path']) . $filename;

    // Check if the file already exists
    if (file_exists($file_path)) {
        $attachment_id = attachment_url_to_postid($upload_dir['url'] . '/' . $filename);
        if ($attachment_id) {
            return $attachment_id; // Return existing attachment ID
        }
    }

    // Fetch the image data
    $response = wp_remote_get($gravatar_url);
    if (is_wp_error($response)) {
        return new WP_Error('fetch_error', 'Failed to fetch the Gravatar image.');
    }

    $image_data = wp_remote_retrieve_body($response);
    if (empty($image_data)) {
        return new WP_Error('empty_image_data', 'The image data is empty.');
    }

    // Load WP_Filesystem
    if (empty($GLOBALS['wp_filesystem'])) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        WP_Filesystem();
    }

    global $wp_filesystem;

    // Write image data to the file
    if (!$wp_filesystem->put_contents($file_path, $image_data, FS_CHMOD_FILE)) {
        return new WP_Error('file_write_error', 'Failed to write the image file.');
    }

    // Check file type and prepare attachment data
    $filetype = wp_check_filetype($filename, null);
    $attachment_data = array(
        'post_mime_type' => $filetype['type'],
        'post_title'     => sanitize_file_name($filename),
        'post_content'   => '',
        'post_status'    => 'inherit',
    );

    // Insert attachment into the Media Library
    $attachment_id = wp_insert_attachment($attachment_data, $file_path);
    if (is_wp_error($attachment_id)) {
        return $attachment_id; // Return error if failed
    }

    // Generate attachment metadata
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $attachment_metadata = wp_generate_attachment_metadata($attachment_id, $file_path);
    wp_update_attachment_metadata($attachment_id, $attachment_metadata);

    return $attachment_id; // Return attachment ID
}

