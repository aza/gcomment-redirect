var express = require('express')
var app = express()

app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});


app.param('id', /(\d+)/)
app.param('title', /(.+)$/)
app.get('/:id/:title', function(req, res){
  var postId = req.params.id[0],
      query = req.query,
      title  = req.params.title[0].replace(/\+/g, ' ').toUpperCase()

  var page =  '<html itemscope itemtype="http://schema.org/Blog">'
      page += '<div style="position:absolute;top:-1000px;left:-1000px;"><span itemprop="name">' + title + '</span>'
      page += '<span itemprop="description">Read more on the Jawbone Jibber Jabber</span>'
      

  var images = [
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/bigjambox/press/bigjambox-display-006.jpg", //white jambox
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/up/press/up/up-by-jawbone-display-016.jpg", //up rainbow
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/up/press/up/up-by-jawbone-display-015.jpg", //up stack
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/bigjambox/press/bigjambox-display-013.jpg", //jambox stack
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/jambox/press/jambox-display-011.jpg", //jambox red
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/jambox/press/jambox-display-007.jpg", //jambox blue
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/jambox/press/jambox-display-005.jpg", //jambox black
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/iconhd/press/iconhd-display-001.jpg", //icon +nerd
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/icon/press/icon-display-010.jpg", //"bombshell",
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/icon/press/icon-display-013.jpg", //rogue
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/up/press/up/up-by-jawbone-display-002.jpg", //mint-green up,
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/era/press/era-display-010.jpg", //smokescreen
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/bigjambox/press/bigjambox-display-002.jpg", //graphite hex jambox
    "https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/up/press/up/up-by-jawbone-display-010.jpg" //light grey up
  ]

  var imageUrl = images[Math.floor(images.length*Math.random())]
  page += '<img itemprop="image" src="'+imageUrl+'"></div>'
  page += '<script>window.location.href="http://blog.aliph.com/?p='+postId + '"</script>'

  res.send(page)
})


app.get('/', function(req, res){
  res.send('Welcome To The Redirector')
})

app.listen(3000)