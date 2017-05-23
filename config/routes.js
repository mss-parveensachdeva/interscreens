var master_table = require('../api/controllers/api_controller');
module.exports = function(router){
	
	router.get('/api/record_by_id/:table_name/:id', function(req, res){
		return master_table.record_by_id(req, res);
	});
	
	router.get('/api/get_list/:table_name', function(req, res){
		return master_table.list(req, res);
	});
	
	router.put('/api/update', function(req, res){
		return master_table.update_document(req, res);
	});
	
	router.post('/api/login', function(req, res){
		return master_table.login(req, res);
	});
	
	router.get('/', function(req, res){
		return res.render('index');
	});
};