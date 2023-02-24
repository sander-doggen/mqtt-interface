import "./joystick.js";
import "./tts.js";

const height = 50;
const width = 80;

// Add components here (id is important for communication)
const html = `
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
    <tts-Ƅ id="tts"></tts-Ƅ>
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
`;

const style = document.createElement('style');
style.textContent = `
:host {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 8%;
    width: ${width}vw;
    height: ${height}vh;
    border: 5px solid #000;
    border-radius: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// Make a variable to hold data for every inputsensor
var movement2d = { "x": 0, "y": 0 };
var tts = { "message": "" };
// ----------------------------------------------

// Variables to detect change of single fire inputsensors
var new_tts = { "message": "" };
// ----------------------------------------------

window.customElements.define('controller-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.innerHTML = html;
        this._shadowroot.appendChild(style);

        this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

        // Add event listeners for every continuous inputsensor
        this.addEventListener("movement2d", (e) => {
            movement2d.x = e.detail.x;
            movement2d.y = e.detail.y;
        });
        // ---------------------------------------------

        // Add event listeners for every single fire inputsensor
        this.addEventListener("tts", (e) => {
            new_tts.message = e.detail.message;
        });
        // ---------------------------------------------
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log("opening socket for controller ...")
            this.socket.send(JSON.stringify({ "payload": `controller-connected` }));

            // logInput is used to periodically send the global variable ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
            logPeriodicalInput(this.socket, "movement2d", movement2d, 300);
            // --------------------------------------------

            // logChangedInput is used to only send the global variable when it has changed value ( logInput(this.socket, <source(id of component)>, <data>); )
            logChangedInput(this.socket, "tts", tts);
            // --------------------------------------------
        });
    }
});

function logPeriodicalInput(socket, source, data, interval) {
    setInterval(function () {
        socket.send(JSON.stringify({ "payload": "mqtt", "source": source, "data": data }));
    }, interval)
}

function logChangedInput(socket, source, data) {
    setInterval(function () {
        if (new_tts.message != data.message) {
            data.message = new_tts.message;
            socket.send(JSON.stringify({ "payload": "mqtt", "source": source, "data": data }));
        }
    }, 500)
}