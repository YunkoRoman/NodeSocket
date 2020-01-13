const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const cors = require('cors');

const dataBase = require('./dataBase').getInstance();
const {socketService} = require('./socketService');
dataBase.setModels();
app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.on('connection', async socket => {
   await socketService.Socket(socket, io);
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            success: false,
            message: err.message || 'Unknown Error',
            controller: err.controller
        })
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});