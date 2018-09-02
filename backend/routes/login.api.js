import configurePassport from '../passconfig';

const passport = configurePassport();

function auth() {
  return passport.authenticate('local');
}

function login(req, res) {
  res.send(req.user);
}

function isLoggedIn(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
}

module.exports = { login, auth, isLoggedIn };
