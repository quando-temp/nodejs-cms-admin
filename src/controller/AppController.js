var mongoose = require('mongoose');
var User = require('../models/user');

exports.check = function(req, res, next) {
  User.findOne({_id: req.user.id}, (err, user) => {
    if (user.agencies.length > 0) {
      const team = user.agencies.filter(x => x.default === true)[0]
      res.locals.header = {team_id: team._id, role: team.role};
      console.log('Auth is OK')
      next()
    }
  });
}
