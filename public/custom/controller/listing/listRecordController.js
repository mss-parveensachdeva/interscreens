(function(app, undefined){
	app
	.controller('ListRecordController', recordControlerMethod);
	
	recordControlerMethod.$inject = ['list_record', '$state', 'LocalStorage', '$stateParams'];
	
	function recordControlerMethod(list_record, $state, LocalStorage, $stateParams){
		var vm = this;
			vm.currentPage = 0;
			vm.pageSize = 5;
		
		if(Object.keys(list_record).length){
			LocalStorage.setData('incoming_parameters', { from_id: $stateParams.data[0].from_id, from_table: $stateParams.data[0].from_table, from_field: $stateParams.data[0].from_field, to_table:$stateParams.data[0].to_table, to_id:$stateParams.data[0].to_id, isSelected: false });
			vm.list_table = list_record ;	
		}else{
			$state.go('edit_record');
		}		
		
		vm.numberOfPages = function () {
			if(vm.list_table){
				return Math.ceil(vm.list_table.length / vm.pageSize);
			}
		};
		
		vm.selectRow = function(obj){
			var stored_data = LocalStorage.getData('incoming_parameters');
			LocalStorage.setData('incoming_parameters', {from_id: stored_data.from_id, from_table: stored_data.from_table, from_field: stored_data.from_field, to_table: obj.table, to_id: obj._id, isSelected: true});
			$state.go('edit_record');
		};
	}
})(app);
