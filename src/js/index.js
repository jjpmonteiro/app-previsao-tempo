const chaveDaApi = "3e6f3b2990bf44c99e903309243003";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if(dados) preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    const cidadeNaoEncontrada = "Cidade Não Encontrada"

    if(resposta.status !== 200) return document.getElementById("cidade").textContent = cidadeNaoEncontrada;

    const dados = resposta.json();

    return dados;
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;

    const condicao = dados.current.condition.text;

    const umidade = dados.current.humidity;
    
    const velocidadeVento = dados.current.wind_kph;

    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura} ºC`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`;

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeVento}km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao)
}