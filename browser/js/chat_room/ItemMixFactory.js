'use strict';

app.factory('ItemMixFactory', function(){

	return {
		blend: function(categoriesArray, dataSet){
			//want speed not size, catType
			//call shuffle on data to presort(reduce time);
			console.log('called blend');
			if(categoriesArray.length < 1) return dataSet;
			var newSortedArray = [];
			var len = categoriesArray.length;
			var infiniteLoop = 0;
			while( dataSet.length > 0 && infiniteLoop < 3){ //while we have unsorted elements
				console.log('into the while loop with ', dataSet.length, 'elements')
				for( var catIndex = 0 ; catIndex < len; catIndex++ ){ //loop through categories
					for(var arrItem = 0, dlen = dataSet.length; arrItem < dlen; arrItem++){
						if(categoriesArray[catIndex].id === dataSet[arrItem].category.id) {
							console.log(dataSet[arrItem].category.name);
							newSortedArray.push(dataSet.splice(arrItem, 1));
							infiniteLoop = 0;
							break; //up to catIndex loop
						}
					}	
				}
				infiniteLoop++;
			}
			newSortedArray.concat(dataSet);
			return newSortedArray;
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