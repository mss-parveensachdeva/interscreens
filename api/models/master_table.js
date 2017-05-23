var cloudant = require('./index');
module.exports = cloudant.db.use('master_table');