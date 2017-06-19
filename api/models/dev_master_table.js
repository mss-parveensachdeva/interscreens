var cloudant = require('./dev-db-connection.js');
module.exports = cloudant.db.use('master_table');