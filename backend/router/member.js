// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
// memanggil model
const member = require('../models/index').member

// memanggil verifyToken agar bisa digunakan
const verify = require('./verify')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/',verify, async (req,res) =>{
    member.findAll({
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
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    member.create(data)
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
app.put('/',verify,  async (req, res) => {
    let param = { id_member: req.body.id_member }
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    member.update(data,{where:param})
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
app.delete('/:id_member',verify,  async (req, res) => {
    let param = { id_member: req.params.id_member }
    member.destroy({where:param})
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



