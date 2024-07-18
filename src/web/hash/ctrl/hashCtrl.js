const express = require('express')
const { searchHashtag } = require('../svc/hashSvc')
const router = express.Router();

router.get('/search', searchHashtag)

module.exports = router