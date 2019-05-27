import { LitElement, html, css } from 'lit-element';
import './my-list';
import './my-input'

export class MyApp extends LitElement {

    static get properties() {
        return {
            alumnos: { type: Array },
            fechaAlta: { type: Date }
        };
    }

    constructor(){
        super();
        this.alumnos = [];
        this.db = firebase.firestore();
        this._getUsers();
        this.fechaAlta = new Date();
    }

    static get styles() {
        return css `
        :host {
            display: block;
            font-family: sans-serif
        }
        :host([hidden]) {
            display: none;
        }
        `;
    }
    render() {
        return html`
        <my-input @newInput=${this._userInsert}></my-input>
        <my-list .alumnos=${this.alumnos}></my-list>
        `;
    }

    _userInsert(event){
        this.db.collection("alumnos").add({
            nombre: event.detail,
			pagado: false,
			altaFecha: this.fechaAlta.getFullYear()
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        console.log(this.alumnos);
    }
    _getUsers(){
        this.db.collection("alumnos").onSnapshot( querySnapshot =>  {
                const items = [];
                querySnapshot.forEach( doc =>  {
                    items.push( doc.data() ) ;
                });
                this.alumnos = items;
                console.log(this.alumnos);
                
            });
        
    }
}
customElements.define('my-app', MyApp);
