const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('From API route')
})


let activeUser = {email:'a', password:'a'}; //hard code for test

router.post('/register', (req, res) => {
    let userData = req.body

    if(activeUser.email === userData.email){
        return res.status(403).send('user have already logged in')
    } else {
        activeUser = userData
        console.table(activeUser)
    }

    //-- call API to save register user into database

    //jwt
    let payload  = {subject: userData._id}
    let token = jwt.sign(payload, "secretKey")

    res.status(200).send({token})
})

router.post('/login', (req, res) =>{
    let userData = req.body

    //-- call API to find register user whether exists in the database?
    
    if(activeUser.email === userData.email){
        return res.status(403).send('user have already logged in')
    } else {
        activeUser = userData
        console.table(activeUser)
    }


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

function verifyToken(req, res, next){
    if(!req.headers.authorization) {
        return res.status(401).send('XX: Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

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
        return res.status(401).send('hack token: Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

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