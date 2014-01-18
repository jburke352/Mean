'use strict';

var mongoose    = require('mongoose'),
    Route       = mongoose.model('Route');
    

module.exports = function(app, passport, auth) {
    //User Routes
    var users       = require('../app/controllers/users'),
        routes      = require('../app/controllers/routes'),
        articles    = require('../app/controllers/articles'),
        pages       = require('../app/controllers/pages'),
        controllers = {
            'users':    users, 
            'routes':   routes,
            'articles': articles,
            'pages':    pages,
        };

    // app.get('/signin', users.signin);
    // app.get('/signout', users.signout);
    // app.get('/signup', users.signup);
    // app.post('/users', users.create);
    // app.get('/routes', auth.requiresLogin, routes.all);
    // app.post('/routes', auth.requiresLogin, routes.create);
    // app.get('/articles', articles.all);
    
    // app.get('/users/me', users.me);
    Route.find().sort('-created').exec(function(err, models) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            for(var i=0; i < models.length; i++) {
                var model = models[i];
                console.log(model);
                app[model.verb](model.path, controllers[model.controller][model.action])
            }
        }
    });

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

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes    
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    
    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
