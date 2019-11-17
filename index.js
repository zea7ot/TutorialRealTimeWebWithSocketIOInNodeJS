const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/javascript', (req, res) => {
  res.sendFile(__dirname + '/public/javascript.html')
})

// tech namespace
const tech = io.of('/tech')

tech.on('connection', socket => {
  socket.on('join', data => {
    socket.join(data.room)
    tech.in(data.room)
  })

  socket.on('message', msg => {
    console.log(`message: ${msg}`)
    tech.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')

    tech.emit('message', 'user disconnected')
  })
})
