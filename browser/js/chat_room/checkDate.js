app.filter('checkDate', function($filter)
{
    return function(events, dt)
    {
        if(events == null){ return ""; }
        var newArray = [];
        var _userDate = $filter('date')(new Date(dt), 'dd/MM/yyyy');
        var truph = events.map(function(thing){
        	var _date = $filter('date')(new Date(thing.startTime), 'dd/MM/yyyy');
        	if(_date === _userDate){
        		newArray.push(thing);
        	}
        });
        return newArray;
    };
});