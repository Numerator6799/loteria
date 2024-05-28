
function init() {
    const elTotalResultados = document.getElementById("quantidadeConcursos");
    if (resultados.length === 0) {
        elTotalResultados.innerHTML = 'Carregando...'
        setTimeout(init, 1000);
        return;
    }
    elTotalResultados.innerHTML = `Foram realizados ${negrito(resultados.length)} concursos até agora`;

    const topSeis = obterTop(6);
    const elTopSeis = document.getElementById("topSeis")
    elTopSeis.innerHTML = `Dezenas mais frequentes:${pularLinha()}${negrito(formatarDezenas(topSeis.map(n => n.dezena)))}`;


    const topSeisVencedores = obterTop(6, somenteJogosVencedores = true);
    const elTopSeisVencedores = document.getElementById("topSeisVencedores")
    elTopSeisVencedores.innerHTML = `Dezenas mais frequentes de jogos vencedores:${pularLinha()}${negrito(formatarDezenas(topSeisVencedores.map(n => n.dezena)))}`;

    construirTabela()
}

init();

function construirTabela(modo = "normal") {
    let dezenas = []
    dezenas = obterDezenas(modo);
    linhas = 6
    if (modo === "quatro-partes-alternadas")
        linhas = 4

    const colunas = 60 / linhas

    const elTabela = document.getElementById("tabelaDezenas");
    elTabela.replaceChildren()
    let index = 0;
    for (let linha = 1; linha <= linhas; linha++) {

        const novaLinha = elTabela.insertRow(linha - 1);
        for (let coluna = 1; coluna <= colunas; coluna++) {
            const novaCelula = novaLinha.insertCell(coluna - 1);
            const dezena = dezenas[index++];
            novaCelula.textContent = dezena
            novaCelula.classList.add("celula-dezena")
            if (dezenasSelecionadas.includes(normalizarDezena(dezena)))
                novaCelula.classList.add("selecionada")

            novaCelula.onclick = selecionarDezenaDoGrid
        }
    }

    atualizarInfoDezenasSelecionadas()

}
function selecionarDezenaDoGrid(sender) {
    debug(selecionarDezena.name, sender.target)
    const dezena = sender.target.innerHTML;
    if (dezenasSelecionadas.includes(dezena)) {
        const index = dezenasSelecionadas.indexOf(dezena);
        dezenasSelecionadas.splice(index, 1);
        sender.target.classList.remove('selecionada')
    }
    else {
        dezenasSelecionadas.push(dezena);
        sender.target.classList.add('selecionada')
    }

    atualizarInfoDezenasSelecionadas()
}

function atualizarInfoDezenasSelecionadas() {
    debug(atualizarInfoDezenasSelecionadas.name)
    document.getElementById("contadorDezenasSelecionadas").innerHTML = dezenasSelecionadas.length;
    const elEstatisticas = document.getElementById("estatisticasDezenasSelecionadas");
    elEstatisticas.replaceChildren()
    dezenasSelecionadas.sort().forEach(dezena => {
        debug(atualizarInfoDezenasSelecionadas.name, dezena)
        const el = document.createElement("p");
        el.innerHTML = construirTextoFrequencia(calcularFrequencia(dezena))
        elEstatisticas.appendChild(el)
    });
}

function limparTabela() {
    dezenasSelecionadas = []
    construirTabelaComModo()
}

function construirTabelaComModo() {
    debug(construirTabelaComModo.name)
    const el = document.getElementById("seletorModoTabela")
    construirTabela(el.value)
}

function calcFreq() {
    let num = document.getElementById("inputFreq").value.toString()
    res = calcularFrequencia(num);
    document.getElementById("resFreq").innerHTML = construirTextoFrequencia(res);
}