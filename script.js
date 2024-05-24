const html = document.querySelector("html");
// Pegando o HTML para alterar a cor de fundo

const foco_button = document.querySelector(".app__card-button--foco");
const curto_button = document.querySelector(".app__card-button--curto");
const longo_button = document.querySelector(".app__card-button--longo");
// Pegando cada botão

const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
// Pegando a imagem de fundo e o titulo

const buttons = document.querySelectorAll(".app__card-button");
// Pegando todos os botões de uma vez

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;
musica.volume = 0.7;
// Criando um objeto do tipo Audio e colocando para tocar infinitamente com o volume de 70%

const startPause = document.querySelector("#start-pause");
const iniciarOuPausar_button = document.querySelector("#start-pause span");
const iniciarOuPausar_imagem = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");
// Configurando a parte de baixo onde vai conter na seguinte sequência botão, spam, imagem e texto

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})
// Se estiver pausada começa a tocar, caso ao contrario, vai pausar a música

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

// Adicionando evento de clique aos botões, colocando o timer neles, alterando o contexto da página e por último colocando a classe de active para o botão ficar "selecionado"

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
// Criando a contagem para diminuir 1 segundo e mostrar na tela

startPause.addEventListener("click", iniciarOuPausar)
// Adicionando o evento de clique com a função iniciarOuPausar

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
// Vai tocar o audio pausando, vai chamar a função zerar e vai retornar

// Vai tocar o audio dando play, vai iniciar uma contagem recebendo 1 segundo, vai trocar o texto para pausar pois esta tocando algo e vai aparecer a imagem de pausar

function zerar() {
    clearInterval(intervaloId); // Para o timer no intervalo específico
    iniciarOuPausar_button.textContent = "Começar"
    iniciarOuPausar_imagem.setAttribute("src", "/imagens/play_arrow.png");
    intervaloId = null;
}
// Pausa tudo

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
// Mostra o timer na tela com formatações

mostrarTempo();
