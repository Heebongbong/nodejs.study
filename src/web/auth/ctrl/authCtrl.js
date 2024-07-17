const express = require('express');
const {isNotLoggedIn, isLoggedIn, login, join, logout} = require("../svc/authSvc");
const router = express.Router();

router.post('/login', isNotLoggedIn, login)
router.post('/join', isNotLoggedIn, join);
router.get('/logout', isLoggedIn, logout);

module.exports = router