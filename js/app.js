import { API } from './api.js';
import * as UI from './interfaz.js';

//console.log(UI);
UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === ''){
        //El usuario deja los campos vacios, mostrar error        
        UI.divMensaje.innerHTML = 'Error todos los campos son obligatorios';
        UI.divMensaje.classList.add('error');
        setTimeout(() => {  
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.classList.remove('error');
        }, 3000);
    }else{
        //El formulario esta completo, realizar consulta a la API
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then( data => {                
                if(data.respuesta.lyrics){
                    //La canción no existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                }else{                    
                    //La canción no existe
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



