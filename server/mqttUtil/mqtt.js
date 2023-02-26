import * as mqtt from 'mqtt';
import * as format from './message_formatting.js';

const succes_color = '\x1b[32m%s\x1b[0m';
const error_color = '\x1b[31m%s\x1b[0m';
const succes_send_color = '\x1b[35m%s\x1b[0m';
const didnt_send_color = '\x1b[36m%s\x1b[0m'

let publish_connection;
let connected_for_publishing = false;
// All topics for publishing
const publish_topic_bindings = {
    "movement2d": "zbos/motion/control/movement",
    "tts": "zbos/dialog/set"
};

let subscribe_connections;
// All topics for subscribing
const subscribe_topic_bindings = {

};


const mqttPublisherInit = () => {
    publish_connection = mqtt.connect(process.env.MQTT_BROKER, { queueQoSZero: false });
    publish_connection.on('connection', () => {
        console.log(succes_color, `Publisher connected to broker: ${error}`);
        connected_for_publishing = true;
    })
    publish_connection.on('reconnect', () => {
        console.log(error_color, `Connecting controller (reconnect) ...`);
        connected_for_publishing = false;
    })
    publish_connection.on('erro', (error) => {
        console.log(error_color, `Error connecting controller: ${error}`);
        connected_for_publishing = false;
    })

    console.log(succes_send_color, "CONNECTED TO BROKER");
    console.log(didnt_send_color, "NOT CONNECTED TO BROKER");
    console.log("\n==========================\n");
}

// const mqttSubscriberInit = () => {
//     for (const [key, value] of Object.entries(subscribe_topic_bindings)) {
//         console.log(`Setting up mqtt connection for ${key} to ${value}`);
//         subscribe_connections[key] = mqtt.connect(process.env.MQTT_BROKER, { queueQoSZero: false });
//         mqttSubscribe(key, value);
//     }
// }

// const mqttSubscribe = (source, topic) => {
//     if (typeof topic === 'undefined') {
//         console.log('\x1b[31m%s\x1b[0m', `\t---> this topic is undefined, input from ${source} will not be send`);
//         return
//     }

//     connections[source].subscribe(topic, function (err) {
//         if (!err) {
//             console.log('\x1b[32m%s\x1b[0m', `${source} subscribed to ${topic}!`);
//         } else {
//             console.log('\x1b[31m%s\x1b[0m', `${source}'s subscribtion to ${topic} failed!`);
//         }
//     });
// }

const mqttSendJsonMessage = (source, data) => {
    if (source === undefined) {
        console.log(`source is undefined in mqttSendJsonMessage (mqtt.js) when trying to send ${JSON.stringify(data)}`);
        return
    }

    const color = (connected_for_publishing ? succes_send_color : didnt_send_color);

    // if the message doesn't need to be transmissed over mqtt, "changedValue" is the key for the parameter value
    // this happens when the parameter value changes to be send with next messages
    const message = format[source](data);   // format[source](data) calls a method with name of <source> inside message_formatting.js with argument <data>
    if (message && ("changedValue" in message)) {
        console.log(color, `${source} -> parameter :: ${message.changedValue}`);
    }
    else if (message) {     // transmit formatted message
        console.log(color, `${source} -> ${publish_topic_bindings[source]} :: ${JSON.stringify(message)}`);
        if (connected_for_publishing) publish_connection.publish(publish_topic_bindings[source], JSON.stringify(message));
    }
}

export { mqttPublisherInit, mqttSendJsonMessage };