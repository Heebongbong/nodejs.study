const express = require('express');
const {isNotLoggedIn, isLoggedIn, login, join, logout} = require("../svc/authSvc");
const passport = require("passport");
const router = express.Router();

router.post('/login', isNotLoggedIn, login)
router.post('/join', isNotLoggedIn, join);
router.get('/logout', isLoggedIn, logout);

router.get('/kakao',passport.authenticate('kakao')); //카카오톡 로그인화면 redirect
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패'
}), (req,res)=>{
    res.redirect('/');
});

module.exports = router;