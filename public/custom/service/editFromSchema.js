(function(app, undefined){
	app
	.service('EDIT_FORM_SCHEMA', function(){
		this.UserSchema = function(){
			return {
				type: "object",
				properties: {
					_id: {
						type: "string",
						title: "Id",
						readOnly: true
					},
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
						readOnly: true
					},
					virtual_phone: {
						type: "number",
						title: "Virtual Phone",
						readOnly: true
					},
					email: {
						type: "string",
						title: "Email",
					},
					type: {
					  type: "string",
					  enum: ['public','admin'],
					  default: 'public'
					},
					image : {
						type: "string",
						title: "Image path",
					},
					access_token : {
						type: "string",
						title: "Access Token",
						readOnly: true
					},
					security_level : {
						type: "string",
						title: "Security level",
						readOnly: true
					}
				}	
			};
		};
		
		this.TemplateSchema = function(){
			return {
				type: "object",
				properties: {
					_id : {
						type: "string",
						title: "Id",
						readOnly: true
					},
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
					_id : {
						type: "string",
						title: "Id",
						readonly:true
					},
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
			/**
			 *this TimeoutSchema is not in use while editing the timeout record
			 *I create custom html form to show the timeout obj due to client requirement which
			 *isn't possible into angular-schema-from yet.
			 */
			return {
				type: "object",
				properties: {
					_id : {
						type: "string",
						title: "Id",
						readonly:true
					},
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
								type:"string",
								title: "Delivery Count",
								enum : ["0","1","2"]
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
		
		this.TaskTableSchema = function(doc){
			return {
				type: "object",
				properties:	{
					_id : {
						type: "string",
						title: "Id",
						readOnly:true
					},
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
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "header_template_id",
						to_table : "template",
						to_id : doc.header_template_id 
					},
					detail_template_id: {
						type: "string",
						title: "Detail Template",
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "detail_template_id",
						to_table : "template",
						to_id : doc.detail_template_id 
					},
					footer_template_id: {
						type: "string",
						title: "Footer Template",
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "footer_template_id",
						to_table : "template",
						to_id : doc.footer_template_id 
					},
					timeout_id: {
						type: "string",
						title: "Timeout",
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "timeout_id",
						to_table : "timeout",
						to_id : doc.timeout_id 
					},
					location_ids: {
						type: "string",
						title: "Location",
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "location_ids",
						to_table : "location",
						to_id : doc.location_ids 
					},
					child_default_task_id: {
						type: "string",
						title: "Child Defalt Task",
						format : "editfield",
						readOnly: true,
						from_id : doc._id ,
						from_table: doc.table,
						from_field: "child_default_task_id",
						to_table : "task_table",
						to_id : doc.child_default_task_id
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
