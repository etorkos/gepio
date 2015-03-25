app.factory('prefFactory',function($http){
	return {
		savePreference : function(user,preferences){
			var path_to_save = '/api/user/' + user._id + '/savepreferences'; 
			$http.post(path_to_save,preferences).then(function(res){
				console.log(res.data);
			});
		}
	}
});

app.factory('PrefBuilder', function(){
	return {
		foods: {
			array: [
				{text: 'Italian', id: '4bf58dd8d48988d110941735'},
				{text: 'Chinese', id: '4bf58dd8d48988d145941735'},
				{text: 'Indian', id: '4bf58dd8d48988d10f941735'},
				{text: 'Mediterranean', id: '4bf58dd8d48988d1c0941735'},
				{text: 'Mexican', id: '4bf58dd8d48988d1c1941735'},
				{text: 'Spanish', id: '4bf58dd8d48988d150941735'},
				{text: 'Portugese', id: '4def73e84765ae376e57713a'},
				{text: 'Ethipoian', id: '4bf58dd8d48988d10a941735'},
				{text: 'Polish', id: '52e81612bcbc57f1066b7a04'},
				{text: 'German', id: '4bf58dd8d48988d10d941735'},
				{text: 'Thai', id: '4bf58dd8d48988d149941735'},
				{text: 'Deli', id: '4bf58dd8d48988d146941735'},
				{text: 'Burgers', id: '4bf58dd8d48988d16c941735'},
				{text: 'Vegetarian', id: '4bf58dd8d48988d1d3941735'},
				{text: 'Food Court', id: '4bf58dd8d48988d120951735'},
				{text: 'Noodle House', id: '4bf58dd8d48988d1d1941735'}	
			],
			type: 'foods'
		},
		events: {
			array: [
				{text: 'Movies', id: 'movie'},
				{text: 'Live Sports', id: '108'},
				{text: 'Live Music', id: '103'},
				{text: 'Performing & Visual Arts', id: '105'},
				{text: 'Science & Technology', id: '102'},
				{text: 'Media & Entertainment', id: '104'},
				{text: 'Family Friendly', id: '115'},
				{text: 'Outdoors', id: '109'},
				{text: 'Business & Professional', id: '101'},
				{text: 'Air/Boat/Car Shows', id: '118'}
			],
			type: 'events'
		},
		nights: {
			array: [
				{text: 'Dive Bars', id: '4bf58dd8d48988d118941735'},
				{text: 'Clubs', id: '4bf58dd8d48988d11f941735'},
				{text: 'Lounge', id: '4bf58dd8d48988d121941735'},
				{text: 'Karaoke', id: '4bf58dd8d48988d120941735'},
				{text: 'Speakeasy', id: '4bf58dd8d48988d1d4941735'},
				{text: 'Beer Garden',id: '4bf58dd8d48988d117941735'},
				{text: 'Walking Distance', id: '4d4b7105d754a06376d81259', distance:'3km'},
				{text: 'LGBT Friendly', id: '4bf58dd8d48988d1d8941735'},
				{text: 'Sports Bar', id: '4bf58dd8d48988d11d941735'},
				{text: 'Live Band', id: '4bf58dd8d48988d1e9931735'}
			],
			type: 'nights'
		},
		preferenceInputs: {
			foods: [],
			events: [],
			nights: []
		}
	};
});