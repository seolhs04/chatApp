const express = require('express');
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('index.ejs')
})

io.on('connection', function(socket){
    console.log('connected');

    socket.emit('alert', '채팅에 연결되었습니다.')

    socket.on('text', function(data){
        console.log(data)
    })
})

http.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
})