const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '123123123',
    database: 'employee_db'
  },
  
);

db.connect(() => console.log(`Connected to the Employee Database.`) );


module.exports = db;