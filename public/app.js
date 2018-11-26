
$( function(){
    let taskList = [''];
    const socket = io();
 

      const runTaskQuery = function () {
        $('#todoItems').empty();
       
        $.ajax({ url: '/api/taskList', method: 'GET' })
          .then(function (taskList) {
            console.log(taskList);
              let htmlstr = '';
              taskList.forEach(e => {
                  
                htmlstr += `<li id="todos"><button type="submit" id="remove" data-status=${e.completed} data-id=${e.id}>
                                <i class="far fa-circle"></i></button>`,
                htmlstr += `<span id="chore">${e.todoItem.toUpperCase()}</span></li>`;                      
              });
              $('#todoItems').html(htmlstr);
        
            console.log(taskList);
          })
          .catch(function (err) {
            console.log(err);
        });
      }

      $(document).ready(runTaskQuery);
  
    
    const addTask = function(event) {
        event.preventDefault();
        const todoItem = $('#task').val().trim();
        console.log(todoItem);

        const newTask = {todoItem: todoItem, completed: false, dbutton: 'far fa-circle'};
       socket.emit('new-task', {todoItem: todoItem});
    
        $.ajax({ url: '/api/taskList', method: 'POST', data: newTask}).then(function(data) {
            console.log(newTask);
            $('#task').val('');
            runTaskQuery();
       });    
    }
    $('#submit').on('click', addTask);
       socket.on('emit-task', function(data){
        console.log(data);
        runTaskQuery();
    });


$('#todoItems').on('click', '#remove', function(event) {
    event.stopPropagation();
    const index = $(this).data('id');
    let status = $(this).data('status');
    let butstatus = $(this).data('button');
    console.log(butstatus);

    if (status === false) {
        status = true;
        butstatus = "far fa-times-circle"

        const updateTask = {
        id: index,
        completed: status,
        dbutton: butstatus
        };
   
        console.log(updateTask);
        socket.emit('complete-task', {data: updateTask});
    
        $.ajax({ url: `/api/taskList`, method: "PUT", data: updateTask})
        .then(function(data) {
            runTaskQuery();
        })
        socket.on('emit-task', function(data){
            console.log(data);
            runTaskQuery();
        });
    } else {
        $.ajax({ url: "/api/taskList/" + index, method: "DELETE"})
        .then(function(data) {
        socket.emit('delete-task', data);
        socket.on('emit-task', function(data){
        console.log(data);
        runTaskQuery();
        });
    });
};

});
    
});
