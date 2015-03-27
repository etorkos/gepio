'use strict';

app.factory('ItemMixFactory', function(){

	return {
		blend: function(categoriesArray, dataSet){
			console.log('called blend with', categoriesArray, 'categories and ', dataSet, 'data');
			if(categoriesArray.length < 1) return dataSet;
			var newSortedArray = [];
			var len = categoriesArray.length;
			var infiniteLoop = 0;
			var newDataSet = dataSet.slice();
			if( typeof categoriesArray === 'string'){
				var categoriesArray = categoriesArray.map(function(thing){
					return JSON.parse(thing);
				});
			}

			console.log(categoriesArray[0], 'category', newDataSet);
			while( newDataSet.length > 0 && infiniteLoop < 3){ //while we have unsorted elements
				for( var catIndex = 0 ; catIndex < len; catIndex++ ){ //loop through categories
					for(var arrItem = 0, dlen = newDataSet.length; arrItem < dlen; arrItem++){
						console.log('midloop', categoriesArray[catIndex], newDataSet[arrItem].category.id)
						if(categoriesArray[catIndex]['id'] === newDataSet[arrItem].category.id) {
							newSortedArray.push(newDataSet.splice(arrItem, 1)[0]);
							infiniteLoop = 0;
							break; //up to catIndex loop
						}
					}	
				}
				infiniteLoop++;
			};
			console.log('dataSet', newDataSet.length, 'newArray', newSortedArray);
			dataSet = newSortedArray.concat(newDataSet);
			return dataSet;
		},
		shuffle: function(orderedList){
			//Sattolo shuffle
			var len = orderedList.length;
			while(len > 1){
				len--;
				var swapLocation = Math.floor(Math.random()*len)%len;//generates a random number
				var temp = orderedList[swapLocation];
				orderedList[swapLocation] = orderedList[len];
				orderedList[len] = temp;
			}
			return orderedList;
		}
	}
})