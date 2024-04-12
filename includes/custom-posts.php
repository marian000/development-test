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
}

// registers a custom post type products and a custom taxonomy categories linked to the products post type
add_action('init', 'register_custom_post_products');
