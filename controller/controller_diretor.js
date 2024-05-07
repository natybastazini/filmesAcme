/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de diretors.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')
const diretorDAO = require('../model/DAO/diretor.js')
const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

//Função para retornar todos os diretores do banco de dados.

const getListarDiretores = async function(){

    let diretoresJSON = {}
    let dadosDiretores = await diretorDAO.selectAllDiretores()

    if(dadosDiretores){

        const promisse = dadosDiretores.map(async(diretor)=>{
            let sexoJSON = await sexoDAO.selectByIdSexo(diretor.sexo_id)
            diretor.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(diretor.id)
           
            if(nacionalidadeJSON.length > 0){ 
                diretor.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        diretoresJSON.diretor = dadosDiretores

        diretoresJSON.quantidade = dadosDiretores.length
        diretoresJSON.status_code = 200

        return diretoresJSON
    }else{
        return false
    }
}

//Função para buscar um diretor pelo ID.

const getDiretor = async function(id){
    //Recebe o Id do diretor.
    let idDiretor = id
    //Variável para criar o JSON de retorno do diretor.
    let diretoresJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do Diretor pelo ID.
       
        let dadosDiretor = await diretorDAO.selectByIdDiretor(id)
        
        //Validação para verificar se existem dados encontrados
        if(dadosDiretor){
            
            //Validação para verificar se existem dados de retorno
            if(dadosDiretor.length > 0){

                    let sexoJSON = await sexoDAO.selectByIdSexo(dadosDiretor[0].sexo_id)
                    dadosDiretor[0].sexo = sexoJSON
                    console.log(dadosDiretor)
                    let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(dadosDiretor[0].id)
                
                    if(nacionalidadeJSON.length > 0){ 
                        dadosDiretor[0].nacionalidade = nacionalidadeJSON
                        console.log(dadosDiretor)
                    }

                diretoresJSON.Diretor = dadosDiretor
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

//Função para buscar um diretor pelo nome.

const  getDiretorNome = async function(nome){
    let nomeDiretor = nome
    let diretoresJSON = {}

    if(nomeDiretor == '' || nomeDiretor == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosDiretor = await diretorDAO.selectByNomeDiretor(nomeDiretor)

        const promisse = dadosDiretor.map(async(diretor)=>{
            let sexoJSON = await sexoDAO.selectByIdSexo(diretor.sexo_id)
            diretor.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(diretor.id)
           
            if(nacionalidadeJSON.length > 0){ 
                diretor.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        if(dadosDiretor){
            if(dadosDiretor.length > 0){
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

//Função para inserir um novo Diretor no banco de dados.

const setInserirNovoDiretor = async function (dadosDiretor, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){
                let dadosAtualizados = {}
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosDiretor.nome             == '' || dadosDiretor.nome              == undefined || dadosDiretor.nome.length               > 100       ||
                dadosDiretor.data_nascimento  == '' || dadosDiretor.data_nascimento   == undefined || dadosDiretor.data_nascimento.length    > 10        ||
                dadosDiretor.foto             == '' || dadosDiretor.foto              == undefined || dadosDiretor.foto.length               > 600       ||
                dadosDiretor.biografia        == '' || dadosDiretor.biografia         == undefined || dadosDiretor.biografia.length          > 65000     ||
                dadosDiretor.sexo_id          == '' || dadosDiretor.sexo_id           == undefined || dadosDiretor.sexo_id.length            > 1      
            ){
                console.log(dadosDiretor)  
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{
                let dadosValidated = false

                //Validação de digitação para a data de falecimento que não é campo obrigatório
                if(     dadosDiretor.data_falecimento != null && 
                        dadosDiretor.data_falecimento != undefined && 
                        dadosDiretor.data_falecimento != ""
                    ){
                        if(dadosDiretor.data_falecimento.length != 10)
                            return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                        else
                            dadosValidated = true // Se a data estiver exatamente 10 char
                }else{
                    //Variável para validar se poderemos chamar o DAO 
                    dadosValidated = true // Se a data não existir nos dados
                }

            
                if(dadosValidated){
                    
                        //Encaminha os dados para o DAO inserir no BD
                        let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoDiretor){
                       
                    let idDiretor = await diretorDAO.selectUltimoId()                     

                        dadosDiretor.id = Number(idDiretor[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.diretor        = dadosDiretor
            
                       
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

//Função para atualizar um diretor existente.

const setAtualizarDiretor = async (id, contentType, dadosDiretor) =>{
    try {

        let idDiretor = id; 

        if (idDiretor == '' || idDiretor == null || idDiretor == isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosDiretor = {}
                
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosDiretor.nome             == '' || dadosDiretor.nome              == undefined || dadosDiretor.nome.length               > 100       ||
                    dadosDiretor.data_nascimento  == '' || dadosDiretor.data_nascimento   == undefined || dadosDiretor.data_nascimento.length    > 10        ||
                    dadosDiretor.foto             == '' || dadosDiretor.foto              == undefined || dadosDiretor.foto .length              > 600       ||
                    dadosDiretor.biografia        == '' || dadosDiretor.biografia         == undefined || dadosDiretor.biografia .length         > 65000     ||
                    dadosDiretor.sexo_id          == '' || dadosDiretor.sexo_id           == undefined || dadosDiretor.sexo_id.length            > 1  
                ){

                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                    let dadosValidated = false

                    //Validação de digitação para a data de falecimento que não é campo obrigatório
                    if(     dadosDiretor.data_falecimento != null && 
                            dadosDiretor.data_falecimento != undefined && 
                            dadosDiretor.data_falecimento != ""
                        ){
                            if(dadosDiretor.data_falecimento.length != 10)
                                return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                            else
                                dadosValidated = true // Se a dataestiver exatamente 10 char
                    }else{
                        //Variável para validar se poderemos chamar o DAO 
                        dadosValidated = true // Se a data não existir nos dados
                    }

                    if(dadosValidated){
                        
                            //Encaminha os dados para o DAO inserir no BD
                            let novoDiretor = await diretorDAO.updateDiretor(id, dadosDiretor)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoDiretor){

                            let idDiretor = await diretorDAO.selectUltimoId()
                            
                            dadosDiretor.id = Number(idDiretor[0].id)

                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosDiretor.status         = message.SUCESS_CREATED_ITEM.status;
                            resultDadosDiretor.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            resultDadosDiretor.message        = message.SUCESS_CREATED_ITEM.message
                            resultDadosDiretor.Diretor        = dadosDiretor
                
                            return resultDadosDiretor // 201
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                        }
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

//Função para excluir um diretor existente.

const setExcluirDiretor = async function(id){

    try { 

        let idDiretor = id
   
        if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await diretorDAO.selectByIdDiretor(idDiretor)

            if(chamarConst.length > 0){

                let dadosDiretor = await diretorDAO.deleteDiretor(id)
              
                if(dadosDiretor){

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

module.exports = {
    getListarDiretores,
    getDiretor,
    getDiretorNome,
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor
}