const mqtt = require('mqtt');
const message_interface = require("./message_interface.js");

let connections = {};

// All topics to connect to with their input(id) as key
const topic_bindings = {
    "movement2d": "zbos/motion/control/movement",
    "tts": "zbos/dialog/set"
};

function mqttInit() {
    for (const [key, value] of Object.entries(topic_bindings)) {
        console.log(`Setting up mqtt connection for ${key} to ${value}`);
        connections[key] = mqtt.connect(process.env.MQTT_BROKER, {queueQoSZero: false});
        mqttSubscribe(key, value);
    }    
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
    if  (source === undefined) {
        console.log('\x1b[31m%s\x1b[0m', `source is undefined in mqttSendJsonMessage (mqtt.js)`);
        return
    }
    const message = message_interface[source](data);
    if (message) {
        console.log('\x1b[35m%s\x1b[0m', `${source} -> ${topic_bindings[source]} :: ${message}`);
        connections[source].publish(topic_bindings[source], message);
    }
}

module.exports = {
    mqttInit,
    mqttSendJsonMessage
};