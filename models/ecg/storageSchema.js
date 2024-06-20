const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
    name:String,
    values: [{type:Number}]
},{
    timestamps:true
});

const Storage = mongoose.model('LSTM512',storageSchema);

module.exports = Storage;