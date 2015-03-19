app.directive('login',function(AuthService, Session, AUTH_EVENTS,$rootScope,$window,$location,$http,$state){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/login/login.html",
		link : function(scope,element,attribute){
			scope.loginhref = function(dir){
				$window.location.href="/auth/"+dir;
			};
		}
		
	};
});