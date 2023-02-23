import "./joystick.js";
import "./tts.js";

const height = 50;
const width = 80;

const html = `
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
    <tts-Ƅ id="tts"></tts-Ƅ>
`;

const style = document.createElement('style');
style.textContent = `
:host {
    display: flex;
    flex-direction: row;
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
// ----------------------------------------------

window.customElements.define('controller-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.innerHTML = html;
        this._shadowroot.appendChild(style);

        this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

        // Add event listeners for every inputsensor
        this.addEventListener("movement2d", (e) => {
            movement2d.x = e.detail.x;
            movement2d.y = e.detail.y;
        });
        // ---------------------------------------------
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log("opening socket for controller ...")
            this.socket.send(JSON.stringify({ "payload": `controller is ready` }));

            // log all sensors that are implemented here, use ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
            logInput(this.socket, "movement2d", movement2d, 300);
            // --------------------------------------------
        });
    }
});

function logInput(socket, source, data, interval) {
    setInterval(function () {
        socket.send(JSON.stringify({ "payload": "mqtt", "source": source, "data": data }));
    }, interval)
}