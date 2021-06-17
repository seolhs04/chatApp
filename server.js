const express = require('express');
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const { disconnect } = require('process');
const io = new Server(http);

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('index.ejs')
})

app.get('/openchat', function(req,res){
    res.render('openchat.ejs')
})



// 접속할 유저의 정보를 받을 배열
var userArr = [];

io.on('connection', function(socket){
    console.log('connected')
    socket.emit('alert', '채팅에 연결되었습니다.')
    
    //객체로 받은 유저 정보를 배열에 저장하고 emit
    socket.on('user', function(data){
        userArr.push(data);
        io.emit('user', userArr)
    })

    socket.on('text', function(data){
        io.emit('text', data);
    })
    // disconnect가 확인되면 나가는 사람의 socket.id를 확인,삭제 후 배열 emit
    socket.on('disconnect', function(){
        function findId(element){
            if(element.socketId === socket.id){
                return true
            }
        }
        var leftUser = userArr.find(findId);
        var idxLeftUser = userArr.indexOf(leftUser);
        userArr.splice(idxLeftUser, 1);
        io.emit('user', userArr)
    })
})

http.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
})