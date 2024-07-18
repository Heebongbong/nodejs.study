const User = require("../../../models/user");
const Post = require("../../../models/post");

exports.getMain = async (req, res, next)=> {
    let twits = [];
    try{
        const f = await User.findAll();
        twits = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order : [['createdAt','DESC']],
        });
    }catch(e){
        console.error(e);
    }
    res.render('index', {
        title: 'NodeBird',
        twits
    });
}