const Post = require("../../../models/post");
const Hashtag = require("../../../models/hashtag");

exports.afterUploadImage = (req, res) => {
    console.log(req.file)
    res.json({url: `/uploads/${req.file.filename}`})
}
exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            contents: req.body.contents,
            img: req.body.url,
            UserId: req.user.id
        })
        console.log(post)
        const reg = /#[^\s#]*/g;
        const hashtag = req.body.contents.match(reg);
        if(hashtag?.length > 0) {
            const result = await Promise.all(hashtag.map(async (tag) => {
                return Hashtag.findOrCreate({
                    where : { title: tag.slice(1).toLowerCase() }
                })
            }));
            console.log(result)
            await post.addHashtags(result.map(e => e[0]))
        }
        res.redirect(`/`)
    } catch (e) {
        console.error(e)
        next(e)
    }
}