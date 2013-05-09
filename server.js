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


app.param('all', /(\d+)$/)
app.get('/:all', function(req, res){
  var postId = req.params.all[0],
      query = req.query

  if( !query.body ) query.body = ""

  var isGoogle = req.headers['user-agent'].match(/Google/i)

  if( isGoogle )
    res.send('<h1>'+query.title+'</h1><p>'+query.body+'</p>')
  else
    res.redirect('http://blog.aliph.com/?p='+postId)

  //res.send('boom!' + req.params.all[0])
  //console.log( req.params.all[0], req.query )
})


app.get('/', function(req, res){
  res.send('hi')
})

app.listen(3000)