function tediousRowToObject(row) {
  var o = row.reduce(function(obj, cell) {
    obj[cell.metadata.colName] = cell.value
    return obj
  }, {})
  return o
}
function tediousResultSetToObjectList(rows) {
  return rows.map(tediousRowToObject)
}

var config = {
  userName: 'd3',
  password: 'd3',
  server: 'localhost',
  options: {
    database: 'StockIndex',
    connectTimeout: 200,
    rowCollectionOnRequestCompletion: true
  }
}

module.exports = function(app) {

  var Connection = require('tedious').Connection;
  var Request = require('tedious').Request;
  
  app.get('/data/', function(req, res, next) {
    var sql = req.param('sql');
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        next(err)
        return;
      } 
      var sqlRequest = new Request(sql, function (err, rowCount, rows) {
        if (err) { 
          next(err)
          return
        }
        var rs = tediousResultSetToObjectList(rows)
        res.json(rs)
        connection.close()
      })
      connection.execSql(sqlRequest)
    })
  })
}

    //console.log(sql)
    // var logger = function(text) { console.log(text) }
    // connection.on('debug', logger)
    // connection.on('infoMessage', logger)
    // connection.on('errorMessage', logger)

