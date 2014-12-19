var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , rest = require('restler')
  ;

//account
var account = require('./account');

//models
Map     = require('./models/Map').Map;

//controllers
maps    = require('./controllers/maps');

//environment
app.set('port', process.env.PORT || 9001);
app.use(require('less-middleware')({ 
    debug: true
  , src: __dirname + '/private'
  , dest: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.engine('jade', require('jade').__express);

app.use(express.cookieParser("secret"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({
  secret: "secret"
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//database
// var mongoUri = process.env.MONGOLAB_URI 
//   || process.env.MONGOHQ_URL 
//   || 'mongodb://localhost/node-spot-map'
//   ;
// mongoose.connect(mongoUri)
var mongoUri = process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/node-spot-map" : 'mongodb://localhost/node-spot-map';
mongoose.connect(mongoUri);

//routes
app.get('/points'                   , maps.getPoints);
app.get('/'                         , maps.viewMap);

//intervals for checking SPOT
maps.checkNewPoints();
setInterval(function() {
  maps.checkNewPoints();
}, 14400000);

//go!

app.listen(app.get('port') , function() {
  console.log('APP STARTED AND LISTENING ON ' + app.get('port'));
  console.log('SPOT Feed ID: ' + account.feed_id);
});