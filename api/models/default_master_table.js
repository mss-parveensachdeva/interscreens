var cloudant = require('./default-db-connection.js');
module.exports = cloudant.db.use('master_table');