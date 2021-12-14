const express = require('express')
const helmet = require('helmet')
const router = express.Router()
const app = express()
const cors = require('cors')({ origin: true })
var mysql = require('mysql2')
const { tableTodoExists } = require('./helpers')
const fs = require('fs')
const readline = require('readline')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
})

const logFile = 'logs/calls.log'

app.use(helmet())

router.use(express.json())

router.get('/todo', (req, res) => {
  cors(req, res, async () => {
    await tableTodoExists(connection)
    try {
      connection.query(
        'SELECT * FROM todo ORDER BY id DESC',
        (err, results) => {
          if (err) {
            console.log(err.message)
            res.status(200).send([])
          } else {
            res.status(200).send(results)
          }
        }
      )
    } catch (err) {
      console.log(err)
      res.status(503).send()
    }
  })
})

router.post('/todo', (req, res) => {
  cors(req, res, async () => {
    tableTodoExists(connection)
    try {
      if (req.body.message === '' || !req.body.message) {
        res.status(400).send()
      }
      connection.query(
        `INSERT INTO todo (message) values ('${req.body.message}')`,
        (err, results) => {
          if (err) {
            console.log(err.message)
            res.status(500).send()
          }
          // get values
          connection.query(
            'SELECT * FROM todo ORDER BY id DESC',
            (err2, results2) => {
              if (err2) {
                console.log(err2.message)
                res.status(200).send([])
              }
              res.status(200).send(results2)
            }
          )
        }
      )
    } catch (err) {
      console.log(err)
      res.status(503).send()
    }
  })
})

router.delete('/todo', (req, res) => {
  cors(req, res, async () => {
    tableTodoExists(connection)
    try {
      if (req.query.id === '' || !req.query.id) {
        res.status(400).send()
      }
      connection.query(
        `DELETE FROM todo where id=${req.query.id}`,
        (err, results) => {
          if (err) {
            console.log(err.message)
            res.status(500).send()
          }
          res.status(200).send()
        }
      )
    } catch (err) {
      console.log(err)
      res.status(503).send()
    }
  })
})

router.get('/logs', (req, res) => {
  cors(req, res, async () => {
    try {
      const results = []
      if (fs.existsSync(logFile)) {
        const fileStream = fs.createReadStream(logFile)
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        })
        for await (const line of rl) {
          results.push(JSON.parse(line))
        }
      }
      res.status(200).send(results.reverse())
    } catch (err) {
      console.log(err)
      res.status(503).send()
    }
  })
})

router.get('/ping', (req, res) => {
  cors(req, res, async () => {
    res.status(200).send('pong')
  })
})

router.get('/', (req, res) => {
  cors(req, res, async () => {
    res.status(200).send('Krateo Api')
  })
})

app.all('*', (req, res, next) => {
  cors(req, res, async () => {
    var ipaddress = (
      req.headers['x-forwarded-for'] || req.socket.remoteAddress
    ).split(',')[0]
    console.log({
      method: req.method,
      path: req.path,
      ip: ipaddress
    })
    if (req.path !== '/logs') {
      const log = {
        time: new Date(),
        method: req.method,
        path: req.path
      }
      fs.writeFileSync(
        logFile,
        `${JSON.stringify(log)}\n`,
        { flag: 'a+' },
        () => {
          console.log('The file is created if not existing!!')
        }
      )
    }
    next()
  })
})

app.use('/', router)

app.listen(8080, '0.0.0.0')
