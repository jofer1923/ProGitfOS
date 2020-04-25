// VARIABLES GLOBALES
let menu = document.getElementById("desplegarMenu");
let menu2 = document.getElementById("desplegar2");
let buscar = document.getElementById("buscar");
let mostrarRosa = document.getElementById("busqueda__principal--rosa");
let busquedaInput = document.getElementById("busqueda__principal--input");
let lupa = document.getElementById("lupa");
let temas = document.getElementById("temas");
let temas2 = document.getElementById("temas2");
let opciones_temas = document.getElementsByClassName("opcionesTemas");
let logo = document.getElementById("logo");
let gif_sugerencia = document.getElementsByClassName("img--gif--sugerencia");
let gif_titulo_sugerencia = document.getElementsByClassName(
  "gif--titulo--sugerencia"
);
let gif_tendencia = document.getElementsByClassName("img--gif--tendencias");
let gif_tendencia_contenedor = document.getElementsByClassName(
  "tendencias__gifs__contenedor"
);
let gif_titulo_tendencia = document.getElementsByClassName(
  "gif--titulo--tendencia"
);
let titulo_tendencia = document.getElementById("titulo__tendencia");
let ver_mas1 = document.getElementsByClassName("verMas1");
let ver_mas2 = document.getElementsByClassName("verMas2");
let ver_mas3 = document.getElementsByClassName("verMas3");
let ver_mas4 = document.getElementsByClassName("verMas4");
let opciones = document.getElementsByClassName("opciones");
let mostar_opciones = document.getElementById("mostarOpciones");
let mostar_opciones_texto = document.getElementsByClassName(
  "mostarOpcionesTexto"
);
let buscar_sugerencia_titulo = [];

// ENDPOINT DE VISUALIZACIÓN DE LOS GIFS EN LA SECCIÓN DE SUGERENCIAS

function cargaDelBody() {
  // detectar la carga del body y llamar al Endpoint
  console.log("La página cargó");

  getSugerencias();
}

// ENDPOINT SUGERENCIAS
async function getSugerencias() {
  const Sugerencias = await fetch(
    "http://api.giphy.com/v1/gifs/trending" +
      "?api_key=" +
      "ZsyimjTGoeAs3gjOJLqCRkHfccc4tcEv" +
      "&limit=14"
  )
    .then((response) => response.json())
    .then((resData) => {
      for (let i = 0; i < resData.data.length; i++) {
        let url_sugerencia = resData.data[i].images.downsized.url;
        let url_tendencia = resData.data[4 + i].images.downsized.url;
        let titulo_sugerencia_completo = resData.data[i].title;
        let titulo_tendencia_completo = resData.data[4 + i].title;

        buscar_sugerencia_titulo.push(resData.data[i].title.split("GIF", 1));

        for (let j = i; j < gif_sugerencia.length; j++) {
          gif_sugerencia[j].src = url_sugerencia;
        }

        for (let k = i; k < gif_titulo_sugerencia.length; k++) {
          let titulo_sugerencia_final = titulo_sugerencia_completo.split(
            "GIF",
            1
          ); // ELIMINAR EL AUTOR DEL TÍTULO DEL GIF

          gif_titulo_sugerencia[
            k
          ].textContent = `#${titulo_sugerencia_final[0].replace(/ /g, "")} `; // ELIMINAR ESPACIOS EN BLANCO
        }

        for (let t = 0; t < gif_tendencia.length; t++) {
          gif_tendencia[i].src = url_tendencia;
        }

        for (let m = i; m < gif_titulo_tendencia.length; m++) {
          let titulo_sugerencia_final = titulo_tendencia_completo.split(
            "GIF",
            1
          ); // ELIMINAR EL AUTOR DEL TÍTULO DEL GIF
          gif_titulo_tendencia[
            m
          ].textContent = `#${titulo_sugerencia_final[0].replace(/ /g, "")} `; // ELIMINAR ESPACIOS EN BLANCO
        }
      }
      return resData;
    })
    .catch((error) => {
      return error;
    });
  return Sugerencias;
}

// FUNCION DEL BOTÓN 'VER MÁS' SECCIÓN SUGERENCIAS

