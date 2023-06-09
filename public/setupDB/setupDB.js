const mongoose = require('mongoose')

const setupDb = async (mongoURL) => {

    const connect = await mongoose.connect(mongoURL);

    try {
        connect.connection.addListener('connect', () => {
            console.log('MongoDB was connected');
        })
    } catch (error) {
        connect.connection.addListener('error', (error) => {
            console.log('Error on mongoDB connection: ', err);
        })
    }

    return connect;

}

module.exports = { setupDb };