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
      title  = req.params.title[0]

  var isGoogle = req.headers['user-agent'].match(/Google/i)

  var page =  '<html itemscope itemtype="http://schema.org/Blog">'
      page += '<span itemprop="name">' + title + '</span>'
      page += '<span itemprop="description">Read more on the Jawbone Jibber Jabber!</span>'
      page += '<img itemprop="image" src="https://d3osil7svxrrgt.cloudfront.net/static/www/product-images/bigjambox/press/bigjambox-display-006.jpg">'

  if( isGoogle )
    res.send(page)
  else
    res.redirect('http://blog.aliph.com/?p='+postId)

  //res.send('boom!' + req.params.all[0])
  //console.log( req.params.all[0], req.query )
})


app.get('/', function(req, res){
  res.send('Ohai!')
})

app.listen(3000)