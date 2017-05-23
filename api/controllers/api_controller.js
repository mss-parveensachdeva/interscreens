var master_table = require('../models/master_table'),
	_			 = require('lodash');

module.exports = {
	record_by_id: function(req, res){
		var params = req.params;
		if(!params.table_name) return res.status(400).json({status: 400, error: true, msg:"`table_name` must be required", data: null});
		if(!params.id) return res.status(400).json({status: 400, error: true, msg:"`id` must be required", data: null});
		
		var query = `table:${params.table_name} AND _id:${params.id}`;
		master_table.search('filterBy', 'filterBy', {q: query, include_docs: true}, (err, record)=>{
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
			if(err) return res.status(500).json(err);
			return res.status(200).json(updated_content);
		});
	}
} ;