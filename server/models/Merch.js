const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchSchema = new Schema({
    merchName: String,
    price: Number,
    colors: [String],
    sizes: [String],
    imagesOfMerch: [String],
    typeOfMerch: String
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;