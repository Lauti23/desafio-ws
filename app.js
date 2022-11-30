const express = require('express')
const { Server } = require('socket.io')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('views', 'public/views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

const io = new Server(server)

let log = []

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado')
    socket.emit('history', log)
    socket.on('chat', data => {
        log.push(data)
        io.emit('history', log)
    })
})