resultados = []
freqs = []

async function main() {
    setLogLevel(DEBUG ? 3 : 1)

    var resp = await fetch('data.json')
    resultados = await resp.json();

    freqs = []
    for (let i = 1; i <= 60; i++) {
        const res = calcularFrequencia(i);
        freqs.push(res)
    }
}

function obterTop(n = 6, somenteJogosVencedores = false) {
    debug(obterTop.name, 6, somenteJogosVencedores)
    return freqs
        .sort((a, b) =>
            (somenteJogosVencedores ? b.vezesSorteadasJogosVencedores.length : b.vezesSorteadas.length)
            - (somenteJogosVencedores ? a.vezesSorteadasJogosVencedores.length : a.vezesSorteadas.length))
        .slice(0, n)
}

function calcularFrequencia(num) {
    debug(calcularFrequencia.name, num)
    if (!num)
        return;
    // tem que converter pra string pois os dados contém numeros em strings
    num = num.toString()
    if (num.length === 1)
        num = `0${num}`
    const vezesSorteadas = resultados.filter(r => r.dezenas.includes(num));
    const vezesSorteadasJogosVencedores = vezesSorteadas.filter(r => r.valorAcumuladoProximoConcurso === 0);
    return {
        dezena: num,
        vezesSorteadas,
        vezesSorteadasJogosVencedores
    }
}


main();