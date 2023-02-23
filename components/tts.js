window.customElements.define('tts-Ƅ', class extends HTMLElement {

	style;

	#width = 50;
	#height = 60;

	constructor() {
		super();

		this.form = document.createElement('form');
		this.form.id = 'tts_form';
		this.form.innerHTML = `
      		<label>Text to speech: <input type="text" name="message"/></label>
      		<br/><br/>
      		<button type="submit">Send</button>
    	`;

		this.style = document.createElement('style');
		this.style.textContent = `
			:host {
			    display: block;
			    border: 5px solid #bbb;
			    width: ${this.#width}%;
			    height: ${this.#height}%;
			  }
		  
			  #tts_form {
			    padding: 1rem;
			  }
			 }
		`;

		this._shadowroot = this.attachShadow({ mode: 'open' });
		this._shadowroot.appendChild(this.form);
		this._shadowroot.appendChild(this.style);

		this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

		this.form.addEventListener('submit', this.logSubmit.bind(this));
	}

	connectedCallback() {
		this.socket.addEventListener('open', event => {
			console.log(`opening socket for ${this.id} ...`);
			this.socket.send(JSON.stringify({ "payload": "input-connected", "id": this.id }));
		});
	}

	logSubmit(event) {
		const formData = new FormData(this.form);
		for (const [key, value] of formData) {
			console.log(`${key}: ${value}\n`);
		}
		this.form.reset();
		event.preventDefault();
	}

});