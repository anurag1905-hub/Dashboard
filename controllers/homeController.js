const Systolic = require('../models/cardio/SystolicBloodPressure');
const Diastolic = require('../models/cardio/DiastolicBloodPressure');
const Glucose = require('../models/cardio/Glucose');
const Cholestrol = require('../models/cardio/Cholestrol');
const Risk = require('../models/cardio/riskValue');


module.exports.home = async function(req,res){

    let sys = await Systolic.find({}).sort('-createdAt').limit(100);
    let dias = await Diastolic.find({}).sort('-createdAt').limit(100);
    let glu = await Glucose.find({}).sort('-createdAt').limit(100);
    let cho = await Cholestrol.find({}).sort('-createdAt').limit(100);
    let risk = await Risk.find({}).sort('-createdAt');

    let sys_values = [];
    let x_values = [];
    let counter = 0;
    let dias_values = [];
    let glu_values = [];
    let cho_values = [];
    let max_risk = 0;

    for(val of sys){
        sys_values.push(val.value);
        x_values.push(counter);
        counter++;
    }
    
    for(val of dias){
        dias_values.push(val.value);
    }

    for(val of glu){
        glu_values.push(val.value);
    }

    for(val of cho){
        cho_values.push(val.value);
    }

    for(val of risk){
        max_risk = Math.max(max_risk,val.value);
    }

    let very_low_risk = false;
    let low_risk = false;
    let medium_risk = false;
    let high_risk = false;
    let very_high_risk = false;

    if(max_risk<20){
        very_low_risk = true;
    }
    else if(max_risk>=15&&max_risk<=45){
        low_risk = true;
    }
    else if(max_risk>=35&&max_risk<=65){
        medium_risk = true;
    }
    else if(max_risk>=55&&max_risk<=85){
        high_risk = true;
    }
    else{
        very_high_risk = true;
    }

    return res.render('cardio',{
        xValues:x_values,
        SBP_values:sys_values,
        DBP_values:dias_values,
        Cholestrol_values:cho_values,
        Glucose_values:glu_values,
        very_low_risk:very_low_risk,
        low_risk:low_risk,
        medium_risk:medium_risk,
        high_risk:high_risk,
        very_high_risk:very_high_risk
    });
}

module.exports.saveData = async function(req,res){
    const systolic_bp = parseFloat(req.body.ap_hi);
    const diastoloc_bp = parseFloat(req.body.ap_lo);
    const cholestrol = parseFloat(req.body.cholestrol);
    const glucose = parseFloat(req.body.glucose);
    const riskValue = parseFloat(req.body.riskValue);
    // console.log('systolic bp = '+systolic_bp);
    // console.log('diastolic bp = '+diastoloc_bp);
    // console.log('cholestrol = '+cholestrol);
    // console.log('glucose = '+glucose);
    // console.log('riskValue = '+riskValue);
    
    let systolic = await Systolic.create({
        value:systolic_bp
    });

    let diastolic = await Diastolic.create({
        value:diastoloc_bp
    });

    let cholest = await Cholestrol.create({
        value:cholestrol
    });

    let glu = await Glucose.create({
        value:glucose
    });

    let risk = await Risk.create({
        value:riskValue
    });

    return res.send("");
}

module.exports.refreshData = function(req,res){

}