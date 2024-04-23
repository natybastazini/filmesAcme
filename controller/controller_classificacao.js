/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de classificação.
 * Data: 30/01/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')

//Import do arquivo DAO para manipular dados do BD.
const classificacaoDAO = require('../model/DAO/classificacao.js')


//Função para inserir um novo classificacao no banco de dados.

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){

                let dadosAtualizados = {}
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosClassificacao.sigla            == '' || dadosClassificacao.sigla           == undefined || dadosClassificacao.sigla.length             > 2     ||
                dadosClassificacao.nome             == '' || dadosClassificacao.nome            == undefined || dadosClassificacao.nome.length              > 80    ||
                dadosClassificacao.descricao        == '' || dadosClassificacao.descricao       == undefined || dadosClassificacao.descricao.length         > 65000 ||
                dadosClassificacao.icone            == '' || dadosClassificacao.icone           == undefined || dadosClassificacao.icone.length             > 200   
            ){
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{

                        //Encaminha os dados para o DAO inserir no BD
                    let novoClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                    

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoClassificacao){
                      
                    let idClassificacao = await classificacaoDAO.selectUltimoId()                     
 
                        dadosClassificacao.id = Number(idClassificacao[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.classificacao  = dadosClassificacao
                             

                        return dadosAtualizados // 201

        

                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                    }
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415 Erro no content-type da requisição
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de negócio da aplicação
    }
}

//Função para atualizar um classificacao existente.

const setAtualizarClassificacao = async (id,  contentType, dadosClassificacao) =>{
    try {

        let idClassificacao = id; 
        console.log(idClassificacao)

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosClassificacao = {}
                
               
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosClassificacao.sigla            == '' || dadosClassificacao.sigla           == undefined || dadosClassificacao.sigla.length             > 2     ||
                    dadosClassificacao.nome             == '' || dadosClassificacao.nome            == undefined || dadosClassificacao.nome.length              > 80    ||
                    dadosClassificacao.descricao        == '' || dadosClassificacao.descricao       == undefined || dadosClassificacao.descricao.length         > 65000 ||
                    dadosClassificacao.icone            == '' || dadosClassificacao.icone           == undefined || dadosClassificacao.icone.length             > 200 
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                        
                            //Encaminha os dados para o DAO inserir no BD
                        let novoClassificacao = await classificacaoDAO.updateClassificacao(id, dadosClassificacao)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoClassificacao){

                            let idClassificacao = await classificacaoDAO.selectByIdClassificacao(id)
                            
                            dadosClassificacao.id = Number(idClassificacao[0].id)

                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosClassificacao.status         = message.SUCESS_UPDATED_ITEM.status;
                            resultDadosClassificacao.status_code    = message.SUCESS_UPDATED_ITEM.status_code;
                            resultDadosClassificacao.message        = message.SUCESS_UPDATED_ITEM.message
                            resultDadosClassificacao.classificacao  = dadosClassificacao
                
                            return resultDadosClassificacao // 201
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                        }
                }
            }else{
                return message.ERROR_CONTENT_TYPE // 415 Erro no content-type da requisição
            }
        }     
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de negócio da aplicação
    }
}

//Função para excluir um classificacao existente.

const setExcluirClassificacao = async function(id){

    try { 

        let idClassificacao = id
   
        if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

            if(chamarConst.length > 0){

                let dadosClassificacao = await classificacaoDAO.deleteClassificacao(id)
              
                if(dadosClassificacao){

                return message.SUCESS_DELETED_ITEM //200
                }else{
                    return message.SUCESS_DELETED_ITEM //201
                }
            }else{
                return message.ERROR_NOT_FOUND //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os classificacao do banco de dados.

const getListarClassificacao = async function(){

    //Cria uma variável do tipo JSON.
    let classificacaoJSON = {}

    //Chama a função do DAO para buscar os dados no BD.
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacao()

    //Verifica se existem dados retornados do DAO.
    if(dadosClassificacao){
        //Montando o JSON para retornar para o APP.
        classificacaoJSON.classificacao = dadosClassificacao
        classificacaoJSON.quantidade = dadosClassificacao.length
        classificacaoJSON.status_code = 200

        //Retorna o JSON montado.
        return classificacaoJSON
    }else{
        //Return false quando não houverem dados.
        return false
    }
}

//Função para buscar um classificacao pelo ID.

const getBuscarClassificacao = async function(id){
    //Recebe o Id do classificacao.
    let idClassificacao = id
    //Variável para criar o JSON de retorno do classificacao.
    let classificacaoJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do Classificacao pelo ID.
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(id)

        //Validação para verificar se existem dados encontrados
        if(dadosClassificacao){
            //Validação para verificar se existem dados de retorno
            if(dadosClassificacao.length > 0){

            classificacaoJSON.classificacao = dadosClassificacao
            classificacaoJSON.status_code = 200

            return classificacaoJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//Função para buscar um classificacao pelo nome.

const  getBuscarClassificacaoNome = async function(nome){
    let nomeClassificacao = nome
    let classificacaoJSON = {}

    console.log("ii")
    if(nomeClassificacao == '' || nomeClassificacao == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosClassificacao = await classificacaoDAO.selectByNomeClassificacao(nomeClassificacao)

        if(dadosClassificacao){
            if(dadosClassificacao.length > 0){
                classificacaoJSON.Classificacao = dadosClassificacao
                classificacaoJSON.status_code = 200

                return classificacaoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}

module.exports = {
    getListarClassificacao,
    getBuscarClassificacao,
    getBuscarClassificacaoNome,
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao
}
