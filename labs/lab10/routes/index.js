const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;

const constructorMethod = (app) => {
    let errorMessage = '';
    app.get('/', async (req, res) => {
        // Redirect to private
        if (req.session.user) return res.redirect('/private');
        let temp = errorMessage;
        errorMessage = '';
        res.render('users/login', {title: 'Login',errorMessage: temp});
    });

    app.post('/login', async (req, res) => {
       const { username, password } = req.body;
       let match = false;
       // Find user from userData based off of username
        try {
            if (!username.trim() || !password.trim()) throw 'Username and password cannot be empty';
            const user = await userData.findUser(username);
            match = await bcrypt.compare(password, user.hashedPassword);
            if (!match) throw 'Password does not match';
            req.session.user = user;
            res.redirect('/private');
        } catch (e) {
            // User does not exist or password does not exist
            errorMessage = e;
            res.status(401).redirect('/');
        }
    });

    app.get('/private', async (req, res) => {
        const {username, firstName, lastName, profession, bio} = req.session.user;
        res.render('users/private', {username: username, firstName: firstName, lastName: lastName, profession: profession, bio: bio, title: 'Private'});
    });

    app.get('/logout', async (req, res) => {
        req.session.destroy();
        res.render('users/logout', {title: 'Logged Out'});
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
    
};

module.exports = constructorMethod;