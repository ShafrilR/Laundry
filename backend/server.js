const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())

app.listen(8000,()=>{
    console.log('server is running');
})

//router
let member = require("./router/member")
let user = require("./router/user")
let paket = require("./router/paket")
let transaksi = require("./router/transaksi")
let detail = require("./router/detail")
let auth = require("./router/auth")

//use
app.use("/member",member)
app.use("/user",user)
app.use("/paket",paket)
app.use("/transaksi",transaksi)
app.use("/detail",detail)
app.use("/auth",auth)