import "./joystick.js";

const control_interface = document.createElement('div');
control_interface.innerHTML = `
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
`;

// Make a variable to hold data for every inputsensor
var movement2d = { "x": 0, "y": 0 };
// ----------------------------------------------

window.customElements.define('controller-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.appendChild(control_interface);

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
            this.socket.send(JSON.stringify({ "payload": `controller is connected` }));

            // log all sensors that are implemented here, use ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
            logInput(this.socket, "movement2d", movement2d, 300);
            // --------------------------------------------
        });
    }
});

function logInput(socket, source, data, interval) {
    setInterval(function() {
        socket.send(JSON.stringify({ "payload": "mqtt", "source": source, "data": data }));
    }, interval)
}