const mongoose = require('mongoose');

const systolicSchema = new mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Systolic = mongoose.model('Systolic',systolicSchema);

module.exports = Systolic;