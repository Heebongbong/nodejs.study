const express = require('express')
const { test, searchByHashtag, getMyPosts } = require('./testSvc')
const router = express.Router();

router.get('/', test)
router.get('/search/posts', getMyPosts)
router.get('/search/:hashtag', searchByHashtag)

module.exports = router