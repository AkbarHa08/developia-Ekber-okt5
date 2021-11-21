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
		
			var updateMode = false;
			var selectedBookId = 0;
		
		function loadBooks(){
			var booksTbody = document.getElementById("books-table-tbody");
			
			var booksTbodyHtml = '';
			
			var http= new XMLHttpRequest();
			
			http.onload = function() {
				console.log(this.responseText);
				
				var array=JSON.parse(this.responseText);
				for(var i=0;i<array.length;i++){
					var b = array[i];
					booksTbodyHtml+="<tr><td>"+b.id+"</td>";
					booksTbodyHtml+="<td>"+b.name+"</td>";
					booksTbodyHtml+="<td>"+b.description+"</td>";
					booksTbodyHtml+="<td>"+b.author+"</td>";
					booksTbodyHtml+="<td>"+b.price+"</td>";
					booksTbodyHtml+="<td>"+b.pageCount+"</td>";
					booksTbodyHtml+="<td>"+b.language+"</td>";
					booksTbodyHtml+="<td><ol>";
					
					for(var j=0;j<b.genres.length;j++){
						var genre = b.genres[j];
						booksTbodyHtml+="<li>"+genre.name+"</li>"; 
						
						
					}
					
					booksTbodyHtml+="</ol></td>";
					booksTbodyHtml+="<td><button class='btn btn-danger' onclick='deleteBook("+b.id+")'>Sil</button>    <button class='btn btn-warning' onclick='editBook("+b.id+")'>Redakte et</button></td></tr>";
				}
				
				booksTbody.innerHTML=booksTbodyHtml;
			}
			
			http.open("GET","/books/rest",true);
			
			http.send();
		}
			
		
		
		
		
		
		function saveBook(event){
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
					loadBooks();
				} else{
					// burada error mesajlarini goster
					//alert("sehv var, tam doldurun!");
					for(var i=0;i<errorsArray.length;i++){
						var error = errorsArray[i];
						var field = error.split(":::")[0];
						var message = error.split(":::")[1];
						if(field=='name'){
							nameErrorField.innerHTML = message;
						}
						if(field=='description'){
							descriptionErrorField.innerHTML = message;
						}
						
					}
				}
			}
			 
			if(updateMode){
				 http.open("PUT","/books/rest",true);
				 http.setRequestHeader("Content-Type","application/JSON");
				 book.id = selectedBookId;
				 http.send(JSON.stringify(book));
				 updateMode = false;
				 saveBookButton.value = "Qeydiyyat et";
			} else{
				 http.open("POST","/books/rest",true);
				 http.setRequestHeader("Content-Type","application/JSON");
				 http.send(JSON.stringify(book));
			}
		
			
		}
		
		
		function deleteBook(id){
			if(confirm('Kitabı silməyə əminsiz?')){
				var http = new XMLHttpRequest();
				
				http.onload = function(){
					loadBooks();
				}
				 
				http.open("DELETE","/books/rest/"+id,true);
				
				
				http.send();
			}
			
			
		}
		
		
		function editBook(id){
			updateMode = true;
			selectedBookId=id;
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
			 
			http.open("GET","/books/rest/"+id,true);
			
			
			http.send();
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
			 
			http.open("GET","/languages/rest/",true);
			
			
			http.send();
		}
		
		loadLanguages();
		
		function loadBookGenres(){
			var http = new XMLHttpRequest();
			
			http.onload = function(){
				var genresArray = JSON.parse(this.responseText);
				var genresHtml = '';
				for(var i=0;i<genresArray.length;i++){
					genresHtml+="<input type='checkbox' value='"+genresArray[i].id+"' class='genres'>"+"  "+genresArray[i].name+"<br>";
				}
				bookGenresSpan.innerHTML=genresHtml;
				console.log(genresHtml);
			}
			
			 
			http.open("GET","/genres/rest",true);
			
			
			http.send();
		}
		
		
		
		loadBookGenres();