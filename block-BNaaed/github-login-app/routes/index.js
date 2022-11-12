var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Passport' });
});

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
