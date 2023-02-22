const mqtt = require('mqtt');
const message_interface = require("./message_interface.js");

const topic_bindings = {
    "movement2d": "zbos/motion/control/movement"
};
let active_topic;

function mqttInit(source) {
    console.log(`Initialising mqtt connection for ${source}`);

    client = mqtt.connect(process.env.MQTT_BROKER, {
        queueQoSZero: false
    });

    mqttSubscribe(topic_bindings[source]);
}

function mqttSubscribe(topic) {
    console.log(topic);
    active_topic = topic;
    client.subscribe(active_topic, function (err) {
        if (!err) {
            console.log(`subscribed to ${active_topic}!`);
        } else {
            console.log(`subscribtion to ${active_topic} failed!`);
        }
    });
}

function mqttSendJsonMessage(source, data) {

    if (message_interface[source](data)) {
        message = message_interface[source](data);
        console.log(message);
        client.publish(active_topic, message);
    }

}

module.exports = {
    mqttInit,
    mqttSendJsonMessage
};