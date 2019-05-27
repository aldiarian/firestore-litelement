import { LitElement, html } from 'lit-element';

export class MyInput extends LitElement {
    static get properties() {
        return {
            propName: { type: String }
        };
    }




    render() {
        return html`
        <input type="text" @keypress=${this._onInput}>
        `;
    }

    _onInput(event){
        if( event.which == 13 ){
             this.dispatchEvent(new CustomEvent('newInput', {
                bubbles: true,
                composed: true,
                detail: event.target.value,
              }));
        }
       
        
    }
}
customElements.define('my-input', MyInput);