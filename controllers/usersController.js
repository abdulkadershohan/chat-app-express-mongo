// get users page
const bcrypt = require('bcrypt');

function getUsers(req, res, next) {
    res.render('users');
}
// add user 
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.files.length > 0 && req.files) {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
            avatar: req.files[0].filename
        })
    }
    else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        })
    }
    // save user or send error
    try {
        const result = await newUser.save();
        res.status(200).json({
            message: "User created successfully",
            user: result
        })
    }
    catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred"
                }
            }
        })
    }
}


module.exports = {
    getUsers,
    addUser
}