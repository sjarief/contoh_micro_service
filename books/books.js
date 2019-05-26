const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()


app.use(bodyParser.json())
//load mlab
require("./Book")
const Book = mongoose.model("Book")

mongoose.connect("mongodb://bejo:abc123@ds261136.mlab.com:61136/micro-service", () => {
    console.log("berhasil konek ke mlab")
})

app.get("/", (req, res) => {
    res.send("Ini main page lah emang apa lagi")
})

app.post("/book", (req, res) => {
   var newBook = {
       judul: req.body.judul,
       pengarang: req.body.pengarang,
       jumlahHalaman: req.body.jumlahHalaman,
       penerbit: req.body.penerbit
   }

   var book = new Book(newBook)
   book.save().then(() => {
       console.log("buku berhasil di save")
   }).catch((err) => {
       if(err){
           throw err;
       }
   })
   res.send("udah dibuat")
})

app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }else{
            res.sendStatus(404)
        }
    }).catch(err => {
        if(err){
            throw err
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send("Buku berhasil dihapus")
    }).catch(err => {
        if(err){
            throw err
        }
    })
})

app.listen(3000, () => {
    console.log("server berjalan pada port 3000")
})