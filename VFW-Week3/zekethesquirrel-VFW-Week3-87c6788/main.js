// VFW Week 2
// Conrad Aube

// Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	
	// get element by ID
	function GE(x)	{
		var theElement = document.getElementById(x);
		return theElement;
	};
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
		};
		selectLI.appendChild(makeSelect);
	};
	// Find checkbox value
	function getSelectedCheck(){
		if(GE('packed').checked){
			packedValue = GE('packed').value;
		}else{
			packedValue = "No";
		};
		
	};
	// Save to local storage
	function submitData(key){
		if(!key){//if no key, generate new one
			var id = Math.floor(Math.random()*10000000000);
			var alertTxt = "Item added!";
		}else{//If key exists, edit existing item
			id = key;
			var alertTxt = "Item updated!";
		};
		//Get form values, store in object
		//object properties contain array with label and value
		getSelectedCheck();
		var item = {};
			item.cat = ["Category", GE('cats').value];
			item.name = ["Name", GE('name').value];
			item.wght = ["Weight", GE('wght').value];
			item.packed = ["Packed", packedValue];
			item.note = ["Notes", GE('note').value];
		//Stringify and save
		localStorage.setItem(id, JSON.stringify(item));
		alert(alertTxt);
	};
	// Retrieve local storage and display it
	function getLocalData(){
		toggleControls("on");
		//Write data from local storage
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		GE('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLI = document.createElement('li');
			var linksLI = document.createElement('li');
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
				makeSubLI.innerHTML = optSubText;
				makeSubList.appendChild(linksLI);
			};
			makeItemLinks(localStorage.key(i), linksLI); //Create edit and delete buttons
		};
	};
	// Make item links function
	function makeItemLinks(key, linksLI){
		//Edit Item
		var editLink = document.createElement('a');
		editLink.href = '#';
		editLink.key = key;
		editText = "Edit Item ";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLI.appendChild(editLink);
		//Delete Item
		var deleteLink = document.createElement('a');
			deleteLink.href = '#';
			deleteLink.key = key;
			deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLI.appendChild(deleteLink);
	};
	// Edit Item Funciton
	function editItem(){
		//Get info from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleControls("off"); //shows form
		//Populate form fields
		GE('cats').value = item.cat[1];
		GE('name').value = item.name[1];
		GE('wght').value = item.wght[1];
		if(item.packed[1] == "Yes"){
			GE('packed').setAttribute("checked", "checked");
		};
		GE('note').value = item.note[1];
		// Remove listener for add item
		submitLink.removeEventListener("click", submitData);
		//Change "Add Item" to "Edit Item"
		GE('addItem').value = "Edit Item";
		var editSubmit = GE('addItem');
		// Save key value as property of editSubmit event
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	};
	//Delete Item Function
	function deleteItem(){
		var ask = confirm("Delete this item?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Item deleted!")
			window.location.reload();
		}else{
			alert("Item NOT deleted.")
		};
	};
	//Validate function
	function validate(e){
		//Define elements to check
		var getCat = GE('cats');
		var getName = GE('name');
		//Reset Error Messages
		errMsg.innerHTML = "";
		getCat.style.border = "none";
		getName.style.border = "none";
		//Error Messages
		var errMess = [];
		//Category Validation
		if(getCat.value === "Choose A Category"){
			var catErr = "Please select a category!";
			getCat.style.border = "1px solid red";
			errMess.push(catErr);
		};
		//Item name validation
		if(getName.value === ""){
			var nameErr = "Item needs a name!";
			getName.style.border = "1px solid red";
			errMess.push(nameErr);
		};
		//Display errors if any
		if(errMess.length >= 1){
			for(var i=0, j=errMess.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = errMess[i];
				errMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		}else{
			//If validation passes, submit data with key
			submitData(this.key);
		};
	};
	// Toggle links
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
		};
	};
	// Clear local storage
	function clearLocalData(){
		if(localStorage.length === 0){
			alert("Packing list is already empty!");
		}else{
			var ask = confirm("Delete ALL items? This can not be undone.")
			if(ask){
				localStorage.clear();
				alert("Packing list cleared!");
				window.location.reload();
				return false;
			}else{
				alert("Packing list not cleared.")
			};
		};
	};
	//Variable Defaults
	var typeGroups = ["Choose A Category", "Food", "Utility", "Survival", "Fun"],
		packedValue = "No",
		errMsg = GE('errors');
	makeCats();
	

	// Click events
	var displayLink = GE('displayData');
	displayLink.addEventListener("click", getLocalData);
	
	var clearLink = GE('clearData');
	clearLink.addEventListener("click", clearLocalData);
	
	var submitLink = GE('addItem');
	submitLink.addEventListener("click", validate);
	
});