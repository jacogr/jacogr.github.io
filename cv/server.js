var http = require('http');
var app = require('express')();

var port = process.env.PORT || 3000;

app.use(require('morgan')('combined'));
app.use(require('compression')());
app.use(require('body-parser').json());
app.use(require('cookie-parser')());
app.use(require('errorhandler')());
app.use(require('serve-static')('.', {}));

app.set('port', port);

http
  .createServer(app)
  .listen(port, () => {
    console.log('Started http server on port', port);
  });
