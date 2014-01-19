'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Article Schema
 */
var PageSchema = new Schema({
    created: {type: Date,   default: Date.now},
    title:   {type: String, default: '', trim: true},
    route:   {type: String, default: '', trim: true},
    content: {type: String, default: '', trim: true},
});

/**
 * Statics
 */
PageSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Page', PageSchema);