let verMasBuscar1 = () => {
  if (ver_mas1[0].click) {
    let search_verMas1 = () => {
      let buscar_verMas1 = document.getElementById("buscar");
      buscar_verMas1.value = buscar_sugerencia_titulo[0];
      titulo_tendencia.textContent = buscar_sugerencia_titulo[0];
      event.preventDefault();
      getTendencias(buscar_verMas1.value); //Llamada a la función del Endpoint
    };
    search_verMas1();
  }
};

let verMasBuscar2 = () => {
  if (ver_mas2[0].click) {
    let search_verMas2 = () => {
      let buscar_verMas2 = document.getElementById("buscar");
      buscar_verMas2.value = buscar_sugerencia_titulo[1];
      titulo_tendencia.textContent = buscar_sugerencia_titulo[1];
      event.preventDefault();
      getTendencias(buscar_verMas2.value); //Llamada a la función del Endpoint
    };
    search_verMas2();
  }
};

let verMasBuscar3 = () => {
  if (ver_mas3[0].click) {
    let search_verMas3 = () => {
      let buscar_verMas3 = document.getElementById("buscar");
      buscar_verMas3.value = buscar_sugerencia_titulo[2];
      titulo_tendencia.textContent = buscar_sugerencia_titulo[2];
      event.preventDefault();
      getTendencias(buscar_verMas3.value); //Llamada a la función del Endpoint
    };
    search_verMas3();
  }
};

let verMasBuscar4 = () => {
  if (ver_mas4[0].click) {
    let padre = ver_mas4[0].parentNode;
    let primerHijo = padre.firstChild.nextElementSibling;
    let primerHijoDelHijo = primerHijo.firstChild.nextElementSibling;

    let search_verMas4 = () => {
      let buscar_verMas4 = document.getElementById("buscar");
      buscar_verMas4.value = buscar_sugerencia_titulo[3];
      titulo_tendencia.textContent = buscar_sugerencia_titulo[3];
      event.preventDefault();
      getTendencias(buscar_verMas4.value); //Llamada a la función del Endpoint
    };
    search_verMas4();
  }
};

// ENDPOINT PARA CAPTURAR LA BÚSQUEDA DEL USUARIO Y MOSTRARLA EN LA SECCIÓN DE TENDENCIAS

//Capturar la búsqueda del usuario y llamar el Endpoint
let search = () => {
  let buscar = document.getElementById("buscar").value;
  event.preventDefault();
  titulo_tendencia.textContent = buscar;
  getTendencias(buscar); //Llamada a la función del Endpoint
};

//ENDPOINT TENDENCIAS
function getTendencias(search) {
  const URL_TENDENCIA =
    "http://api.giphy.com/v1/gifs/search?q=" +
    search +
    "&api_key=" +
    "ZsyimjTGoeAs3gjOJLqCRkHfccc4tcEv" +
    "&limit=10";

  const Tendencias = fetch(URL_TENDENCIA)
    .then((response) => response.json())
    .then((resData) => {
      for (let i = 0; i < resData.data.length; i++) {
        let url_tendencia = resData.data[i].images.downsized.url;
        let titulo_tendencia_completo = resData.data[i].title;

        for (let j = 0; j < gif_tendencia.length; j++) {
          gif_tendencia[i].src = url_tendencia;
        }

        for (k = i; k < gif_titulo_tendencia.length; k++) {
          let titulo_tendencia_final = titulo_tendencia_completo.split(
            "GIF",
            1
          ); // ELIMINAR EL AUTOR DEL TÍTULO SOBRANTE DEL GIF
          gif_titulo_tendencia[
            k
          ].textContent = `#${titulo_tendencia_final[0].replace(/ /g, "")} `; // ELIMINAR ESPACIOS EN BLANCO
        }
      }
      return resData;
    })
    .catch((error) => {
      return error;
    });
  return Tendencias;
}

///////////////////////////////////////////////

//ENDPOINT SUGERENCIAS DE BÚSQUEDAS

//ENDPOINT AUTOCOMPLETAR
function autocompletarBusqueda() {
  let buscar_sugerencias = document.getElementById("buscar").value;
  autocompletar(buscar_sugerencias);

  function autocompletar(search) {
    const URL_SUGERENCIAS =
      "http://api.giphy.com/v1/gifs/search/tags?q=" +
      search +
      "&api_key=" +
      "ZsyimjTGoeAs3gjOJLqCRkHfccc4tcEv" +
      "&limit=3";
    const Sugerencias = fetch(URL_SUGERENCIAS)
      .then((response) => response.json())
      .then((resData) => {
        for (let i = 0; i < resData.data.length; i++) {
          for (let j = i; j < opciones.length; j++) {
            opciones[j].value = resData.data[i].name;
          }
        }
        return resData;
      })
      .catch((error) => {
        return error;
      });
    return Sugerencias;
  }
}

