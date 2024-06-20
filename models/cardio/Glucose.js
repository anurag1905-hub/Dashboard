const mongoose = require('mongoose');

const glucoseSchema = new mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Glucose = mongoose.model('Glucose',glucoseSchema);

module.exports = Glucose;