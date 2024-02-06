/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de filmes.
 * Data: 30/01/2024.
 * Autor: Natalia Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import do arquivo DAO para manipular dados do BD.
const filmesDAO = require('../model/DAO/filme.js')


//Função para inserir um novo filme no banco de dados.
const setInserirNovoFilme = async function (){

}

//Função para atualizar um filme existente.
const setAtualizarFilme = async function(){

}

//Função para excluir um filme existente.
const setExcluirFilme = async function(id){

}

//Função para retornar todos os fillmes do banco de dados.
const getListarFilmes = async function(){

    //Cria uma variável do tipo JSON.
    let filmesJSON = {}

    //Chama a função do DAO para buscar os dados no BD.
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Verifica se existem dados retornados do DAO.
    if(dadosFilmes){
        //Montando o JSON para retornar para o APP.
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        //Retorna o JSON montado.
        return filmesJSON
    }else{
        //Return false quando não houverem dados.
        return false
    }
}

//Função para buscar um filme pelo ID.
const getBuscarFilme = async function(id){

}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}