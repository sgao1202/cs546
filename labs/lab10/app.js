const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

// Middleware functions
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

// Authentication Middleware
app.use('/private', (req, res, next) => { 
    // Redirect to a page telling the user that they are not logged in
    if (!req.session.user) return res.status(403).render('users/error', {title: "Error"});
    next();
});

// Logging Middleware
app.use(async (req, res, next) => {
    const log = {
        timestamp: new Date().toUTCString(),
        method: req.method,
        route: req.originalUrl,
        auth: req.session.user ? "Authenticated User" : "Non-Authenticated User"
    }
    console.log(`[${log.timestamp}]: ${log.method} ${log.route} (${log.auth})`);
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});