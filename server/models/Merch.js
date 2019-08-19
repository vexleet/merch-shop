const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchSchema = new Schema({
    merchName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    colors: { type: [String], required: true },
    sizes: { type: [String], required: true },
    imagesOfMerch: { type: Schema.Types.Mixed, required: true },
    typeOfMerch: { type: String, required: true }
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;