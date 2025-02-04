const express = require("express")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks")
const fs = require("fs");
const multer = require("multer");
const dotenv = require("dotenv");
const passport = require("passport")


dotenv.config();

const homeCtrl = require("./src/web/cmm/ctrl/homeCtrl");
const { sequelize } = require("./src/models/index");
const passportConfig = require('./src/passport/config')

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html')

nunjucks.configure('html', {
    express: app,
    watch: true,
});

sequelize.sync()
    .then(()=>{
        console.log('데이터 베이스 연결 성공')
    })
    .catch((err)=>{
        console.error(err)
    })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', homeCtrl)

app.use((req,res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
})
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error')
})

app.listen(app.get('port'), e=>{
    console.log(`${app.get('port')} 포트에서 대기 중`)
})