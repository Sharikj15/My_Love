const CONTRASENA = "210925";
const FECHA_INICIO = new Date("2025-09-21T00:00:00");
const TEXTO_CARTA = "Te amo demasiado, pero para que me entiendas mejor: nunca te voy lo voy a demostrar, así como Zoro nunca traicionó a Luffy; te guiaré en este mundo tan solo, así como Nami lleva a Luffy; te cocinaré cada plato favorito como Sanji; perderé mis miedos, así como Usopp los perdió; te cuidaré y seré tu médico para sanarte siempre como Chopper; serás mi razón de vivir, así como Robin sobrevivió y quiso vivir por estar a su lado; te construiré un barco para que persigamos nuestros sueños como Franky lo hizo; te cantaré y te animaré siempre como Brook; te protegeré y te ayudaré a salir de tu peor momento, así como Jinbe lo hizo con Luffy por la muerte de Ace; así como el Going Merry, daré mi último aliento para protegerte; y como todos los tripulantes, me montaré a tu barco a navegar todo este mar de desafíos solo para verte ser el rey y juntos cumplir nuestros sueños.Así que, amor, así es mi forma de amarte. Cuando no me entiendas, entiende que yo estaría dispuesta a hacer eso, y te amaré tanto, así como Zoro a sus katanas, así como Nami a los tesoros, así como Sanji a las mujeres, así como Usopp ama a Kaya, como Chopper ama a la medicina, como Robin ama a los libros, como Franky ama al Sunny, como Brook ama a su ballena y su música, como Jinbe amaba a Barbablanca y su pueblo, y así como Luffy ama a su tripulación.";

let codigoIngresado = "";
let indiceFotoActual = 0;

function presionarTecla(numero) {
    if (codigoIngresado.length < 6) {
        codigoIngresado += numero;
        actualizarPuntos();
        if (codigoIngresado.length === 6) {
            setTimeout(verificarCodigo, 150);
        }
    }
}

function borrarUno() {
    codigoIngresado = codigoIngresado.slice(0, -1);
    actualizarPuntos();
}

function borrarTodo() {
    codigoIngresado = "";
    actualizarPuntos();
}

function actualizarPuntos() {
    const puntos = document.querySelectorAll('.punto');
    puntos.forEach((punto, index) => {
        if (index < codigoIngresado.length) {
            punto.classList.add('activo');
        } else {
            punto.classList.remove('activo');
        }
    });
}

function verificarCodigo() {
    if (codigoIngresado === CONTRASENA) {
        document.getElementById('pantalla-bloqueo').classList.add('oculto');
        document.getElementById('pantalla-principal').classList.remove('oculto');
        iniciarContador();
    } else {
        const tarjeta = document.getElementById('pantalla-bloqueo');
        tarjeta.classList.add('error');
        setTimeout(() => {
            tarjeta.classList.remove('error');
            borrarTodo();
        }, 400);
    }
}

function iniciarContador() {
    setInterval(() => {
        const ahora = new Date();
        let inicio = new Date(FECHA_INICIO);

        let anos = ahora.getFullYear() - inicio.getFullYear();
        let meses = ahora.getMonth() - inicio.getMonth();
        let dias = ahora.getDate() - inicio.getDate();
        let horas = ahora.getHours() - inicio.getHours();
        let minutos = ahora.getMinutes() - inicio.getMinutes();
        let segundos = ahora.getSeconds() - inicio.getSeconds();

        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            meses--;
            let mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            dias += mesAnterior.getDate();
        }
        if (meses < 0) { anos--; meses += 12; }

        document.getElementById('contador').innerHTML = 
            `<b>${anos}</b> AÑOS | <b>${meses}</b> MESES | <b>${dias}</b> DÍAS<br>` +
            `<b>${horas}</b> HORAS | <b>${minutos}</b> MIN | <b>${segundos}</b> SEG`;
    }, 1000);
}

function mostrarSeccion(id) {
    document.getElementById('seccion-inicio').classList.add('oculto');
    document.getElementById('recuerdos').classList.add('oculto');
    document.getElementById('carta').classList.add('oculto');
    
    document.getElementById(id).classList.remove('oculto');

    if (id === 'recuerdos') {
        actualizarCarrusel3D();
    }
}

function ocultarSecciones() {
    document.getElementById('recuerdos').classList.add('oculto');
    document.getElementById('carta').classList.add('oculto');
    document.getElementById('seccion-inicio').classList.remove('oculto');
}

function moverCarrusel(direccion) {
    const fotos = document.querySelectorAll('.tarjeta-foto');
    indiceFotoActual = (indiceFotoActual + direccion + fotos.length) % fotos.length;
    actualizarCarrusel3D();
}

function actualizarCarrusel3D() {
    const fotos = document.querySelectorAll('.tarjeta-foto');
    const total = fotos.length;

    fotos.forEach((foto, index) => {
        let offset = index - indiceFotoActual;
        
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);

        if (absOffset > 2) {
            foto.style.opacity = '0';
            foto.style.pointerEvents = 'none';
            foto.style.transform = `translateX(${offset * 90}px) scale(0.6) rotateY(${offset > 0 ? -45 : 45}deg)`;
            foto.style.zIndex = '0';
        } else if (offset === 0) {
            foto.style.opacity = '1';
            foto.style.pointerEvents = 'auto';
            foto.style.transform = `translateX(0px) scale(1.1) rotateY(0deg)`;
            foto.style.zIndex = '10';
        } else {
            foto.style.opacity = '0.6';
            foto.style.pointerEvents = 'auto';
            foto.style.transform = `translateX(${offset * 70}px) scale(${1 - absOffset * 0.2}) rotateY(${offset > 0 ? -35 : 35}deg)`;
            foto.style.zIndex = `${10 - absOffset}`;
        }
    });
}

let i = 0;
function escribirCarta() {
    i = 0;
    document.getElementById("texto-carta").innerHTML = "";
    function tipear() {
        if (i < TEXTO_CARTA.length) {
            document.getElementById("texto-carta").innerHTML += TEXTO_CARTA.charAt(i) === '\n' ? '<br>' : TEXTO_CARTA.charAt(i);
            i++;
            setTimeout(tipear, 35);
        }
    }
    tipear();
}