(function(app, undefined){
	app
	.service('RECORD_LIST_SCHEMA', RECORD_LIST_SCHEMA_Method);
	
	RECORD_LIST_SCHEMA_Method.$inject = [];
	
	function RECORD_LIST_SCHEMA_Method(){
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
						title: "Template Name",
						readOnly: true
					},
					html: {
						type: "string",
						title: "Html code",
						readOnly: true
					},
					js: {
						type: "string",
						title: "JS code",
						readOnly: true
					},
				}
			};
		};
		
		this.UserSchema = function(){
			return {
				type: "object",
				properties: {
					first_name: {
						type: "string",
						title: "First Name",
						readOnly: true 
					},
					last_name: {
						type: "string",
						title: "Last Name",
						readOnly: true 
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
						readOnly: true 
					},
					Type: {
					  type: "string",
					  enum: ['Public','Admin'],
					  readOnly: true 
					},
					image : {
						type: "string",
						title: "Image path",
						readOnly: true 
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
		
		this.TimeoutSchema = function(){
			return {
				type: "object",
				properties: {
					name: {
						type: "string",
						title: "Timeout Name",
						readOnly: true
					},
					timeout_list: {
						type: "object",
						properties: {
							delivery_staus: {
								type: "boolean",
								title: "Delivery Status",
								default: true ,
								readOnly: true
							},
							delivery_count: {
								type:"number",
								title: "Delivery Count",
								readOnly: true
							},
							delivery_due: {
								type: "string",
								title: "Delivery Due",
								readOnly: true
							},
							delivery_user_ids : {
								type: "string",
								title: "Delivery users",
								readOnly: true
							},
							deliver_via : {
								type: "string",
								title: "Delivery Via",
								enum: ['App','email'],
								readOnly: true
							},
							delivery_task_id : {
								type: "string",
								title: "Delivery task",
								readOnly: true
							},
							message_id : {
								type: "string",
								title: "Message Id",
								readOnly: true
							},
							from_user_id: {
								type: "string",
								title: "From user",
								readOnly: true
							}
						}
					}
				}
			};
		};
		
		this.LocationSchema = function(){
			return {
				type: "object",
				properties: {
					location_name: {
						type: "string",
						title: "Location Name",
						readOnly: true 
					},
					location_type: {
						type: "string",
						title: "Location Type",
						readOnly: true 
					},
					location_data: {
						type: "object",
						properties: {
							lat: {
								type: "number",
								title: "Latitude",
								readOnly: true 
							},
							lng: {
								type: "number",
								title: "Longitude",
								readOnly: true 
							},
							distance: {
								type: "number",
								title: "Distance",
								readOnly: true 
							},
							web: {
								type: "string",
								title: "Web url",
								readOnly: true 
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
						title: "User Id",
						readOnly: true
					},
					task_name : {
						type: "string",
						title: "Task name",
						readOnly: true
					},
					header_template_id: {
						type: "string",
						title: "Header Template",
						readOnly: true
					},
					detail_template_id: {
						type: "string",
						title: "Detail Template",
						readOnly: true
					},
					footer_template_id: {
						type: "string",
						title: "Footer Template",
						readOnly: true
					},
					timeout_id: {
						type: "string",
						title: "Timeout",
						readOnly: true
					},
					location_ids: {
						type: "string",
						title: "Location",
						readOnly: true
					},
					child_defaults_task_id: {
						type: "string",
						title: "Child Defalt Task",
						readOnly: true
					},
					category:{
						type: "string",
						title: "Category",
						readOnly: true
					},
					status : {
						type: "boolean",
						title: "Status",
						default: true,
						readOnly: true
					},
					additional_data_fn :{
						type: "string",
						title: "Additional data",
						readOnly: true
					},
					optional_data: {
						type: "string",
						title: "Optional Data",
						readOnly: true
					},
					required_data : {
						type: "string",
						title: "Required Data",
						readOnly: true
					},
					offline_expiration_time: {
						type: "number",
						title: "Expiration Time",
						readOnly: true
					},
					display_if_empty: {
						type: "boolean",
						title: "Display if empty ?",
						default: true,
						readOnly: true
					},
					type : {
						type: "string",
						title: "Type",
						enum: ['Public', 'Admin'],
						readOnly: true
					},
					image : {
						type: "string",
						title: "Image",
						readOnly: true
					}
				}
			};
		};
	}
})(app);

