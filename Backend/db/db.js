const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected To Database');
    }).catch((err) => {
        console.error('Database connection error:', err);
    });
}

module.exports = connectToDb;