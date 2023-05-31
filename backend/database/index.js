const mysql = require("mysql");

//Create Connections:
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
  });

//Connect to database:
db.connect((err) => {
  if(err) {
    console.error("error connecting: ", err.stack);
    return;
  }
  console.log('Connection done')
});

  module.exports = db;