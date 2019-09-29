const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
//const user = require('../models/user')

router.get('/', (req, res) => {
    res.send('From API route')
})


router.post('/register', (req, res) => {
    let userData = req.body
    console.log('POST: /register, '+ userData)
    //-- call API to save register user into database
    
    //jwt
    let payload  = {subject: userData._id}
    let token = jwt.sign(payload, "secretKey")

    res.status(200).send({token})

})

function verifyToken(req, res, next){
    console.log(req.headers)
    if(!req.headers.authorization) {
        return res.status(401).send('XX: Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    console.log(token)
    if(token==='null'){
        return res.status(401).send('null: Unauthorized request')
    }
    let payload = null;
    try {
        payload = jwt.verify(token, 'secretKey')
        if (!payload) {
            return res.status(401).send('incorrect: Unauthorized request')
        }
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('incorrect: Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


router.post('/login', (req, res) =>{
    let userData = req.body
    console.log('POST: /login, '+ userData)
    //-- call API to find register user whether exists in the database?
    //res.status(200).send(userData)


    //jwt
    let payload  = {subject: userData._id}
    let token = jwt.sign(payload, "secretKey")

    res.status(200).send({token})
})

router.get('/events', (req, res) =>{
    let events =[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "I am event",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "I am event",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "I am event",
            "date": "2019-10-23T18:25:43.511z"
        }

    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) =>{
    let events =[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "I am special",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "I am special",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "I am special",
            "date": "2019-10-23T18:25:43.511z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "I am special",
            "date": "2019-10-23T18:25:43.511z"
        }
    ]

    res.json(events)
})

module.exports = router