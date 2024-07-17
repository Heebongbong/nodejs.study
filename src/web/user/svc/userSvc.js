const renderProfile = (req,res,next)=>{
    res.render('user/profile', {title: '내 정보 - NodeBird'})
}
const renderJoin = (req,res,next)=>{
    res.render('user/join', {title: '회원 가입 - NodeBird'})
}

module.exports = {
    renderProfile,
    renderJoin,
    // renderMain,
}