var express = require('express');
var fs = require('fs').promises;
var app = express();
var pesquisasRouter = require('./pesquisas.js');

app.use(express.json());
app.use('/estados', pesquisasRouter);

app.listen(3000, async () => {
  await criarEstados();
  console.log('API Iniciada');
});

async function criarEstados() {
  try {
    console.log('Entrou  em criar estados');
    let estados = await lerArquivo('./banco/Estados.json');
    let cidades = await lerArquivo('./banco/Cidades.json');

    estados.forEach((uf) => {
      let cidadesFiltradas = cidades.filter((cidade) => cidade.Estado === uf.ID);

      let estadoCompleto = {
        id: uf.id,
        Sigla: uf.Sigla,
        Nome: uf.Nome,
        cidades: cidadesFiltradas,
      };

      console.log('Criando estado: ' + uf.Sigla);

      escreverArquivo(`./estados/${uf.Sigla}.json`, estadoCompleto);
    });
  } catch (error) {
    console.log(error);
  }
}

async function escreverArquivo(nomeArquivo, estado) {
  try {
    await fs.writeFile(nomeArquivo, JSON.stringify(estado));
  } catch (err) {
    console.log(err);
  }
}

async function lerArquivo(caminhoArquivo) {
  try {
    let dados = await fs.readFile(caminhoArquivo, 'utf8');
    return JSON.parse(dados);
  } catch (err) {
    console.log(err);
  }
}
