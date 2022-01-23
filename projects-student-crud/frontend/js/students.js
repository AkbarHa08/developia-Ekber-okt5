var API_URL = localStorage.getItem('API_URL');

        var selectedStudentId=0;

        var studentNameInput = document.getElementById('student-name');
        var studentSurnameInput = document.getElementById('student-surname');
        var studentsTbodyElement = document.getElementById('students-tbody');
        var headerText = document.getElementById('header-text');

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
                selectedStudentId=null;
                setHeaderText('Yeni telebe qeydiyyati')
                loadAllStudents();
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

        loadAllStudents()

        function fillStudentsTable(array){

            var studentsTbodyHtml = '';
            for(var i=0;i<array.length;i++){
                var student = array[i];
                studentsTbodyHtml+="<tr><td>"+student.id+"</td>";
                    studentsTbodyHtml+="<td>"+student.name+"</td>";
                    studentsTbodyHtml+="<td>"+student.surname+"</td>";

                    studentsTbodyHtml+="<td><button class='btn btn-danger' onclick='onDelete("+student.id+")'>Sil</button> <button class='btn btn-primary' onclick='onEdit("+student.id+")'>Redakte</button> </td></tr>"
            }
            studentsTbodyElement.innerHTML = studentsTbodyHtml;
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

        setHeaderText('Yeni telebe qeydiyyati');
