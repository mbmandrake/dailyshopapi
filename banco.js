const sql = require('mssql');

const config = {
    server: '192.168.0.101',
    database: 'DAILYSHOP',
    user: 'sa',
    password: '123',
    options:{
        enableArithAbort: true
    }
};

module.exports.config = config;