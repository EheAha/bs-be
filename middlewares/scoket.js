var server = require('http').createServer();
var io = require('socket.io')(server);
server.listen(5000, () => {
    console.log("listen:5000")
});
const scok = (req, res, next) => {
    console.log(sss)
    io.on('connection', function (socket) {
        socket.on('ees', function (msg) {
            console.log(msg)
        });
        io.emit('ees', "有更新啦");
        next()
    });
}

module.exports = {
    scok
}