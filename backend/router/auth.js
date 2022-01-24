const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") // npm install jsonwebtoken
const md5 = require("md5")
app.use(express.json())

// model user
const user = require("../models/index").user

app.use(express.urlencoded({extended: true}))

// auth user
app.post("/login", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    try{
        let result = await user.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password",
            logged: false
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "LoginUser"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            logged: true
        })
    }
    }
    catch(e){
        console.log('Catch an error: ', e)
    }
}) 

// // auth user
// app.post("/loginkasir", async (req, res) => {
//     let parameter = {
//         username: req.body.username,
//         password: md5(req.body.password),
//         role: 'kasir'
//     }
//     try{
//         let result = await user.findOne({where: parameter})
//     if(result === null){
//         // invalid username or password
//         res.json({
//             message: "Invalid Username or Password",
//             logged: false
//         })
//     }else{
//         // login success
//         // generate token using jwt
//         // jwt->header, payload, secretKey
//         let jwtHeader = {
//             algorithm: "HS256",
//             expiresIn: "1h"
//         }

//         let payload = {data: result}
//         let secretKey = "LoginUser"

//         let token = jwt.sign(payload, secretKey, jwtHeader)
//         res.json({
//             data: result,
//             token: token,
//             logged: true
//         })
//     }
//     }
//     catch(e){
//         console.log('Catch an error: ', e)
//     }
// }) 


module.exports = app