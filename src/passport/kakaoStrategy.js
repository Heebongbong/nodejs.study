const passport = require("passport");
const User = require("../models/user");
const KakaoStrategy = require("passport-kakao").Strategy;
module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL || '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile, profile.id);
        try{
            const exUser = await User.findOne({
                where : {
                    snsId: profile.id,
                    provider: 'kakao',
                }
            })
            if(exUser) done(null, exUser)
            else {
                const newUser = await User.create({
                        email: profile._json?.kakao_account?.email,
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    });
                done(null, newUser);

            }
        }catch (e){
            console.error(e)
            done(e)
        }
    }))
}