const createError = require('http-errors');
const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const deleteRouter = require('./routes/delete');

const { requestPrint, errorPrint } = require('./helpers/debug/debugprinters');
const sessions = require('express-session');
const mysqlSession = require('express-mysql-session')(sessions);
const flash = require('express-flash');

const app = express();

app.engine(
	'hbs',
	handlebars({
		layoutsDir: path.join(__dirname, 'views/layouts'), //where to look for layouts
		partialsDir: path.join(__dirname, 'views/partials'), // where to look for partials
		extname: '.hbs', //expected file extension for handlebars files
		defaultLayout: 'home', //default layout for app, general template for all pages in app
		helpers: {
			emptyObject: (obj) => {
				return !(
					obj.constructor === Object && Object.keys(obj).length == 0
				);
			},
		}, //adding new helpers to handlebars for extra functionality
	})
);

// mysql session
const mysqlSessionStore = new mysqlSession(
	{
		/*using defauktoptions */
	},
	require('./config/database')
);

app.use(
	sessions({
		key: 'csid',
		secret: 'secret',
		store: mysqlSessionStore,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	requestPrint(`Method: ${req.method}, Route: ${req.url}`);
	next();
});

app.use((req, res, next) => {
	if (req.session.username) {
		res.locals.logged = true;
		res.locals.loading = false;
		res.locals.username = req.session.username;
	}
	next();
});

app.use('/', indexRouter); // route middleware from ./routes/index.js
app.use('/users', usersRouter); // route middleware from ./routes/users.js
app.use('/posts', postsRouter); // route middleware from ./routes/posts.js
app.use('/comments', commentsRouter); // route middleware from ./routes/posts.js
app.use('/delete', deleteRouter); // route middleware from ./routes/posts.js

/**
 * Catch all route, if we get to here then the
 * resource requested could not be found.
 */
app.use((req, res, next) => {
	next(
		createError(404, `The route ${req.method} : ${req.url} does not exist.`)
	);
});

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = err;
	errorPrint(err);
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
