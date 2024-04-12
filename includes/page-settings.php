<?php

function product_settings_page()
{
  add_submenu_page(
    'edit.php?post_type=products', // Parent slug: Adjust this to the actual slug of your custom post type
    __('Product Plugin Settings', 'product-custom'), // Page title
    __('Settings', 'product-custom'), // Menu title
    'manage_options', // Capability
    'product_custom_settings', // Menu slug
    'render_settings_html' // Callback function
  );
}


add_action('admin_menu', 'product_settings_page', 10);


// Callback function for rendering the settings page
function render_settings_html()
{
?>
  <div style="padding:20px;">
    <h1><?php _e('Product Plugin Settings', 'product-custom'); ?></h1>
    <div id="my-custom-gutenberg-app"></div>
  </div>
<?php
}
