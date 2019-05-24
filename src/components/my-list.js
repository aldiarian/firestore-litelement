import { LitElement, html  } from 'lit-element';

class MyList extends LitElement {
    static get properties() {
        return {
            alumnos: { type: Array }
        };
    }

    constructor(){
        super();
        this.alumnos = [];
    }

    static get styles() {
        return css `
        :host {
            display: block;
        }
        :host([hidden]) {
            display: none;
        }
        ul{
            list-style:none;
            padding:0;
        }
        `;
    }

    render() {
        return html`
        <p>Lista de alumnos</p>
        ${this.alumnos.map( element => html`
            <ul>
                <li>Nombre: ${element.nombre}</li>
                <li>Edad: ${element.edad}</li>
                <li>Fecha de alta: ${element.altaFecha}</li>
                <li>Fecha de baja: ${element.bajaFecha}</li>
            </ul>
            `)
            }
        `;
    };
}
customElements.define('my-list', MyList);