var express = require('express');
var path = require('path');
var app = express();


//app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/',function (req,res) {
});


var server = app.listen(3000, function(){
    console.log('3000번 포트로 서버를 시작합니다!'); });

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log('유저 입장');
    socket.on('linesend', function (data) {
        console.log(data);
        socket.broadcast.emit('linesend_toclient',data);
    });

    socket.on('disconnect', function () {
        console.log('유저 퇴장');
    });
});

