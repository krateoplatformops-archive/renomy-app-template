const tableTodoExists = async (connection) => {
  connection.query('SELECT 1 from todo', (error, results, fields) => {
    if (error) {
      try {
        console.log(error.message)
        connection.query(
          'CREATE TABLE todo (id int NOT NULL AUTO_INCREMENT, message VARCHAR(200), PRIMARY KEY (id)) CHARACTER SET utf8'
        )
        console.log('Table created')
      } catch (err) {
        console.log(`Error on creating table ${err}`)
      }
    }
  })
}

exports.tableTodoExists = tableTodoExists
