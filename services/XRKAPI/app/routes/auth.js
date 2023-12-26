const models = require('@XRK/app/setup');
module.exports = (app) => {
    const api = app.XRKAPI.app.api.auth;
    app.route('/')
        .get((req, res) => res.send('XRK API'));
    app.route('/api/v1/auth')
        .post(api.login(models.User));
}

