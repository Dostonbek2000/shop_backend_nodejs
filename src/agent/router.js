const router = require('express').Router();
const validate = require('express-validation');
const authenticate = require('./../util/authenticate');
const permit = require('./../util/permission');

const appRoot = require('app-root-path');
const multer = require('multer');
const path = require('path');

const ValidatorUser = require('../user/validator');
const ValidatorProduct = require('../product/validator');
const ValidatorOrder = require('../order/validator');
const Controller = require('./controller');

router.route('/auth').post(validate(ValidatorUser.auth), Controller.auth);

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, appRoot + process.env.PUBLIC_FOLDER + "/product")
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
router.use(permit('agent'));

router.route('/account/:id').get(Controller.findAgent);
router.route('/accounts/:id').put(upload.single('media'),validate(ValidatorUser.updateAgent), Controller.updateAgent);

router.route('/products/:id').get(Controller.findAllProduct);
router.route('/products').post(upload.single('media'),validate(ValidatorProduct.addNew), Controller.addNewProduct);
router.route('/products/:id').put(upload.single('media'),validate(ValidatorProduct.updateOne), Controller.updateProduct);
router.route('/products/:id').delete(validate(ValidatorProduct.deleteOne), Controller.deleteProduct);

router.route('/orders').get(Controller.getOrders);
router.route('/orders/:id').put(validate(ValidatorOrder.updateOne),Controller.updateOrder);

module.exports = router;
