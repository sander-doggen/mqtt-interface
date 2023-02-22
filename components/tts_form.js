let component_id;

const width = 50;
const height = 60;

const form = document.createElement('form');
form.id = 'tts_form';
form.innerHTML = `
    <label>Text to speech: <input type="text" name="message"/></label>
    <br/><br/>
    <button type="submit">Send</button>
`;

const style = document.createElement('style');
style.textContent = `
:host {
    display: block;
    border: 5px solid #bbb;
    width: ${width}%;
    height: ${height}%;
  }

  #tts_form {
    padding: 1rem;
  }
 }
`;

window.customElements.define('form-Ƅ', class extends HTMLElement {
  constructor() {
      super();
      component_id = this.id;
      this._shadowroot = this.attachShadow({ mode: 'open' });
      this._shadowroot.appendChild(form);
      this._shadowroot.appendChild(style);

      this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

      form.addEventListener('submit', logSubmit);
  }

  connectedCallback() {
      this.socket.addEventListener('open', event => {
          console.log(`opening socket for ${component_id} ...`);
          this.socket.send(JSON.stringify({ "payload": "input-connected", "id": component_id }));
      });
  }

});

function logSubmit(event) {
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    console.log(`${key}: ${value}\n`);
  }
  form.reset();
  event.preventDefault();
}