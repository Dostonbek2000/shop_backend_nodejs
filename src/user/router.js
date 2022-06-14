const router = require('express').Router();
const validate = require('express-validation');
const authenticate = require('./../util/authenticate');
const permit = require('./../util/permission');

const appRoot = require('app-root-path');
const multer = require('multer');
const path = require('path');

const Validator = require('./validator');
const Controller = require('./controller');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, appRoot + process.env.PUBLIC_FOLDER + "/users")
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname).toLowerCase();
        cb(null, Date.now() + ext);
        }
    }),

    fileFilter: function(req, file, callback) {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/gif" ) {
            callback(null, true);
        } else {
            console.log('jpg, jpeg, gif va png rasmlardan birini yuklang');
            callback(null, false);
        }
    },
    limits: { fileSize: 1024 * 1024 *2}
});

router.use(authenticate);
router.use(permit('admin'));

router.route('/').get(Controller.findAll);
router.route('/').post(upload.single('media'),validate(Validator.addNew),Controller.addNew);
router.route('/:id').put(upload.single('media'),validate(Validator.updateOne),Controller.updateOne);
router.route('/:id').delete(validate(Validator.deleteOne), Controller.deleteOne);

module.exports = router;
