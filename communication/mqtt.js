const mqtt = require('mqtt');
const message_interface = require("./message_interface.js");

let connections = {};

const topic_bindings = {
    "movement2d": "zbos/motion/control/movement",
    "tts": "zbos/dialog/set"
};

function mqttInit(source) {
    console.log(`Initialising mqtt connection for ${source}`);

    connections[source] = mqtt.connect(process.env.MQTT_BROKER, {queueQoSZero: false});
    
    mqttSubscribe(source, topic_bindings[source]);
}

function mqttSubscribe(source, topic) {
    if (typeof topic === 'undefined') {
        console.log('\x1b[31m%s\x1b[0m', `\t---> this topic is undefined, input from ${source} will not be send`);
        return
    }

    connections[source].subscribe(topic, function (err) {
        if (!err) {
            console.log('\x1b[32m%s\x1b[0m', `${source} subscribed to ${topic}!`);
        } else {
            console.log('\x1b[31m%s\x1b[0m', `${source}'s subscribtion to ${topic} failed!`);
        }
    });
}

function mqttSendJsonMessage(source, data) {

    if (message_interface[source](data)) {
        message = message_interface[source](data);
        console.log(`${source} -> ${topic_bindings[source]} :: ${message}`);
        // connections[source].publish(topic_bindings[source], message);
    }

}

module.exports = {
    mqttInit,
    mqttSendJsonMessage
};