
        var token = "Basic " + window.btoa(localStorage.getItem('username')+":"+localStorage.getItem('password'));

        var signinBtn = document.getElementById('signin-btn');
        var signupBtn = document.getElementById('signup-btn');


        
        var usernameInput = document.getElementById('username');
        var passwordInput = document.getElementById('password');
        var newUsernameInput = document.getElementById('newUsername');
        var newPasswordInput = document.getElementById('newPassword');

        function onLogin(event){
            event.preventDefault();
            var username = usernameInput.value;
            var password = passwordInput.value;

            var http = new XMLHttpRequest();

            http.onload = function(){
                if(this.status==401){
                    alert("Melumatlar sehvdir!");
                } else if(this.status==200){
                    localStorage.setItem('username',username);
                    localStorage.setItem('password',password);
                    window.location.href = 'index.html';
                }
            }

            http.open("GET","http://localhost:8053/users/login",true);
            http.setRequestHeader("Authorization","Basic "+window.btoa(username+":"+password));
            http.send();
        }

        function onSignup(event){
            event.preventDefault();
            var newUsername = newUsernameInput.value;
            var newPassword = newPasswordInput.value;

            var http = new XMLHttpRequest();

            http.onload = function(){
                var response = JSON.parse(this.responseText);
                if(response.username==""){
                    alert('Bu istifadeci adi artiq movcuddur!!!');
                } else{
                    alert('Success');
                }
            }

            var userObj = {};
            userObj.username = newUsername;
            userObj.password = newPassword;

            http.open("POST","http://localhost:8053/users/signup",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(userObj));
        }
