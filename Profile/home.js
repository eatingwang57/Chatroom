var signout = document.getElementById('signout');
signout.addEventListener('click', ()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Successfully log out!");
        window.location = 'index.html';
      }).catch(function(error) {
        alert("Failed to log out!");
      });
});


window.onload = function(){
    init();
}

function init() {
    var user_email = '';
    var user_name = '';
    firebase.auth().onAuthStateChanged(function(user) {
        //var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            user_name = user.displayName;
            console.log(user);
        } 
        /*firebase.database().ref('public_messages/').on('child_added', function(data) {
            console.log("!!!!");
            var childData = data.val();
            var d = new Date();
            var time = Time();
            if(childData.time == time && childData.name != user_name){
                console.log(childData);
                if(Notification.permission = 'granted'){
                    var notification = new Notification("Chatroom", {
                        body: 'you have a new message!'
                    });
                    notification.onclick = function(){
                        window.location = 'public.html';
                        notification.close();  
                    };
                }
            }
        });
        firebase.database().ref('messages/').on('child_added', function(data) {
            console.log("!!!!");
            var childData = data.val();
            var d = new Date();
            var time = Time();
            if(childData.time == time && childData.name != user_name){
                console.log(childData);
                if(Notification.permission = 'granted'){
                    var notification = new Notification("Chatroom", {
                        body: 'you have a new message!'
                    });
                    notification.onclick = function(){
                        window.location = 'chat.html';
                        notification.close();  
                    };
                }
            }
        });*/
        
    });
    
}

function Time(){
    var d = new Date();
    var hour = (d.getHours()<10?'0':'') + d.getHours();
    var min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var sec = (d.getSeconds()<10?'0':'') + d.getSeconds();
    var month = (d.getMonth()<9?'0':'') + (d.getMonth()+1);
    var date = (d.getDate()<10?'0':'') + d.getDate();
    var time = month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
    return time;
}