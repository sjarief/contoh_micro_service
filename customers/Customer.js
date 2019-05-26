const mongoose = require("mongoose")

mongoose.model("Customer", {
    nama: {
        type: String,
        require: true
    },
    umur: {
        type: Number, 
        require: true
    },
    alamat: {
        type: String,
        require: true
    }
})