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

function init() {
    var user_name = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_name = user.displayName;
            //console.log(user_name);
            var menu = document.getElementById('dynamic-menu');
            menu.innerHTML = "<span class='dropdown-item' id='user'>" + 'Hi!  ' + user_name + "</span>";
        } else {
            document.getElementById('post_list').innerHTML = "";
        }
    });

    var heart_btn = document.getElementById('img1');
    var baby_btn = document.getElementById('img2');
    var post_btn = document.getElementById('send');
    var post_txt = document.getElementById('post');

    heart_btn.addEventListener('click', (e)=>{
        var time = Time();
        firebase.database().ref('public_messages/').push({
            name: user_name,
            time: time,
            data: "",
            icon: "heart" 
        });
        e.stopImmediatePropagation();
    });

    baby_btn.addEventListener('click', (e)=>{
        var time = Time();
        firebase.database().ref('public_messages/').push({
            name: user_name,
            time: time,
            data: "",
            icon: "baby" 
        });
        e.stopImmediatePropagation();
    });

    post_btn.addEventListener('click', function() {
        if (post_txt.value != "") {
            var time  = Time();
            firebase.database().ref('public_messages/').push({
                name: user_name,
                time: time,
                data: post_txt.value,
                icon: false
              });
            post_txt.value = "";
        }
    });

    post_txt.onfocus = ()=>{
        post_txt.style.borderColor = 'rgba(61, 239, 252, 0.8)';
        post_txt.style.boxShadow = "0 0  0.1rem 0.15rem rgba(61, 239, 252, .25)";
        post_txt.placeholder = '';
    }

    post_txt.onblur = ()=>{
        post_txt.style.borderColor = 'rgb(13, 35, 138)';
        post_txt.style.boxShadow = "0 0 0 0";
        post_txt.placeholder = 'Say something...';
    }

    var before1 = '<div class="media mx-2 my-3 d-flex flex-row-reverse"><div class="media-body"><div class="mx-1 my-0 d-flex flex-row-reverse"><div class="name">';
    var before2 = '<div class="media mx-2 my-3 d-flex flex-row"><div class="media-body"><div class="mx-1 my-0 d-flex flex-row"><div class="name">';
    var center1 = '</div></div><div class="d-flex flex-row-reverse"><div class="mx-1 msg text1">';
    var center2 = '</div></div><div class="d-flex flex-row"><div class="mx-1 msg text2">';
    var center11 = '</div></div><div class="d-flex flex-row-reverse"><div class="mx-1 my-0 icon">';
    var center22 = '</div></div><div class="d-flex flex-row"><div class="mx-1 my-0 icon">';
    var quarter = '</div><div class="mx-1 align-self-end time">';
    var after = '</div></div></div></div>';
    var icon = '<img class="heart_img" src="img/like_post.png">'

    var postsRef = firebase.database().ref('public_messages/');
    var post = document.getElementById('post_list');
    var total_post = [];
    var first_count = 0, second_count = 0;

    var replace = {
        '<': '&lt;',
        '>': '&gt;',
        '"':  '\"'
    };

    postsRef.once('value')
        .then(function(snapshot) {

            snapshot.forEach(function (data) {
                var hisData = data.val();
                if(hisData.icon == false){
                    var msg = hisData.data.replace(/[<>"]/g, function(tag){
                        return replace[tag] || tag;
                    });
                    var tmp;
                    if(hisData.name == user_name){
                        tmp = before1 + hisData.name + center1 + msg + quarter + hisData.time + after;
                    }
                    else{ 
                        tmp = before2 + hisData.name + center2 + msg + quarter + hisData.time + after;
                    }
                }
                else{
                    if(hisData.icon == 'heart'){
                        if(hisData.name == user_name){
                            tmp = before1 + hisData.name + center11 + '<img class="heart_img" src="img/like_post.png">' + quarter + hisData.time + after;
                        }
                        else{ 
                            tmp = before2 + hisData.name + center22 + '<img class="heart_img" src="img/like_post.png">' + quarter + hisData.time + after;
                        }
                    }else{
                        if(hisData.name == user_name){
                            tmp = before1 + hisData.name + center11 + '<img class="heart_img" src="img/baby_post.png">' + quarter + hisData.time + after;
                        }
                        else{ 
                            tmp = before2 + hisData.name + center22 + '<img class="heart_img" src="img/baby_post.png">' + quarter + hisData.time + after;
                        }
                    }  
                }

                first_count+=1;
                total_post.push(tmp);
            })
            post.innerHTML = total_post.join('');
            updateScroll(post);

            postsRef.on('child_added', function(data) {
                console.log("!!!!");
                var childData = data.val();
                var time = Time();
                console.log(childData.time);
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
                second_count += 1;
                if (second_count > first_count) {
                    if(childData.icon == false){
                        var msg = childData.data.replace(/[<>]/g, function(tag){
                            return replace[tag] || tag;
                        });
                        if(childData.name == user_name){
                            tmp = before1 + childData.name + center1 + msg + quarter + childData.time + after;
                        }
                        else{ 
                            tmp = before2 + childData.name + center2 + msg + quarter + childData.time + after;
                        }
                    }
                    else{
                        if(childData.icon == 'heart'){
                            if(childData.name == user_name){
                                tmp = before1 + childData.name + center11 + '<img class="heart_img" src="img/like_post.png">' + quarter + childData.time + after;
                            }
                            else{ 
                                tmp = before2 + childData.name + center22 + '<img class="heart_img" src="img/like_post.png">' + quarter + childData.time + after;
                            }
                        }
                        else{
                            if(childData.name == user_name){
                                tmp = before1 + childData.name + center11 + '<img class="heart_img" src="img/baby_post.png">' + quarter + childData.time + after;
                            }
                            else{ 
                                tmp = before2 + childData.name + center22 + '<img class="heart_img" src="img/baby_post.png">' + quarter + childData.time + after;
                            }
                        }
                    }
                    
                    total_post.push(tmp);
                    post.innerHTML = total_post.join('');
                    updateScroll(post);
                }
            });
        })
        .catch(e => console.log(e.message));
}

window.onload = function() {
    init();
};

function updateScroll(element){
   element.scrollTop = element.scrollHeight;
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
