var express = require('express');
var router = express.Router();
var passport = require('passport');
var { ensureAuthenticated } = require('../middlewares/auth.js');

//var passportGitHub = require('../modules/passport');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Passport' });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  console.log(req);
  res.render('dashboard', {
    user: req.user,
  });
});

/* GOOGLE ROUTER */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: 'https://www.google.com/m8/feeds',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/dashboard');
  }
);

/* GITHUB ROUTER */
router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

router.get('/success', function (req, res) {
  res.render('success');
});
router.get('/failure', function (req, res) {
  res.render('failure');
});
router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  (req, res) => {
    return res.redirect('/success');
  }
);
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
});

module.exports = router;
