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
somYay.volume = 0.1;

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
    "jantar-confortante": { nome: "Saiko Lámen", emoji: "🍜", descricao: "sei que você curte um udon, e lá é exatamente a vibe 😌", link: "https://share.google/Vet4N4h5Y8C3TYaUx" },
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
      cafe: { texto: "você ficaria mais animada com um docinho ou com um brunch?", opcoes: [
        { valor: "docinho", label: "🍪 docinho" }, { valor: "brunch", label: "🥐 brunch" }
      ]},
      passear: { texto: "prefere dar uma volta num parque ou conhecer um ponto turístico?", opcoes: [
        { valor: "parque", label: "🌳 parque" }, { valor: "turistico", label: "🏛️ ponto turístico" }
      ]}
    },
    resultados: {
      "cafe-docinho": { nome: "casa cookie", emoji: "🍪", descricao: "excelente para comermos o bolo de maracujá ou um cookie quentinho" },
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
  document.getElementById("introTexto").style.display = "none";
  document.getElementById("titulo").style.display = "none"; // ← nova linha

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

  pararSomsPeriodo(); // ← nova linha, para qualquer som de período tocando antes de começar outro

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
  document.getElementById("titulo").textContent = "🎉 eba! nosso escolha é...";

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
  document.getElementById("titulo").textContent = "Eu amei o nosso plano, isa! 💚";
  esconderTela("resultado");
  mostrarTela("confirmacaoFinal");
  atualizarProgresso(100);
}

function recomecar() {
  location.reload();
}


function confirmar() {
  somConfirma.play();

  const mensagem = `Fechado! Bora no(a) ${lugarEscolhido}, dia ${dataEscolhida}! 🎉`;
  const link = `https://wa.me/${MEU_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");

  document.getElementById("titulo").textContent = "Nos vemos em breve!";
  document.getElementById("texto").textContent = "Combinado! Abrindo o Whatsapp... 🎉";
  document.getElementById("confirmacaoFinal").style.display = "none";
  document.getElementById("figurinhaFinal").style.display = "block";

  reagirMascote("🥰");
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
  mudo = !mudo; // inverte o valor: true vira false, false vira true
  musicaFundo.muted = mudo;
  document.getElementById("btnMutar").textContent = mudo ? "🔇" : "🔊";
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
  const emojis = ["🎉", "✨", "💚", "🍜", "🎊"];

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