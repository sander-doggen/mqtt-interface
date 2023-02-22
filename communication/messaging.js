const mqtt = require('mqtt');

function mqttInit() {
    console.log("MQQT initialising");

    client = mqtt.connect('mqtt://10.25.205.72:1883', {
        queueQoSZero: false
    });
}

function mqttSubscribe(topic) {
    client.subscribe(topic, function (err) {
        if (!err) {
            console.log('Subscribed to topic!');
        } else {
            console.log('Subscribe failed');
        }
    });
}

function mqttSendJsonMessage(message) {
    messageString = JSON.stringify(message);
    client(topic, messageString);
}