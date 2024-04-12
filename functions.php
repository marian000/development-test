<?php

// code to enqueue parent theme styles
function enqueue_parent_styles()
{
  wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}

add_action('wp_enqueue_scripts', 'enqueue_parent_styles');


// Include user function
require_once get_stylesheet_directory() . '/includes/user-functions.php';


// Include custom post type
require_once get_stylesheet_directory() . '/includes/custom-posts.php';


// Include page settings
require_once get_stylesheet_directory() . '/includes/page-settings.php';



/**
 * Load the admin script.
 *
 * @param string $hook The hook name of the page.
 */
function load_custom_wp_admin_scripts($hook)
{
  // Load only on ?page=my-custom-gutenberg-app.
  if ('products_page_product_custom_settings' !== $hook) {
    return;
  }

  // Load the required WordPress packages.

  $file_path = __DIR__;

  // Automatically load imported dependencies and assets version.
  $asset_file = include $file_path . '/block-development/build/index.asset.php';

  // Enqueue CSS dependencies.
  foreach ($asset_file['dependencies'] as $style) {
    wp_enqueue_style($style);
  }

  // Load our app.js.
  wp_register_script(
    'my-custom-gutenberg-app',
    get_stylesheet_directory_uri() . '/block-development/build/index.js',
    $asset_file['dependencies'],
    $asset_file['version'],
    true
  );
  wp_enqueue_script('my-custom-gutenberg-app');

  // Load our style.css.
  wp_register_style(
    'my-custom-gutenberg-app',
    get_stylesheet_directory_uri() . 'block-development/build/style-index.css',
    array(),
    $asset_file['version']
  );
  wp_enqueue_style('my-custom-gutenberg-app');
}

add_action('admin_enqueue_scripts', 'load_custom_wp_admin_scripts');
