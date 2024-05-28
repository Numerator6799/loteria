
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


    construirGrid('normal')
}

init();

function construirGrid(modo = "normal") {

    let dezenas = []
    if (modo === "normal") {
        dezenas = obterDezenas(modo);
        linhas = 6
    }

    const colunas = 60 / linhas

    const elTabela = document.getElementById("tabelaNumeros");
    elTabela.replaceChildren()
    let index = 0;
    for (let linha = 1; linha <= linhas; linha++) {

        const novaLinha = elTabela.insertRow(linha - 1);
        for (let coluna = 1; coluna <= colunas; coluna++) {
            const novaCelula = novaLinha.insertCell(coluna - 1);
            novaCelula.textContent = dezenas[index++]
            novaCelula.classList.add("celula-dezena")
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

function limparDezenasSelecionadas() {
    dezenasSelecionadas = []
    construirGrid()
}

function calcFreq() {
    let num = document.getElementById("inputFreq").value.toString()
    res = calcularFrequencia(num);
    document.getElementById("resFreq").innerHTML = construirTextoFrequencia(res);
}


