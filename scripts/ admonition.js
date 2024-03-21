// https://github.com/haishanh/hexo-tag-admonition
// Modified by btjawa

hexo.extend.tag.register('admonition', function(args, content) {
  var cls = args[0] || 'note';
  var title = args.slice(1).join(' ') || 'Note';
  var lines = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  });
  return '<div class="admonition note adm-' + cls +
        '"><p class="admonition-title">' +
        title + '</p>' + lines + '</div>';
}, {
  ends: true
});