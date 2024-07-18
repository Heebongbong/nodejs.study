const User = require("../../../models/user");
const renderProfile = (req,res,next)=>{
    res.render('user/profile', {title: '내 정보 - NodeBird'})
}
const renderJoin = (req,res,next)=>{
    res.render('user/join', {title: '회원 가입 - NodeBird'})
}

const follow = async (req, res, next)=>{
    try {
        const user = await User.findOne({where: {id: req.user.id}})
        if(user){
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success')
        }else res.status(404).send('no user')
    }catch (e) {
        console.error(e)
        next(e)
    }
}

module.exports = {
    renderProfile,
    renderJoin,
    follow,
}