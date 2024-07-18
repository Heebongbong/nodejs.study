const express = require('express')
const router = express.Router();
const {renderProfile, renderJoin, follow} = require('../svc/userSvc')
const {isLoggedIn, isNotLoggedIn} = require("../../auth/svc/authSvc");

// url = /user/?

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.post('/:id/follow', isLoggedIn, follow)

module.exports = router;