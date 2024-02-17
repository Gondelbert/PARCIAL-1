const handleUser = () => {
    const usuario  = document.getElementById("userTxt").value;
    const contraseña = document.getElementById("passwTxt").value;   
     if(usuario.trim()==="" && contraseña.trim()===""){
        alert("Por favor, rellene ambos espacios para iniciar sesion");
     }else if(usuario.trim()==="" || contraseña.trim()===""){
        alert("Uno de los dos campos esta vacio, por favor rellenelo");
     }else{
        fetch("https://plox1237.github.io/Apiuser/users.json")
        .then(res=>res.json())
        .then(users=>{
            const user=users.find(us => us.usuario===usuario && us.contraseña===contraseña);
            if(user){
                if(user.tipo==="admin"){
                    window.location.href="./HTML/admin1.html";
                }else if(user.tipo==="user"){
                    window.location.href="./HTML/user1.html";
                }
            }else{
                alert("Nombre de usuario o/y contraseña incorrectos");
            }
        })
        .catch(error=>{
            console.error("Error en el JSON",error);
        })
        }
     };
