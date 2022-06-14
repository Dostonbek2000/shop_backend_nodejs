const router = require('express').Router();
const validate = require('express-validation');
const authenticate = require('./../util/authenticate');
const permit = require('./../util/permission');

const appRoot = require('app-root-path');
const multer = require('multer');
const path = require('path');

const ValidatorUser = require('../user/validator');
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
router.use(permit('customer'));

router.route('/account/:id').get(Controller.findCustomer);
router.route('/accounts/:id').put(upload.single('media'),validate(ValidatorUser.updateAgent), Controller.updateCustmer);


router.route('/agents').get(Controller.findAllAgents);
router.route('/products/:agentId').get(Controller.findAgentProducts);

router.route('/orders').get(Controller.getOrders);
router.route('/orders').post(validate(ValidatorOrder.addNew),Controller.addOrder);
router.route('/orders/:id').put(validate(ValidatorOrder.updateOne),Controller.updateOrder);

module.exports = router;
