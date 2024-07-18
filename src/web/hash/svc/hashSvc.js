const Hashtag = require("../../../models/hashtag");


exports.searchHashtag = async (req,res,next)=>{
    const hashtag = req.query.hashtag;
    if(!hashtag) return res.redirect('/')
    try {
        const newVar = await Hashtag.findOne({where: {title: hashtag}});
        let posts = [];
        if(newVar){
            posts = await newVar.getPosts();
        }
        res.render('index', {
            title: `${newVar} | NodeBird`,
            twits: posts,
        })
    }catch (e){
        console.error(e)
        next(e)
    }
}