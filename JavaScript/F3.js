document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
    
    // Verificar si todos los campos del formulario están llenos
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var nivelAcceso = document.querySelector('input[name="nivel_acceso"]:checked');
    var tareas = document.getElementById('tareas').value.trim();
    var feedback = document.getElementById('feedback').value.trim();
    var problemas = document.getElementById('problemas').value.trim();
    var sugerencias = document.getElementById('sugerencias').value.trim();
    var actualizaciones = document.getElementById('actualizaciones').value.trim();
    var plazos = document.getElementById('plazos').value.trim();
    var notas = document.getElementById('notas').value.trim();

    if (nombre === '' || correo === '' || nivelAcceso === null || tareas === '' || feedback === '' || problemas === '' || sugerencias === '' || actualizaciones === '' || plazos === '' || notas === '') {
        alert('Por favor complete todos los campos del formulario');
        return; 
    } else {
        // Crear un objeto con los datos del formulario
        var formData = {
            nombre: nombre,
            correo: correo,
            nivelAcceso: nivelAcceso.value,
            tareas: tareas,
            feedback: feedback,
            problemas: problemas,
            sugerencias: sugerencias,
            actualizaciones: actualizaciones,
            plazos: plazos,
            notas: notas
        };

        // Obtener los datos almacenados en el Local Storage
        var formDataArray = JSON.parse(localStorage.getItem('AdminIAData')) || [];

        // Agregar el nuevo formulario al arreglo
        formDataArray.push(formData);

        // Guardar el arreglo actualizado en el Local Storage
        localStorage.setItem('AdminIAData', JSON.stringify(formDataArray));

        // Limpiar el formulario después de guardar los datos
        this.reset();

        // Notificar al usuario que los datos se han guardado
        alert('¡Datos guardados localmente!');

        // Actualizar la tabla
        generarTabla(formDataArray);
    }
});

// Función para generar la tabla
const generarTabla=(formDataArray)=> {
    // Obtener el elemento de la tabla
    var tablaContainer = document.getElementById('tablaContainer');

    // Limpiar la tabla existente
    tablaContainer.innerHTML = '';

    // Crear la tabla
    var tabla = document.createElement('table');
    tabla.classList.add('tabla');

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

    // Agregar la tabla al contenedor
    tablaContainer.appendChild(tabla);
}

// Obtener los datos del Local Storage al cargar la página
var formDataArray = JSON.parse(localStorage.getItem('AdminIAData')) || [];

// Mostrar la tabla inicial al cargar la página
generarTabla(formDataArray);


