var cloudant = require('./live-db-connection.js');
module.exports = cloudant.db.use('master_table');