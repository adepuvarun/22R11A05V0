const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'varun123',     
  database: 'url_shortener'  
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected.');
});

module.exports = connection;
