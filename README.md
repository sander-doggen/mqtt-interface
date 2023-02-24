# mqtt-interface

Sets up an HTTP server and works with web sockets to communicate. The server is capable to send mqtt messages to a mqtt-broker.

In the folder components/ it is possible to create web components that send all their information to controller.js via events. This all embodying controller.js will in its turn capture the events and send their details to the server over the websocket. The server will then take care of sending the mqtt messages to the broker.

## Steps to add functionality

- copmonents/ &rarr; Make a new file that will be your web component.
- copmonents/controller.js &rarr; Add your web component to the controller's innerHTML
- copmonents/controller.js &rarr; Follow the comments in the controller to add message functionality
- communication/message_interface.js &rarr; Make a function (name = component id) to convert the received data to a sendable correct mqtt json-string

## Launch

    # fill in the .env file and match the index.html window variables
    npm install
    npm start
