var cloudant = require('./test-db-connection.js');
module.exports = cloudant.db.use('master_table');