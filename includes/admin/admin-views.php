<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Add a stylesheet for TinyMCE
 *
 * @since 2.0.0
 */
// add_editor_style( 'css/editor-style.css' );

/**
 * Deregister Genesis parent theme page templates
 *
 * See: http://wptheming.com/2014/04/features-wordpress-3-9/
 *
 * @since 2.2.8
 */
// add_filter( 'theme_page_templates', 'bfg_deregister_page_templates' );
function bfg_deregister_page_templates( $templates ) {

	unset($templates['page_archive.php']);
	unset($templates['page_blog.php']);
	return $templates;
}
