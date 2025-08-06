/*Creamos una funcion para que se ejecute un formulario de inscripcion
recibiendo dos datos "event y voluntario*/
function registrar(event, voluntariado) {
    event.preventDefault(); /* normalmente cuando se llena un formulario la pagina se recarga
    no se si les ha pasado que intentan acceder a sura por ejemplo y se les tosta la pagina y la refrescan
    les dice "desea reenviar el formulario". entonces con eso vamos a evitar que la pagina se nos recarge
    */

    const nombre = event.target.nombre.value; // el formulario que se va a enviar y lo almacenamos en la variable
    const email = event.target.email.value; // lo mismo de arriba pero almacea es el correo

    alert(`Gracias ${nombre}, te has registrado en "${voluntariado}" con el correo: ${email}`); // el mensaje que aparecera despues del registro exitoso


    event.target.reset(); //deja limpios los campos despues del registro para que otra persona se pueda registar
}
