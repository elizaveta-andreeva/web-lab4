var express = require('express');
var router = express.Router();
const usersController = require('../usersController');
const {join} = require("path");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Users', users: usersController.users});
    // res.sendFile('C:\\Users\\Elizaveta\\WebstormProjects\\lab3\\dist\\index.html');
});

router.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    let user = usersController.users.find(users => users.id === Number(id));
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.json(user);
        res.render('userInfo', {user: user, users: usersController.users});
    }
});

router.get('/users/:id/edit', function (req, res, next) {
    const id = req.params.id;
    let user = usersController.users.find(users => users.id === Number(id));
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.render('userEdit', {user: user, users: usersController.users});
    }
});

router.post('/signup', function (req, res, next) {
    console.log(req.body);
    const userData = req.body;
    usersController.addUser(userData);
    res.redirect('http://localhost:4200/home');
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
    const userEmail = req.body;
    let user = usersController.users.find(user => user.email === userEmail.email);
    res.redirect(`http://localhost:4200/${user.id}/home`);
});


router.post('/users/:id/edit', function (req, res, next) {
    const id = req.params.id;
    const userData = req.body;
    console.log(req.body)
    let user = usersController.users.find(user => user.id === Number(id));

    if (req.files) {
        const {image} = req.files;

        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = image.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).send('Invalid photo extension.');
        }

        image.mv('./public/images/' + image.name);

        user.photo = '../images/' + image.name;
        usersController.saveEdits();
    }

    user.name = userData.name;
    user.second_name = userData.second_name;
    user.email = userData.email;
    user.birthdate = userData.birthdate;
    usersController.saveEdits();
    res.redirect(`/users/${id}`);
});

router.post('/users/:id/change_role', function (req, res, next) {
    const id = req.params.id;
    const roleData = req.body;
    let user = usersController.users.find(user => user.id === Number(id));
    user.role = roleData.role;
    usersController.saveEdits();
    res.json({role: user.role});
});

router.post('/users/:id/change_status', function (req, res, next) {
    const id = req.params.id;
    const statusData = req.body;
    let user = usersController.users.find(user => user.id === Number(id));
    user.status = statusData.status;
    usersController.saveEdits();
    res.json({status: user.status});
});

router.get('/users/:id/friends', function (req, res, next) {
    const id = req.params.id;
    let user = usersController.users.find(users => users.id === Number(id));
    if (!user) {
        res.status(404).send('User not found');
    } else {
        let friendsUsers = [];
        for (let i = 0; i < user.friends.length; i++) {
            let friend = usersController.users.find(users => users.id === Number(user.friends[i]));
            friendsUsers.push(friend);
        }
        res.json(friendsUsers);
        res.render('userFriends', {title: 'Users', friends: friendsUsers});
    }
});

router.get('/users/:id/friends_news', function (req, res, next) {
    const id = req.params.id;
    let user = usersController.users.find(users => users.id === Number(id));
    if (!user) {
        res.status(404).send('User not found');
    } else {
        const news = usersController.getFriendsNews(id);
        res.json(news);
        res.render('friendsNews', {title: 'Users', id: id, friendsNews: news});
    }
});


module.exports = router;
