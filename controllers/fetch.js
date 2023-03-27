var exports = module.exports = {}

exports.signup = function(req, res) {
  res.render('signup');
}

exports.signin = function(req, res) {
  res.render('signin');
}

exports.account = function(req, res) {
  res.render('account', { user: req.session.passport.user });
}

exports.index = function(req, res) {
  res.render('index', { user: req.session.passport.user });
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/signin');
  });
}

