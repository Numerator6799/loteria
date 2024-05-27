
function init() {
    const elTotalResultados = document.getElementById("totalResultados");
    if (resultados.length === 0) {
        elTotalResultados.innerHTML = 'Carregando...'
        setTimeout(init, 1000);
        return;
    }
    elTotalResultados.innerHTML = `${resultados.length} concursos`;

    const topSeis = obterTop(6);
    const elTopSeis = document.getElementById("topSeis")
    elTopSeis.innerHTML = `Dezenas mais frequentes: ${topSeis.map(n => n.dezena).sort().join()}`;

    
    const topSeisVencedores = obterTop(6, somenteJogosVencedores = true);
    const elTopSeisVencedores = document.getElementById("topSeisVencedores")
    elTopSeisVencedores.innerHTML = `Dezenas mais frequentes de jogos vencedores: ${topSeisVencedores.map(n => n.dezena).sort().join()}`;
}

init();

function calcFreq() {
    let num = document.getElementById("inputFreq").value.toString()
    res = calcularFrequencia(num);
    document.getElementById("resFreq").innerHTML = `O número ${num} apareceu ${printFreq(res.vezesSorteadas)} vezes. Dessas, ${printFreq(res.vezesSorteadasJogosVencedores)} foram concursos vencedores`;
}