<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// add_action( 'login_enqueue_scripts', 'bfg_replace_login_logo' );
/**
 * Replaces the login screen's WordPress logo with the 'login-logo.png' in your child theme images folder.
 *
 * Disabled by default. Make sure you have a login logo before using this function!
 *
 * Updated 2.0.1: Assumes SVG logo by default
 * Updated 2.0.20: WP 3.8 logo
 *
 * @since 2.0.0
 */
function bfg_replace_login_logo() {

	?><style type="text/css">
		.login h1 a {
			background-image: url(<?php echo get_stylesheet_directory_uri() ?>/images/login-logo.svg);

			/* Adjust to the dimensions of your logo. WP Default: 80px 80px */
			background-size: 80px 80px;
			width: 80px;
			height: 80px;
		}
	</style>
	<?php

}
