var signout = document.getElementById('signout');
signout.addEventListener('click', ()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        //alert("Successfully log out!");
        window.location = 'index.html';
      }).catch(function(error) {
        alert("Failed to log out!");
      });
});

var flag;
window.onload = function(){
    flag = false;
    init();
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var closeit = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

closeit.onclick = function() {
    var roomname = document.getElementById('roomname');
    var roommember = document.getElementById('roommember');
    modal.style.display = "none";
    [roomname.value, roommember.value] = ['', ''];
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        [roomname.value, roommember.value] = ['', ''];
    }
}

function init(){
    var user_name = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_name = user.displayName;
            var menu = document.getElementById('dynamic-menu');
            var addNewRoom = document.getElementById('submit');
            var roomname = document.getElementById('roomname');
            var roommember = document.getElementById('roommember');
            var database = firebase.database();

            menu.innerHTML = "<span class='dropdown-item' id='user'>" + 'Hi!  ' + user_name + "</span>";
        
            addNewRoom.addEventListener('click', ()=>{
                var updates = {};

                if(roomname.value !='' && roommember.value !=''){
                    firebase.database().ref('users').orderByChild('name').equalTo(roommember.value).once('value', function(snapshot){
                        if(!snapshot.exists()){
                            alert("The person has not registered, SORRY :)");
                            roommember.value = "";
                        }
                        else{
                            if(!flag){
                                updates['chatrooms/' + roomname.value + '/' + user_name] = true;
                                updates['chatrooms/' + roomname.value + '/' + roommember.value] = true;
                                updates['users/' + user_name +'/rooms/' + roomname.value] = true;
                                updates['users/' + roommember.value +'/rooms/' + roomname.value] = true;
                                flag = true;
                            }
                            else{
                                updates['users/' + roommember.value +'/rooms/' + roomname.value] = true;
                                updates['chatrooms/' + roomname.value + '/' + roommember.value] = true;
                            }
                            database.ref().update(updates);
                            roommember.value = "";
                        }
                    })     
                }
                flag=false;
            });

            var roomRef = firebase.database().ref('users/' + user_name + '/rooms');
            var first_count = 0, second_count = 0;
            
            roomRef.once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function (data) {
                        first_count+=1;
                        createNewRoom(data.key, "once");
                    })

                    /// Add listener to update new post
                    roomRef.on('child_added', function(data) {
                        console.log("!!!!!!!!!!");
                        second_count += 1;
                        if (second_count > first_count) {
                            createNewRoom(data.key, "on");
                        }
                        openRoom(user.displayName);
                    });                   
                })
                .catch(e => console.log(e.message));
        }
    });
}


function createNewRoom(roomName, state){
    var rooms = document.getElementById('rooms');
    var room_btn = document.createElement("li");
    console.log(roomName)
    room_btn.innerHTML = roomName;
    room_btn.setAttribute("class", "room");
    room_btn.setAttribute("type", "button");
    //room_btn.setAttribute("id", data.key);
    // all_rooms.push(newroom);
    if(state == "once"){
        rooms.append(room_btn);
    }else{
        rooms.prepend(room_btn);
        rooms.scrollTop = 0;
    }
}

