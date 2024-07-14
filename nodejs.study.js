import dotenv from 'dotenv'
import express from "express"
import homeCtrl from './web/homeCtrl.js'
import process from 'process'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import path from "node:path";
import session from 'express-session'
import multer from 'multer'
import * as fs from "fs";
import userCtrl from './web/userCrtl.js'

dotenv.config()

const app = express()

app.set('port', process.env.PORT || 3000);

app.use((req, res, next)=>{
    console.log('모든 요청에서 실행')
    next();
})

app.use(morgan('dev'))
app.use('/', express.static(path.join(import.meta.dirname,'public'))) // 파일 경로 처리
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키 파싱

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'leePwd',
    cookie:{
        httpOnly: true,
        maxAge: 1000
    },
    name: 'connect.sid'
})) // 세션 설정

try{
    fs.accessSync('uploads')
} catch (e){
    console.error('uploads 폴더 생성')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/')
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname)
            done(null, path.basename(file.originalname, ext) + Date.now() + ext)
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}); // MultiPart 세팅

app.use((req, res, next)=>{
    req.upload = upload;
    next()
})

app.use(express.json()) // json처리
app.use(express.urlencoded({extended: true}))

app.use('/', homeCtrl)
app.use('/user', userCtrl)

app.use((e,req,res,n)=>{
    console.error(e);
    res.status(404).send(`에러 발생`)
})

app.listen(app.get('port'), ()=>{
    console.log('3000 포트 대기 중')
})