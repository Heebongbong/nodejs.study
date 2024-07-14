import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
    console.log('user')
    res.send('User')
})

export default router;