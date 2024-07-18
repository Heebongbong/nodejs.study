const express = require('express');
const multer = require('multer');

const {isLoggedIn, isNotLoggedIn} = require("../../auth/svc/authSvc");
const {afterUploadImage , uploadPost} = require('../svc/postSvc')
const path = require("path");
const fs = require('fs');

const router = express.Router();

try{
    fs.readdirSync('static/uploads')
} catch (e){
    fs.mkdirSync('static/uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'static/uploads/');
        },
        filename: (req, file, cb)=>{
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+ '_' + Date.now() + ext);
        }
    }),
    limits: {fileSize: 10 * 1024 * 1024}
})

router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage)

const upload_none = multer()
router.post('/', isLoggedIn, upload_none.none(), uploadPost)

module.exports = router