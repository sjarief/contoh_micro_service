const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
const app = express()

app.use(bodyParser.json())
mongoose.connect("mongodb://bejo:abc123@ds261116.mlab.com:61116/orderan", () => {
    console.log("berhasil konek pada database orderan")
})

require("./Ordermodel")
const Order = mongoose.model("Order")

app.post("/order", (req, res) => {
    var newOrder = {
        KonsumenID: mongoose.Types.ObjectId(req.body.KonsumenID),
        BukuID: mongoose.Types.ObjectId(req.body.BukuID),
        pemasukanData: req.body.pemasukanData,
        waktuPengiriman: req.body.pemasukanData
    }
    var order = new Order(newOrder)
    order.save().then(() => {
        console.log("pesanan berhasil dibuat")
        res.send("berhasil dibuat")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.get("/orders", (req, res) => {
    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
            axios.get("http://localhost:4000/customer/" + order.KonsumenID).then((response) => {
                var orderObject = {namaKonsumen: response.data.nama, judulBuku: ''}
                axios.get("http://localhost:3000/book/" + order.BukuID).then((response) => {
                    orderObject.judulBuku = response.data.judul
                    res.json(orderObject)
                })
            })           
        }else{
            res.send("invalid order")
        }
    })
})

app.listen(5000, () => {
    console.log("server order jalan pada port 5000")
})