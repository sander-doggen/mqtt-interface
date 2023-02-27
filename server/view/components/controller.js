import "./joystick.js";
import "./tts.js";
import "./slider.js";
import "./soundboard.js"

const height = 50;
const width = 80;

// Add components here (id is important for communication)
// const html = `
//     <joystick-Ƅ id="movement2d"></joystick-Ƅ>
//     <tts-Ƅ id="tts"></tts-Ƅ>
//     <slider-Ƅ id="force" min="0" max="200" start="100"></slider-Ƅ>
//     <slider-Ƅ id="speed" min="0" max="500" start="100"></slider-Ƅ>
// `;

const html = `
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
    <soundboard-Ƅ id="sounds"></soundboard-Ƅ>
`

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
let movement2d = { "x": 0, "y": 0 };
let tts = { "message": "" };
let force = { "value": 0 };
let speed = { "value": 0 };
let sounds = { "link": "" };
// ----------------------------------------------

window.customElements.define('controller-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.innerHTML = html;
        this._shadowroot.appendChild(style);

        this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log("opening socket for controller ...")
            this.socket.send(JSON.stringify({ "payload": `controller-connected` }));

            // Add event listeners for every continuous inputsensor
            this.addEventListener("movement2d", (e) => {
                movement2d.x = e.detail.x;
                movement2d.y = e.detail.y;
            });
            // ---------------------------------------------

            // logInput is used to periodically send the global variable ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
            // Do this for the continuous inputsensors
            logPeriodicalInput(this.socket, "movement2d", movement2d, 300);
            // --------------------------------------------

            // Add event listeners for every single fire inputsensor
            this.addEventListener("tts", (e) => {
                tts.message = e.detail.message;
                let message = { "payload": "mqtt", "source": "tts", "data": tts };
                this.socket.send(JSON.stringify(message));
            });
            this.addEventListener("force", (e) => {
                force.value = e.detail.value;
                let message = { "payload": "mqtt", "source": "force", "data": force };
                this.socket.send(JSON.stringify(message));
            });
            this.addEventListener("speed", (e) => {
                speed.value = e.detail.value;
                let message = { "payload": "mqtt", "source": "speed", "data": speed };
                this.socket.send(JSON.stringify(message));
            });
            this.addEventListener("sounds", (e) => {
                sounds.link = e.detail.link;
                let message = { "payload": "mqtt", "source": "sounds", "data": sounds };
                console.log(JSON.stringify(message));
                this.socket.send(JSON.stringify(message));
            });
            // ---------------------------------------------
        });
    }
});

const logPeriodicalInput = (socket, source, data, interval) => {
    setInterval(function () {
        socket.send(JSON.stringify({ "payload": "mqtt", "source": source, "data": data }));
    }, interval)
}