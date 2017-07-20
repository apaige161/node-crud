var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');


var routes = require('./routes/index');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
//serve up the views HTML 
app.set('views', path.join(__dirname, 'views'));
//set veiw engine
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//convert to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//allows access from the HTML aka all the css and js files
app.use(express.static(path.join(__dirname, 'public')));

//for all routes use ./routes/index file required by 'routes'
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //new error if an err is found
  var err = new Error('Not Found');
  //sets err status
  err.status = 404;
  next(err);
});

/* error handlers */

// development error handler
// will print stacktrace
  //development environment
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //sets err status of 500 (internal server error)
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  //sets err status of 500 (internal server error)
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    //renders an err object
    error: {}
  });
});

//export so this can be used anywhere in app
module.exports = app;
