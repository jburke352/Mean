'use strict';

var mongoose = require('mongoose'),
    Page     = mongoose.model('Page'),
    Route    = mongoose.model('Route');

function find_page(model) {
    Page.findOne({route: model.path});
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