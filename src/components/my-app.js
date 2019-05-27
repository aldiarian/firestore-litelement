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

    constructor() {
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
            font-family: sans-serif;
            width: 300px;
        }
        :host([hidden]) {
            display: none;
        }
        `;
    }
    render() {
        return html `
        <my-input @newInput=${this._userInsert}></my-input>
        <my-list .alumnos=${this.alumnos} @deleteAlumno=${this._borrarAlumno} @cambiadoAlumno=${this._changeAlumno}></my-list>
        `;
    }

    _userInsert(event) {
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
    _getUsers() {
        this.db.collection("alumnos").onSnapshot(querySnapshot => {
            const items = [];
            querySnapshot.forEach(doc => {
                let currentuser = doc.data();
                currentuser.id = doc.id;
                items.push(currentuser);
            });
            this.alumnos = items;
            console.log(this.alumnos);
        });

    }
    _borrarAlumno(event) {
        console.log(event.detail);
        this.db.collection("alumnos").doc(event.detail).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    _changeAlumno(event) {
        console.log('usuario cambiado', event.detail.id);
        const usuario = event.detail;
        const userRef = this.db.collection("alumnos").doc(usuario.id);
        return userRef.update(usuario)
            .then(() => {
                console.log(' actualizado con exito');
            })
            .catch((error) => {
                console.log(error);

            })

    }
}
customElements.define('my-app', MyApp);