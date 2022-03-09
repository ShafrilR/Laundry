// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
// memanggil model
const detail = require('../models/index').detail

// memanggil verifyToken agar bisa digunakan
const verify = require('./verify')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/', verify, async (req,res) =>{
    detail.findAll({
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
app.post('/', verify, async (req, res) => {
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty
    }
    detail.create(data)
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
    let param = { id_detail: req.body.id_detail }
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty
    }
    detail.update(data,{where:param})
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
app.delete('/:id_detail',verify,  async (req, res) => {
    let param = { id_detail: req.params.id_detail }
    detail.destroy({where:param})
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

// GET Detail with ID Transaksi
app.get('/:id_transaksi', verify,  async (req,res) =>{
    let param = { id_transaksi: req.params.id_transaksi }
    detail.findAll({where:param})
    .then(result => {
        res.json({
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



