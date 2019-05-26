const mongoose = require("mongoose")

//buat model

mongoose.model("Book", {
    judul: {
        type: String,
        require: true
    },
    pengarang: {
        type: String,
        require: true
    },
    jumlahHalaman: {
        type: Number,
        require: false
    }, 
    penerbit: {
        type: String,
        require: false
    }
})