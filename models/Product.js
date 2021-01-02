const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    productName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'created'
    },
    description: {
        type: String,
    },
    imagePath: {
        type: String,
        default: 'https://via.placeholder.com/250x250.png',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    unitPrice: {
        type: Number,
        default: 0,
    },
    categoryId:{
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
    },
    deletedDate: {
        type: Date,
    },
});

module.exports = Product = mongoose.model('Product', schema);