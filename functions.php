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
