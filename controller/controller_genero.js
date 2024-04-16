/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de gêneros.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')

//Import do arquivo DAO para manipular dados do BD.
const generoDAO = require('../model/DAO/genero.js')

//Função para retornar todos os gêneros do banco de dados.
const getListarGeneros = async function(){

    let generosJSON = {}

    let dadosGenero = await generoDAO.selectAllGeneros()

    if(dadosGenero){
        generosJSON.filmes = dadosGenero
        generosJSON.quantidade = dadosGenero.length
        generosJSON.status_code = 200

        return generosJSON
    }else{
        return false
    }
}

//Função para buscar um gênero pelo ID.
const getBuscarGenero = async function(id){
    let idGenero = id
    let generoJSON = {}

    if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosGenero = await generoDAO.selectByIdGenero(id)

        if(dadosGenero){
            if(dadosGenero.length > 0){

                generoJSON.filme = dadosGenero
                generoJSON.status_code = 200

                return generoJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }


}

//Função para buscar um gênero pelo nome.
const  getBuscarGeneroNome = async function(nome){
    let nomeGenero = nome
    let generosJSON = {}

    if(nomeGenero == '' || nomeGenero == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosGenero = await generoDAO.selectByNomeGenero(nomeGenero)

        if(dadosGenero){
            if(dadosGenero.length > 0){
                generosJSON.filme = dadosGenero
                generosJSON.status_code = 200

                return generosJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}


module.exports = {
    getListarGeneros,
    getBuscarGenero,
    getBuscarGeneroNome
}