'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Routes Schema
 */
var RouteSchema = new Schema({
    action:     {type: String},
    controller: {type: String},
    created:    {type: Date,   default: Date.now},
    verb:       {type: String},
    path:       {type: String},
    page:       {type: Schema.ObjectId, ref: 'Page'}
});

/**
 * Statics
 */
RouteSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Route', RouteSchema);
