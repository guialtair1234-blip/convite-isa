let dataEscolhida = "";
let periodoEscolhido = "";
let p1Escolhida = "";
let p2Escolhida = "";
let lugarEscolhido = "";
let mudo = false;

const MEU_WHATSAPP = "5519991106734";
const musicaFundo = document.getElementById("musicaFundo");
const somYay = new Audio("sons/yay.mp3");
const somClique = new Audio("sons/clique.mp3");
const somConfirma = new Audio("sons/confirma.mp3");
const somManha = new Audio("sons/manha.mp3");
const somTarde = new Audio("sons/tarde.mp3");
const somNoite = new Audio("sons/noite.mp3");
const somConfirmarOpcao = new Audio("sons/confirmarOpcao.mp3");
const somCalculando = new Audio("sons/calculando.mp3");
const somGostei = new Audio("sons/gostei.mp3");
const somResultado = new Audio("sons/resultado.mp3");

musicaFundo.volume = 0.1;

const perguntas = {
  noite: {
  pergunta1: {
    texto: "você prefere sair para jantar ou sair para um lazer?",
    opcoes: [
      { valor: "jantar", label: "🍽️ jantar" },
      { valor: "lazer", label: "🎬 lazer" }
    ]
  },
  pergunta2PorP1: {
    jantar: { texto: "quer conhecer uma culinária nova ou quer visitar um restaurante bemmm confortante?", opcoes: [
      { valor: "novo", label: "✨ algo novo" }, { valor: "confortante", label: "❤️ confortante" }
    ]},
    lazer: { texto: "assistir um filminho ou sair pra comer um docinho?", opcoes: [
      { valor: "cinema", label: "🎬 filminho" }, { valor: "comer", label: "🍧 docinho" }
    ]}
  },
  resultados: {
    "jantar-confortante": { nome: "Saiko Lámen", emoji: "🍜", descricao: "perfeito para comermos um udon quentinho que eu sei que você gosta ksks", link: "https://www.instagram.com/saikolamen/"},
    "jantar-novo": { nome: "Pirajá", emoji: "🏖️", descricao: "que tal conhecermos um pouco da gastronomia do Rio de Janeiro?", link:"https://www.instagram.com/barpiraja/"},
    "lazer-cinema": { nome: "Cinema", emoji: "🎬", descricao: "clássico ne?? tem vários filminhos massa em cartaz! ksks", link:"https://www.kinoplex.com.br/cinema/kinoplex-dom-pedro/15?gad_source=1&gad_campaignid=21354544694&gbraid=0AAAAADeXgnXmCOu9eRVOMkpK29DaHqZNn&gclid=Cj0KCQjwm8bTBhDWARIsAC9Hi8m-7eP-E_3QpfclCLRftnQiioruoKgc2OuUiqRQgpSFDtyrQy4VM1QaAqRaEALw_wcB"},
    "lazer-comer": { nome: "Georgina", emoji: "🍧", descricao: "para tomarmos um sorvetinho ou comer algum docinho bem quentinho", link:"https://www.instagram.com/georginagelato/"}
  }
},

  manha: {
    pergunta1: {
      texto: "quer tomar um café ou passear em algum lugar?",
      opcoes: [
        { valor: "cafe", label: "☕ café" },
        { valor: "passear", label: "🚶 passear" }
      ]
    },
    pergunta2PorP1: {
      cafe: { texto: "você ficaria mais animada com um docinho ou com um brunch?", opcoes: [
        { valor: "docinho", label: "🍪 docinho" }, { valor: "brunch", label: "🥐 brunch" }
      ]},
      passear: { texto: "prefere dar uma volta num parque ou conhecer um ponto turístico?", opcoes: [
        { valor: "parque", label: "🌳 parque" }, { valor: "turistico", label: "🏛️ ponto turístico" }
      ]}
    },
    resultados: {
      "cafe-docinho": { nome: "Casa Cookie", emoji: "🍪", descricao: "excelente para comermos o bolo de maracujá ou um cookie quentinho", link:"https://www.instagram.com/casacookieecafe/"},
      "cafe-brunch": { nome: "Vila Grão", emoji: "🥐", descricao: "para tomarmos um café bem gostoso na frente da lagoa do taquaral", link:"https://www.instagram.com/viladograo_/"},
      "passear-parque": { nome: "Lagoa do Taquaral", emoji: "🌳", descricao: "perfeito para conhecer um dos lugares mais emblemáticos de campinas", link:"https://conheca.campinas.sp.gov.br/pois/55"},
      "passear-turistico": { nome: "Bosque dos Jequitibás", emoji: "🏞️", descricao: "para desligar um pouco e relaxar", link:"https://conheca.campinas.sp.gov.br/pois/967"}
    }
  },

  tarde: {
    pergunta1: {
      texto: "você prefere algo ao ar livre ou alguma atividade indoor?",
      opcoes: [
        { valor: "arlivre", label: "🌤️ ao ar livre" },
        { valor: "coberto", label: "🏠 indoor" }
      ]
    },
    pergunta2PorP1: {
      arlivre: { texto: "gostaria de ficar conversando tranquilinho ou prefere sair para praticar algum esporte?", opcoes: [
        { valor: "conversar", label: "💬 conversar" }, { valor: "esporte", label: "🎾 esporte" }
      ]},
      coberto: { texto: "prefere fazer alguma atividade manual ou passear em um ponto turístico?", opcoes: [
        { valor: "manual", label: "🎨 atividade manual" }, { valor: "comer", label: "🏛️ ponto turístico" }
      ]}
    },
    resultados: {
      "arlivre-conversar": { nome: "Piquenique", emoji: "🧺", descricao: "um piquenique bemmm tranquilo para comermos algo gostosinho e relaxar",link:"https://www.tripadvisor.com.br/Attractions-g303605-Activities-c57-Campinas_State_of_Sao_Paulo.html"},
      "arlivre-esporte": { nome: "Tênis no Taquaral", emoji: "🎾", descricao: "kkkkk esse daqui é para você me humilhar no tênis e render várias risadas", link:"https://conheca.campinas.sp.gov.br/pois/55"},
      "coberto-manual": { nome: " (entre) Casa Criativa", emoji: "🎨", descricao: "para termos um artesanato em casa que vai nos recordar desse dia", link:"https://www.instagram.com/entrecasacriativa/"},
      "coberto-comer": { nome: "Museu da Imagem e do Som de Campinas", emoji: "🏛️", descricao: "um passeio diferente e bem performático fala sério kkkk", link:"https://www.instagram.com/mis.campinas/"}
    }
  }
};

