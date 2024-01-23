/**********************************************************************
 * Objetivo: .
 * Data: 23/01/2024.
 * Autor: Natalia Bastazini.
 * Versao: 1.0
 **********************************************************************/

var acmesFilmes = require('../modulo/filmes.js')

const listarDados = () => {
    let filmes = acmesFilmes.filmes
    let arrayDados = []
    let jsonDados = {}
    
    filmes.filmes.forEach( (dados) => {
        arrayDados.push(dados.id)
        arrayDados.push(dados.nome)
        arrayDados.push(dados.sinopse)
        arrayDados.push(dados.duracao)
        arrayDados.push(dados.data_lancamento)
        arrayDados.push(dados.data_relancamento)
        arrayDados.push(dados.foto_capa)
        arrayDados.push(dados.valor_unitario)
    });

    jsonDados.filmes = arrayDados

    return jsonDados
}

const listarDadosId = (id) => {
    let filmes = acmesFilmes.filmes
    let jsonDados = null
    let status = false

    filmes.filmes.forEach( (dados) => {

        if (id == dados.id) {

           jsonDados = dados

            status = true
        }
    })

    if(status){
        return jsonDados
    } else {
        return false
    }
}

// console.log(listarDados())
// console.log(listarDadosId(2))

module.exports={
    listarDados,
    listarDadosId
}