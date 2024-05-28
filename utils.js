function textoFrequencia(values) {
    const freq = values.length / resultados.length;
    return `${values.length} (${(freq * 100).toFixed(2)}%)`
}

function normalizarDezena(num) {
    // tem que converter pra string pois os dados contém numeros em strings
    num = num.toString()
    if (num.length === 1)
        num = `0${num}`
    return num;
}

function construirTextoFrequencia(freqModel) {
    debug(construirTextoFrequencia.name, freqModel)
    if (!freqModel)
        return ''
    return `O número ${freqModel.dezena} apareceu ${textoFrequencia(freqModel.vezesSorteadas)} vezes. Dessas, ${textoFrequencia(freqModel.vezesSorteadasJogosVencedores)} foram concursos vencedores`;
}

function negrito(texto) {
    return `<b>${texto}</b>`
}

function pularLinha() { return "<br/>" }

function formatarDezenas (dezenas){
    return dezenas.sort().join(' ')
}