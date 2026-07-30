let dataEscolhida = "";
let periodoEscolhido = "";
let p1Escolhida = "";
let p2Escolhida = "";
let lugarEscolhido = "";
let mudo = false;

const MEU_WHATSAPP = "5519999999999";
const musicaFundo = document.getElementById("musicaFundo");
const somYay = new Audio("sons/yay.mp3");
const somClique = new Audio("sons/clique.mp3");
const somConfirma = new Audio("sons/confirma.mp3");

musicaFundo.volume = 0.1;

const perguntas = {
  noite: {
  pergunta1: {
    texto: "jantar ou fazer algum lazer?",
    opcoes: [
      { valor: "jantar", label: "🍽️ jantar" },
      { valor: "lazer", label: "🎬 lazer" }
    ]
  },
  pergunta2PorP1: {
    jantar: { texto: "topa algo novo, ou quer algo confortante?", opcoes: [
      { valor: "novo", label: "✨ algo novo" }, { valor: "confortante", label: "🛋️ confortante" }
    ]},
    lazer: { texto: "assistir um filminho ou sair pra comer algo gostoso?", opcoes: [
      { valor: "cinema", label: "🎬 filminho" }, { valor: "comer", label: "🍧 comer algo gostoso" }
    ]}
  },
  resultados: {
    "jantar-confortante": { nome: "Saiko Lámen", emoji: "🍜", descricao: "sei que você curte um udon, e lá é exatamente a vibe 😌" },
    "jantar-novo": { nome: "Salsa Nossa Casa", emoji: "🇵🇪", descricao: "bora experimentar comida peruana, nunca fomos" },
    "lazer-cinema": { nome: "Cinema", emoji: "🎬", descricao: "um filminho e pipoca, clássico que funciona" },
    "lazer-comer": { nome: "Georgina", emoji: "🍧", descricao: "geladinho pra fugir do calor" }
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
      cafe: { texto: "pra acompanhar: um docinho ou um brunch?", opcoes: [
        { valor: "docinho", label: "🍪 docinho" }, { valor: "brunch", label: "🥐 brunch" }
      ]},
      passear: { texto: "prefere dar uma volta num parque ou conhecer um ponto turístico?", opcoes: [
        { valor: "parque", label: "🌳 parque" }, { valor: "turistico", label: "🏛️ ponto turístico" }
      ]}
    },
    resultados: {
      "cafe-docinho": { nome: "Casa Cookie", emoji: "🍪", descricao: "docinho bom pra começar bem o dia" },
      "cafe-brunch": { nome: "Vila Grão", emoji: "🥐", descricao: "brunch tranquilo, sem pressa" },
      "passear-parque": { nome: "Parque do Taquaral", emoji: "🌳", descricao: "uma volta ao ar livre, sem compromisso" },
      "passear-turistico": { nome: "Bosque dos Jequitibás", emoji: "🏛️", descricao: "um passeio diferente do de sempre" }
    }
  },

  tarde: {
    pergunta1: {
      texto: "algo ao ar livre ou coberto?",
      opcoes: [
        { valor: "arlivre", label: "🌤️ ao ar livre" },
        { valor: "coberto", label: "🏠 coberto" }
      ]
    },
    pergunta2PorP1: {
      arlivre: { texto: "gostaria de conversar ou praticar algum esporte?", opcoes: [
        { valor: "conversar", label: "💬 conversar" }, { valor: "esporte", label: "🎾 esporte" }
      ]},
      coberto: { texto: "atividade manual ou comer alguma coisinha gostosa?", opcoes: [
        { valor: "manual", label: "🎨 atividade manual" }, { valor: "comer", label: "🍰 comer algo gostoso" }
      ]}
    },
    resultados: {
      "arlivre-conversar": { nome: "Piquenique", emoji: "🧺", descricao: "um piquenique tranquilo, só pra conversar" },
      "arlivre-esporte": { nome: "Tênis no Taquaral", emoji: "🎾", descricao: "bora trocar uma bolinha lá no Taquaral" },
      "coberto-manual": { nome: "Casa Criativa", emoji: "🎨", descricao: "atividade manual, mãos na massa" },
      "coberto-comer": { nome: "Mercado de Campinas", emoji: "🏛️", descricao: "um passeio diferente, cheio de coisa boa pra ver e comer" }
    }
  }
};

function mostrarDisponibilidade() {
  document.getElementById("btnContinuar").style.display = "none";
  document.getElementById("introTexto").style.display = "none"; // ← nova linha
  document.getElementById("disponibilidade").style.display = "block";

  somYay.play();
  musicaFundo.play();
}

function selecionarPeriodo(periodo) {
  periodoEscolhido = periodo;
  document.querySelectorAll(".periodo-btn").forEach(b => b.classList.remove("selecionado"));
  document.querySelector(`[data-periodo="${periodo}"]`).classList.add("selecionado");
}

function confirmarHorario() {
  dataEscolhida = document.getElementById("dataEscolhida").value;

  if (!dataEscolhida || !periodoEscolhido) {
    alert("escolhe uma data e um período antes de continuar!");
    return;
  }

  document.getElementById("disponibilidade").style.display = "none";
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
    botao.onclick = () => selecionarP1(opcao.valor);
    container.appendChild(botao);
  }

  document.getElementById("pergunta1").style.display = "block";
}

function montarPergunta2() {
  const dadosP2 = perguntas[periodoEscolhido].pergunta2PorP1[p1Escolhida];
  document.getElementById("p2Texto").textContent = dadosP2.texto;

  const container = document.getElementById("p2Opcoes");
  container.innerHTML = "";

  for (const opcao of dadosP2.opcoes) {
    const botao = document.createElement("button");
    botao.textContent = opcao.label;
    botao.onclick = () => selecionarP2(opcao.valor);
    container.appendChild(botao);
  }

  document.getElementById("pergunta2").style.display = "block";
}

function selecionarP1(valor) {
  somClique.play();
  p1Escolhida = valor;
  document.getElementById("pergunta1").style.display = "none";
  montarPergunta2();
}

function selecionarP2(valor) {
  somClique.play();
  p2Escolhida = valor;
  document.getElementById("pergunta2").style.display = "none";
  revelarLugar();
}

function revelarLugar() {
  const chave = `${p1Escolhida}-${p2Escolhida}`;
  const opcao = perguntas[periodoEscolhido].resultados[chave];

  lugarEscolhido = opcao.nome;
  document.getElementById("titulo").textContent = "bora então! 🎉";
  document.getElementById("texto").textContent = `${opcao.emoji} ${opcao.nome} — ${opcao.descricao}. dia ${dataEscolhida}, topa?`;
  document.getElementById("confirmacao").style.display = "block";
}

function confirmar() {
  somConfirma.play();
  const mensagem = `Fechado! Bora no(a) ${lugarEscolhido}, dia ${dataEscolhida}! 🎉`;
  const link = `https://wa.me/${MEU_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
  document.getElementById("texto").textContent = "combinado! abrindo o whatsapp... 🎉";
  document.getElementById("confirmacao").style.display = "none";
}

function fugir() {
  const botao = document.getElementById("btnNao");
  const novoX = Math.random() * (window.innerWidth - 100);
  const novoY = Math.random() * (window.innerHeight - 50);
  botao.style.position = "fixed";
  botao.style.left = novoX + "px";
  botao.style.top = novoY + "px";
}

function alternarMudo() {
  mudo = !mudo; // inverte o valor: true vira false, false vira true
  musicaFundo.muted = mudo;
  document.getElementById("btnMutar").textContent = mudo ? "🔇" : "🔊";
}