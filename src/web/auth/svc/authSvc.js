const User = require('../../../models/user');
const bcrypt = require('bcrypt');

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

}

exports.logout = (req,res,next)=>{

}

exports.join = async (req, res, next) => {
    const {nick, email, password} = req.body;
    try {
        const exUser = await User.findOne({where: {email}})
        // const exUser = await User.findAll().find(u=>u.email === email);
        if (exUser) {
            return res.redirect('/user/join?error=exist')
        }
        const hash = bcrypt.hash(password, 12);
        await User.create({
            email, nick, password: hash
        })
        return res.redirect('/')
    } catch (e) {
        console.error(e);
        next(e)
    }
}