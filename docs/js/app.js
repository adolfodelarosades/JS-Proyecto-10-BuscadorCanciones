import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;
    if(artista === '' || cancion === ''){
        UI.divMensaje.innerHTML = 'Error todos los campos son obligatorios';
        UI.divMensaje.classList.add('error');
        setTimeout(() => {  
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.classList.remove('error');
        }, 3000);
    }else{
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then( data => {                
                if(data.respuesta.lyrics){
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                }else{                    
                    UI.divMensaje.innerHTML = 'La canción NO existe, prueba con otra búsqueda';
                    UI.divMensaje.classList.add('error');
                    setTimeout(() => {  
                        UI.divMensaje.innerHTML = '';
                        UI.divMensaje.classList.remove('error');
                        UI.formularioBuscar.reset();
                    }, 3000);
                }
            });
    }
});
