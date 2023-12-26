
// noinspection BadExpressionStatementJS

1 services/config/databases.js

mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

to

mongoose.connect(config.database, {});

2 services/config/app.js

consign({ cwd: 'services' })

to

consign()

3