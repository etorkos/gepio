app.service('passService', function(){
	//can remove once database persistence is working with each room
	var finalData;

	var setFinal = function(fData){
		finalData = fData;
	};
	var getFinal = function(){
		return finalData;
	};

	return{
		setFinal: setFinal,
		getFinal: getFinal
	};
});