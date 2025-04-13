const mongoose = require('mongoose');

const url = process.env.DataBaseUrl;

const ConnectMongodb = async()=>{
    try{
        await mongoose.connect(url)
        console.log('Database is connected....')

    }
    catch (error){
        console.log('Database is not connected.')
        
    }
}

module.exports = ConnectMongodb;
