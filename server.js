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

app.get('/chat', function(req,res){
    res.render('chat.ejs')
})




io.on('connection', function(socket){
    console.log('connected')
    socket.emit('alert', '채팅에 연결되었습니다.')

    var userArr = [];
    socket.on('user', function(data){
        userArr.push(data);
        io.emit('user', userArr)
    })

    socket.on('text', function(data){
        io.emit('text', data);
    })

    socket.on('disconnect', function(){
        function findId(element){
            if(element.socketId === socket.id){
                return true
            }
        }
        var leftUser = userArr.find(findId)
        io.emit('left', leftUser)
        console.log(leftUser)
    })
})

http.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
})