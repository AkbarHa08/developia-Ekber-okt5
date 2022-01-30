var API_URL = localStorage.getItem('api_url');

var token = localStorage.getItem('token');

var nameInput = document.getElementById('group-name');

var saveGroupButton = document.getElementById('save-group-button');

var nameErrorField = document.getElementById('name-error');

var updateMode = false;
var selectedGroupId = 0;

var gridOptionsGlobal;
var gridOptionsGlobalBooks;


function resetValidations() {
	nameErrorField.innerHTML = '';
}



function saveGroup(event) {
	resetValidations();

	event.preventDefault();
	var name = nameInput.value;

	var group = { name: name };

	var http = new XMLHttpRequest();

	http.onload = function () {
		var errors = this.responseText;
		var errorsArray = JSON.parse(errors);
		if (errorsArray.length == 0) {
			updateMode = false;
			saveGroupButton.value = "Qeydiyyat et";
			loadGroups();

		} else {
			// burada error mesajlarini goster
			//alert("sehv var, tam doldurun!");

			var nameErrorV = '';

			for (var i = 0; i < errorsArray.length; i++) {
				var error = errorsArray[i];
				var field = error.split(":::")[0];
				var message = error.split(":::")[1];
				if (field == 'name') {
					nameErrorV += message + "<br>";
				}

			}

			nameErrorField.innerHTML = nameErrorV;	
		}
	}

	if (updateMode) {
		http.open("PUT", API_URL + "/reader-groups/rest", true);
		http.setRequestHeader('Authorization', token);

		http.setRequestHeader("Content-Type", "application/JSON");
		group.id = selectedGroupId;
		http.send(JSON.stringify(group));

	} else {
		http.open("POST", API_URL + "/reader-groups/rest/user/" + localStorage.getItem('username'), true);
		http.setRequestHeader('Authorization', token);

		http.setRequestHeader("Content-Type", "application/JSON");
		http.send(JSON.stringify(group));
	}


}



function deleteGroup() {
	var groupIds = [];

	var selectedRows = gridOptionsGlobal.api.getSelectedRows();

	for (var i = 0; i < selectedRows.length; i++) {
		groupIds.push(selectedRows[i].id);
		
	}	
	


	if (groupIds.length == 0) {
		alert('zehmet olmasa kitab secin!!!');
	} else {
		var tesdiq = confirm('qrupu silmeye eminsiniz?');

		if (tesdiq) {

			var http = new XMLHttpRequest();

			http.onload = function () {
				loadGroups();
			}





			http.open("DELETE", API_URL + "/reader-groups/rest/delete-all", true);
			http.setRequestHeader('Authorization', token);


			http.setRequestHeader("Content-Type", "application/json")

			http.send(JSON.stringify(groupIds));
		}
	}






}




function editGroup() {
	var forDeleteGroupCheckboxes = document.getElementsByClassName('for-delete-group');
	var groupIds = [];
	for (var i = 0; i < forDeleteGroupCheckboxes.length; i++) {
		if (forDeleteGroupCheckboxes[i].checked) {
			groupIds.push(Number(forDeleteGroupCheckboxes[i].value));
		}
	}

	if (groupIds.length == 0) {
		alert("Siyahidan kitab secin!!!");
	} else if (groupIds.length > 1) {
		alert('Siyahidan 1 kitab secin!!!');
	}
	else {
		updateMode = true;
		var id = Number(groupIds[0]);
		selectedGroupId = id;
		saveGroupButton.value = "Redakte et";

		var http = new XMLHttpRequest();

		http.onload = function () {
			var groupJson = this.responseText;
			var groupObj = JSON.parse(groupJson);

			nameInput.value = groupObj.name;

		}

		http.open("GET", API_URL + "/reader-groups/rest/" + selectedGroupId, true);
		http.setRequestHeader('Authorization', token);



		http.send();
	}


}

function resetForm() {
	updateMode = false;
	saveGroupButton.value = "Qeydiyyat et";

}

function onSelectGroup(groupId){
	if (selectedGroupId == 0) {
		document.getElementById('group-'+ groupId).style.backgroundColor = 'lightblue';
	} else{
		document.getElementById('group-' + selectedGroupId).style.backgroundColor = 'white';
		document.getElementById('group-' + groupId).style.backgroundColor = 'lightblue';
	}
	selectedGroupId = groupId;
}



