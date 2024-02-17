// Función para validar espacios en blanco
function validarEspaciosEnBlanco(value) {
    return value.trim() !== '';
}

// Función para generar la tabla con los datos del Local Storage
const generarTabla=(formDataArray)=> {
    // Obtener el elemento contenedor de la tabla
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
document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
    
    // Obtener los valores de los campos del formulario y validar espacios en blanco
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var opciones = document.querySelectorAll('input[name="opciones[]"]:checked');
    var comentarios = document.getElementById('comentarios').value.trim();

    // Validar que todos los campos estén completos
    if (!validarEspaciosEnBlanco(nombre) || !validarEspaciosEnBlanco(correo) || opciones.length === 0 || !validarEspaciosEnBlanco(comentarios)) {
        alert('Por favor complete todos los campos del formulario');
        return;
    }

    // Crear un objeto con los datos del formulario
    var formData = {
        nombre: nombre,
        correo: correo,
        opciones: [],
        comentarios: comentarios
    };

    // Agregar las opciones seleccionadas al objeto formData
    opciones.forEach(function(opcion) {
        formData.opciones.push(opcion.value);
    });

    // Obtener los datos almacenados en el Local Storage o inicializar un arreglo vacío
    var formDataArray = JSON.parse(localStorage.getItem('AdminIAData2.0')) || [];

    // Agregar el nuevo formulario al arreglo
    formDataArray.push(formData);

    // Guardar el arreglo actualizado en el Local Storage
    localStorage.setItem('AdminIAData2.0', JSON.stringify(formDataArray));

    // Limpiar el formulario después de guardar los datos
    this.reset();

    // Notificar al usuario que los datos se han guardado
    alert('¡Datos guardados localmente!');

    // Generar y mostrar la tabla con los nuevos datos
    generarTabla(formDataArray);
});

// Obtener los datos del Local Storage al cargar la página
var formDataArray = JSON.parse(localStorage.getItem('AdminIAData2.0')) || [];

// Mostrar la tabla inicial al cargar la página
generarTabla(formDataArray);
