const express = require('express');
const router = express.Router();

const adminRouter = require('./admin/router');
const userRouter = require('./user/router');
const agentRouter = require('./agent/router');
const customerRouter = require('./customer/router');
// const mediaRouter = require('./media/router');

router.use('/admin', adminRouter);
router.use('/admin/users', userRouter);
router.use('/agent', agentRouter);
router.use('/customer', customerRouter);
// router.use('/images', mediaRouter);

module.exports = router;