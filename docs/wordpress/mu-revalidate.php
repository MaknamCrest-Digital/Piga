<?php
/**
 * Plugin Name: PiGA front-end revalidation
 * Description: Tells the Next.js site which cache tags to refresh when content changes.
 *
 * Install: copy to wp-content/mu-plugins/ and add to wp-config.php:
 *   define('PIGA_FRONTEND_URL', 'https://pineapplegrowersgh.org');
 *   define('PIGA_REVALIDATE_SECRET', '…same value as WORDPRESS_REVALIDATE_SECRET…');
 *   define('PIGA_PREVIEW_SECRET', '…same value as WORDPRESS_PREVIEW_SECRET…');
 * Tag names must match lib/wp/client.ts → tags.
 */

if (!defined('ABSPATH')) exit;

function piga_tags_for_post($post) {
    switch ($post->post_type) {
        case 'person':  return ['wp:people'];
        case 'partner': return ['wp:partners'];
        case 'variety': return ['wp:varieties'];
        case 'event':   return ['wp:events'];
        case 'post':    return ['wp:posts', 'wp:post:' . $post->post_name];
        case 'page':
            if (in_array($post->post_name, ['privacy', 'cookies', 'terms'], true)) return ['wp:legal'];
            return ['wp:page:' . $post->post_name];
        default: return [];
    }
}

function piga_revalidate(array $tags) {
    if (!$tags || !defined('PIGA_FRONTEND_URL') || !defined('PIGA_REVALIDATE_SECRET')) return;
    wp_remote_post(untrailingslashit(PIGA_FRONTEND_URL) . '/api/revalidate', [
        'headers'  => ['Content-Type' => 'application/json', 'x-revalidate-secret' => PIGA_REVALIDATE_SECRET],
        'body'     => wp_json_encode(['tags' => array_values(array_unique($tags))]),
        'timeout'  => 5,
        'blocking' => false,
    ]);
}

add_action('save_post', function ($post_id, $post) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) return;
    if (!in_array($post->post_status, ['publish', 'trash'], true)) return; // drafts go through preview
    piga_revalidate(piga_tags_for_post($post));
}, 10, 2);

add_action('before_delete_post', function ($post_id) {
    $post = get_post($post_id);
    if ($post) piga_revalidate(piga_tags_for_post($post));
});

// ACF options page (Site Settings).
add_action('acf/save_post', function ($post_id) {
    if ($post_id === 'options') piga_revalidate(['wp:settings']);
}, 20);

// Point WordPress "Preview" at the Next.js draft-mode route.
add_filter('preview_post_link', function ($link, $post) {
    if (!defined('PIGA_FRONTEND_URL') || !defined('PIGA_PREVIEW_SECRET')) return $link;
    $paths = ['page' => '/' . ($post->post_name === 'home' ? '' : $post->post_name), 'post' => '/news'];
    $path  = $paths[$post->post_type] ?? '/';
    return add_query_arg(['secret' => PIGA_PREVIEW_SECRET, 'path' => $path], untrailingslashit(PIGA_FRONTEND_URL) . '/api/preview');
}, 10, 2);
