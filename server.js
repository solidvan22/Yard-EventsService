// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
    app         = express();
    jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var exphbs      = require('express-handlebars');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var config 		= require('./config'); // get our config file

// =================================================================
// Servidor de sockets
var server = require('http').createServer(app);
io = require('socket.io')(server);
io.on('connection', function(client){
	console.log("new socket connected")
	client.on('event', function(data){});
	client.on('disconnect', function(){});
});
server.listen(3000);


// Importando los modulos  de controladores

var eventsController   = require('./controllers/eventsController.js')
var userController     = require('./controllers/userController.js')

// =================================================================
// configuration ===================================================

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// =================================================================
// routes ==========================================================
// =================================================================


// rutas de vistas

app.get('/login',function(req,res){
    res.render('login')
})

// ---------------------------------------------------------
// Obteniendo una instancia del router de express

var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication no se ocupa middleware debido a que esta ruta no debe requerir autenticación
apiRoutes.post('/auth', userController.user_auth);

// ---------------------------------------------------------
// route middleware revisa el token
middleWareAuth= function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
}
app.get('/',function (req, res) {
    res.render('home');
});
apiRoutes.use(middleWareAuth);

// ---------------------------------------------------------
// rutas que llevan autenticacion (API)
// ---------------------------------------------------------



apiRoutes.get('/events',eventsController.list_get)
apiRoutes.post('/events',eventsController.create_post)


app.use('/api', apiRoutes);

// =================================================================
// Iniciando el servicio

app.listen(port);
console.log('Aplicación funcionando en  http://localhost:' + port);

