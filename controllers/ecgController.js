const Storage = require('../models/ecg/storageSchema');

module.exports.storeLSTM512 = async function(req,res){
    console.log('Receiving data for LSTM Window size 512');
    let data = req.body;
    //console.log('data is = '+data);
    if(data==null||data.length==0){
        return res.status(200).json({
            message:"No Data delivered. Array sent is empty"
        });
    }
    let storage = await Storage.findOne({name:"LSTM512"});
    // console.log('Before');
    // console.log(storage.values.length);
    // console.log(storage);
    if(storage==null||storage.length==0){
        storage = await Storage.create({
            name:"LSTM512",
            values:[]
        });
    }
    for(let key in data){
        let val = data[key];
        let data_val = val.data 
        storage.values.push(data_val);
    } 
    storage.save();
    // console.log('After');
    // console.log(storage.values.length);
    // console.log(storage);
    return res.status(200).json({
        message:"Data delivered"
    });
}

module.exports.storeLSTM1024 = async function(req,res){
    console.log('Receiving data for LSTM Window size 1024');
    let data = req.body;
    if(data==null||data.length==0){
        return res.status(200).json({
            message:"No Data delivered. Array sent is empty"
        });
    }
    let storage = await Storage.findOne({name:"LSTM1024"});
    // console.log('Before');
    //console.log(storage.values.length);
    // console.log(storage);
    if(storage==null||storage.length==0){
        storage = await Storage.create({
            name:"LSTM1024",
            values:[]
        });
    }
    for(let key in data){
        let val = data[key];
        let data_val = val.data 
        storage.values.push(data_val);
    } 
    storage.save();
    // console.log('After');
    // console.log(storage.values.length);
    // console.log(storage);
    return res.status(200).json({
        message:"Data delivered"
    });
}

module.exports.storeLSTM2048 = async function(req,res){
    console.log('Receiving data for LSTM Window size 2048');
    let data = req.body;
    if(data==null||data.length==0){
        return res.status(200).json({
            message:"No Data delivered. Array sent is empty"
        });
    }
    let storage = await Storage.findOne({name:"LSTM2048"});
    // console.log('Before');
    // console.log(storage.values.length);
    // console.log(storage);
    if(storage==null||storage.length==0){
        storage = await Storage.create({
            name:"LSTM2048",
            values:[]
        });
    }
    for(let key in data){
        let val = data[key];
        let data_val = val.data 
        storage.values.push(data_val);
    } 
    storage.save();
    // console.log('After');
    // console.log(storage.values.length);
    // console.log(storage);
    return res.status(200).json({
        message:"Data delivered"
    });
}

module.exports.storeTL = async function(req,res){
    console.log('Receiving data for TL');
    let data = req.body;
    //console.log('data = '+data);
    if(data==null||data.length==0){
        return res.status(200).json({
            message:"No Data delivered. Array sent is empty"
        });
    }
    let storage = await Storage.findOne({name:"TL"});
    // console.log('Before');
    // console.log(storage.values.length);
    // console.log(storage);
    if(storage==null||storage.length==0){
        storage = await Storage.create({
            name:"TL",
            values:[]
        });
    }
    for(let key in data){
        let val = data[key];
        let data_val = val.data 
        storage.values.push(data_val);
    } 
    storage.save();
    // console.log('After');
    // console.log(storage.values.length);
    // console.log(storage);
    return res.status(200).json({
        message:"Data delivered"
    });
}

module.exports.storeheartData = async function(req,res){
    console.log('Receiving data for heart rate');
    let data = req.body;
    //console.log('data = '+data);
    if(data==null||data.length==0){
        return res.status(200).json({
            message:"No Data delivered. Array sent is empty"
        });
    }
    let storage = await Storage.findOne({name:"heartRate"});
    // console.log('Before');
    // console.log(storage.values.length);
    // console.log(storage);
    if(storage==null||storage.length==0){
        storage = await Storage.create({
            name:"heartRate",
            values:[]
        });
    }
    for(let key in data){
        let val = data[key];
        let data_val = val.data 
        storage.values.push(data_val);
    } 
    storage.save();
    // console.log('After');
    // console.log(storage.values.length);
    // console.log(storage);
    return res.status(200).json({
        message:"Data delivered"
    });
}

module.exports.home = async function(req,res){
    let lstm512 = await Storage.findOne({name:"LSTM512"});
    let lstm1024 = await Storage.findOne({name:"LSTM1024"});
    let lstm2048 = await Storage.findOne({name:"LSTM2048"});
    let tl = await Storage.findOne({name:"TL"});
    let hr = await Storage.findOne({name:"heartRate"});

    if(lstm512==null||lstm1024==null||lstm2048==null||tl==null||hr==null){
        return res.status(404).json({
            message:"No models"
        });
    }

    let lstm512_x_values = [];
    let lstm1024_x_values = [];
    let lstm2048_x_values = [];
    let TL_x_values = [];
    let heart_x_values = [];

    let lstm512_x_size = Math.min(1000,lstm512.values.length);
    let lstm1024_x_size = Math.min(1000,lstm1024.values.length);
    let lstm2048_x_size = Math.min(1000,lstm2048.values.length);
    let tl_x_size = Math.min(1000,tl.values.length);
    let hr_x_size = Math.min(1000,hr.values.length);

    for(let i=1;i<=lstm512_x_size;++i){
        lstm512_x_values.push(i);
    }

    for(let i=1;i<=lstm1024_x_size;++i){
        lstm1024_x_values.push(i);
    }

    for(let i=1;i<=lstm2048_x_size;++i){
        lstm2048_x_values.push(i);
    }

    for(let i=1;i<=tl_x_size;++i){
        TL_x_values.push(i);
    }

    for(let i=1;i<=hr_x_size;++i){
        heart_x_values.push(i);
    }


    let lstm512_values = lstm512.values.slice(-lstm512_x_size);
    let lstm1024_values = lstm1024.values.slice(-lstm1024_x_size);
    let lstm2048_values = lstm2048.values.slice(-lstm2048_x_size);
    let tl_values = tl.values.slice(-tl_x_size);
    let hr_values = hr.values.slice(-hr_x_size);

    return res.render('ecg',{
        tl_values:tl_values,
        lstm512_values:lstm512_values,
        lstm1024_values:lstm1024_values,
        lstm2048_values:lstm2048_values,
        lstm512_x_values:lstm512_x_values,
        lstm1024_x_values:lstm1024_x_values,
        lstm2048_x_values:lstm2048_x_values,
        TL_x_values:TL_x_values,
        hr_values:hr_values,
        heart_x_values:heart_x_values
    });
}

module.exports.refreshData = function(req,res){

}