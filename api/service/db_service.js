module.exports = {
	copy_task_table: function(from_db, target_db, obj, callback){
		callback(null, true);
	},
	copy_template_table: function(from_db, target_db, obj, callback){
		delete obj._rev;
		target_db.insert(obj, function(err, inserted_content){
			if(err){
				callback({status: 500, error: true, msg: "Something happned wrong", data: err}, null);
				return;
			}else {
				callback(null, {status: 201, error: false, msg: `Record copy to target_db successfully`, data: inserted_content});
				return;
			}
		});
	}
};