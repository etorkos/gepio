'use strict';

app.factory('ItemMixFactory', function (){

	return {
		blend: function(categoriesArray, dataSet){
			if(categoriesArray.length < 1) return dataSet;
			var newSortedArray = [];
			var len = categoriesArray.length;
			var infiniteLoop = 0;
			var newDataSet = dataSet.slice();
				var categoriesArray = categoriesArray.map(function(thing){
					var newThing;
					if(typeof thing === 'string') return JSON.parse(thing);
					return thing;
				});

			// console.log((categoriesArray[0].id), 'category', newDataSet.length, newDataSet[0].category.id);

			while( newDataSet.length > 0 && infiniteLoop < 3){ //while we have unsorted elements
				for( var catIndex = 0 ; catIndex < len; catIndex++ ){ //loop through categories
					for(var arrItem = 0, dlen = newDataSet.length; arrItem < dlen; arrItem++){
						if( newDataSet[arrItem].category && categoriesArray[catIndex].id === newDataSet[arrItem].category.id) {
						    // console.log('query correct ++++?+??++++', newDataSet[arrItem]);
							newSortedArray.push(newDataSet.splice(arrItem, 1)[0]);
							infiniteLoop = 0;
							arrItem--;
							break; //up to catIndex loop
						}
					}	
				}
				infiniteLoop++;
			};
			// console.log('dataSet', newDataSet.length, 'newArray', newSortedArray);
			dataSet = newSortedArray.concat(newDataSet);
			return dataSet;
		},
		shuffle: function (orderedList, type, id){
			//Sattolo shuffle
			var len = orderedList.length;
			while(len > 1){
				len--;
				var swapLocation = Math.floor(Math.random()*len)%len;//generates a random number
				var temp = orderedList[swapLocation];
				orderedList[swapLocation] = orderedList[len];
				orderedList[len] = temp;
			}
			var list = orderedList.splice(0, 8);
			// console.log(list);
			// ItineraryFactory.updateDataSet(type, id, list).then(function (res){
			// 	console.log("Updated", res);
			// 	return list;
			// });
		},
		removeDuplicates: function (listOfObjects, type){ //type = event or venue
			var arrResult = {},
			nonDuplicatedArray = [];
			for ( var i = 0, n = listOfObjects.length; i < n ; i++) {
			    var item = listOfObjects[i];
			    // console.log(item);
			    arrResult[item.name + " - " + item.description] = arrResult[item.name + " - " + item.description] || item; //sets name and object as the key and selects the first on the array or assigns
			};
			console.log('arrResult', arrResult);
			i = 0;
			for (var item in arrResult) {
				// console.log(arrResult[item]);
			    nonDuplicatedArray[i++] = arrResult[item];
			}
			return nonDuplicatedArray;
		}
	}
})