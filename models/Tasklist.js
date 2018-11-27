module.exports = function(sequelize, DataTypes) {
    const Tasklist = sequelize.define("Tasklist", {
      todoItem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,140]
        }
      }, 
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false   
      }
     
   
     
    });
    return Tasklist;
  };