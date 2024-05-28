resultados = []
dezenasSelecionadas = []
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

function obterDezenas(modo) {
    let dezenas = []
    //xgh :)
    if (modo === "normal") {
        dezenas = dezenas.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        dezenas = dezenas.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
        dezenas = dezenas.concat([21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
        dezenas = dezenas.concat([31, 32, 33, 34, 35, 36, 37, 38, 39, 40])
        dezenas = dezenas.concat([41, 42, 43, 44, 45, 46, 47, 48, 49, 50])
        dezenas = dezenas.concat([51, 52, 53, 54, 55, 56, 57, 58, 59, 60])
    }
    else if (modo === "quatro-partes-alternadas") {
        dezenas = dezenas.concat([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29])
        dezenas = dezenas.concat([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30])
        dezenas = dezenas.concat([31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59])
        dezenas = dezenas.concat([32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60])
    }
    else {
        dezenas = dezenas.concat([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
        dezenas = dezenas.concat([2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
        dezenas = dezenas.concat([21, 23, 25, 27, 29, 31, 33, 35, 37, 39])
        dezenas = dezenas.concat([22, 24, 26, 28, 30, 32, 34, 36, 38, 40])
        dezenas = dezenas.concat([41, 43, 45, 47, 49, 51, 53, 55, 57, 59])
        dezenas = dezenas.concat([42, 44, 46, 48, 50, 52, 54, 56, 58, 60])

    }
    dezenas = dezenas.map(d => normalizarDezena(d));
    return dezenas;
}

function selecionarDezena(num) {
    dezenasSelecionadas.push(num)
}



function calcularFrequencia(num) {
    debug(calcularFrequencia.name, num)
    if (!num)
        return;
    num = normalizarDezena(num)
    const vezesSorteadas = resultados.filter(r => r.dezenas.includes(num));
    const vezesSorteadasJogosVencedores = vezesSorteadas.filter(r => r.valorAcumuladoProximoConcurso === 0);
    const res = {
        dezena: num,
        vezesSorteadas,
        vezesSorteadasJogosVencedores
    }
    debug(calcularFrequencia.name, res.dezena, res.vezesSorteadas.length, res.vezesSorteadasJogosVencedores.length)
    return res;
}


main();