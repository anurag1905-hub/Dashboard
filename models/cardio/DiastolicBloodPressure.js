const mongoose = require('mongoose');

const diastolicSchema = new mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Diastolic = mongoose.model('Diastolic',diastolicSchema);

module.exports = Diastolic;