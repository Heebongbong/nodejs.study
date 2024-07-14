import path from "node:path";
import express from 'express'

const router = express.Router();

const preDir = import.meta.dirname + '/../html/';
const sufDir = '.html';

function getPath(filePath){
    return path.join(preDir, filePath + sufDir);
}


router.get("/", (req, res)=>{
    // res.send('hello express')
    console.log(getPath('index'))
    console.log('noSign', req.cookies)
    console.log('sign',req.signedCookies)

    res.cookie('name', 'Lee', {
        path: '/',
        httpOnly: true,
        maxAge: 1000,
        secure: false
    })

    console.log(req.session)
    if(!req.session.name){
        req.session.name = 'lee'
    }
    res.sendFile(getPath('index'));
});

router.get('/about/*', (req, res)=>{
    res.send('hello express')
})

router.get('/category/:name', (req,res)=>{
    res.send(`hello ${req.params.name}`)
})

router.get('/error', (req, res, next)=>{
    try{
        reqdgg();
    }catch(e){
        next(e)
    }
})

router.get('/json', (req, res)=>{
    res.json({ name: 'lee' })
})

router.get('/route/:params', (req,res, next)=>{
    if(req.params.params === 'true'){
        next('route')
    }else{
        next()
    }
}, (req,res, next)=>{
    console.log('다음 매개변수 실행 테스트')
    res.send('다음 매개변수 실행 테스트')
    next() // next실행해야 다음 미들웨어 함수 실행함.
}, (req, res)=>{
    console.log('여기까지?')
})

router.get('/route/:params', (req, res)=>{
    console.log('외부 라우트 테스트')
    res.send('외부 라우트 테스트')
})

router.post('/upload', (req, res)=>{
    const upload = req.upload.array('images')
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: '파일 업로드 실패', error: err.message });
        }
        console.log(req.files)
        console.log('파일 저장!')
        res.send('ok')
    });
})

export default router;