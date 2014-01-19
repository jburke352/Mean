'use strict';

var app;

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Page        = mongoose.model('Page'),
    router      = require('../router');

exports.setApp = function (App) {
    app = App;
};

/**
 * Find article by id
 */
exports.page = function(req, res, next, id) {
    Page.load(id, function(err, page) {
        if (err) return next(err);
        if (!page) return next(new Error('Failed to load page ' + id));
        
        req.page = page;
        next();
    });
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    console.log('all');
    Page.find().sort('-title').exec(function(err, models) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(models);
        }
    });
};


/**
 * Create a article
 */
exports.create = function(req, res) {
    var model = new Page(req.body);

    model.save(function(err, resp) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                routes: model
            });
        } else {
            router.add(app, resp);

            res.jsonp(model);
        }
    });
};

/**
 * Show
 */
exports.show = function(req, res) {
    console.log('show');
    res.jsonp(req.page);
};

