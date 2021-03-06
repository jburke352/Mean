'use strict';

var mongoose = require('mongoose'),
    Route    = mongoose.model('Route');


module.exports = function(app, passport, auth) {
    //User Routes
    var users       = require('../app/controllers/users'),
        routes      = require('../app/controllers/routes'),
        articles    = require('../app/controllers/articles'),
        pages       = require('../app/controllers/pages'),
        router      = require('../app/router'),
        controllers = {
            'users':    users,
            'routes':   routes,
            'articles': articles,
            'pages':    pages,
            'router':   router
        };

    pages.setApp(app);

    function exists(verb, route, callback, context) {
        callback.call(context, app.routes[verb].some(function (model) {
            if (model.path === route) {
                return true;
            }
        }));
    }

    Route.find(function (err, models) {
        if (err) {
            res.render('error', {status: 500});
            return;
        }

        models.forEach(function (model) {
            var ctrl   = controllers[model.controller],
                action = ctrl && ctrl[model.action],
                path   = model.path,
                verb   = app[model.verb] && model.verb;

            if (verb && path && action) {
                app[verb](path, action);
            }
        });
    });

    //Article Routes
    app.get('/articles',            articles.all);
    app.post('/articles',           auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Sign in/out
    app.get('/signin',              users.signin);
    app.get('/signout',             users.signout);
    app.get('/signup',              users.signup);

    //Routes
    app.get('/routes',              routes.all);
    app.post('/routes',             routes.create);
    app.get('/routes/:routeId',     routes.show);

    //Pages
    app.get('/pages',               pages.all);
    app.post('/pages',              pages.create);
    app.get('/pages/:pageId',       pages.show);

    //Users
    app.post('/users',              users.create);
    app.get('/users/me',            users.me);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    app.param('articleId',  articles.article);
    app.param('routeId',    routes.route);
    app.param('userId',     users.user);
    app.param('pageId',     pages.page);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