function openRoom(User){
    var newBtn;
    console.log(User);
    newBtn = document.querySelectorAll('.room');
    newBtn.forEach(function(Room){
        Room.addEventListener('click', ()=>{
            document.getElementById('message').style.visibility = "visible";
            var updates = {};
            updates['users/' + User + '/now_is'] = Room.innerHTML;
            showMember(Room.innerHTML);
            firebase.database().ref().update(updates);
            
            //openRoom(Room.id, user);
            var before1 = '<div class="media mx-2 my-3 d-flex flex-row-reverse"><div class="media-body"><div class="mx-1 my-0 d-flex flex-row-reverse"><div class="name">';
            var before2 = '<div class="media mx-2 my-3 d-flex flex-row"><div class="media-body"><div class="mx-1 my-0 d-flex flex-row"><div class="name">';
            var center1 = '</div></div><div class="d-flex flex-row-reverse"><div class="mx-1 msg text1">';
            var center2 = '</div></div><div class="d-flex flex-row"><div class="mx-1 msg text2">';
            var center11 = '</div></div><div class="d-flex flex-row-reverse"><div class="mx-1 my-0 icon">';
            var center22 = '</div></div><div class="d-flex flex-row"><div class="mx-1 my-0 icon">';
            var quarter = '</div><div class="mx-1 align-self-end time">';
            var after = '</div></div></div></div>';
            
            var nowRoom;
            firebase.database().ref('users/' + User).on('value', function(snapshot){
                nowRoom = snapshot.val().now_is;
            });
        
            var heart_btn = document.getElementById('img1');
            var baby_btn = document.getElementById('img2');
            var post_btn = document.getElementById('send');
            var post_txt = document.getElementById('post');

            heart_btn.addEventListener('click', (e)=>{
                postsRef = firebase.database().ref('messages/' + nowRoom);
                var time = Time();
                postsRef.push({
                    name: User,
                    time: time,
                    data: "",
                    icon: "heart" 
                });
                e.stopImmediatePropagation();
            });

            baby_btn.addEventListener('click', (e)=>{
                postsRef = firebase.database().ref('messages/' + nowRoom);
                var time = Time();
                postsRef.push({
                    name: User,
                    time: time,
                    data: "",
                    icon: "baby"  
                });
                e.stopImmediatePropagation();
            });

            post_btn.addEventListener('click', ()=>{
                console.log(nowRoom);
                postsRef = firebase.database().ref('messages/' + nowRoom);
                if (post_txt.value != "") {
                    var time = Time();
                    postsRef.push({
                        name: User,
                        time: time,
                        data: post_txt.value,
                        icon: false
                    });
                    post_txt.value = "";
                }
            });

            post_txt.onfocus = ()=>{
                post_txt.style.borderColor = 'rgba(255, 246, 0, 0.8)';
                post_txt.style.boxShadow = "0 0  0.1rem 0.15rem rgba(255, 217, 0, .25)";
                post_txt.placeholder = '';
            }

            post_txt.onblur = ()=>{
                post_txt.style.borderColor = 'rgb(255, 115, 0)';
                post_txt.style.boxShadow = "0 0 0 0";
                post_txt.placeholder = 'Say something...';
            }   
            

            var postsRef = firebase.database().ref('messages/' + nowRoom);
            var post = document.getElementById('post_list');
            var total_post = [];
            var first_count = 0, second_count = 0;
            var replace = {
                '<': '&lt;',
                '>': '&gt;',
                '"':  '\"'
            };

            postsRef.once('value').then(function(snapshot) {
                var curr = nowRoom;
                snapshot.forEach(function (data) {
                    var hisData = data.val();
                    console.log(hisData);
                    if(hisData.icon == false){
                        var msg = hisData.data.replace(/[<>"]/g, function(tag){
                            return replace[tag] || tag;
                        });
                        var tmp;
                        if(hisData.name == User){
                            tmp = before1 + hisData.name + center1 + msg + quarter + hisData.time + after;
                        }
                        else{ 
                            tmp = before2 + hisData.name + center2 + msg + quarter + hisData.time + after;
                        }
                    }
                    else{
                        if(hisData.icon == 'heart'){
                            if(hisData.name == User){
                                tmp = before1 + hisData.name + center11 + '<img class="heart_img" src="img/like_post.png">' + quarter + hisData.time + after;
                            }
                            else{ 
                                tmp = before2 + hisData.name + center22 + '<img class="heart_img" src="img/like_post.png">' + quarter + hisData.time + after;
                            }
                        }else{
                            if(hisData.name == User){
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
                
                firebase.database().ref('messages/' + nowRoom).on('child_added', function(data) {
                    console.log(nowRoom);
                    console.log("??????");
                    var childData = data.val();
                    var time = Time();
                    if(childData.time == time && childData.name != User){
                        console.log(childData);
                        if(Notification.permission = 'granted'){
                            var notification = new Notification("Chatroom", {
                                body: 'you have new message!!WOW'
                            });
                            notification.onclick = ()=>{
                                window.location = 'chat.html';
                                notification.close();
                            };
                        }
                    }
                    if(curr == nowRoom){
                        second_count += 1;
                        if (second_count > first_count) {
                            if(childData.icon == false){
                                var msg = childData.data.replace(/[<>]/g, function(tag){
                                    return replace[tag] || tag;
                                });
                                if(childData.name == User){
                                    tmp = before1 + childData.name + center1 + msg + quarter + childData.time + after;
                                }
                                else{ 
                                    tmp = before2 + childData.name + center2 + msg + quarter + childData.time + after;
                                }
                            }
                            else{
                                if(childData.icon == 'heart'){
                                    if(childData.name == User){
                                        tmp = before1 + childData.name + center11 + '<img class="heart_img" src="img/like_post.png">' + quarter + childData.time + after;
                                    }
                                    else{ 
                                        tmp = before2 + childData.name + center22 + '<img class="heart_img" src="img/like_post.png">' + quarter + childData.time + after;
                                    }
                                }
                                else{
                                    if(childData.name == User){
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
                    }
                    
                });
            }).catch(e => console.log(e.message));
        })
    });
}

function showMember(Room){

    var memberRef = firebase.database().ref('chatrooms/' + Room);
    var members = document.getElementById("members");
    var before = '<div class="rounded-pill member">';
    var after = '</div>';
    var total_mem = [];
    var first_count = 0, second_count = 0;
    memberRef.once('value').then(function(snapshot){
        snapshot.forEach(function(data){
            first_count+=1;
            total_mem.push(before + data.key + after);
        })
        members.innerHTML = total_mem.join('');

        memberRef.on('child_added', function(data){
            second_count+=1;
            if(second_count > first_count){
                total_mem.push(before + data.key + after);
                members.innerHTML = total_mem.join('');
            }
    
        });
    }).catch(e => console.log(e.message));
}

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