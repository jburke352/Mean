'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Schema 		= mongoose.Schema;

/**
 * Routes Schema
 */
var RouteSchema = new Schema({
	action: 	{type: String},
    controller: {type: String},
    created: 	{type: Date,   default: Date.now},
    verb: 		{type: String},    
    path:   	{type: String}
});

mongoose.model('Route', RouteSchema);
