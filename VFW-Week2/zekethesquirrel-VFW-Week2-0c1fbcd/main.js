// VFW Week 2
// Conrad Aube

// Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	
	// get element by ID
	function GE(x)	{
		var theElement = document.getElementById(x);
		return theElement;
	}

	
	//Create select field elements and add options
	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //array of form tags
			selectLI = GE('cat'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute('id', 'cats');
		for (var i=0, j=typeGroups.length; i<j; i++){
			var makeOptions = document.createElement('option');
			var optText = typeGroups[i];
			makeOptions.setAttribute("value", optText);
			makeOptions.innerHTML = optText;
			makeSelect.appendChild(makeOptions);
		}
		selectLI.appendChild(makeSelect);
	
	}
	
	// Find checkbox value
	function getSelectedCheck(){
		if(GE('packed').checked){
			packedValue = GE('packed').value;
		}else{
			packedValue = "No";
		}
		
	};
	
	
	
	function submitData(){
		var id 					= Math.floor(Math.random()*10000000000);
		//Get form values, store in object
		//object properties contain array with label and value
		getSelectedCheck();
		var item 				= {};
			item.cat	 		= ["Category", GE('cats').value];
			item.name	 		= ["Name", GE('name').value];
			item.wght 			= ["Weight", GE('wght').value];
			item.packed 		= ["Packed", packedValue];
			item.note 			= ["Notes", GE('note').value];
		//Stringify and save
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item added!");
	};
	
	function getLocalData(){
		toggleControls("on")
		//Write data from local storage
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		GE('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLI = document.createElement('li');
			makeList.appendChild(makeLI);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var dataObj = JSON.parse(value); //Convert local storage string to object
			var makeSubList = document.createElement('ul');
			makeLI.appendChild(makeSubList);
			for(var n in dataObj){
				var makeSubLI = document.createElement('li');
				makeSubList.appendChild(makeSubLI);
				var optSubText = dataObj[n][0]+": "+dataObj[n][1];
				makeSubLI.innerHTML = optSubText
			}
		}
	};
	
	
	function toggleControls(n){
		switch(n){
			case "on":
				GE('addForm').style.display = "none";
				GE('clearData').style.display = "inline";
				GE('displayData').style.display = "none";
				GE('showForm').style.display = "inline";
				break;
			case "off":
				GE('addForm').style.display = "block";
				GE('clearData').style.display = "inline";
				GE('displayData').style.display = "inline";
				GE('showForm').style.display = "none";
				GE('items').style.display = "none";
				break;
			default:
				return false;
		}
	};
	
	function clearLocalData(){
		if(localStorage.length === 0){
			alert("Packing list is already empty!");
		}else{
			localStorage.clear();
			alert("Packing list cleared!");
			window.location.reload();
			return false;
		}
	}
	
	
	
	//Variable Defaults
	var typeGroups = ["Choose A Category", "Food", "Utility", "Survival", "Fun"],
		packedValue = "No";
	makeCats();


	// Click events
	
	var displayLink = GE('displayData');
	displayLink.addEventListener("click", getLocalData);
	
	var clearLink = GE('clearData');
	clearLink.addEventListener("click", clearLocalData);
	
	var submitLink = GE('addItem');
	submitLink.addEventListener("click", submitData);
	



});