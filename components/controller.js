import "./joystick.js";

const control_interface = document.createElement('div');
control_interface.innerHTML = `
    <joystick-Ƅ id="movement2d"></joystick-Ƅ>
`;

var movement2d = { "x": 0, "y": 0 };

window.customElements.define('controller-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.appendChild(control_interface);

        this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

        this.addEventListener("move", (e) => {
            movement2d.x = e.detail.x;
            movement2d.y = e.detail.y;
        });
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log("opening socket for controller ...")
            this.socket.send(JSON.stringify({ "payload": `controller is connected` }));
            logInput(this.socket, movement2d, 1000);
        });
    }
});

function logInput(socket, sensor, interval) {
    setInterval(function() {
        socket.send(JSON.stringify({ "payload": sensor }));
    }, interval)
}