import { LitElement, html, css } from 'lit-element';
import './my-alumno';

class MyList extends LitElement {
    static get properties() {
        return {
            alumnos: { type: Array }
        };
    }

    constructor() {
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
            return html `
        <p>Lista de alumnos</p>
        <ul>
            ${this.alumnos.map( element => html` 
                <my-alumno .alumno=${element}></my-alumno>
            `)}
        </ul>
        `;
    };

   
}
customElements.define('my-list', MyList);