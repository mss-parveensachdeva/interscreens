var async	= require('async'),
	_		= require('lodash');

module.exports = {
	copy_task_table: function(from_db, target_db, obj, callback){

		async
		.series(
		[(cb)=>{ //save user on behalf of user_id
			if(_.isEmpty(obj.user_id)){
				cb(null, {isSaved: false, reason: "Unable to save user with null `user_id`!!!", data: null});
			}else{
				var query = "table:users AND _id:" + obj.user_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save user with null `user_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to find user with `user_id`!!!", data: null});							
						}else{
							delete db_output.rows[0].doc._rev ;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `User record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}
		},
		(cb)=>{ //save details on behalf of page_id
			if(_.isNull(obj.page_id) || _.isUndefined(obj.page_id)){
				cb(null, {isSaved: false, reason: "Unable to save detail with null `page_id`!!!", data: null});
			}else{
				var query = "table:details AND page_id:" + obj.page_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save detail with null `page_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to save detail with null `page_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev ;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Details record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}
		},
		(cb)=>{ //save header_template on behalf of header_template_id
			if(_.isEmpty(obj.header_template_id)){
				cb(null, {isSaved: false, reason: "Unable to save template with null `header_template_id`!!!", data: null});
			}else{
				var query = "table:template AND _id:" + obj.header_template_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save template with null `header_template_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Tempalte already exist with `header_template_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Template record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}	
		},
		(cb)=>{ //save detail_template on behalf of detail_template_id
			if(_.isEmpty(obj.detail_template_id)){
				cb(null, {isSaved: false, reason: "Unable to save template with null `detail_template_id`!!!", data: null});
			}else{
				var query = "table:template AND _id:" + obj.detail_template_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save template with null `detail_template_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to save template with null `detail_template_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Template record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}			
		},
		(cb)=>{ //save detail_template on behalf of footer_template_id
			if(_.isEmpty(obj.footer_template_id)){
				cb(null, {isSaved: false, reason: "Unable to save template with null `footer_template_id`!!!", data: null});
			}else{
				var query = "table:template AND _id:" + obj.footer_template_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save template with null `detail_template_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to save template with null `footer_template_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Template record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}	
		},
		(cb)=>{ //save timeout record on behalf of timeout_id
			if(_.isEmpty(obj.timeout_id)){
				cb(null, {isSaved: false, reason: "Unable to save timeout with null `timeout_id`!!!", data: null});
			}else{
				var query = "table:timeout AND _id:" + obj.timeout_id ;
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save timeout with null `timeout_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to save timeout with null `timeout_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Timeout record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}
		},
		(cb)=>{ //save location record on behalf of location_id
			if(_.isEmpty(obj.location_id)){
				console.log("comes in empty location_id case");
				cb(null, {isSaved: false, reason: "Unable to save location with null `location_id`!!!", data: null});
			}else{
				var query = "table:location AND _id:" + obj.location_id ;
				
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save location with null `location_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows)){
							cb(null, {isSaved: false, reason: "Unable to save location with null `location_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Location record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}
		},
		(cb)=>{ //save task record on behalf of child_default_task
			if(_.isEmpty(obj.child_default_task_id)){
				cb(null, {isSaved: false, reason: "Unable to save task with null `child_default_task`!!!", data: null});
			}else{
				var query = "table:task_table AND _id:" + obj.child_default_task_id ;
				
				from_db.search('filterBy', 'filterBy', {q : query, include_docs: true}, function(err, db_output){
					if(err){
						cb(null, {isSaved: false, reason: "Unable to save task with null `child_default_task_id`!!!", data: null});
					}else{
						if(_.isEmpty(db_output.rows[0])){
							cb(null, {isSaved: false, reason: "Unable to save task with null `child_default_task_id`!!!", data: null});
						}else{
							delete db_output.rows[0].doc._rev;
							target_db.insert(db_output.rows[0].doc, function(err, inserted_content){
								if(err){
									cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
								}else {
									cb(null, {isSaved: true, reason: `Task record copy to target_db successfully!!!`, data: inserted_content});
								}
							});
						}
					}
				});
			}
		},
		(cb)=>{
			delete obj._rev ;
			target_db.insert(obj, function(err, inserted_content){
				if(err){
					cb(null, {isSaved: false, reason: "Something happned wrong while saving record. Please try again after sometime!!!", data: null});
				}else {
					cb(null, {isSaved: true, reason: `Task record copy to target_db successfully!!!`, data: inserted_content});
				}
			});
		}
		],(err, res)=>{ //final response section to send callback from here
			callback(null, {status:201, error: false, msg: "Task Record copy to target_db successfully!!!", data: {error: err, data: res} });
			return;
		});
	},
	copy_table: function(from_db, target_db, obj, callback){
		delete obj._rev;
		target_db.insert(obj, function(err, inserted_content){
			if(err){
				callback({status: 500, error: true, msg: "Something happned wrong", data: err}, null);
				return;
			}else {
				callback(null, {status: 201, error: false, msg: `Record copy to target_db successfully`, data: {error: null, data: [{isSaved:true, reason: `${obj.table.toUpperCase()} Record copy to target_db successfully!!!`, data: inserted_content}]}});
				return;
			}
		});
	}
}; 