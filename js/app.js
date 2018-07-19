var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		successMessage: "",
		errorMessage: "",
		users: [],
		newUser: {userid: "", useremail: "", usermobile: ""},
		clickedUser: {}
	},

	mounted: function(){
		console.log('Mounted');
		this.getAllUsers();
	},

	methods: {
		getAllUsers: function (){
			axios.get("http://localhost/demoapi/api.php?action=read")
			.then(function(response){
				// console.log(response);
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.users = response.data.users;
				}
			})
		},

		saveUser: function (){
			var formData = app.toFormData(app.newUser);
			axios.post("http://localhost/demoapi/api.php?action=create", formData)
			.then(function(response){
				// console.log(response);
				app.newUser = {userid: "", useremail: "", usermobile: ""};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			})
		},

		selectUser: function(user){
			app.clickedUser = user;

		},



		updateUser: function (){
			var formData = app.toFormData(app.clickedUser);
			axios.post("http://localhost/demoapi/api.php?action=update", formData)
			.then(function(response){
				// console.log(response);
				app.newUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			})
		},



		deleteUser: function (){
			var formData = app.toFormData(app.clickedUser);
			axios.post("http://localhost/demoapi/api.php?action=delete", formData)
			.then(function(response){
				// console.log(response);
				app.newUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			})
		},


		toFormData: function(obj){
			var form_data = new FormData();
		      for ( var key in obj ) {
		          form_data.append(key, obj[key]);
		      } 
		      return form_data;
		},

		clearMessage: function(){
			app.errorMessage = "";
			app.successMessage = "";
		}
	}
});
