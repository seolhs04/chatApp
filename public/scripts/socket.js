var date = new Date
function dateOfhm(date){
    return `${date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`;
}

// Chatting Connected
var socket = io();
const chatList = document.getElementById('chatList');

function enterAlert(){
  socket.on('alert', function(data){
    socket.emit('user', {name: localStorage.name, socketId: socket.id});
    var alertText = document.createElement('div');
    alertText.setAttribute('class', 'card')
    alertText.setAttribute('style', 'background-color:#adb5bd; text-align:center; font-weight: bold')
    alertText.innerText = data;
    chatList.append(alertText);
  })  
}
enterAlert();

function resetUserList(){
  var cell = document.getElementById("dropdown-menu");
  while(cell.hasChildNodes()){
    cell.removeChild( cell.firstChild );
  }
}

// receive User Array
function receiveUserArr(){
  socket.on('user', function(user){
    // li초기화
    resetUserList();
    document.getElementById('userList').innerText = `접속 ${user.length}`;
      for(var i=0;i<user.length;i++){
      var user_li = document.createElement('li');
      document.getElementById('dropdown-menu').append(user_li)
      var user_a = document.createElement('a');
      user_a.setAttribute('class', 'dropdown-item');
      user_a.innerText = user[i].name;
      user_li.append(user_a)
    }   
  })
}
receiveUserArr();

// submit text
function submitText(){
  document.getElementById('button-addon2').onclick = function(){
    if(document.getElementById('textInput').value != ""){
      socket.emit('text', {socketId: socket.id, name: localStorage.name, article: document.getElementById('textInput').value})
      document.getElementById('textInput').value = '';
      document.getElementById('textInput').focus();
    }
  }
}
submitText();

// chatList Scroll controll
function moveScroll(){
    var messages = chatList.childNodes
    var offsetMessage = chatList.childNodes[messages.length - 1].offsetTop
    chatList.scrollTo({top:offsetMessage, left:0, behavior:'smooth'});
}

// 실험용


// receive & view text
socket.on('text', function(data){
    
  // Compare SocketId
  if(socket.id == data.socketId){
    // name
    var nameSpace = document.createElement('p');
    nameSpace.setAttribute('style', 'margin-bottom: 0; margin-right:0; text-align: right; font-weight: bold;');
    nameSpace.innerText = data.name;
    chatList.append(nameSpace)
    // text time box
    var textBox = document.createElement('div');
    textBox.setAttribute('style', 'display: flex;');
    chatList.append(textBox);
    // time
    var timeText = document.createElement('span');
    timeText.setAttribute('style', 'font-size: 0.5rem; margin-left: auto; margin-bottom: 0px; margin-top: auto;');
    timeText.innerText = dateOfhm(date)
    textBox.append(timeText);
    // text
    var chatText = document.createElement('div');
    chatText.setAttribute('class', 'card container mt-1');
    chatText.setAttribute('style', 'max-width: 13rem; margin-right: 0; text-align: right; color: white; background-color: #212529; margin-left: 0;');
    chatText.innerText = data.article;
    textBox.append(chatText);
  } else{
    // name
    var nameSpace = document.createElement('p');
    nameSpace.setAttribute('style', 'margin-bottom: 0; font-weight: bold;');
    nameSpace.innerText = data.name;
    chatList.append(nameSpace)
    // text time box
    var textBox = document.createElement('div');
    textBox.setAttribute('style', 'display: flex;');
    chatList.append(textBox);
    // text
    var chatText = document.createElement('div');
    chatText.setAttribute('class', 'card container mt-1');
    chatText.setAttribute('style', 'max-width: 250px; margin-left: 0; margin-right: 0; background-color: #f5f6fa;');
    chatText.innerText = data.article;
    textBox.append(chatText);
    // time
    var timeText = document.createElement('span');
    timeText.setAttribute('style', 'font-size: 0.5rem; margin-right: auto; margin-top: auto;');
    timeText.innerText = dateOfhm(date)
    textBox.append(timeText);
  }

  moveScroll();
})