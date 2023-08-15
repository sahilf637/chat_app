const express = require('express');
const cors = require('cors');
const { log } = require('console');
const app = express();


app.use(express.json());
app.use(cors({ origin: true }));

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

const server = app.listen(3000, () => {
    console.log("Listening to port 3000");
})


//socket

const io = require('socket.io')(server)

io.on('connection', (socket) =>{
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})