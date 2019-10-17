const express = require('express');

const server = express();
server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({server: 'Updated 10/16/2019'})
});

module.exports = server;