'use strict';

var mongoose = require('mongoose'),
    Page     = mongoose.model('Page'),
    Route    = mongoose.model('Route');

function find_page(req, res) {
    Page.findOne({route: req.path}, function (err, page) {
        if (err) {
            return res.send('/');
        }

        res.jsonp(page);
    });
}

exports.add = function (app, model) {
    var route = new Route();

    route.path       = model.route;
    route.verb       = 'get';
    route.controller = 'router';
    route.action     = 'route';
    route.page       = model._id;

    route.save(function () {
        app.get(route.path, find_page);
    });
};

exports.route = find_page;