function mostrarDisponibilidade() {
  document.getElementById("btnContinuar").style.display = "none";
  document.getElementById("introTexto").style.display = "none";
  document.getElementById("titulo").style.display = "none"; 

  mostrarTela("disponibilidade");
  atualizarProgresso(20);

  reagirMascote("🤔");
  somYay.play();
  musicaFundo.play();
  
}

function selecionarPeriodo(periodo) {
  periodoEscolhido = periodo;
  document.querySelectorAll(".periodo-btn").forEach(b => b.classList.remove("selecionado"));
  document.querySelector(`[data-periodo="${periodo}"]`).classList.add("selecionado");

  pararSomsPeriodo();

  if (periodo === "manha") somManha.play();
  else if (periodo === "tarde") somTarde.play();
  else if (periodo === "noite") somNoite.play();

  const cores = { manha: "#ffe0b3", tarde: "#b3d9ff", noite: "#2b1f4d" };
  document.body.style.backgroundColor = cores[periodo];

  const emojisPeriodo = { manha: "☀️", tarde: "🌤️", noite: "🌙" };
  reagirMascote(emojisPeriodo[periodo]);
}

function confirmarHorario() {
  dataEscolhida = document.getElementById("dataEscolhida").value;

  if (!dataEscolhida || !periodoEscolhido) {
    alert("escolhe uma data e um período antes de continuar!");
    return;
  }

  somConfirmarOpcao.play();

  esconderTela("disponibilidade");
  montarPergunta1();
}

function montarPergunta1() {
  const dadosPeriodo = perguntas[periodoEscolhido];
  document.getElementById("p1Texto").textContent = dadosPeriodo.pergunta1.texto;

  const container = document.getElementById("p1Opcoes");
  container.innerHTML = "";

  for (const opcao of dadosPeriodo.pergunta1.opcoes) {
    const botao = document.createElement("button");
    botao.textContent = opcao.label;
    botao.onclick = (e) => selecionarP1(opcao.valor, e);
    container.appendChild(botao);
  }

    mostrarTela("pergunta1");
    atualizarProgresso(45);
}

function selecionarP1(valor, evento) {
  somClique.play();
  reagirMascote("😏");
  dispararConfete(evento.clientX, evento.clientY);
  p1Escolhida = valor;
  esconderTela("pergunta1");
  montarPergunta2();
}

function montarPergunta2() {
  const dadosP2 = perguntas[periodoEscolhido].pergunta2PorP1[p1Escolhida];
  document.getElementById("p2Texto").textContent = dadosP2.texto;

  const container = document.getElementById("p2Opcoes");
  container.innerHTML = "";

  for (const opcao of dadosP2.opcoes) {
    const botao = document.createElement("button");
    botao.textContent = opcao.label;
    botao.onclick = (e) => selecionarP2(opcao.valor, e);
    container.appendChild(botao);
  }

  mostrarTela("pergunta2");
  atualizarProgresso(70);
}

function selecionarP2(valor, evento) {
  somClique.play();
  dispararConfete(evento.clientX, evento.clientY);
  p2Escolhida = valor;
  esconderTela("pergunta2");

  mostrarTela("calculando");
  atualizarProgresso(80);
  somCalculando.play();

  setTimeout(() => {
    esconderTela("calculando");
    revelarLugar();
  }, 2000);
}

