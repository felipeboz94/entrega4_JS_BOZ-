const MAX_CANT_INTENTOS = 3
// array de usuarios auxiliar usados para el contraste
const usuario1 = new Usuario("felipe", "boz", "prueba1@gmail.com", "felipe", 123)
const usuario2 = new Usuario("john", "doe", "prueba2@gmail.com", "john", 456)
const usuario3 = new Usuario("mary", "doe", "prueba3@gmail.com", "mary", 789)
const auxiliarArrayUsuarios = [usuario1, usuario2, usuario3]
let usuarios = auxiliarArrayUsuarios
let usuarioIngresado=''
console.log("usuarios = " + usuarios)
tieneUsuario()

//destructor de cajas
function destructorDivs(){
    let divs = document.body.getElementsByClassName('div')
    if(divs.length != 0){
        for (const div of divs){
            div.remove()
        }
    }
}

//constructor de div log
function modificadorMsj(mensaje){
    let div = document.body.getElementsByClassName('msj')
    console.log(div[0])
    div[0].innerText = mensaje
}

function constructorUsuarioLoginExitoso(usuario){
    let div = document.createElement('div')
    div.className = 'div'
    div.innerHTML = `
                    <p><strong> Nombre: ${usuario.nombre}</strong></p>
                    <p><strong> Apellido: ${usuario.apellido}</strong></p> 
                    <p><strong> Mail: ${usuario.mail}</strong></p> 
                    <p><strong> Usuario: ${usuario.usuario}</strong></p>  
    `
    document.body.append(div)
    
}
//buscador de usuarios
function buscaUsuario(usuarioIngresado){
    for(const i in auxiliarArrayUsuarios){
        if(usuarioIngresado == auxiliarArrayUsuarios[i].usuario ){
            user = auxiliarArrayUsuarios[i]
        }
    }
    return user
}

//constructor de objeto USUARIO
function Usuario(nombre, apellido, mail, usuario, pass){
    this.nombre = nombre
    this.apellido = apellido
    this.mail = mail
    this.usuario = usuario
    this.pass = pass
}

//crea usuario
function creaUsuario(){
    nombre = prompt('Ingrese su nombre')
    apellido = prompt('Ingrese su apellido')
    mail = prompt('Ingrese su mail')
    usuario = prompt('Ingrese el usuario')
    pass = prompt('Ingrese su contraseña')

    const USUARIO = new Usuario(nombre, apellido, mail, usuario, pass)
    usuarios.push(USUARIO)
}

//funcion de login
function login(){

    let passIngresada=''
    let retAux = -1
    for(let intentos=1;intentos<=MAX_CANT_INTENTOS+1;intentos++){
        if(intentos == MAX_CANT_INTENTOS+1){
            return 99   //contraseña bloqueada
            
        }
        else{
            usuarioIngresado = prompt('Ingrese su usuario: ')
            if(usuarioIngresado == null ){
                return 0
            }
            passIngresada = prompt('Ingrese su contraseña: ')
            if(passIngresada == null){
                return 0

            }
            let coincideUsuario = false
            let coincideContraseña = false
            let indiceUsuario = -1
            let indiceContrasenia = -1
            //for para recorrer y encontrar al usuario correcto
            for (const usuario of usuarios){
                if (usuario.usuario != usuarioIngresado){
                    console.log('Usuario no coincide '+ usuario.usuario)                    
                }
                else{
                    coincideUsuario = true
                    console.log('Usuario coincide '+ usuario.usuario)
                    indiceUsuario = usuarios.indexOf(usuario)
                    break
                }
            }
            for (const usuario of usuarios){
                if (usuario.pass != passIngresada){
                    console.log('La contraseña no coincide '+ usuario.pass)                    
                }
                else{
                    coincideContraseña = true
                    console.log('La contraseña coincide '+ usuario.pass)
                    indiceContrasenia = usuarios.indexOf(usuario)
                }
            }                    
            if(coincideUsuario == false){
                return 1    //el usuario ingresado no está en el array
            }
            if(((coincideContraseña == false) || (indiceUsuario != indiceContrasenia)) && (intentos != MAX_CANT_INTENTOS)){
                alert('Contraseña incorrecta. Le quedan ' + (MAX_CANT_INTENTOS-intentos) +' intentos. Ingrese sus datos nuevamente: ')
            } 
            else{
                return 2    // ingreso exitoso
            }
                
            }
        }
    return -1
}

//función inicial que consulta si tiene un usuario. si tiene, logueás, sino, te creás uno y luego logueás
function tieneUsuario(){
    
    if(confirm('¿Tiene usuario en la página?')){
        let retLogin = login()
        let mensaje = ''
        switch(retLogin){
            case -1:
                mensaje = 'No se hizo nada. ERROR' 
                destructorDivs()
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 0:
                mensaje = 'ESC producido' 
                destructorDivs()
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 1:
                mensaje = 'No se encuentra el usuario!'
                destructorDivs()
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 2:
                mensaje = 'Login exitoso! El usuario ingresado es:'
                destructorDivs()
                modificadorMsj(mensaje)
                user = buscaUsuario(usuarioIngresado)
                constructorUsuarioLoginExitoso(user)
                console.log(mensaje)
                break           
            case 99:
                mensaje = 'ATENCIÓN. Ha ingresado mal la contraseña '+ MAX_CANT_INTENTOS + ' veces. Su contraseña ha sido bloqueada. Comuníquese con el administrador'
                destructorDivs()
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
        }
    }
    else{
        alert('Debe crear un usuario')
        creaUsuario()
        usuarioCreado = usuarios[usuarios.length-1]   //el último usuario es el usuario creado
        console.log('El usuario creado es ' + usuarioCreado + ' y su contraseña es ' )
        tieneUsuario()
    }
}


