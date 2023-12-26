const passport = require('passport'),
    config = require('@config'),
    models = require('@XRK/app/setup');
module.exports = (app) => {
    const api = app.XRKAPI.app.api.user;
    app.route('/api/v1/setup')
        .post(api.setup(models.User))
    app.route('/api/v1/users')
        .get(passport.authenticate('jwt', config.session),  api.index(models.User, app.get('xrksecret')));
    app.route('/api/v1/signup')
        .post(api.signup(models.User));
    app.route('/api/v1/add_to_cart')
        .post(api.add_to_cart(models.User))
}

