// Función para validar espacios en blanco
function validarEspaciosEnBlanco(value) {
    return value.trim() !== '';
}

// Función para generar la tabla a partir de los datos del formulario
const generarTabla=(formDataArray)=> {
    // Obtener el elemento donde se mostrará la tabla
    var tablaContainer = document.getElementById('tablaContainer');

    // Crear la tabla
    var tabla = document.createElement('table');
    tabla.classList.add('tabla'); // Agregar una clase CSS a la tabla

    // Crear la cabecera de la tabla
    var cabecera = tabla.createTHead();
    var filaCabecera = cabecera.insertRow();
    for (var key in formDataArray[0]) {
        var th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Convertir la primera letra a mayúscula
        filaCabecera.appendChild(th);
    }

    // Crear las filas de datos de la tabla
    formDataArray.forEach(function(formData) {
        var fila = tabla.insertRow();
        for (var key in formData) {
            var celda = fila.insertCell();
            celda.textContent = formData[key];
        }
    });

    // Limpiar el contenedor y añadir la tabla
    tablaContainer.innerHTML = '';
    tablaContainer.appendChild(tabla);
}

// Agregar un event listener al formulario para manejar el envío
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
    
    // Obtener los valores de los campos del formulario y validar espacios en blanco
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var ideas = document.getElementById('ideas').value.trim();
    var caracteristicas = document.getElementById('caracteristicas').value.trim();
    var interfaces = document.getElementById('interfaces').value.trim();
    var plataformas = document.getElementById('plataformas').value.trim();
    var seguridad = document.getElementById('seguridad').value.trim();
    var aplicaciones = document.getElementById('aplicaciones').value.trim();
    var etica = document.getElementById('etica').value.trim();
    var formacion = document.getElementById('formacion').value.trim();

    // Validar que todos los campos estén completos
    if (!validarEspaciosEnBlanco(nombre) || !validarEspaciosEnBlanco(correo) || !validarEspaciosEnBlanco(ideas) || !validarEspaciosEnBlanco(caracteristicas) || !validarEspaciosEnBlanco(interfaces) || !validarEspaciosEnBlanco(plataformas) || !validarEspaciosEnBlanco(seguridad) || !validarEspaciosEnBlanco(aplicaciones) || !validarEspaciosEnBlanco(etica) || !validarEspaciosEnBlanco(formacion)) {
        alert('Por favor complete todos los campos del formulario');
        return;
    }

    // Agregar nuevos datos del formulario al arreglo existente
    var formData = {
        nombre: nombre,
        correo: correo,
        ideas: ideas,
        caracteristicas: caracteristicas,
        interfaces: interfaces,
        plataformas: plataformas,
        seguridad: seguridad,
        aplicaciones: aplicaciones,
        etica: etica,
        formacion: formacion
    };
    
    var formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    formDataArray.push(formData);

    // Guardar el arreglo actualizado en el almacenamiento local
    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));

    // Notificar al usuario que los datos se han guardado
    alert('¡Datos guardados localmente!');

    // Limpiar el formulario después de guardar los datos
    this.reset();

    // Actualizar y mostrar la tabla con los nuevos datos del Local Storage
    formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    generarTabla(formDataArray);
});