function onSearch(event) {
	var searchText = event.target.value;

	selectedGroupId = 0;

	var http = new XMLHttpRequest();

	http.onload = function () {

		var array = JSON.parse(this.responseText);

		fillGroupsToTable(array);


	}

	http.open("POST", API_URL + "/reader-groups/rest/search", true);
	http.setRequestHeader('Authorization', token);

	http.setRequestHeader("Content-Type", "application/json");
	var search = { searchText: searchText };
	http.send(JSON.stringify(search));

}



function checkName(event){
	var name = event.target.value;
	if(name == ''){
		nameErrorField.innerHTML = localStorage.getItem('name');
	} else{
		if(name.length < 2 ){
			nameErrorField.innerHTML = 'Ad minimum 2 simvol olmalidir';
		} else{
			nameErrorField.innerHTML = '';
		}
	}
}

function configureGroupsAgGrid(){

	var sutunlar = [
		{ field: "id", headerName:"ID", checkboxSelection:true },
		{ field: "name", headerName:"Ad"}
	  ];
  
  const gridOptions = {
			columnDefs: sutunlar,
			rowData: [],
			defaultColDef:{sortable:true, filter:true},
			  animateRows:true,
			  floatingFilter:true,
			  pagination:true,
			  rowSelection:'multiple'
		  };

		  gridOptionsGlobal = gridOptions;

			  document.addEventListener('DOMContentLoaded', () => {
			  const gridDiv = document.getElementById('myGroups');
			  new agGrid.Grid(gridDiv, gridOptions);
		  });
}

configureGroupsAgGrid();


function loadGroups() {
	selectedGroupId = 0;

	var http = new XMLHttpRequest();

	http.onload = function () {

		var array = JSON.parse(this.responseText);

		fillGroupsToTable(array);


	}

	http.open("GET", API_URL + "/reader-groups/rest/user/" + localStorage.getItem('username'), true);
	http.setRequestHeader('Authorization', token);

	http.setRequestHeader("Content-Type", "application/JSON");
	http.send();
}

function fillGroupsToTable(array) {
	gridOptionsGlobal.api.setRowData(array);
}

loadGroups();

function onOpenReaderGroupStudentsModal(){
	var selectedGroups = gridOptionsGlobal.api.getSelectedRows();
	var selectedCount = selectedGroups.length;
	if(selectedCount==0){
		alert('Siyahidan qrup secin!');
	} else if(selectedCount>1){
		alert('Siyahidan sadece 1 qrup secin!');
	} else{
		var groupId = selectedGroups[0].id;
		loadGroupBooks(groupId);
	}

	
}

function configureSelectedGroupBooksAgGrid(){

	var sutunlarBooks = [
		{ field: "id", headerName:"ID", checkboxSelection:true },
		{ field: "name", headerName:"Ad"},
		{ field: "surname", headerName:"Soyad"}
	  ];
  
  const gridOptionsBooks = {
			columnDefs: sutunlarBooks,
			rowData: [],
			defaultColDef:{sortable:true, filter:true},
			  animateRows:true,
			  floatingFilter:true,
			  pagination:true,
			  rowSelection:'multiple'
		  };

		  gridOptionsGlobalBooks = gridOptionsBooks;

			  document.addEventListener('DOMContentLoaded', () => {
			  const gridDivBooks = document.getElementById('mySelectedGroupBooks');
			  new agGrid.Grid(gridDivBooks, gridOptionsBooks);
		  });
}
configureSelectedGroupBooksAgGrid();


var selectedGroupId;
function loadGroupBooks(groupId) {
	selectedGroupId=groupId;

	var http = new XMLHttpRequest();

	http.onload = function () {

		var array = JSON.parse(this.responseText);

		fillGroupBooksToTable(array);


	}

	http.open("GET", API_URL + "/books/rest/group/" + groupId, true);
	http.setRequestHeader('Authorization', token);

	http.send();


	
}

function fillGroupBooksToTable(array) {
	gridOptionsGlobalBooks.api.setRowData(array);
}


function onAddBookToGroup(){
	var bookId=prompt('qrupa elave etmek istediyiniz kitabin kodunu yaz');
	console.log(bookId);

	var http = new XMLHttpRequest();

	http.onload = function () {

		loadGroupBooks(selectedGroupId);


	}

	http.open("PUT", API_URL + "/reader-groups/rest/group/" + selectedGroupId	 + "/book/"+bookId, true);
	http.setRequestHeader('Authorization', token);
	http.send();
}



