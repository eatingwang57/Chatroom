window.onload = function(){
    init();
}

function init(){
    console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(function(user) { 
        if (user){
            console.log(user.email);
        }
    });
}

var submit = document.getElementById('submit');
var email = document.getElementById('email');
var password = document.getElementById('password');
submit.addEventListener('click', function(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(){
        alert("Successfully sign in");
        window.location = 'menu.html';
    }).catch(function(error) { 
        var errorMessage = error.message;
        alert(errorMessage);
        email.value = "";
        password.value = "";
    });
    
});


var google = document.getElementById('google');

google.addEventListener('click', function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        firebase.database().ref('users').orderByChild('name').equalTo(user.displayName).once('value', function(snapshot){
            if(!snapshot.exists()){
                firebase.database().ref('users/'+ user.displayName).set({
                    email: user.email,
                    name: user.displayName
                }).then(function(result){
                    console.log("Successfully push");
                    alert("Successfully sign in");
                    window.location = 'menu.html';
                }).catch(function(error){
                    console.log(error.message);
                });
            }else{
                alert("Successfully sign in");
                window.location = 'menu.html';
            }
        });
        
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        //var email = error.email;
        //var credential = error.credential;
        alert(errorMessage);
    });
});


var sign_up = document.getElementById('sign_up');
sign_up.addEventListener('click', ()=>{
    window.location = 'signup.html';
});

