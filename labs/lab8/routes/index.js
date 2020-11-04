const showRoutes = require('./shows');
const searchRoutes = require('./search');
const path =  require('path');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('shows/index', {title: "Show Finder"});
    });
    app.use('/search', searchRoutes);
    app.use('/shows', showRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;