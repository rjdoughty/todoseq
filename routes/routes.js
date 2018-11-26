
    // Require all models
    const db = require('../models');


// Require path so we can find the index.html file
const path = require('path');
// Routes
// ===========================================================
module.exports = function(app) {

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// Displays all task
app.get('/api/taskList', function(req, res) {
  db.Tasklist.findAll({})
  .then(function(dbTasklist) {
      res.json(dbTasklist);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// // Adds a new task

app.post('/api/taskList', function(req, res) {
  db.Tasklist.create({
    todoItem: req.body.todoItem,
    completed: req.body.completed, 
    dbutton: req.body.button
  })
  .then(function(dbTasklist) {
      res.json(dbTasklist);
})
.catch(function(err) {
  res.json(err);
  });
});

// app.get('/api/tasklist/:index', function(req, res) {
//   res.json(tableList[req.params.index]);
// });

// Finds the requested task and replaces it one provided in the request body
app.put('/api/taskList', function(req, res) {

  db.Tasklist.update({
      //  todoItem: req.body.todoItem,
        completed: req.body.completed, 
        button: req.body.button
  }, {
      where: {
        id: req.body.id
    }
})
  .then(function (dbTasklist) {
      res.json(dbTasklist);
  })
  .catch(function(err) {
      res.json(err);
  });
});


// Finds the requested task and deletes it from the collection
app.delete('/api/taskList/:id', function(req, res) {
  db.Tasklist.destroy({
      where: {
          id: req.params.id
      }
    })
  .then(function (dbTasklist) {
      res.json(dbTasklist);
  })
  .catch(function(err) {
      res.json(err);
  });
});
};