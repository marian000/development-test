<?php

function register_custom_post_products()
{
  // Register custom post type 'Products'
  register_post_type('products', array(
    'labels' => array(
      'name' => 'Products',
      'singular_name' => 'Product',
    ),
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'show_in_rest' => true,
    'menu_icon' => 'dashicons-products',
  ));

  // Register custom taxonomy 'Categories' for products
  register_taxonomy('product_categories', 'products', array(
    'label' => 'Categories',
    'hierarchical' => true,
    'show_in_rest' => true
  ));


  // handle custom metadata in WordPress REST API
  register_post_meta('products', 'price', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'number',
  ));
  register_post_meta('products', 'sale_price', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'number',
  ));
  register_post_meta('products', 'is_on_sale', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'boolean',
  ));
  register_post_meta('products', 'youtube_video', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
  ));
}

// registers a custom post type products and a custom taxonomy categories linked to the products post type
add_action('init', 'register_custom_post_products');


// modify the response using the rest_prepare_post filter in WordPress to include the featured image URL
function add_featured_image_to_api_response()
{
  register_rest_field('products', 'featured_image_src', [
    'get_callback' => function ($post_arr) {
      if ($featured_image_id = $post_arr['featured_media']) {  // if there is a featured image
        $featured_image_src = wp_get_attachment_image_src($featured_image_id, 'thumbnail'); // or any other image size
        return $featured_image_src[0];
      }
      return false; // no featured image
    },
    'update_callback' => null,
    'schema' => null,
  ]);
}


add_action('rest_api_init', 'add_featured_image_to_api_response');
