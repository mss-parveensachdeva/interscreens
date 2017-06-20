var	master_table = require('../models/default_master_table'),
	_			 = require('lodash'),
	path 		 = require('path'),
	Service 	 = require('../service/db_service'),
	config		 = require(path.join(__dirname,'../../config/default-db-config.json'));
	pkgcloud     = require('pkgcloud');


function SelectDatabase(db_name){
	switch(db_name){
		case "default":
			console.log("Comes in Default case");
			return require('../models/default_master_table');
		case "dev":
			console.log("Comes in dev case");
			return require('../models/dev_master_table');
		case "live":
			console.log("Comes in live case");
			return require('../models/live_master_table');
		case "test":
			console.log("Comes in test case");
			return require('../models/test_master_table');
		default:
			console.log("Comes in Unmatched case");
			return require('../models/default_master_table');
	}
}

module.exports = {
	copy_record: function(req, res){
		if(_.isEmpty(req.body)) return res.status(400).json({status: 400, error: true, msg: "Request body must be required.", data: null});
		
		var params = _.pick(req.body, 'selected_db', 'obj');
		if(_.isEmpty(params.selected_db)) return res.status(400).json({status: 400, error: true, msg: "Target db must be required for copy task", data: null});
		if(_.isEmpty(params.obj)) return res.status(400).json({status:400, error: true, msg: "Data for copy task is required.", data: null});
		
		var selected_db = SelectDatabase(params.selected_db);
	
		switch(params.obj.table){
			case "task_table":
				Service.copy_task_table(master_table, selected_db, params.obj, function(){});
				break;
			case "template":
				Service.copy_template_table(master_table, selected_db, params.obj, function(err, insert_res){
					if(err){
						console.log("err", err);
						return res.status(500).json(err);
					}else{
						return res.status(201).json(insert_res);
					}
				});
				break;
		}
	},
	serDefaultDbConnection: function(req, res){
		var params = req.params;
		if(_.isEmpty(params)) return res.status(400).json({status:400, error: true, msg: "Request params are missing.", data: null});
		if(_.isEmpty(params.db_name)) return res.status(400).json({status:400, error: true, msg: "Request params db_name are missing.", data: null});
		master_table = {} ;
		master_table = SelectDatabase(params.db_name);
		return res.status(200).json({status: 200, error: false, msg: "Database set successfully"});
	},
	
	record_by_id: function(req, res){
		var params = req.params;
		if(!params.table_name) return res.status(400).json({status: 400, error: true, msg:"`table_name` must be required", data: null});
		if(!params.id) return res.status(400).json({status: 400, error: true, msg:"`id` must be required", data: null});
		
		var query = `table:${params.table_name} AND _id:${params.id}`;

		master_table.search('filterBy', 'filterBy', {q: query, include_docs: true}, (err, record)=>{
			console.log("records >>>>", record.rows);
			if(err) return res.status(500).json(err);
			
			if(_.isEmpty(record.rows)){
				return res.status(200).json({status: 200, error: false, msg: "No record found.", data: null});	
			}else{
				var resultArr = [];
				_.map(record.rows, function(obj){
					resultArr.push(obj.doc);
				});
				return res.status(200).json(resultArr);	
			}
		});
	},
	
	list : function(req, res){
		var params = req.params ,
		query = "table:" + params.table_name ;

		master_table.search('filterBy', 'filterBy', {q : query, include_docs: true, sort: "_id<string>"}, function(err, db_output){
			if(err) return res.status(500).json(err);
			
			if(_.isEmpty(db_output.rows)){
			
				return res.status(200).json({status: 200, error: false, msg: "No record found.", data: null});	
			}else{
				var resultArr = [];
				_.map(db_output.rows, function(obj){
					resultArr.push(obj.doc);
				});
				return res.status(200).json(resultArr);	
			}
		});
	},
	
	login: function(req, res){
		var body = req.body ,
		query = "table:users AND virtual_phone:" + body.phone ;
		master_table.search('filterBy', 'filterBy', {q : query}, function(err, db_output){
			if(err) return res.status(500).json(err);
			return res.status(200).json(db_output.rows);
		});
	},
	
	update_document: function(req, res){
		var body = req.body ;
		master_table.insert(body, function(err, updated_content){
			if(err) res.status(500).json({status: 500, error: true, msg: "Something happned wrong", data: err});
			return res.status(200).json(updated_content);
		});
	},
	
	mediaUploadServer: function(req, res){
		console.log("configuration is as follows", config.IBM_STORAGE_OBJECT_CREDENTAILS);
		//var client = pkgcloud.storage.createClient(config.IBM_STORAGE_OBJECT_CREDENTAILS);
		//client.auth(function(err) {
		//	if (err) {
		//		return res.status(401).json({status: 401, error: true, msg: "Un-authorized access to upload media.", data: err});
		//	}else {
		//		console.log("IBM Storage Object Authenticated successfully!!!!!");
		//		//console.log(storageClient._identity);
		//		return res.status(200).json({status: 200, data: "Testing data right now."});
		//	}
		//});
		req.file('file')
		.upload({
		  adapter: require("skipper-openstack"),
		  credentials: config.IBM_STORAGE_OBJECT_CREDENTAILS,
		  container: config.STORAGE_CONTAINER
		}, function (err, uploadedFiles) {
			if (err) {
				console.log(err);
				return res.status(401).json({status: 401, error: true, msg: "Un-authorized access to upload media.", data: err});
			}
			else {
				console.log("uploadedFiles >>>", uploadedFiles);
				return res.status(200).json({status: 200, data: "Testing data right now."});
			}
		});
	}
} ;