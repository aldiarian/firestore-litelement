import { LitElement, html ,css } from 'lit-element';

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
            font-family: sans-serif
        }
        `;
    }

    render() {
        return html`
        <p>Lista de alumnos</p>
        ${this.alumnos.map( element => html`
            <ul>
                <li>Nombre: ${element.nombre}</li>
                <li>Fecha de alta: ${element.altaFecha}</li>
                <li>Pagado: ${element.pagado}</li>
            </ul>
            `)
            }
        `;
    };
}
customElements.define('my-list', MyList);