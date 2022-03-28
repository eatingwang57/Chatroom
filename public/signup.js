var submit = document.getElementById('submit');
var email = document.getElementById('email');
var password = document.getElementById('password');

submit.addEventListener('click', function(){
    firebase.auth().createUserWithEmailAndPassword(email.value,password.value).then(function(){
        var name = document.getElementById('name');

        firebase.database().ref('users').orderByChild('name').equalTo(name.value).once('value', function(snapshot){
            if(snapshot.exists()){
                alert("The username has been used, SORRY :)");
                name.value = "";
            }
            else{
                alert("Success!");
                firebase.auth().currentUser.updateProfile({
                    displayName: name.value
                });
        
                firebase.database().ref('users/'+ name.value).set({
                    email: email.value,
                    name: name.value
                }).then(function(){
                    window.location = 'signin.html';
                }).catch(function(error){
                    console.log(error.message);
                });
            }
        })
        

    }).catch(function(error) { // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        email.value = "";
        name.value = "";
        password.value = "";   
    });
    
});
