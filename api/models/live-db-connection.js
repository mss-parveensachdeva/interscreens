// load local VCAP configuration  and service credentials
var path  = require('path');

var vcapLocal, cloudant;
try {
	vcapLocal = require(path.join(__dirname,'../../config/live-db-config.json'));
	//console.log("vcapLocal >>>", vcapLocal);
} catch (e) {
	console.log("unable to load local configurations", e);
	throw new Error("unable to load local configurations");
}

const appEnvOpts = vcapLocal ? {
	vcap: vcapLocal
} : {};
const appEnv = appEnvOpts;

if (appEnv.vcap.services.cloudantNoSQLDB) {
	// Load the Cloudant library.
	var CloudantModule = require('cloudant');
	// Initialize database with credentials
	cloudant = CloudantModule(appEnv.vcap.services.cloudantNoSQLDB[0].credentials);
} else {
	console.log("Please check your configuration file" , path.join(__dirname,'../../config/live-db-config.json'), JSON.stringify(appEnv));
	throw new Error('Unabel to load both the database configurations');	
}

module.exports = cloudant;