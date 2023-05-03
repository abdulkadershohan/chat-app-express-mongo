const uploader = require('../../utilities/singleUploader');

function avatarUploads(req, res, next) {
    const upload = uploader(
        'avatars', // Folder Name
        ['image/jpeg', 'image/jpg', 'image/png'], // Allowed Mime Type
        1000000, // 1MB
        'Only .jpg, .jpeg or .png format allowed!' // Error message
    )
    // call the middlewares function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avatarUploads;