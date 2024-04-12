<?php

// code to create a new user with username 'wp-test' and password '123456789'
add_action('init', function () {
  if (!username_exists('wp-test')) {
    $user_id = wp_create_user('wp-test', '123456789', 'wptest@elementor.com');
    $user = new WP_User($user_id);
    $user->set_role('editor');
  }
});

// This will remove the admin bar for user with username 'wp-test' from the front end
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar()
{
  $current_user = wp_get_current_user();
  // check if the current user is 'wp-test' and remove the admin bar
  if ($current_user->user_login === 'wp-test') {
    show_admin_bar(false);
    update_user_meta($current_user->ID, 'show_admin_bar_front', "false");
  }
}
