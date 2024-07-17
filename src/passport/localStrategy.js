const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
    }, async (email, password, done)=>{
        try{
            const exUser = await User.findOne({where: {email}})
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password)
                result ? done(null, exUser) : done(null, false, {message: '비밀번호가 일치하지 않습니다.'})
            }else{
                done(null, false, {message: '일치하는 회원이 없습니다.'})
            }
        }catch (e){
            console.error(e)
            done(e)
        }
    }))
}