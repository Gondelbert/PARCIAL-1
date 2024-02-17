// Función para generar la tabla a partir de los datos almacenados en el almacenamiento local
const generarTabla = () => {
    var formDataArray = JSON.parse(localStorage.getItem('satisfactionFormDataArray')) || [];
    var tableBody = document.getElementById('tabla-body');
    
    // Limpiar la tabla antes de generarla de nuevo
    tableBody.innerHTML = '';

    // Recorrer los datos y agregar filas a la tabla
    formDataArray.forEach(function(formData, index) {
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = formData.nombre;
        row.insertCell(2).textContent = formData.correo;
        row.insertCell(3).textContent = formData.satisfaccion;
        row.insertCell(4).textContent = formData.recomendaciones;
    });
}

// Generar la tabla al cargar la página
window.onload = function() {
    generarTabla();
};

document.getElementById('satisfactionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Verificar si todos los campos del formulario están llenados
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var satisfaccion = document.querySelector('input[name="satisfaccion"]:checked');
    var recomendaciones = document.getElementById('recomendaciones').value.trim();

    if (nombre === '' || correo === '' || satisfaccion === null || recomendaciones === '') {
        alert('Por favor complete todos los campos del formulario');
        return; 
    }
    else {
        // Obtener los datos almacenados previamente en el almacenamiento local
        var formDataArray = JSON.parse(localStorage.getItem('satisfactionFormDataArray')) || [];

        // Agregar los nuevos datos del formulario al arreglo
        var formData = {
            nombre: nombre,
            correo: correo,
            satisfaccion: satisfaccion.value,
            recomendaciones: recomendaciones
        };
        formDataArray.push(formData);

        // Guardar el arreglo actualizado en el almacenamiento local
        localStorage.setItem('satisfactionFormDataArray', JSON.stringify(formDataArray));

        // Notificar al usuario que los datos se han guardado
        alert('Datos guardados localmente');

        // Limpiar el formulario después de guardar los datos
        document.getElementById('satisfactionForm').reset();

        // Actualizar la tabla con los nuevos datos
        generarTabla();
    }
});
