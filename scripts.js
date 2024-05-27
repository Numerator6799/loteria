async function main() {
    var resp = await fetch('data.json')
    resultados = await resp.json();
    document.getElementById("intro").innerHTML = `${resultados.length} concursos`;
    console.log(resultados)
}

function printFreq(values) {
    const freq = values.length / resultados.length;
    return `${values.length} (${(freq * 100).toFixed(2)}%)`
}

function calcFreq() {
    let num = document.getElementById("inputFreq").value.toString()
    if (!num)
        return;
    if(num.length === 1)
        num = `0${num}`
    console.log(num)
    const vezesSorteadas = resultados.filter(r => r.dezenas.includes(num));
    const vezesSorteadasJogosVencedores = vezesSorteadas.filter(r => r.valorAcumuladoProximoConcurso === 0);
    document.getElementById("resFreq").innerHTML = `O número ${num} apareceu ${printFreq(vezesSorteadas)} vezes. Dessas, ${printFreq(vezesSorteadasJogosVencedores)} foram concursos vencedores`;
}

main()