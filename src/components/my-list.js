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
        .alumno-item{
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
        }
        .editar{
            display: flex;
        }
        .editar-icon{
            cursor: pointer;
        }
        svg{
            pointer-events:none;
        }
        `;
    }

    render() {
        return html`
        <p>Lista de alumnos</p>
        <ul>
        ${this.alumnos.map( element => html`
            <li class="alumno-item">
                <div>
                    <div>Nombre: ${element.nombre}</div>
                    <div>Fecha de alta: ${element.altaFecha}</div>
                    <div>Pagado: ${element.pagado}</div>
                </div>
                <div class="editar">
                    <div class="editar-icon edit" @click="${this._edit}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </div>
                    <div class="editar-icon delete" @click="${this._editDelete}"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </div>
                </div>
            </li> `)}
        </ul>
        `;
    };

    _editDelete(event){
        console.log( this.alumnos);
    }
}
customElements.define('my-list', MyList);