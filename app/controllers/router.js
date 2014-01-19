'use strict';

var mongoose = require('mongoose'),
    Route    = mongoose.model('Route');

exports.route = function(req, res, next, id) {
    Route.load(id, function(err, route) {
        if (err) return next(err);
        if (!route) return next(new Error('Failed to load route ' + id));
        
        req.route = route;
        next();
    });
};

exports.all = function(req, res) {
    Route.find().sort('-path').exec(function(err, models) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(models);
        }
    });
};

exports.create = function(req, res) {
    var model   = new Route(req.body);

    model.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                routes: model
            });
        } else {
            res.jsonp(model);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.route);
};