let escolhaFeita = "";

function escolherQuente() {
    escolhaFeita= "quentinho"
    mudarCena ("hmm, nesse friozinho algo quente é sempre uma boa ideia!");
}

function escolherPasseio() {
    escolhaFeita= "passeio"
    mudarCena ("olhaa, você está querendo uma aventura?","nada mal!");
}

function escolherSurpresa() {
    escolhaFeita= "surpresa"
    mudarCena ("corajosa!", "vai confiar em mim de novo? me sinto lisongeado");
}

function mudarCena(novoTitulo, novoTexto) {
    document.getElementById("titulo").textContent = novoTitulo;
    document.getElementById("texto").textContent = novoTexto;
    document.getElementById("escolhas").style.display = "none";
    document.getElementById("btnContinuar").style.display = "inline-block";
}

function revelarConvite() {
    document.getElementById("titulo").textContent = "encontrei o lugar certo!";
    document.getElementById ("texto").textContent = `pelo jeito estava a fim de ${escolhaFeita}... que tal um lámen, então?`;
    document.getElementById("btnContinuar").style.display = "none";
    document.getElementById("confirmacao").style.display = "block";
}

function fugir() {
    const botao = document.getElementById("btnNao");
    const novoX = Math.random() * (window.innerWidth - 100);
    const novoY = Math.random() * (window.innerHeight - 50);

    botao.style.position = "fixed";
    botao.style.left = novoX + "px";
    botao.style.top = novoY +"px";
}

function confirmar() {
    document.getElementById("texto").textContent = "combinado!!!";
    document.getElementById("confirmacao").style.display= "none";
}