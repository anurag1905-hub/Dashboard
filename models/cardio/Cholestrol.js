const mongoose = require('mongoose');

const cholestrolSchema = new mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Cholestrol = mongoose.model('Cholestrol',cholestrolSchema);

module.exports = Cholestrol;