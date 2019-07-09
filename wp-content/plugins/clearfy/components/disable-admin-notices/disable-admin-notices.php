<?php
/**
 * Plugin Name: Webcraftic Disable Admin Notices Individually
 * Plugin URI: https://wordpress.org/plugins/disable-admin-notices/
 * Description: Disable admin notices plugin gives you the option to hide updates warnings and inline notices in the admin panel.
 * Author: Webcraftic <wordpress.webraftic@gmail.com>
 * Version: 1.0.6
 * Text Domain: disable-admin-notices
 * Domain Path: /languages/
 * Author URI: https://clearfy.pro
 * Framework Version: FACTORY_409_VERSION
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! defined( 'WDN_PLUGIN_VERSION' ) ) {
	define( 'WDN_PLUGIN_VERSION', '1.0.7' );
}

// Fix for ithemes sync. When the ithemes sync plugin accepts the request, set the WP_ADMIN constant,
// after which the plugin Clearfy begins to create errors, and how the logic of its work is broken.
// Solution to simply terminate the plugin if there is a request from ithemes sync
// --------------------------------------
if ( defined( 'DOING_AJAX' ) && DOING_AJAX && isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'ithemes_sync_request' ) {
	return;
}

if ( isset( $_GET['ithemes-sync-request'] ) && ! empty( $_GET['ithemes-sync-request'] ) ) {
	return;
}
// ----------------------------------------

if ( ! defined( 'WDN_PLUGIN_DIR' ) ) {
	define( 'WDN_PLUGIN_DIR', dirname( __FILE__ ) );
}
if ( ! defined( 'WDN_PLUGIN_BASE' ) ) {
	define( 'WDN_PLUGIN_BASE', plugin_basename( __FILE__ ) );
}
if ( ! defined( 'WDN_PLUGIN_URL' ) ) {
	define( 'WDN_PLUGIN_URL', plugins_url( null, __FILE__ ) );
}



if ( ! defined( 'LOADING_DISABLE_ADMIN_NOTICES_AS_ADDON' ) ) {
	require_once( WDN_PLUGIN_DIR . '/libs/factory/core/includes/check-compatibility.php' );
	require_once( WDN_PLUGIN_DIR . '/libs/factory/clearfy/includes/check-clearfy-compatibility.php' );
}

$plugin_info = array(
	'prefix'         => 'wbcr_dan_',
	'plugin_name'    => 'wbcr_dan',
	'plugin_title'   => __( 'Webcraftic disable admin notices', 'disable-admin-notices' ),
	'plugin_version' => WDN_PLUGIN_VERSION,
	'plugin_build'   => 'free',
	'updates'        => WDN_PLUGIN_DIR . '/updates/'
);

/**
 * Проверяет совместимость с Wordpress, php и другими плагинами.
 */
$compatibility = new Wbcr_FactoryClearfy_Compatibility( array_merge( $plugin_info, array(
	'factory_version'                  => 'FACTORY_409_VERSION',
	'plugin_already_activate'          => defined( 'WDN_PLUGIN_ACTIVE' ),
	'plugin_as_component'              => defined( 'LOADING_DISABLE_ADMIN_NOTICES_AS_ADDON' ),
	'plugin_dir'                       => WDN_PLUGIN_DIR,
	'plugin_base'                      => WDN_PLUGIN_BASE,
	'plugin_url'                       => WDN_PLUGIN_URL,
	'required_php_version'             => '5.3',
	'required_wp_version'              => '4.2.0',
	'required_clearfy_check_component' => true
) ) );

/**
 * Если плагин совместим, то он продолжит свою работу, иначе будет остановлен,
 * а пользователь получит предупреждение.
 */
if ( ! $compatibility->check() ) {
	return;
}

define( 'WDN_PLUGIN_ACTIVE', true );

if ( ! defined( 'LOADING_DISABLE_ADMIN_NOTICES_AS_ADDON' ) ) {
	require_once( WDN_PLUGIN_DIR . '/libs/factory/core/boot.php' );
}

require_once( WDN_PLUGIN_DIR . '/includes/class.plugin.php' );

if ( ! defined( 'LOADING_DISABLE_ADMIN_NOTICES_AS_ADDON' ) ) {
	new WDN_Plugin( __FILE__, $plugin_info );
}
