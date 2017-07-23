module.exports = function(app, passport) {

	// HOMEPAGE //////////////////////////////////////////
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	// LOGIN PAGE ////////////////////////////////////////
	app.get('/login', (req, res) => {
		res.render('login.ejs', { message: req.flash('loginMessage')});
	});

	// app.post('/login', [HANDLING WITH PASSPORT] );

	// SIGNUP PAGE ///////////////////////////////////////
	app.get('/signup', (req, res) => {
		res.render('signup.ejs', { message: req.flash('signupMessage')});
	});

	// app.post('/signup', [HANDLING WITH PASSPORT] );

	// PROFILE PAGE //////////////////////////////////////
	// MUST BE LOGGED IN /////////////////////////////////
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile.ejs', {
			user: req.user // retreive user from session and pass to template
		});
	});

	// LOGOUT ////////////////////////////////////////////
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}







