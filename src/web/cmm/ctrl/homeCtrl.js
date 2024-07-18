const express = require('express')
const router = express.Router();
const { getMain } = require('../svc/homeSvc')
const userCtrl = require('../../user/ctrl/userCtrl')
const authCtrl = require('../../auth/ctrl/authCtrl')
const postCtrl = require('../../post/ctrl/postCtrl')
const hashCtrl = require('../../hash/ctrl/hashCtrl')

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f=>f.id) || [];
    next();
})

router.use('/user', userCtrl)
router.use('/auth', authCtrl)
router.use('/post', postCtrl)
router.use('/hash', hashCtrl)

router.get('/', getMain);

module.exports = router;
