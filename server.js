'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
console.log(__dirname)

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const app = express();
app.use(express.static('.'));

const server = app
    .use((req, res) => res.sendFile(INDEX) )
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

var i = 0;
wss.on('connection', (ws) => {
  ws.id = i++;
  ws.password = "";
  console.log('Client', ws.id, 'connected');
  ws.onmessage = function (event) {
    var arr = event.data.split(':');
    if (arr[0] == 'update_password')
    {
      ws.password = arr[1];
    }
    else
    {
      wss.clients.forEach((client) => {
        if (client.id != ws.id && client.password == ws.password)
          client.send(event.data);
        }
      );
    }
  }
  ws.on('close', () => console.log('Client', ws.id, 'disconnected'));
});
