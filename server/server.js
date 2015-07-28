var bodyParser = require('body-parser'),
    httpProxy = require('http-proxy'),
    express = require('express'),
    app = express();

app.use('/', express.static('../client/build/index.html'));
app.use(express.static('../client/build/'));
app.use(express.static('../client/build/js/'));
app.use(express.static('../client/build/js/relese/'));
app.use(bodyParser.json());

var proxy = new httpProxy.createProxyServer();

app.all('/api/*', function (req, res) {

  req.removeAllListeners('data');
  req.removeAllListeners('end');

  process.nextTick(function () {
    if (req.body) {
      req.emit('data', JSON.stringify(req.body));
    }
    req.emit('end');
  });
  proxy.web(req, res, {
    target: 'http://localhost:3010'
  });
});

var server = app.listen(3000);
