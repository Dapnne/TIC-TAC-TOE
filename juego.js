let boton_reiniciar = document.getElementById("reiniciar");
let casillas = document.querySelectorAll(".juego");
let jugador2 = false; // false significa jugador X (yo) y true significa jugador O (computadora)
let ganador=document.getElementById("ganador")
let victorias =document.getElementById("victoriasJugador")
let computadora =document.getElementById("victoriasCompu")

 //---------------------------
let lista=[0,0] 
let puntajes=JSON.parse(localStorage.getItem("puntuacion"))||[0,0]; //CARGA EM EL LOCAL
victorias.innerHTML=puntajes[0] //MUESTRA VICTORIAS EN PANTALLA
computadora.innerHTML=puntajes[1] //MUESTRA VICTORIAS EN PANTALLA
//---------------------------------------------

function agregar() {
    casillas.forEach(casilla => {
        casilla.addEventListener("click", function() {
            if (!jugador2) {
                casilla.textContent = "𓇼";        
                if (verificarGanador()) {               
                    puntajes[0]++
                    victorias.innerHTML=puntajes[0]
                    localStorage.setItem("puntuacion", JSON.stringify(puntajes));
                    ganador.innerHTML = "Gano el jugador 𓇼"
                    
                } else if (empate()) {
                    ganador.innerHTML = "EMPATE"
                   
                } else {
                    jugador2 = true;
                    setTimeout(jugadaComputadora, 500); // tiempo que tomará la computadora para hacer su turno
                }
            }
        }, {once: true});
    });
}
//matriz
function verificarGanador() {
    const matrizganadoras= [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];
    
    return matrizganadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return casillas[a].textContent && 
        casillas[a].textContent === casillas[b].textContent && 
        casillas[a].textContent === casillas[c].textContent;
    });
}

function empate() {
    return Array.from(casillas).every(casilla => casilla.textContent);
}

function jugadaComputadora() {
    const casillasVacias = Array.from(casillas).filter(casilla => casilla.textContent === "");
    if (casillasVacias.length > 0) {
        const casillasdeljuego = casillasVacias[Math.floor(Math.random() * casillasVacias.length)];
        casillasdeljuego.textContent = "☾";
        casillasdeljuego.removeEventListener("click", arguments.callee);
        
        if (verificarGanador()) {
            puntajes[1]++
            computadora.innerHTML=puntajes[1]
            localStorage.setItem("puntuacion", JSON.stringify(puntajes));

            ganador.innerHTML = "Gano la computadora ☾"
        
        } else if (empate()) {
            ganador.innerHTML = "EMPATE"
           
        } else {
            jugador2 = false;
        }
    }
}

function resetear() {
    jugador2 = false; // Reiniciar al jugador 1 (X)
    casillas.forEach(casilla => {
        casilla.textContent = "";
    });
    agregar();
    ganador.innerHTML = ""
    
}

boton_reiniciar.addEventListener("click", resetear);

agregar(); // Funciona la primera vez
