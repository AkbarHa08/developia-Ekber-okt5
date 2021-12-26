		var API_URL=localStorage.getItem('api_url');

		var token = localStorage.getItem('token');
		
		var languagesSelect = document.getElementById('languages-select');
		var bookGenresSpan = document.getElementById('book-genres');
		
		var nameInput = document.getElementById('book-name');
			var descriptionInput = document.getElementById('book-description');
			var authorInput = document.getElementById('book-author');
			var priceInput = document.getElementById('book-price');
			var pageCountInput = document.getElementById('book-page-count');
			var languageInput = document.getElementById('languages-select');
			var genresInputs = document.getElementsByClassName('genres')

			var saveBookButton = document.getElementById('save-book-button');
			
			var nameErrorField = document.getElementById('name-error');
			var descriptionErrorField = document.getElementById('description-error');
			var authorErrorField = document.getElementById('author-error');
			var priceErrorField = document.getElementById('price-error');
		
			var updateMode = false;
			var selectedBookId = 0;
			var booksTbody = document.getElementById("books-table-tbody");
		
		function loadBooks(){
			selectedBookId = 0;
			
			var booksTbody = document.getElementById("books-table-tbody");
			
			var booksTbodyHtml = '';
			
			var http= new XMLHttpRequest();
			
			http.onload = function() {
				
				var array=JSON.parse(this.responseText);
				
				fillBooksToTable(array);
				
				
			}
			
			http.open("GET",API_URL+"/books/rest/user/"+localStorage.getItem('username'),true);
			http.setRequestHeader('Authorization',token);
			
			http.setRequestHeader("Content-Type","application/JSON");
			http.send();
		}
			
		
		function resetValidations(){
			nameErrorField.innerHTML = '';
			descriptionErrorField.innerHTML = '';
			authorErrorField.innerHTML = '';
			priceErrorField.innerHTML = '';
		}
		
		
		
		function saveBook(event){
			resetValidations();
			
			event.preventDefault();
			var name = nameInput.value;
			var description = descriptionInput.value;
			var author = authorInput.value;
			var price = priceInput.value;
			var pageCount = pageCountInput.value;
			var language = languageInput.value;
			
			var genres = [];

			for(var i=0;i<genresInputs.length;i++){
				var genreCheckbox = genresInputs[i];
				if(genreCheckbox.checked){
					genres.push({id:genreCheckbox.value});
				}
			}
			console.log(genres);
			
			var book = {name:name,description:description,author:author,price:price,pageCount:pageCount,language:language,genres:genres};
			
			var http = new XMLHttpRequest();
			
			http.onload = function(){
				var errors = this.responseText;
				var errorsArray = JSON.parse(errors);
				if(errorsArray.length==0){
					updateMode = false;
				 	saveBookButton.value = "Qeydiyyat et";
					loadBooks();
					
				} else{
					// burada error mesajlarini goster
					//alert("sehv var, tam doldurun!");
					
					var nameErrorV = '';
					var descriptionErrorV = '';
					var authorErrorV = '';
					var priceErrorV = '';
					
					for(var i=0;i<errorsArray.length;i++){
						var error = errorsArray[i];
						var field = error.split(":::")[0];
						var message = error.split(":::")[1];
						if(field=='name'){
							nameErrorV+=message+"<br>";
						}
						if(field=='description'){
							descriptionErrorV+=message+"<br>";
						}
						if(field=='author'){
							authorErrorV+=message+"<br>";
						}
						if(field=='price'){
							priceErrorV+=message+"<br>";
						}
						
					}
					
					nameErrorField.innerHTML = nameErrorV;
					descriptionErrorField.innerHTML = descriptionErrorV;
					authorErrorField.innerHTML = authorErrorV;
					priceErrorField.innerHTML = priceErrorV;
				}
			}
			 
			if(updateMode){
				 http.open("PUT",API_URL+"/books/rest",true);
				 http.setRequestHeader('Authorization',token);

				 http.setRequestHeader("Content-Type","application/JSON");
				 book.id = selectedBookId;
				 http.send(JSON.stringify(book));
				 
			} else{
				 http.open("POST",API_URL+"/books/rest/user/"+localStorage.getItem('username'),true);
				 http.setRequestHeader('Authorization',token);

				 http.setRequestHeader("Content-Type","application/JSON");
				 http.send(JSON.stringify(book));
			}
		
			
		}
		
		
		
		function deleteBook(){
			var forDeleteBookCheckboxes = document.getElementsByClassName('for-delete-books');
		var bookIds = [];
		for(var i=0;i<forDeleteBookCheckboxes.length;i++){
			if(forDeleteBookCheckboxes[i].checked){
				bookIds.push(Number(forDeleteBookCheckboxes[i].value));
			}
		}	
			
			
				if(bookIds.length==0){
					alert('zehmet olmasa kitab secin!!!');
				} else{
					var tesdiq = confirm('kitabi silmeye eminsiniz?');
				
				if(tesdiq){
					
					var http = new XMLHttpRequest();
				
				http.onload = function(){ 
					loadBooks();
				}
				
			
		
		
				 
				http.open("DELETE",API_URL+"/books/rest/delete-all",true);
				http.setRequestHeader('Authorization',token);

				
				http.setRequestHeader("Content-Type","application/json")
				
				http.send(JSON.stringify(bookIds));
				}
				}
			
				
			

				
			
		}
		
		
		
		
		function editBook(){
			var forDeleteBookCheckboxes = document.getElementsByClassName('for-delete-books');
			var bookIds = [];
		for(var i=0;i<forDeleteBookCheckboxes.length;i++){
			if(forDeleteBookCheckboxes[i].checked){
				bookIds.push(Number(forDeleteBookCheckboxes[i].value));
			}
		}
			
			if(bookIds.length==0){
				alert("Siyahidan kitab secin!!!");
			} else if(bookIds.length>1){
				alert('Siyahidan 1 kitab secin!!!');
			}
			else{
				updateMode = true;
				var id = Number(bookIds[0]);
				selectedBookId = id;
			saveBookButton.value = "Redakte et";
			
			var http = new XMLHttpRequest();
			
			http.onload = function(){
				var bookJson = this.responseText;
				var bookObj = JSON.parse(bookJson);
				
				nameInput.value = bookObj.name;
				descriptionInput.value = bookObj.description;
				authorInput.value = bookObj.author;
				priceInput.value = bookObj.price;
				pageCountInput.value = bookObj.pageCount;
				languageInput.value = bookObj.language;
				
				var genresInputs = document.getElementsByClassName('genres');
				for(var j=0;j<genresInputs.length;j++){
					var genreInput = genresInputs[j];
					
					genreInput.checked=false;
				}
				
				for(var i=0;i<bookObj.genres.length;i++){
					var genre = bookObj.genres[i];
					
					for(var j=0;j<genresInputs.length;j++){
						var genreInput = genresInputs[j];
						if(genreInput.value==genre.id){
							genreInput.checked=true;
						}
					}
				}
					
			}
			 
			http.open("GET",API_URL+"/books/rest/"+selectedBookId,true);
			http.setRequestHeader('Authorization',token);

			
			
			http.send();
			}
			
			
		}
		
		function resetForm(){
			updateMode=false;
			saveBookButton.value = "Qeydiyyat et";
			
		}
		
		
		
		loadBooks();
		
		
		function loadLanguages(){
			var http = new XMLHttpRequest();
			
			http.onload = function(){
				var languageArray = JSON.parse(this.responseText);
				var languageHtml = '';
				for(var i=0;i<languageArray.length;i++){
					languageHtml+="<option>"+languageArray[i].name+"</option>";
				}
				languagesSelect.innerHTML=languageHtml;
			}
			 
			http.open("GET",API_URL+"/languages/rest/",true);
			http.setRequestHeader('Authorization',token);

			
			
			http.send();
		}
		
		loadLanguages();
		
		function loadBookGenres(){
			var http = new XMLHttpRequest();
			
			http.onload = function(){
				var genresArray = JSON.parse(this.responseText);
				var genresHtml = '';
				for(var i=0;i<genresArray.length;i++){
					genresHtml+="<input type='checkbox' class='genres' value='"+genresArray[i].id+"'>"+"  "+genresArray[i].name+"<br>";
				}
				bookGenresSpan.innerHTML=genresHtml;
			}
			
			 
			http.open("GET",API_URL+"/genres/rest",true);
			http.setRequestHeader('Authorization',token);

			
			
			http.send();
		}
		
		
		
		
		loadBookGenres();
		
		function onSearch(event){
			var searchText = event.target.value;
			
			selectedBookId = 0;
			
			var http= new XMLHttpRequest();
			
			http.onload = function() {
				
				var array=JSON.parse(this.responseText);
				
				fillBooksToTable(array);
				
				
			}
			
			http.open("POST",API_URL+"/books/rest/search",true);
			http.setRequestHeader('Authorization',token);

			http.setRequestHeader("Content-Type","application/json");
			var search = {searchText:searchText};
			http.send(JSON.stringify(search));
			 
		}
		
		function fillBooksToTable(array){
			
			var booksTbodyHtml = ''; 
			
			for(var i=0;i<array.length;i++){
					var b = array[i];
					booksTbodyHtml+="<tr><td class='book-id' >"+b.id
					+"<input class='for-delete-books' type='checkbox' value='"+b.id+"'> </td>";
					
					
					
					
					
					
					booksTbodyHtml+="<td>"+b.name+"</td>";
					booksTbodyHtml+="<td>"+b.description+"</td>";
					booksTbodyHtml+="<td>"+b.author+"</td>";
					booksTbodyHtml+="<td>"+b.price+" AZN"+"</td>";
					booksTbodyHtml+="<td>"+b.pageCount+"</td>";
					booksTbodyHtml+="<td>"+b.language+"</td>";
					booksTbodyHtml+="<td><ol>";
					
					for(var j=0;j<b.genres.length;j++){
						var genre = b.genres[j];
						booksTbodyHtml+="<li>"+genre.name+"</li>"; 
						
						
					}
					
					booksTbodyHtml+="</ol>";
					booksTbodyHtml+="</tr>";
				}
				booksTbody.innerHTML=booksTbodyHtml;
		}
		