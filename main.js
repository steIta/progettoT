var express = require('express');
var session = require('express-session');
var app = express();

var config = require('./config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var auth = require('./server/auth');
var funzioniutente = require('./server/funzioniutente');
var funzionibase = require('./server/funzionibase');
var database = require('./server/database');
var users = require('./server/users');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var url = 'mongodb://localhost:27017/utenti';
var dbInstance = {}
var moment=require('moment');



/*mongoose.connect('mongodb://127.0.0.1/utenti');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected.');
});
*/


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", saveUninitialized: true, resave: true }));
app.use(express.static('client'));
app.use(auth.checklogin);



app.use('/theme', express.static('client/theme'));

app.set('port', config.port);

global.dirClient = __dirname + '/client';

/******      INIZIALIZZO MODULI ESTERNI        ******/

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to mongoDB");
    dbMongo = db;
    funzionibase(app, sql, config.db, config, dbMongo);
    funzioniutente(app, config);
    database(app, sql, config.db);
});
//users(app,config);
//database2(app, config);
/****************************************************/


app.listen(app.get('port'), function () {
    console.log('Server running on port:' + config.port);
});
