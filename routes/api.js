const express = require('express')
const router = express.Router()
//const user = require('../models/user')

router.get('/', (req, res) => {
    res.send('From API route')
})


router.post('/register', (req, res) => {
    let userData = req.body
    console.log('POST: /register, '+ userData)
    //-- call API to save register user into database
    res.status(200).send(userData)
})

router.post('/login', (req, res) =>{
    let userData = req.body
    console.log('POST: /login, '+ userData)
    //-- call API to find register user whether exists in the database?
    res.status(200).send(userData)
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

router.get('/special', (req, res) =>{
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
            "description": "I am special",
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