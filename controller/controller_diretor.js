/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de diretores.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const message = require('../modulo/config.js')
const diretorDAO = require('../model/DAO/diretor.js')

const getListarDiretores = async function(){

    let diretoresJSON = {}

    let dadosDiretores = await diretorDAO.selectAllDiretor()

    if(dadosDiretores){
        diretoresJSON.filmes = dadosDiretores
        diretoresJSON.quantidade = dadosDiretores.length
        diretoresJSON.status_code = 200

        return diretoresJSON
    }else{
        return false
    }
}

//ID
const getDiretorID = async function(id){
    let idDiretor = id
    let diretoresJSON = {}

    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosDiretor = await diretorDAO.selectByIdDiretor(id)

        if(dadosDiretor){
            if(dadosDiretor.length > 0){

                diretoresJSON.info = dadosDiretor
                diretoresJSON.status_code = 200

            return diretoresJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }


}

//Função para buscar um filme pelo nome.
const  getDiretorNome = async function(nome){
    let nomeDiretor = nome
    let diretoresJSON = {}

    if(nomeDiretor == '' || nomeDiretor == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosDiretor = await diretorDAO.selectByNomeDiretor(nomeDiretor)

        if(dadosDiretor){
            if( dadosDiretor.length > 0){
                diretoresJSON.filme = dadosDiretor
                diretoresJSON.status_code = 200

                return diretoresJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}

module.exports = {
    getDiretorID,
    getDiretorNome,
    getListarDiretores
}