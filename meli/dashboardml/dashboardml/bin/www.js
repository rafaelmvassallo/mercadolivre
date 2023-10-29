﻿#!/usr/bin/env node

const app = require('../app');
const http = require('http');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', handleError);
server.on('listening', handleStartListening);

function handleError(error) {
    if (error) {
        switch (error.code) {
            case 'EACCES':
                console.error(`${port} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${port} is already in use`);
                process.exit(1);
                break;
        }
    }
    throw error;
}

function handleStartListening() {
    console.log(`Listening on port ${server.address().port}`)
}