// get users page

function getUsers(req, res, next) {
    res.render('users', {
        title: 'Users -Chat App'
    });
}

module.exports = {
    getUsers
}