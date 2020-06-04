var express = require('express');
var rota = express.Router();
var fs = require('fs').promises;
module.exports = rota;

rota.get("/:uf", async (req, res) => {
  try {
    let numCidades = await buscarNumeroDeCidades(req.params.uf);

    res.send(`Número de cidades de ${req.params.uf}: ${numCidades}`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
})

rota.get("/maisCidades", async (req, res) => {
  try {
    let numCidades = await buscarNumeroDeCidades(req.params.uf);

    res.send(`Número de cidades de ${req.params.uf}: ${numCidades}`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
})

async function buscarNumeroDeCidades(uf) {
  let estados = await lerArquivo(`./estados/${uf}.json`);
  return await estados.cidades.length;
}

async function lerArquivo(caminhoArquivo) {
  try {
    let dados = await fs.readFile(caminhoArquivo, 'utf8');
    return JSON.parse(dados);
  } catch (err) {
    console.log(err);
  }
}


