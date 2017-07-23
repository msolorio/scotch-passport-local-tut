module.exports = function(app, passport) {

	// HOMEPAGE //////////////////////////////////////////
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	// LOGIN PAGE ////////////////////////////////////////
	app.get('/login', (req, res) => {
		res.render('login.ejs', { message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// SIGNUP PAGE ///////////////////////////////////////
	app.get('/signup', (req, res) => {
		res.render('signup.ejs', { message: req.flash('signupMessage')});
	});

	// example of custom handling of authentication
	// https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

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







