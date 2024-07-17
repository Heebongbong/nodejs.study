const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require('../../../models/user');

exports.isLoggedIn = (req,res,next)=> {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태입니다.')
        res.redirect(`/?error=${message}`);
    }
}

exports.login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(!user){
            return res.redirect(`/?error=${info.message}`)
        }
        return req.login(user, loginError=>{
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/');
        })
    })(req,res,next);
}

exports.logout = (req,res,next)=>{
    req.logout(e => {
        res.redirect('/')
    })
}

exports.join = async (req, res, next) => {
    const {nick, email, password} = req.body;
    try {
        const exUser = await User.findOne({where: {email}})
        // const exUser = await User.findAll().find(u=>u.email === email);
        if (exUser) {
            return res.redirect('/user/join?error=exist')
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email, nick, password: hash
        })
        return res.redirect('/')
    } catch (e) {
        console.error(e);
        next(e)
    }
}