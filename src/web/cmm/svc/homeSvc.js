const User = require("../../../models/user");

const HomeSvc = {
    getMain : async (req, res, next) => {
        const twits = [];
        try{
            const f = await User.findAll();
            console.log(f)
        }catch(e){
            console.error(e);
        }
        res.render('index', {
            title: 'NodeBird',
            twits,
        });
    }
}

module.exports = HomeSvc