'use strict';

var mongoose = require('mongoose'),
    Page     = mongoose.model('Page'),
    Route    = mongoose.model('Route'),
    _        = require('lodash');;

function find_page(req, res) {
    Page.findOne({route: req.path}, function (err, page) {
        if (err) {
            return res.send('/');
        }

        res.jsonp(page);
    });
}

function update_page(req, res) {
    var body = req.body;

    Page.load(body._id, function(err, page) {
        if (err) {return res.send('/');}

        page = _.extend(page, body);

        page.save(function () {
            res.jsonp(page);
        });
    });
}

function register_route(app, model, verb, action, callback) {
    var route = new Route();

    route.path       = model.route;
    route.verb       = verb;
    route.controller = 'router';
    route.action     = action;
    route.page       = model._id;

    console.log(route);

    route.save(function () {
        app[verb](route.path, callback);
    });
};

exports.add = function (app, model) {
    register_route(app, model, 'get', 'route', find_page);
    register_route(app, model, 'put', 'update', update_page);
};

exports.route = find_page;
exports.update = update_page;