function enviarOpcionesBusqueda(posicion) {
  let buscar_autocomepletar = document.getElementById("buscar");
  buscar_autocomepletar.value = opciones[posicion].value;
  titulo_tendencia.textContent = opciones[posicion].value;

  getTendencias(buscar_autocomepletar.value);

  // Mostrando las sugerencias de búsqueda
  for (let i = 0; i < mostar_opciones_texto.length; i++) {
    mostar_opciones_texto[i].textContent = opciones[i].value;
    mostar_opciones.classList.toggle("mostarOpcionesBlock");
    mostar_opciones.classList.remove("mostarOpciones");
  }
}

// MENU DESPLEGABLE PARA LOS TEMAS

let text = menu.addEventListener("click", function () {
  document.getElementById("desplegar").classList.toggle("desplegar");
  document.getElementById("desplegar2").classList.toggle("desplegar");
});

let img = menu2.addEventListener("click", function () {
  document.getElementById("desplegar").classList.toggle("desplegar");
  document.getElementById("desplegar2").classList.toggle("desplegar");
});

function ocultar() {
  document.getElementById("desplegar").classList.toggle("desplegar");
  document.getElementById("desplegar2").classList.toggle("desplegar");
}

// HOVER PARA LAS OPCIONES DE BUSQUEDA

let opcion = document.getElementById("opciones");

let mouseOver = opcion.addEventListener("mouseover", (event) => {
  event.target.classList.add("opciones--hover");
  opcion.classList.remove("opciones--hover");
});

let mouseout = opcion.addEventListener("mouseout", (event) => {
  event.target.classList.remove("opciones--hover");
});

// CAPTURAR EL INPUT PARA MOSTAR LAS OPCIONES DE BUSQUEDA

let mostrar = buscar.addEventListener("input", () => {
  opcion.classList.add("busqueda__opciones--mostrar");
  mostrarRosa.classList.add("busqueda__principal--borde");
  mostrarRosa.classList.add("busqueda__principal--rosa");
  busquedaInput.classList.add("busqueda__principal--rosa");
  lupa.classList.add("lupa--input");
  lupa.classList.remove("lupa");
});

// CAPTURAR EL CLICK DE LAS OPCIONES PARA OCULTARLAS

let hidden = opcion.addEventListener("click", () => {
  opcion.classList.remove("busqueda__opciones--mostrar");
  mostrarRosa.classList.remove("busqueda__principal--borde");
  mostrarRosa.classList.remove("busqueda__principal--rosa");
  mostrarRosa.classList.remove("busqueda__principal");
  mostrarRosa.classList.add("busqueda__principal--rosa--active");
  busquedaInput.classList.remove("busqueda__principal--rosa");
  busquedaInput.classList.add("busqueda__principal--active--input");
});

let submit = document.getElementById("busqueda__principal--input");
let hiddenSubmit = submit.addEventListener("click", () => {
  opcion.classList.remove("busqueda__opciones--mostrar");
  mostrarRosa.classList.remove("busqueda__principal--borde");
  mostrarRosa.classList.remove("busqueda__principal--rosa");
  mostrarRosa.classList.remove("busqueda__principal");
  mostrarRosa.classList.add("busqueda__principal--rosa--active");
  busquedaInput.classList.remove("busqueda__principal--rosa");
  busquedaInput.classList.add("busqueda__principal--active--input");
});
////////////////////////////////////////////////

opciones_temas[1].addEventListener("click", () => {
  let temas_cambio_1 = temas.href.replace("normal", "oscuro");
  temas.href = temas_cambio_1;
  let logo_cambio1 = logo.src.replace("gifOF_logo", "gifOF_logo_dark");
  logo.src = logo_cambio1;
});

opciones_temas[0].addEventListener("click", () => {
  let temas_cambio_2 = temas.href.replace("oscuro", "normal");
  temas.href = temas_cambio_2;
  let logo_cambio2 = logo.src.replace("gifOF_logo_dark", "gifOF_logo");
  logo.src = logo_cambio2;
});
