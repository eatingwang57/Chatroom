var home = document.getElementById('homepage');
var publicroom = document.getElementById('public');
var chatroom = document.getElementById('chat');
var signout = document.getElementById('signout');

// home.addEventListener('click', ()=>{
//     window.location = 'home.html';
// });

// publicroom.addEventListener('click', ()=>{
//     window.location = 'public.html';
//     //addmember.style.visibility = 'hidden';
// });


// chatroom.addEventListener('click', ()=>{
//     window.location = 'chat.html';
// });


if (Notification.permission != "denied") {
  Notification.requestPermission();
}


signout.addEventListener('click', ()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Successfully log out!");
        window.location = 'index.html';
      }).catch(function(error) {
        alert("Failed to log out!");
      });
});