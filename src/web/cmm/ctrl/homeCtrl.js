const express = require('express')
const router = express.Router();
const homeSvc = require('../svc/homeSvc')
const userCtrl = require('../../user/ctrl/userCtrl')
const authCtrl = require('../../auth/ctrl/authCtrl')

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followingCount = 0;
    res.locals.followerCount = 0;
    res.locals.followingIdList = [];
    next();
})

router.get('/', (req,res,next)=>{
    homeSvc.getMain(req,res,next)
});

router.use('/user', userCtrl)
router.use('/auth', authCtrl)


module.exports = router;
