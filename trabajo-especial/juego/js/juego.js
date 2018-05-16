"use strict";

//var GLOBALES
let juegoIniciado = false;
let isMarcada = [false,false,false,false,false];
let countAciertos = 0;
let countErrores = 0;
let countMarcas = 0;
let primerJuego = true;

asignarEventos();

//devuelve 0 o 1 aleatoreamente, generando marcas
function random(){
  if(Math.random() > 0.5){
    return true;
  }else{
    return false;
  }
}

//asigno eventos a comenzar y boton de selecciones (A,B,C,D,E)
function asignarEventos() {

  //obtengo los botones
  let comenzar = document.getElementById("comenzar");
  let seleccion = document.getElementsByClassName("seleccion");

  //Asigno evento al boton "comenzar juego"
  comenzar.addEventListener('click', function(e){
    if (juegoIniciado == false) {
      juegoIniciado = true;

      //para cada carta...
      for (let i = 0; i < 5; i++) {
        let hayMarca = isMarcada[i];

        //primera vez las marcas se generan aleatoriamente
        if (primerJuego == true) {
          hayMarca = random();
        }

        //obtengo la carta en la posicion i
        let carta = document.getElementById(i);

        //si hay marca, muestro la carta
        if (hayMarca == true) {
          carta.classList.remove("default");
          carta.classList.add("correcto");

          //guardo la carta marcada
          isMarcada[i] = true;
          countMarcas++;
        }

      }

      //obtengo el tiempo para ocultar las cartas
      let tiempo = document.getElementById('tiempo').value;

      //Oculto las cartas
      setTimeout(function(){
        let marcasHead = document.getElementsByTagName("thead");
        let marcas = marcasHead[0].getElementsByTagName("td");
        for (let i = 0; i < marcas.length; i++) {
          marcas[i].classList.remove("correcto");
          marcas[i].classList.add("default");
        }
      }, tiempo );

      primerJuego = false;
    }
  });

  //Asigno eventos a los botones de las cartas (A,B,C,D,E)
  for (let i = 0; i < seleccion.length; i++) {
    seleccion[i].addEventListener('click', function(e) {
      if (juegoIniciado == true) {

        //obtengo el body para el cambio de background
        let body = document.getElementsByTagName("body");

        //obtengo el name del boton clickeado (A,B,C,D,E) correspondiente al ID de la carta
        let thisCarta = this.name;

        //Obtengo la carta seleccionada
        let cartaSeleccionada = document.getElementById(thisCarta);
        if (isMarcada[thisCarta] == true) {
          //background color de acierto(azul)
          body[0].classList.remove("neutral");
          body[0].classList.add("acierto");

          //Doy vuelta la carta
          cartaSeleccionada.classList.remove("default");
          cartaSeleccionada.classList.add("correcto");

          countAciertos++;
          countMarcas--;

          //Actualizo tabla RESULTADOS
          let acierto = document.getElementById("acierto");
          acierto.innerHTML = countAciertos;
          let marcas = document.getElementById("marcas");
          marcas.innerHTML = countMarcas;

        }else{

          //background color de error (rojo)
          body[0].classList.remove("neutral");
          body[0].classList.add("error");

          //Doy vuelta la carta
          cartaSeleccionada.classList.remove("default");
          cartaSeleccionada.classList.add("incorrecto");

          countErrores++;

          //Actualizo tabla RESULTADOS
          let error = document.getElementById("error");
          error.innerHTML = countErrores;
        }

        //Espero un poco antes de terminar la partida si el usuario acerto todas las cartas
        setTimeout(function(){
          isGameOver();
        }, 100);
      }
    });
  }
}
//Reseteo el juego y hago que los aciertos sean errores y viceversa
function isGameOver() {
  if (countMarcas == 0){
    //Invierto el arreglo de cartas marcadas
    for (let i = 0; i < isMarcada.length; i++) {
      isMarcada[i] = !isMarcada[i];
    }

    //Reseteo variables
    juegoIniciado = false;
    countAciertos = 0;
    countErrores = 0;
    countMarcas = 0;

    //Reseteo las cartas (las imagenes, lo que muestro)
    let marcasHead = document.getElementsByTagName("thead");
    let marcas = marcasHead[0].getElementsByTagName("td");
    for (let i = 0; i < marcas.length; i++) {
      marcas[i].classList.remove("correcto");
      marcas[i].classList.remove("incorrecto");
      marcas[i].classList.add("default");
    }
    let acierto = document.getElementById("acierto");
    acierto.innerHTML = 0;
    let error = document.getElementById("error");
    error.innerHTML = 0;
  }
  let body = document.getElementsByTagName("body");
  body[0].classList.remove("acierto");
  body[0].classList.remove("error");
  body[0].classList.add("neutral");
}
