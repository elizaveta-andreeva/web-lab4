const fs = require('fs');

class UsersController {
    constructor() {
        this.users = require("./users.json");
    }

    addUser(userData) {
        this.users.push(
            {
                id: this.users.length + 1,
                name: userData.name,
                second_name: userData.second_name,
                photo: userData.photo,
                email: userData.email,
                birthdate: userData.birthdate,
                role: 'user',
                status: 'pending',
                friends: [],
                news: [],
            }
        );
        this.saveEdits();
    }

    getFriendsNews(id) {
        let user = this.users.find(users => users.id === Number(id));
        let news = [];
        for (let i = 0; i < user.friends.length; i++) {
            let friend = this.users.find(users => users.id === Number(user.friends[i]));
            let friendNews = friend.news;
            friendNews = friendNews.map(item => {
                return {
                    message: item.message,
                    date: item.date,
                    author: friend.name + ' ' + friend.second_name
                }
            })
            news.push(...friendNews);
        }
        return news.sort((a, b) => {
            if (a.data < b.data) {
                return -1;
            }
        });
    }

    saveEdits() {
        fs.writeFileSync('users.json', JSON.stringify(this.users, null, 2));
    }

}

const usersController = new UsersController();

module.exports = usersController;