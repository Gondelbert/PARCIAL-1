fetch("https://plox1237.github.io/Apiuser/estatabla.csv")
    .then(response=>response.text())
    .then(data=>{
        const lines=data.split('\n');
        let html='<table>'; 
        lines.forEach(line => {
            const cells = line.split(','); 
            html+='<tr>'; 
            cells.forEach(cell => {
                html+=`<td>${cell}</td>`; 
            });
            html+='</tr>';
        });
        html+='</table>'; 
        document.getElementById('tabla').innerHTML=html; 
    })
    .catch(error => {
        console.error('Error al obtener el archivo CSV:', error);
    });