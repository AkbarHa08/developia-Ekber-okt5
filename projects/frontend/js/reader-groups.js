var API_URL = localStorage.getItem('api_url');

var token = localStorage.getItem('token');

var nameInput = document.getElementById('group-name');

var saveGroupButton = document.getElementById('save-group-button');

var nameErrorField = document.getElementById('name-error');

var updateMode = false;
var selectedGroupId = 0;
var groupTbody = document.getElementById("groups-table-tbody");

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
	var forDeleteGroupCheckboxes = document.getElementsByClassName('for-delete-group');
	var groupIds = [];
	for (var i = 0; i < forDeleteGroupCheckboxes.length; i++) {
		if (forDeleteGroupCheckboxes[i].checked) {
			groupIds.push(Number(forDeleteGroupCheckboxes[i].value));
		}
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



loadGroups();


function loadLanguages() {
	var http = new XMLHttpRequest();

	http.onload = function () {
		var languageArray = JSON.parse(this.responseText);
		var languageHtml = '';
		for (var i = 0; i < languageArray.length; i++) {
			languageHtml += "<option>" + languageArray[i].name + "</option>";
		}
		languagesSelect.innerHTML = languageHtml;
	}

	http.open("GET", API_URL + "/languages/rest/", true);
	http.setRequestHeader('Authorization', token);



	http.send();
}

loadLanguages();

function loadBookGenres() {
	var http = new XMLHttpRequest();

	http.onload = function () {
		var genresArray = JSON.parse(this.responseText);
		var genresHtml = '';
		for (var i = 0; i < genresArray.length; i++) {
			genresHtml += "<input type='checkbox' class='genres' value='" + genresArray[i].id + "'>" + "  " + genresArray[i].name + "<br>";
		}
		bookGenresSpan.innerHTML = genresHtml;
	}


	http.open("GET", API_URL + "/genres/rest", true);
	http.setRequestHeader('Authorization', token);



	http.send();
}




loadBookGenres();

function onSearch(event) {
	var searchText = event.target.value;

	selectedBookId = 0;

	var http = new XMLHttpRequest();

	http.onload = function () {

		var array = JSON.parse(this.responseText);

		fillBooksToTable(array);


	}

	http.open("POST", API_URL + "/reader-groups/rest/search", true);
	http.setRequestHeader('Authorization', token);

	http.setRequestHeader("Content-Type", "application/json");
	var search = { searchText: searchText };
	http.send(JSON.stringify(search));

}

function fillBooksToTable(array) {

	var booksTbodyHtml = '';

	for (var i = 0; i < array.length; i++) {
		var b = array[i];
		booksTbodyHtml += "<tr><td class='book-id' >" + b.id
			+ "<input class='for-delete-books' type='checkbox' value='" + b.id + "'> </td>";






		booksTbodyHtml += "<td>" + b.name + "</td>";
		booksTbodyHtml += "<td>" + b.description + "</td>";
		booksTbodyHtml += "<td>" + b.author + "</td>";
		booksTbodyHtml += "<td>" + b.price + " AZN" + "</td>";
		booksTbodyHtml += "<td>" + b.pageCount + "</td>";
		booksTbodyHtml += "<td>" + b.language + "</td>";
		booksTbodyHtml += "<td><ol>";

		for (var j = 0; j < b.genres.length; j++) {
			var genre = b.genres[j];
			booksTbodyHtml += "<li>" + genre.name + "</li>";


		}

		booksTbodyHtml += "</ol>";
		booksTbodyHtml += "</tr>";
	}
	booksTbody.innerHTML = booksTbodyHtml;
}
