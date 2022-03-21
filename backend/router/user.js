// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
// memanggil model
const user = require('../models/index').user

// memanggil verifyToken agar bisa digunakan
const verify = require('./verify')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/',verify, async (req,res) =>{
    user.findAll({
        include: [{all:true, nested: true}]
    })
    .then(result=>{
        res.json(result)
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

// POST
app.post('/', async (req, res) => {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    user.create(data)
    .then(result => {
        res.json({
            message: 'Data Inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// PUT
app.put('/', verify, async (req, res) => {
    let param = { id_user: req.body.id_user }
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    user.update(data,{where:param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// DELETE
app.delete('/:id_user',verify,  async (req, res) => {
    let param = { id_user: req.params.id_user }
    user.destroy({where:param})
    .then(result => {
        res.json({
            message: 'Data Destroyed',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app



