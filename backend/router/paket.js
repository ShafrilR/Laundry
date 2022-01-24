// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
// memanggil model
const paket = require('../models/index').paket

// memanggil verifyToken agar bisa digunakan
const verify = require('./verify')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/',verify, async (req,res) =>{
    paket.findAll({
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
app.post('/',verify, async (req, res) => {
    let data = {
        jenis: req.body.jenis,
        harga: req.body.harga
    }
    paket.create(data)
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
    let param = { id_paket: req.body.id_paket }
    let data = {
        jenis: req.body.jenis,
        harga: req.body.harga
    }
    paket.update(data,{where:param})
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
app.delete('/:id_paket',verify,  async (req, res) => {
    let param = { id_paket: req.params.id_paket }
    paket.destroy({where:param})
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



