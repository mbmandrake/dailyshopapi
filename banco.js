const sql = require('mssql');

// const config = {
//     server: process.env.DB_HOST,
//     database: 'DAILYSHOP',
//     user: 'sa',
//     password: '123',
//     options:{
//         enableArithAbort: true
//     }
// };

const config ='mssql://dailyshoppi:12345678am@mssql914.umbler.com,5003/dailyshoppi';

module.exports.config = config;
