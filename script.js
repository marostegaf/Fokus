const html = document.querySelector("html");

const foco_button = document.querySelector(".app__card-button--foco");
const curto_button = document.querySelector(".app__card-button--curto");
const longo_button = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

const buttons = document.querySelectorAll(".app__card-button");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;
musica.volume = 0.7;

const startPause = document.querySelector("#start-pause");
const iniciarOuPausar_button = document.querySelector("#start-pause span");
const iniciarOuPausar_imagem = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

foco_button.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto("foco");
    foco_button.classList.add("active");
})

curto_button.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto("descanso-curto");
    curto_button.classList.add("active");
})

longo_button.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto("descanso-longo");
    longo_button.classList.add("active");
})

function alterarContexto(contexto) {
    mostrarTempo();
    zerar();
    buttons.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo": 
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `

        default:
            break;
    }
}

const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPause.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausar_button.textContent = "Pausar"
    iniciarOuPausar_imagem.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausar_button.textContent = "Começar"
    iniciarOuPausar_imagem.setAttribute("src", "/imagens/play_arrow.png");
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();
