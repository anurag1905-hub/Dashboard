const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Risk = mongoose.model('Risk',riskSchema);

module.exports = Risk;