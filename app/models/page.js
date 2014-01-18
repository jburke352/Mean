'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var PageSchema = new Schema({
    created: {type: Date,   default: Date.now},
    title:   {type: String, default: '', trim: true},
    content: {type: String }
});

mongoose.model('Pages', PageSchema);
