const mysql =require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'cdac',
    database:'event_management',
})

module.exports =mySqlPool