const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",// folder name
    ["image/jpeg", "image/jpg", "image/png"], // mime types
    1000000, // max file size 1MB = 1000000 bytes
    "Only .jpg, jpeg or .png format allowed!" // error message
  );

  // call the middleware function
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

module.exports = avatarUpload;
