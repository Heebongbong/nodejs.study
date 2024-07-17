const express = require('express')
const router = express.Router();
const {renderProfile, renderJoin, renderMain} = require('../svc/userSvc')
const {isLoggedIn, isNotLoggedIn} = require("../../auth/svc/authSvc");

// url = /user/?

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);

module.exports = router;