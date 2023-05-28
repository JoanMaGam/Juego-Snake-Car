const escenario = document.querySelector('.escenario');
const coche = document.querySelector('.coche');

//los eventos de tipo teclado, se realizan exclusivamente sobre el documento.

document.addEventListener('keydown', mover); // Lo importante de la tecla no es su posicion en el teclado, sino su charCode ya que hay teclados con ñ u otras letras y cambia la posicion de las letras en el teclado. 

function mover(event) {
    console.log(event.keyCode);
    console.log(coche.offsetLeft);
    console.log(coche.offsetTop);
    switch (event.keyCode) {
        case 38:
            //arriba
            moverY(-40, 90)
            break;
        case 40:
            //abajo
            moverY(40, 270)
            break;
        case 37:
            //izq
            moverX(-40, 0)
            break;
        case 39:
            //derecha
            moverX(40, 180)
            break;

        default:
            break;
    }
}


//Acumular la posicion de mi coche:
let avanceX = 0;
let rotacion = 0;
function moverX(pVel, pDeg) {
    avanceX += pVel;
    rotacion = `rotateZ(${pDeg}deg)`
    coche.style.marginLeft = avanceX + 'px' //para quitar la animacion de rotacion y dejar solo la de movimiento, no lo podemos hacer con translate, debemos usar margin. Y desde el css seleccionamos en transition la propiedad que queremos que se transicione.   
    coche.style.transform = `${rotacion}`

    comprobarLimites()
}


let avanceY = 0;
function moverY(pVel, pDeg) {
    avanceY += pVel;
    rotacion = `rotateZ(${pDeg}deg)`
    coche.style.marginTop = avanceY + 'px'
    coche.style.transform = `${rotacion}`

    comprobarLimites()
}

function comprobarLimites() {
    //Forma larga:
    // if (coche.offsetLeft <= 0) {
    //     // gameOver()
    //     avanceX = 0
    // } else if (coche.offsetLeft >= 600) {
    //     // gameOver()
    //     avanceX = 450 //es 600 menos el coche
    // } else if (coche.offsetTop >= 600) {
    //     // gameOver()
    //     avanceY = 450
    // } else if (coche.offsetTop <= 0) {
    //     // gameOver()
    //     avanceY = 0
    // } else {
    //     escenario.style.borderColor = 'black';
    // }
    //Forma corta:
    if (coche.offsetLeft <= 0 || coche.offsetLeft >= 450 || coche.offsetTop <= 0 || coche.offsetTop >= 500) {
        gameOver()
    }
}

function gameOver() {
    escenario.style.border = '10px solid red';
    document.removeEventListener('keydown', mover); //esto es para parar el evento.
    escenario.style.textAlign = 'center'
    escenario.style.paddingTop = '40px'
    escenario.textContent = '---GAME OVER--- Bumblebee se ha estrellado!!'
    escenario.style.fontSize = '50px'
}