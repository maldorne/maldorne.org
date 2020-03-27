
// some code taken from hexo-generator-i18n
// didn't work with multi language, had to improve it

hexo.extend.helper.register('get_langs', function() {
  var languages = Array.isArray(this.config.i18n.language) ? this.config.i18n.language.slice(0) : [this.config.i18n.language];
  var position;
  if(!Array.isArray(languages)){
    languages = [languages];
  }
  if (position = languages.indexOf('default') !== -1)
    languages = languages.splice(position, 1)
  return languages;
});

hexo.extend.helper.register('url_for_lang', function(path, language) {
  var root = this.config.root || '';
  var lang = language ? language : this.page.lang;
  var url = this.url_for(path);

  // ignore from url_for. 
  if (url === '#' || url.startsWith('//')) {
    return url;
  }

  if (!url.startsWith('/')){
    return url;
    // url = '/' + url;
  }

  var relativeUrl = url.replace(root, '/');
  var pathLang = relativeUrl.split('/')[1];
  var languages = this.get_langs();
  
  if (languages.indexOf(pathLang) !== -1) {
    return url;
  }

  if (lang) {
    url = root + lang + relativeUrl;
  }

  return url;
});
