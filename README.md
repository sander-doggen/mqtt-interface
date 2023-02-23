# mqtt-interface
Sets up an HTTP server and works with web sockets to communicate. The server is capable to send mqtt messages to a mqtt-broker. 

In the folder components/ it is possible to create web components that send all their information to controller.js via events. This all embodying controller.js will in its turn capture the events and send their details to the server over the websocket. The server will then take care of sending the mqtt messages to the broker.

## Launch
    # fill in the .env file and match the index.html window variables
    npm install
    npm start
