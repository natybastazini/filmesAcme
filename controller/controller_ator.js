/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de atores.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const message = require('../modulo/config.js')
const atorDAO = require('../model/DAO/ator.js')

const getListarAtores = async function(){

    let atoresJSON = {}

    let dadosAtores = await atorDAO.selectAllAtores()

    if(dadosAtores){
        atoresJSON.filmes = dadosAtores
        atoresJSON.quantidade = dadosAtores.length
        atoresJSON.status_code = 200

        return atoresJSON
    }else{
        return false
    }
}

//ID
const getAtorID = async function(id){
    //Recebe o Id do filme.
    let idAtor = id
    //Variável para criar o JSON de retorno do filme.
    let atoresJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do filme pelo ID.
        let dadosAtor = await atorDAO.selectByIdAtor(id)

        //Validação para verificar se existem dados encontrados
        if(dadosAtor){
            //Validação para verificar se existem dados de retorno
            if(dadosAtor.length > 0){

                atoresJSON.info = dadosAtor
                atoresJSON.status_code = 200

            return atoresJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }


}

//Função para buscar um filme pelo nome.
const  getAtorNome = async function(nome){
    let nomeAtor = nome
    let atoresJSON = {}

    if(nomeAtor == '' || nomeAtor == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosAtor = await atorDAO.selectByNomeAtor(nomeAtor)

        if(dadosAtor){
            if(dadosAtor.length > 0){
                atoresJSON.filme = dadosAtor
                atoresJSON.status_code = 200

                return atoresJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}

//Função para inserir um novo filme no banco de dados.
const setInserirNovoAtor = async function (dadosAtor, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){
                let dadosAtualizados = {}
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosAtor.nome             == '' || dadosAtor.nome              == undefined || dadosAtor.nome.length               > 80        ||
                dadosAtor.data_nascimento  == '' || dadosAtor.data_nascimento   == undefined || dadosAtor.data_nascimento.length    > 10        ||
                dadosAtor.data_falecimento == '' || dadosAtor.data_falecimento  == undefined || dadosAtor.data_falecimento.length   > 10        ||
                dadosAtor.foto             == '' || dadosAtor.foto              == undefined || dadosAtor.foto .length              > 200       ||
                dadosAtor.biografia        == '' || dadosAtor.biografia         == undefined || dadosAtor.biografia .length         > 65000     ||
                dadosAtor.sexo_id          == '' || dadosAtor.sexo_id           == undefined || dadosAtor.sexo_id.length            > 80        
            ){
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{
                let dadosValidated = false

                //Validação de digitação para a data de relancçamento que não é campo obrigatório
                if(     dadosFilme.data_relancamento != null && 
                        dadosFilme.data_relancamento != undefined && 
                        dadosFilme.data_relancamento != ""
                    ){
                        if(dadosFilme.data_relancamento.length != 10)
                            return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                        else
                            dadosValidated = true // Se a dataestiver exatamente 10 char
                }else{
                    //Variável para validar se poderemos chamar o DAO 
                    dadosValidated = true // Se a data não existir nos dados
                }

            
                if(dadosValidated){
                    
                        //Encaminha os dados para o DAO inserir no BD
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoFilme){
                       
                    let idFilme = await filmesDAO.selectUltimoId()                     

                        dadosFilme.id = Number(idFilme[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.filme          = dadosFilme
            
                       
                        return dadosAtualizados // 201

                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415 Erro no content-type da requisição
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de negócio da aplicação
    }

}

module.exports = {
    getAtorID,
    getAtorNome,
    getListarAtores
}
