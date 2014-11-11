module.exports = {
  "sitename": "族谱(ZUPU.IO)",
  "siteurl": "http://zupu.io",
  "source": "content",
  "output": "_site",
  "theme": "theme",
  "google": "UA-56615768-1",
  "permalink": "{{directory}}/{{filename}}",
  "navigation":[
    //{
      //"link": "/",
      //"title": "Home",
      //"active": true
    //},
    //{
      //"link": "/blog/",
      //"title": "Blog",
    //}
  ],
  "writers": [
    "nico.PageWriter",
    "nico.PostWriter",
    "nico.FileWriter",
    "nico.StaticWriter",
    "nico.YearWriter",
    "nico.FeedWriter"
  ],
  "feedurl": "/feed.xml",
  "filters": {
    // format permalink, ends without .html, .md
    "fixlink": function(html) {
      html = html.replace(/(href="[^"]+)\.md(">)/ig, "$1$2");
      return html;
    },
    "disqus_identifier": function(uri){
      return uri.replace(/\.html$/, "");
    },
    "fixresource": function(html){
      html = html.replace(/\bsrc=(["'])(.*?)\1/, function($0, $1_quot, $2_src){
        if($2_src.test(/^[\/\.]/)){
          $2_src = this.siteurl + $2_src;
        }
        return $2_src;
      });
    },
    // less content in index page.
    "less": function(html, url, moreLinkText){
      var parts = html.split(/<!--\s*more\s*-->/);
      var html = parts[0];
      if(parts.length > 1){
        html += '<p class="more"><a href="'+url+'#more">'+moreLinkText+'</a></p>';
      }
      return html;
    },
    // more content in detail page.
    "more": function(html){
      return html.replace(/<!--\s*more\s*-->/, '<a name="more"></a>');
    },
    // get public posts.
    "public": function(posts){
      return posts.filter(function(item){
        return item.meta.status == "public" || !item.meta.status;
      });
    },
    // code line format.
    "codeline": function(html){
      var snipIndex = 1;
      return html.replace(/(?:<!--\s*baseline[=:](\d+);?\s*-->)?\s*(?:<div class="highlight">)?(<pre>[\s\S]*?<\/pre>)(?:<\/div>)?/gm,
          function($0, startLine, codes){

        if(!startLine){
          startLine = 1;
        }else{
          startLine = parseInt(startLine, 10);
        }
        var htmlines = [];
        var lines = codes.split(/(?:\r\n|\r|\n)/).length - 1;
        for(var i=startLine,l=startLine+lines; i<l; i++){
          htmlines.push('<a name="L'+snipIndex+'-'+i+'" href="#L'+snipIndex+'-'+i+'">'+i+'</a>');
        }

        snipIndex++;
        return '<div class="highlight">'+
          '<div class="codes">'+
          '<div class="code">'+codes+'</div>'+
          '<pre class="line">'+htmlines.join('\n')+'</pre>'+
          '</div>'+
          '</div>';
      });
    }
  }
}
