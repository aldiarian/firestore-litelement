import { LitElement, html } from 'lit-element';
import './my-list'

export class MyApp extends LitElement {

    static get properties() {
        return {
            alumnos: { type: Array }
        };
    }

    constructor(){
        super();
        this.alumnos = [];
        this.db = firebase.firestore();
        this._getUsers();
    }

    render() {
        return html`
        <my-list .alumnos=${this.alumnos}></my-list>
        `;
    }
    _getUsers(){
        this.db.collection("alumnos").onSnapshot( querySnapshot =>  {
                const items = [];
                querySnapshot.forEach( doc =>  {
                    items.push( doc.data() ) ;
                });
                this.alumnos = items;
            });
        
    }
}
customElements.define('my-app', MyApp);
