window.customElements.define('tts-Ƅ', class extends HTMLElement {

	style;

	#boxSize = 80;

	constructor() {
		super();

		this.form = document.createElement('form');
		this.form.id = 'tts_form';
		this.form.innerHTML = `
      		<label>Text to speech: <input type="text" name="message" autocomplete="off"/></label>
      		<br/><br/>
      		<button type="submit">Send</button>
    	`;

		this.style = document.createElement('style');
		this.style.textContent = `
			:host {
                box-sizing: border-box;
                position: absolute;
                aspect-ratio: 1/1;
                border: 5px solid #bbb;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: ${this.#boxSize}%;
            }
		  
			#tts_form {
			    padding: 1rem;
			}
		`;

		this._shadowroot = this.attachShadow({ mode: 'open' });
		this._shadowroot.appendChild(this.form);
		this._shadowroot.appendChild(this.style);

		this.form.addEventListener('submit', this.logSubmit.bind(this));
	}

	logSubmit(event) {
		event.preventDefault();
		const formData = new FormData(this.form);
		let message = "";
		for (const [key, value] of formData) {
			message = value
		}
		this.form.reset();
		
		this.dispatchEvent(new CustomEvent(this.id, {
			bubbles: true,
			composed: true,
			detail: {
				"message": message
			}
		}));
	}

});