function revelarLugar() {
  const chave = `${p1Escolhida}-${p2Escolhida}`;
  const opcao = perguntas[periodoEscolhido].resultados[chave];

  lugarEscolhido = opcao.nome;
  document.getElementById("titulo").style.display = "block";
  document.getElementById("titulo").textContent = "🎉 eba! nossa escolha é...";

  document.getElementById("texto").innerHTML =
    `${opcao.emoji} <span class="nomeLugar">${opcao.nome}</span> — ${opcao.descricao}`;

  const dataFormatada = formatarData(dataEscolhida);
  const periodoTexto = periodoParaTexto(periodoEscolhido);
  document.getElementById("dataTexto").innerHTML =
    `dia <strong>${dataFormatada}</strong>, ${periodoTexto}. topa?`;

  document.getElementById("linkLugar").href = opcao.link;

  const query = encodeURIComponent(opcao.nome + " Campinas");
  document.getElementById("mapaPreview").innerHTML = `<iframe src="https://www.google.com/maps?q=${query}&output=embed" loading="lazy"></iframe>`;

  somResultado.play();

  mostrarTela("resultado");
  atualizarProgresso(90);

  reagirMascote("🤩")

}

function gostei() {
  somGostei.play();
  document.getElementById("titulo").textContent = "eu amei o nosso plano, isa! 💛";
  esconderTela("resultado");
  mostrarTela("confirmacaoFinal");
  atualizarProgresso(100);
}

function recomecar() {
  location.reload();
}


function fugir() {
  const botao = document.getElementById("btnNao");
  const novoX = Math.random() * (window.innerWidth - 100);
  const novoY = Math.random() * (window.innerHeight - 50);
  botao.style.position = "fixed";
  botao.style.left = novoX + "px";
  botao.style.top = novoY + "px";

  document.body.classList.add("tremendo");
  setTimeout(() => document.body.classList.remove("tremendo"), 400);
  reagirMascote("😭");
}

function alternarMudo() {
  mudo = !mudo;
  musicaFundo.muted = mudo;
  document.getElementById("btnMutar").textContent = mudo ? "🔇" : "🔊";
}

window.addEventListener('load', () => {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById("dataEscolhida").min = hoje;
});

function atualizarProgresso(percentual) {
  document.getElementById("barraProgressoPreenchida").style.width = percentual + "%";
}

function mostrarTela(id) {
  const elemento = document.getElementById(id);
  elemento.style.display = "block";
  requestAnimationFrame(() => {
    elemento.classList.add("visivel");
  });
}

function esconderTela(id) {
  const elemento = document.getElementById(id);
  elemento.classList.remove("visivel");
  setTimeout(() => {
    elemento.style.display = "none";
  }, 300);
}

function dispararConfete(x, y) {
  const emojis = ["🎉", "✨", "💜", "🍜", "🎊"];

  for (let i = 0; i < 10; i++) {
    const particula = document.createElement("span");
    particula.className = "particula-confete";
    particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particula.style.left = x + "px";
    particula.style.top = y + "px";

    const deslocX = (Math.random() - 0.5) * 200;
    const deslocY = Math.random() * -150 - 50;
    particula.style.setProperty("--dx", deslocX + "px");
    particula.style.setProperty("--dy", deslocY + "px");

    document.body.appendChild(particula);
    setTimeout(() => particula.remove(), 900);
  }
}

function reagirMascote(emoji) {
  const mascote = document.getElementById("mascote");
  mascote.textContent = emoji;
  mascote.classList.add("reagindo");
  setTimeout(() => mascote.classList.remove("reagindo"), 300);
}

function pararSomsPeriodo() {
  [somManha, somTarde, somNoite].forEach(som => {
    som.pause();
    som.currentTime = 0;
  });
}

function formatarData(dataISO) {
  const data = new Date(dataISO + "T00:00:00");
  const opcoes = { day: 'numeric', month: 'long' };
  return data.toLocaleDateString('pt-BR', opcoes);
}

function periodoParaTexto(periodo) {
  const textos = {
    manha: "de manhã",
    tarde: "à tarde",
    noite: "à noite"
  };
  return textos[periodo];
}

function confirmar() {
  somConfirma.play();

  const dataFormatada = formatarData(dataEscolhida);
  const periodoTexto = periodoParaTexto(periodoEscolhido);
  const mensagem = `oiii gui! nosso plano será ${lugarEscolhido}, dia ${dataFormatada}, ${periodoTexto}! 👀`;
  const link = `https://wa.me/${MEU_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");

  document.getElementById("titulo").textContent = "nos vemos em breve!💜";
  document.getElementById("texto").textContent = "combinado! abrindo o Whatsapp... 🎉";
  document.getElementById("confirmacaoFinal").style.display = "none";
  document.getElementById("figurinhaFinal").style.display = "block";

  reagirMascote("🥰");
}