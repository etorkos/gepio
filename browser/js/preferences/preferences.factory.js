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
				'Italian',
				'Chinese',
				'Indian',
				'Mediterranean',
				'Mexican',
				'Spanish',
				'Portugese',
				'Ethipoian',
				'Polish',
				'German',
				'Thai',
				'Deli',
				'Burgers',
				'Vegitarian',
				'Healthy'	
			],
			type: 'foods'
		},
		events: {
			array: [
				'Movies',
				'Live Sports',
				'Live Music',
				'Live Theatre',
				'Museums',
				'Art Exhibits',
				'Family Friendly',
				'Comedy',
				'Outdoors',
				'For Couples',
				'Air/Boat/Car Shows'
			],
			type: 'events'
		},
		nights: {
			array: [
				'Dive Bars',
				'Clubs',
				'Low Key',
				'Dancing',
				'Quiet',
				'For Couples',
				'Cheap Drinks',
				'Walking Distance',
				'LGBT Friendly',
				'Speed Dating',
				'Live Band',
				'Electronic Music'
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