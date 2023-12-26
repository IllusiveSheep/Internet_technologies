module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
    });
    database.on('error', error => console.log(`Connection to XRK database failed: ${error}`));
    database.on('connected', () => console.log('Connected to XRK database'));
    database.on('disconnected', () => console.log('Disconnected from XRK database'));
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('XRK terminated, connection closed');
            process.exit(0);
        })
    });
};

