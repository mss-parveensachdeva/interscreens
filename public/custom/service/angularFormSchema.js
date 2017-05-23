(function(app, undefined){
	app
	.service('ADD_FORM_SCHEMA', function(){
		this.UserSchema = function(){
			return {
				type: "object",
				properties: {
					first_name: {
						type: "string",
						title: "First Name",
					},
					last_name: {
						type: "string",
						title: "Last Name",
					},
					phone: {
						type: "number",
						title: "Phone",
					},
					virtual_phone: {
						type: "number",
						title: "Virtual Phone",
					},
					email: {
						type: "string",
						title: "Email",
					},
					Type: {
					  type: "string",
					  enum: ['Public','Admin']
					},
					image : {
						type: "string",
						title: "Image path",
					},
					access_token : {
						type: "string",
						title: "Access Token",
					},
					security_level : {
						type: "string",
						title: "Security level",
					}
				}
			};
		};
		
		this.TemplateSchema = function(){
			return {
				type: "object",
				properties: {
					name: {
						type: "string",
						title: "Template Name"
					},
					html: {
						type: "string",
						title: "Html code"
					},
					js: {
						type: "string",
						title: "JS code"
					},
				}
			};
		};

		this.LocationSchema = function(){
			return {
				type: "object",
				properties: {
					location_name: {
						type: "string",
						title: "Location Name"
					},
					location_type: {
						type: "string",
						title: "Location Type"
					},
					location_data: {
						type: "object",
						properties: {
							lat: {
								type: "number",
								title: "Latitude"
							},
							lng: {
								type: "number",
								title: "Longitude"
							},
							distance: {
								type: "number",
								title: "Distance"
							},
							web: {
								type: "string",
								title: "Web url"
							}
						}
					}
				}
			};
		};
		this.TimeoutSchema = function(){
			return {
				type: "object",
				properties: {
					name: {
						type: "string",
						title: "Timeout Name"
					},
					timeout_list: {
						type: "object",
						properties: {
							delivery_staus: {
								type: "boolean",
								title: "Delivery Status",
								default: true 
							},
							delivery_count: {
								type:"number",
								title: "Delivery Count"
							},
							delivery_due: {
								type: "string",
								title: "Delivery Due"
							},
							delivery_user_ids : {
								type: "string",
								title: "Delivery users"
							},
							deliver_via : {
								type: "string",
								title: "Delivery Via",
								enum: ['App','email']
							},
							delivery_task_id : {
								type: "string",
								title: "Delivery task"
							},
							message_id : {
								type: "string",
								title: "Message Id"
							},
							from_user_id: {
								type: "string",
								title: "From user"
							}
						}
					}
				}
			};
		};
		
		this.TaskTableSchema = function(){
			return {
				type: "object",
				properties:	{
					user_id : {
						type: "string",
						title: "User Id"
					},
					task_name : {
						type: "string",
						title: "Task name"
					},
					header_template_id: {
						type: "string",
						title: "Header Template",
						//readonly: true,
						//format : "addfield",
						//from_table: "task_table",
						//from_field: "header_template_id",
						//to_table : "template",
						//to_id : null 
					},
					detail_template_id: {
						type: "string",
						title: "Detail Template",
						//readonly: true,
						//format : "addfield",
						//from_table: "task_table",
						//from_field: "detail_template_id",
						//to_table : "template",
						//to_id : null 
					},
					footer_template_id: {
						type: "string",
						title: "Footer Template",
						//readonly: true,
						//format : "addfield",
						//from_table: "task_table",
						//from_field: "footer_template_id",
						//to_table : "template",
						//to_id : null 
					},
					timeout_id: {
						type: "string",
						title: "Timeout",
						//readonly: true,
						//format : "addfield",
						//from_table: "task_table",
						//from_field: "timeout_id",
						//to_table : "timeout",
						//to_id : null 
					},
					location_ids: {
						type: "string",
						title: "Location",
						//format : "addfield",
						//readonly: true,
						//from_table: "task_table",
						//from_field: "location_ids",
						//to_table : "location",
						//to_id : null 
					},
					child_default_task_id: {
						type: "string",
						title: "Child Defalt Task",
						//format : "addfield",
						//readonly: true,
						//from_table: "task_table",
						//from_field: "child_default_task_id",
						//to_table : "location",
						//to_id : null 
					},
					category:{
						type: "string",
						title: "Category"
					},
					status : {
						type: "boolean",
						title: "Status",
						default: true
					},
					additional_data_fn :{
						type: "string",
						title: "Additional data"
					},
					optional_data: {
						type: "string",
						title: "Optional Data"
					},
					required_data : {
						type: "string",
						title: "Required Data"
					},
					offline_expiration_time: {
						type: "number",
						title: "Expiration Time"
					},
					display_if_empty: {
						type: "boolean",
						title: "Display if empty ?",
						default: true
					},
					type : {
						type: "string",
						title: "Type",
						enum: ['Public', 'Admin']
					},
					image : {
						type: "string",
						title: "Image"
					}
				}
			};
		};
	});
})(app);