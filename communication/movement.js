// const mqtt = require('mqtt');
import mqtt from 'mqtt';

const mqtt_broker = 'mqtt://10.25.205.72:1883';
const mqtt_broker_options = { queueQoSZero: false }
const topic = 'zbos/motion/control/movement';

let client;
let messageString;

