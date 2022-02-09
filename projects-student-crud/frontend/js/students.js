var API_URL = localStorage.getItem('API_URL');

        var selectedStudentId=0;

        var studentNameInput = document.getElementById('student-name');
        var studentSurnameInput = document.getElementById('student-surname');
        var studentsTbodyElement = document.getElementById('students-tbody');
        var headerText = document.getElementById('header-text');

        var notesTbodyElement = document.getElementById('notes-tbody');


        var modalStudentNoteInput = document.getElementById('student-note');
        

        var nameErrorField = document.getElementById('name-error');
        var surnameErrorField = document.getElementById('surname-error');

        function onSaveStudent(event){
            event.preventDefault();
            var studentName = studentNameInput.value;
            var studentSurname = studentSurnameInput.value;

            var studentObject = {};

            studentObject.id=selectedStudentId;
            studentObject.name = studentName;
            studentObject.surname = studentSurname;

            var http = new XMLHttpRequest();

            http.onload=function(){
                if(this.status==400){
                    var nameError="";
                    var surnameError="";
                   var errorObject = JSON.parse(this.responseText);
                   errorObject.validations.forEach(error => {
                       if(error.field=='name'){
                           nameError+=error.message+'<br>';
                       }
                       if(error.field=='surname'){
                           surnameError+=error.message+'<br>';
                       }
                   });
                   nameErrorField.innerHTML=nameError;
                   surnameErrorField.innerHTML=surnameError;
                } else{
                    
                    resetErrors();
                    selectedStudentId=null;
                    loadAllStudents();
                }

                
            }

            http.open("POST",API_URL+"/students",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(studentObject));
        }

        function loadAllStudents(){

            var http = new XMLHttpRequest();

            http.onload=function(){
                var response = this.responseText;
                var studentsArray=JSON.parse(response);
                fillStudentsTable(studentsArray);
            }

            http.open("GET",API_URL+"/students",true);
            http.send();
        }

        loadAllStudents();

        function fillStudentsTable(array){

            var studentsTbodyHtml = '';
            for(var i=0;i<array.length;i++){
                var student = array[i];
                studentsTbodyHtml+="<tr><td>"+student.id+"</td>";
                    studentsTbodyHtml+="<td>"+student.name+"</td>";
                    studentsTbodyHtml+="<td>"+student.surname+"</td>";

                    studentsTbodyHtml+="<td><button class='btn btn-danger' onclick='onDelete("+student.id+")'>Sil</button> " 
                    studentsTbodyHtml+="<button class='btn btn-primary' onclick='onEdit("+student.id+")'>Redakte</button> "
                    studentsTbodyHtml+="<button class='btn btn-secondary' onclick='onNoteStudent("+student.id+")' data-toggle='modal' data-target='#noteModal'>Qeyd yaz</button> "
                    studentsTbodyHtml+="<button class='btn btn-warning' onclick='onShowStudentNotes("+student.id+")' data-toggle='modal' data-target='#notesListModal'>Qeydler</button> </td></tr>"

            }
            studentsTbodyElement.innerHTML = studentsTbodyHtml;


            $(document).ready(function() {
                $('#students-table').DataTable();
                });
        }

        function onDelete(id){
            var tesdiq = confirm("Telebeni silmeye eminsiniz?");

            if(tesdiq){
                var http = new XMLHttpRequest();

                http.onload = function(){
                    loadAllStudents();
                }

                http.open("DELETE",API_URL+"/students/"+id,true);
                http.send();
            }

            
        }

        function onEdit(id){
            selectedStudentId = id;
            var http = new XMLHttpRequest();
            setHeaderText('Telebe redaktesi, id = '+id);

            http.onload = function(){
                var response = this.responseText;
                var studentObj = JSON.parse(response);
                
                studentNameInput.value=studentObj.name;
                studentSurnameInput.value=studentObj.surname;
            }

            http.open("GET",API_URL+"/students/"+id,true);
            http.send();
        }

        function setHeaderText(text){
            headerText.innerHTML = text;
        }

        function resetErrors(){
            nameErrorField.innerHTML = '';
            surnameErrorField.innerHTML = '';
        }

        setHeaderText('Yeni telebe qeydiyyati');



        function onNoteStudent(id){
            selectedStudentId = id;
            var http = new XMLHttpRequest();
            setHeaderText('Telebe redaktesi, id = '+id);

            http.onload = function(){
                var response = this.responseText;
                var studentObj = JSON.parse(response);
                
                studentNameInput.value=studentObj.name;
                studentSurnameInput.value=studentObj.surname;
            }

            http.open("GET",API_URL+"/students/"+id,true);
            http.send();
        }

        function onSaveStudentNote(event){
            event.preventDefault();
            var studentNote = modalStudentNoteInput.value;

            var studentNoteObject = {};

            studentNoteObject.note = studentNote;
            studentNoteObject.studentId = selectedStudentId;

            var http = new XMLHttpRequest();

            http.onload=function(){
                if(this.status==400){
                    alert("Qeyd elave edile bilmedi!!");
                } else{
                    
                    alert("Qeyd elave edildi!!");
                }

                
            }

            http.open("POST",API_URL+"/student-notes",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(studentNoteObject));
        }

        function onShowStudentNotes(studentId){
            loadAllStudentNotes(studentId);
        }

        function fillStudentNotesTable(array){

            var notesTbodyHtml = '';
            for(var i=0;i<array.length;i++){
                var note = array[i];
                notesTbodyHtml+="<tr><td>"+note.id+"</td>";
                notesTbodyHtml+="<td>"+note.note+"</td></tr>";

            }
            notesTbodyElement.innerHTML = notesTbodyHtml;
        }



        function loadAllStudentNotes(studentId){

            var http = new XMLHttpRequest();

            http.onload=function(){
                var response = this.responseText;
                var notesArray=JSON.parse(response);
                fillStudentNotesTable(notesArray);
            }

            http.open("GET",API_URL+"/student-notes/student/"+studentId,true);
            http.send();
        }

        