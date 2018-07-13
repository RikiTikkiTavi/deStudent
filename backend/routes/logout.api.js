import configurePassport from '../passconfig';

const passport = configurePassport();

function logout(req, res) {
  req.logout();
  res.send('');
}

module.exports = logout;
