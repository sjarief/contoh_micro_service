const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb://bejo:abc123@ds261626.mlab.com:61626/konsumen", () => {
    console.log("berhasil bisa konek ke database konsumen")
})

require("./Customer")
const Customer = mongoose.model("Customer")

app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(customer){
            res.jsonp(customer)
        }else{
            res.send("konsumen tidak ditemukan")
        }
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.post("/customer", (req, res) => {
    var newCustomer = {
        nama: req.body.nama,
        umur: req.body.umur,
        alamat: req.body.alamat
    }

    var customer = new Customer(newCustomer)
    customer.save().then(() => {
        res.send("konsumen berhasil dibuat")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("Data konsumen berhasil dihapus")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.listen(4000, () => {
    console.log("server customers jalan pada port 4000")
})