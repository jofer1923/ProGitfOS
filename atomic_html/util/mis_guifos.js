// VARIABLES GLOBALES
let contenedor_listo = document.getElementById("contenedor_capturar_listo");
let listo = document.getElementById("mostrar_camara_capturar_listo");
let video = document.getElementById("grabar_camara");
let reproducir_gif = document.getElementById("reproducir_gif");
let finalizar_botones = document.getElementById("contenedor_finalizar_botones");
let capturar = document.getElementById("mostrar_camara_capturar");
let contenedor_capturar = document.getElementById("contenedor_capturar");
let subir_gif = document.getElementById("contenedor_finalizar_subir");
let repetir_captura = document.getElementById("contenedor_finalizar_repetir");
let reproducir_gif_img = document.getElementById("reproducir_gif_img");
let mis_gifs = document.getElementsByClassName("img--gif");
let mis_gifs_contenedor = document.getElementById("mis--gifs__contenedor");

////////////////////////////

/* CLASE GIFPHY CON FUNCIONES PARA ENVIAR EL GIF */
class giphy {
  async obtener(apiKey, formaData) {
    let cors = { method: "POST", body: formaData, json: true };
    let respuestaApi = await this.postear(
      `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`,
      cors
    );

    return respuestaApi;
  }
  async postear(URL, parametros) {
    let datos = await fetch(URL, parametros);
    let respuesta = await datos.json();

    return respuesta;
  }
}
///////////////////

// CÓDIGO PRINCIPAL

capturar.textContent = "Capturar";
contenedor_listo.style.display = "none";
finalizar_botones.style.display = "none";

/* INICIAR LA GRABACIÓN DE LA CAMÁRA */
capturar.addEventListener("click", () => {
  crear_gifs();
  capturar.textContent = "Creando Guifo";

  setTimeout(() => {
    contenedor_capturar.style.display = "none";
    contenedor_listo.style.display = "";
  }, 1000);
});
///////////////////

repetir_captura.addEventListener("click", () => {
  crear_gifs();
  finalizar_botones.style.display = "none";
  contenedor_capturar.style.display = "";
  video.style.display = "";
  reproducir_gif.style.display = "";
  capturar.textContent = "Creando Guifo";

  setTimeout(() => {
    contenedor_capturar.style.display = "none";
    contenedor_listo.style.display = "";
  }, 1000);
});

function crear_gifs() {
  navigator.mediaDevices
    .getUserMedia({
      video: { height: { max: 480 } },
    })

    .then(async function (stream) {
      video.srcObject = stream;
      video.play();
      let recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 827,
        height: 431,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("started");
        },
      });

      recorder.startRecording();
      listo.addEventListener("click", () => {
        contenedor_listo.style.display = "none";
        finalizar_botones.style.display = "";
        /////////////////////////////////////
        recorder.stopRecording(function () {
          let blob = recorder.getBlob();
          video.pause();
          const tracks = stream.getTracks();
          tracks[0].stop();
          reproducir_gif_img.addEventListener("click", () => {
            video.style.display = "none";
            reproducir_gif.style.display = "block";
            let url = URL.createObjectURL(blob);
            reproducir_gif.src = url;
          });
          /////////////////////////////////////
          let form = new FormData();
          form.append("file", recorder.getBlob(), "myGif.gif");
          subir_gif.addEventListener("click", () => {
            let inst = new giphy();
            let key = "ZsyimjTGoeAs3gjOJLqCRkHfccc4tcEv";
            inst.obtener(key, form).then((resData) => {
              const traer_gif = fetch(
                "https://api.giphy.com/v1/gifs/" +
                  resData.data.id +
                  "?api_key=" +
                  "ZsyimjTGoeAs3gjOJLqCRkHfccc4tcEv"
              )
                .then((response) => response.json())
                .then((resData) => {
                  localStorage.setItem(
                    `GIF ${resData.data.id}`,
                    JSON.stringify(resData)
                  );
                  mostrar_mis_gif_creados();
                });
              return traer_gif;
            });
          });
        });
      });
    });
}
//////////////////////////
let mostrar_mis_gif_creados = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let gif_local = localStorage.getItem(clave);
    let nuevo_gif = JSON.parse(gif_local);

    let gif_contenedor = document.createElement("div");
    gif_contenedor.classList.add("gif__contenedor");

    let div = document.createElement("div");

    let img_gif = document.createElement("img");
    img_gif.classList.add("img--gif");

    div.appendChild(img_gif);

    gif_contenedor.appendChild(div);

    mis_gifs_contenedor.appendChild(gif_contenedor);
    mis_gifs[i].src = nuevo_gif.data.images.downsized_large.url;
  }
};
