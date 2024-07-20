const express = require('express')
const { test } = require('./testSvc')
const router = express.Router();

router.get('/', test)

module.exports = router