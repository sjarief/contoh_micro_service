const mongoose = require("mongoose")


mongoose.model("Order", {
    KonsumenID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BukuID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    pemasukanData: {
        type: Date,
        required: true
    },
    waktuPengiriman: {
        type: Date,
        required: true
    }
})