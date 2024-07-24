const axios = require("axios");

const API_URL = process.env.API_URL + process.env.API_VERSION;

const apiGet = async (req, obj) => {
    try{
        if (!req.session.jwt) {
            const tokenResult = await axios.post(`${API_URL}/token`, {
                clientSecret: process.env.API_SECRET
            })
            if (tokenResult.data?.code === 200) {
                req.session.jwt = tokenResult.data.token
            }else{
                return tokenResult;
            }
        }
        return await axios.get(`${API_URL}${obj.url}`, {headers: obj.headers});
    }catch (e) {
        console.error(e)
        if(e.response?.status === 419){
            delete req.session.jwt;
            return apiGet(req, obj)
        }
        return e.response;
    }
}

exports.test = async (req, res, next) => {
    try {
        const result = await apiGet(req, {
            url: '/test', headers: {authorization: req.session.jwt }
        });
        if(result.data?.code !== 200) return res.status(result.data?.code).json(result.data)
        return res.json(result.data)
    } catch (e) {
        console.error(e)
        if(e.response.status === 419){
            return res.json(e.response.data)
        }
        return next(e)
    }
}

exports.getMyPosts = async (req, res, next) => {
    try {
        const result = await apiGet(req, {
            url: '/posts/my',
            headers: { authorization: req.session.jwt }
        });
        if(result.data?.code !== 200) return res.status(result.data?.code).json(result.data)
        res.json(result.data)
    } catch (e) {
        console.error(e)
        next(e)
    }
}

exports.searchByHashtag = async (req, res, next) => {
    try{
        const result = await apiGet(req, {
            url: `/posts/hashtag/${req.params.hashtag}`,
            headers: {authorization: req.session.jwt }
        })
        if(result.data?.code !== 200) return res.status(result.data?.code).json(result.data)
        res.json(result.data)
    }catch (e) {
        console.error(e)
        next(e)
    }
}