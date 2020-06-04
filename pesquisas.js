var express = require('express');
var rota = express.Router();
var fs = require('fs').promises;
module.exports = rota;

// exercicio 02
rota.get("/:uf", async (req, res) => {
  try {
    let numCidades = await buscarNumeroDeCidades(req.params.uf);

    res.send(`Número de cidades de ${req.params.uf}: ${numCidades}`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
})

// exercicio 03
rota.get("/mais/Cidades", async (req, res) => {
  try {
    await global.todosOsEstados.sort((a, b) => b.cidades.length - a.cidades.length);

    let estadosComMaisCidades = await [
      { uf: global.todosOsEstados[0].Sigla, numeroCidades: global.todosOsEstados[0].cidades.length },
      { uf: global.todosOsEstados[1].Sigla, numeroCidades: global.todosOsEstados[1].cidades.length },
      { uf: global.todosOsEstados[2].Sigla, numeroCidades: global.todosOsEstados[2].cidades.length },
      { uf: global.todosOsEstados[3].Sigla, numeroCidades: global.todosOsEstados[3].cidades.length },
      { uf: global.todosOsEstados[4].Sigla, numeroCidades: global.todosOsEstados[4].cidades.length },
    ]

    res.send(estadosComMaisCidades);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
})

// exercicio 04
rota.get("/menos/Cidades", async (req, res) => {
  try {
    await global.todosOsEstados.sort((a, b) => a.cidades.length - b.cidades.length);

    let estadosComMaisCidades = await [
      { uf: global.todosOsEstados[0].Sigla, numeroCidades: global.todosOsEstados[0].cidades.length },
      { uf: global.todosOsEstados[1].Sigla, numeroCidades: global.todosOsEstados[1].cidades.length },
      { uf: global.todosOsEstados[2].Sigla, numeroCidades: global.todosOsEstados[2].cidades.length },
      { uf: global.todosOsEstados[3].Sigla, numeroCidades: global.todosOsEstados[3].cidades.length },
      { uf: global.todosOsEstados[4].Sigla, numeroCidades: global.todosOsEstados[4].cidades.length },
    ]

    res.send(estadosComMaisCidades);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
})

// exercicio 05
rota.get("/maioresNomes/Cidades", async (req, res) => {
  try {
    let cidadesComMaioresNomes = await buscarCidadesComMaioresNomes();

    await cidadesComMaioresNomes.sort((a, b) => {
      return a.uf > b.uf;
    });

    res.send(cidadesComMaioresNomes);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// exercicio 06
rota.get("/menoresNomes/Cidades", async (req, res) => {
  try {
    let cidadesComMenoresNomes = await buscarCidadesComMenoresNomes();
    res.send(cidadesComMenoresNomes);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// exercicio 07
rota.get("/maiorNomeBrasil/Cidades", async (req, res) => {
  try {
    let cidadesComMaioresNomes = await buscarCidadesComMaioresNomes();

    await cidadesComMaioresNomes.sort((a, b) => {
      let comparacao = 0;

      if (b.cidade.length > a.cidade.length) {
        comparacao = 1;
      } else if (b.cidade.length < a.cidade.length) {
        comparacao = -1;
      } else {
        if (b.cidade > a.cidade) {
          comparacao = 1;
        } else if (b.cidade < a.cidade) {
          comparacao = -1;
        }
      }
      return comparacao;
    });

    res.send(cidadesComMaioresNomes[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// exercicio 08
rota.get("/menorNomeBrasil/Cidades", async (req, res) => {
  try {
    let cidadesComMenoresNomes = await buscarCidadesComMenoresNomes();

    await cidadesComMenoresNomes.sort((a, b) => {
      let comparacao = 0;

      if (a.cidade.length > b.cidade.length) {
        comparacao = 1;
      } else if (a.cidade.length < b.cidade.length) {
        comparacao = -1;
      } else {
        if (a.cidade > b.cidade) {
          comparacao = 1;
        } else if (a.cidade < b.cidade) {
          comparacao = -1;
        }
      }
      return comparacao;
    });

    res.send(cidadesComMenoresNomes[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

async function buscarCidadesComMaioresNomes() {
  let cidadesComMaioresNomes = [];
  for (let i = 0; i < global.todosOsEstados.length; i++) {
    let cityes = await ordenarCidadesMaioresNomes(global.todosOsEstados[i]);
    cidadesComMaioresNomes.push({ uf: global.todosOsEstados[i].Sigla, cidade: cityes[0].Nome });
  }
  return cidadesComMaioresNomes;
}

async function buscarCidadesComMenoresNomes() {
  let cidadesComMenoresNomes = [];
  for (let i = 0; i < global.todosOsEstados.length; i++) {
    let cityes = await ordenarCidadesMenoresNomes(global.todosOsEstados[i]);
    cidadesComMenoresNomes.push({ uf: global.todosOsEstados[i].Sigla, cidade: cityes[0].Nome });
  }
  return cidadesComMenoresNomes;
}

async function ordenarCidadesMaioresNomes(estado) {
  let cidades = estado.cidades;
  cidades = await cidades.sort((a, b) => {
    let comparacao = 0;

    if (b.Nome.length > a.Nome.length) {
      comparacao = 1;
    } else if (b.Nome.length < a.Nome.length) {
      comparacao = -1;
    } else {
      if (b.Nome > a.Nome) {
        comparacao = 1;
      } else if (b.Nome < a.Nome) {
        comparacao = -1;
      }
    }
    return comparacao;
  });
  return cidades;
}

async function ordenarCidadesMenoresNomes(estado) {
  let cidades = estado.cidades;
  cidades = await cidades.sort((a, b) => {
    let comparacao = 0;

    if (a.Nome.length > b.Nome.length) {
      comparacao = 1;
    } else if (a.Nome.length < b.Nome.length) {
      comparacao = -1;
    } else {
      if (a.Nome > b.Nome) {
        comparacao = 1;
      } else if (a.Nome < b.Nome) {
        comparacao = -1;
      }
    }
    return comparacao;
  });
  return cidades;
}

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


