var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// sets up sessions in passport
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  ////////////////////////////////////////////////////////////////////
  // LOCAL SIGNUP
  ////////////////////////////////////////////////////////////////////
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  function(req, email, password, done) {
    // defers function to next tick of the event loop
    // User.findOne only fires if data is sent back
    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  ////////////////////////////////////////////////////////////////////
  // LOCAL LOGIN
  ////////////////////////////////////////////////////////////////////
  passport.use('local-login', new LocalStrategy({
  	usernameField: 'email',
  	passwordField: 'password',
  	passReqToCallback: true
  },
  function(req, email, password, done) {
  	User.findOne({ 'local.email': email }, function(err, user) {
  		if (err) return done(err);
  		if (!user) {
  			return done(null, false, req.flash('loginMessage', 'No user found.'));
  		}
  		if (!user.validPassword(password)) {
  			return done(null, false, req.flash('loginMessage', 'Mmm... that is not the password we have on file for you.'));
  		}
  		return done(null, user);
  	});
  }));

};
