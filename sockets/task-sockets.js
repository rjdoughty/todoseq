
module.exports = function(io){
    console.log('running');
    io.on('connection', function(socket) {
        
        socket.on('new-task', function(data){
            console.log(data);
             io.emit('emit-task', data);
        })
        
        socket.on('complete-task', function(newData){
            console.log(newData);
            io.emit('emit-task', newData);
        })

        socket.on('delete-task', function(newData){
            console.log(newData);
            io.emit('emit-task', newData);
        })


    });
}