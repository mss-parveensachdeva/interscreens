var express         = require("express"),
    bodyParser      = require('body-parser'),
    app             = express(),
    router          = express.Router(),
    path            = require('path');
    require('./config/routes')(router);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'views')); //set default view path for routes
app.set('view engine', 'ejs'); //set default template engine
app.engine('.html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

//server settings
app.use('/', router);

var port = process.env.PORT || 3000 ;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
