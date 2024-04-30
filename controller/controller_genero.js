
/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de Generos.
 * Data: 30/01/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')

//Import do arquivo DAO para manipular dados do BD.
const generoDAO = require('../model/DAO/genero.js')

//Função para retornar todos os Generos do banco de dados.

const getListarGeneros = async function(){

    //Cria uma variável do tipo JSON.
    let generosJSON = {}

    //Chama a função do DAO para buscar os dados no BD.
    let dadosGeneros = await generoDAO.selectAllGeneros()

    //Verifica se existem dados retornados do DAO.
    if(dadosGeneros){
        
        //Montando o JSON para retornar para o APP.
        generosJSON.generos = dadosGeneros
        generosJSON.quantidade = dadosGeneros.length
        generosJSON.status_code = 200

        //Retorna o JSON montado.
        return generosJSON
    }else{
        //Return false quando não houverem dados.
        return false
    }
}

//Função para buscar um gênero pelo ID.

const getBuscarGenero = async function(id){
    //Recebe o Id do gênero.
    let idGenero = id
    //Variável para criar o JSON de retorno do Genero.
    let generoJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do gênero pelo ID.
        let dadosGenero = await generoDAO.selectByIdGenero(id)

        //Validação para verificar se existem dados encontrados
        if(dadosGenero){
            //Validação para verificar se existem dados de retorno
            if(dadosGenero.length > 0){

            generoJSON.genero = dadosGenero
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
                generosJSON.genero = dadosGenero
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

//Função para inserir um novo gênero no banco de dados.

const setInserirNovoGenero = async function (dadosGenero, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){

                let dadosAtualizados = {}

            
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome.length > 80
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                        
                            //Encaminha os dados para o DAO inserir no BD
                        let novoGenero = await generoDAO.insertGenero(dadosGenero)

                        console.log(novoGenero)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoGenero){
                        
                        let idGenero = await generoDAO.selectUltimoId()                   

                            dadosGenero.id = Number(idGenero[0].id)
                            //Cria o padrão JSON para retorno dos dados criados no BD
                            dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                            dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                            dadosAtualizados.genero         = dadosGenero
                
                        
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

//Função para atualizar um gênero existente.

const setAtualizarGenero = async (id,  contentType, dadosGenero) =>{
    try {

        let idGenero = id;

        console.log(idGenero)

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosGenero = {}
                
               
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome.length > 80
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                  
                            //Encaminha os dados para o DAO inserir no BD
                        let novoGenero = await generoDAO.selectByIdGenero(id)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoGenero){

                            let idGenero = await generoDAO.updateGenero(id, dadosGenero)
                    
                        
                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosGenero.status         = message.SUCESS_UPDATED_ITEM.status;
                            resultDadosGenero.status_code    = message.SUCESS_UPDATED_ITEM.status_code;
                            resultDadosGenero.message        = message.SUCESS_UPDATED_ITEM.message
                            resultDadosGenero.Genero         = dadosGenero
                
                            return resultDadosGenero // 201
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

//Função para excluir um gênero existente.

const setExcluirGenero = async function(id){

    try { 

        let idGenero = id
   
        if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await generoDAO.selectByIdGenero(idGenero)

            if(chamarConst.length > 0){

                let dadosGenero = await generoDAO.deleteGenero(id)
              
                if(dadosGenero){

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

module.exports={
    getListarGeneros,
    getBuscarGenero,
    getBuscarGeneroNome,
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero
}