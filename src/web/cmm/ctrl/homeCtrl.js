const express = require('express')
const router = express.Router();
const { getMain } = require('../svc/homeSvc')
const userCtrl = require('../../user/ctrl/userCtrl')
const authCtrl = require('../../auth/ctrl/authCtrl')
const postCtrl = require('../../post/ctrl/postCtrl')

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followingCount = 0;
    res.locals.followerCount = 0;
    res.locals.followingIdList = [];
    next();
})

router.get('/', getMain);

router.use('/user', userCtrl)
router.use('/auth', authCtrl)
router.use('/post', postCtrl)


module.exports = router;
